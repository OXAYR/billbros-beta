import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import {firebase} from '../../../../firebase';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Alert,
  TextInput,
} from 'react-native';
import Header from '../../../Components/Header';
import {colors} from '../../../Constants';
import Modal from 'react-native-modal';
import {CreditCardInput} from 'react-native-credit-card-input';
import {useDispatch, useSelector} from 'react-redux';
import {
  confirmPaymentIntent,
  createPaymentIntent,
} from '../../../Redux/stripeThunks';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MINIMUM_AMOUNT_IN_USD = 0.5;
const INR_TO_USD_CONVERSION_RATE = 0.012; // Example conversion rate

const ChatScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {stripe, loading, error} = useSelector(state => state.stripe);
  const {selectedParticipants, totalBill, id} = route.params;
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [newTotalAmount, setNewTotalAmount] = useState('');
  const [userShareAmount, setUserShareAmount] = useState(null);
  const [adminId, setAdminId] = useState('');
  const [userShareMsg, setUserShareMsg] = useState('');
  const name = useSelector(state => state.reducer.user.username);
  const currentUser = firebase.auth().currentUser;
  const {createPaymentMethod} = useStripe();
  const chatId = id;

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const messagesList = snapshot.docs.map(doc => ({
          _id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt
            ? doc.data().createdAt.toDate()
            : new Date(),
          user: {
            _id: doc.data().user.id,
            name: doc.data().user.name,
          },
          isPaymentMessage: doc.data().isPaymentMessage || false,
        }));
        setMessages(messagesList);
        setLoadingMessages(false);
      });

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    const fetchChatData = async () => {
      const chatDoc = await firebase
        .firestore()
        .collection('chats')
        .doc(chatId)
        .get();
      const chatData = chatDoc.data();
      setAdminId(chatData.adminId);
      const userShare = chatData.shares.find(
        share => share.userId === currentUser.uid,
      );
      setUserShareAmount(userShare ? userShare.shareAmount : null);
    };

    fetchChatData();
  }, [chatId, currentUser.uid]);

  const onSend = useCallback(
    (messages = []) => {
      const message = messages[0];
      firebase
        .firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add({
          text: message.text,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          user: {
            id: currentUser.uid,
            name: currentUser.displayName,
          },
        });
    },
    [chatId, currentUser.uid, currentUser.displayName],
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleUpdateTotal = async () => {
    const amountInINR = parseFloat(newTotalAmount);
    const amountInUSD = amountInINR * INR_TO_USD_CONVERSION_RATE;

    if (amountInUSD < MINIMUM_AMOUNT_IN_USD) {
      setUpdateModalVisible(false);
      Alert.alert(
        `The total amount must be at least ${Math.ceil(
          MINIMUM_AMOUNT_IN_USD / INR_TO_USD_CONVERSION_RATE,
        )}.`,
      );
      return;
    }
    const updatedSplitAmount = newTotalAmount / selectedParticipants.length;
    const chatDoc = await firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .get();
    const chatData = chatDoc.data();

    const updatedShares = chatData.shares.map(share => {
      if (share.shareAmount > 0) {
        return {
          userId: share.userId,
          shareAmount: parseFloat(share.shareAmount) + updatedSplitAmount,
        };
      } else {
        return {
          userId: share.userId,
          shareAmount: updatedSplitAmount,
        };
      }
    });

    await firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .update({
        totalBill: parseFloat(newTotalAmount),
        shares: updatedShares,
      });

    setUpdateModalVisible(false);
  };

  const sendPaymentMessage = async amount => {
    const message = {
      text: `${name} sent Rs:${amount} PKR.`,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
      },
      isPaymentMessage: true,
    };

    await firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add(message);
    const chatDoc = await firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .get();
    const chatData = chatDoc.data();
    const updatedShares = chatData.shares.map(share => {
      if (share.userId === currentUser.uid) {
        return {userId: share.userId, shareAmount: 0};
      }
      return share;
    });

    await firebase.firestore().collection('chats').doc(chatId).update({
      shares: updatedShares,
    });

    setUserShareAmount(0);
  };

  const handleCardInput = async () => {
    const amount = Math.ceil(userShareAmount);
    const payload = {
      amount: parseInt(amount * 100),
      currency: 'PKR',
      description: userShareMsg,
      payment_method: 'pm_card_visa',
    };
    toggleModal();
    const response = await dispatch(createPaymentIntent(payload));
    if (response.payload.clientSecret && response.payload.paymentIntentId) {
      const payloadConfirmPaymentIntent = {
        paymentIntentId: response.payload.paymentIntentId,
        payment_method: 'pm_card_visa',
      };
      const responsepayment = await dispatch(
        confirmPaymentIntent(payloadConfirmPaymentIntent),
      );
      if (responsepayment.payload.message.includes('Payment successful')) {
        sendPaymentMessage(amount);
      }
    }
  };

  const renderBubble = props => {
    const {isPaymentMessage} = props.currentMessage;
    if (isPaymentMessage) {
      return (
        <View style={styles.paymentBubbleContainer}>
          <Text style={styles.paymentBubbleText}>
            {props.currentMessage.text}
          </Text>
        </View>
      );
    }
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {backgroundColor: '#e9f3db'},
          right: {backgroundColor: '#588157'}, // Change to green
        }}
        textStyle={{
          left: {color: '#000'},
          right: {color: '#fff'},
        }}
      />
    );
  };

  const renderInputToolbar = props => (
    <View style={styles.inputContainer}>
      <View style={styles.InputToolbar}>
        <InputToolbar
          {...props}
          containerStyle={{
            flex: 0.3,
            bottom: -7,
          }}
        />
      </View>
      {currentUser.uid === adminId ? (
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => setUpdateModalVisible(true)}>
          <Text style={styles.payButtonText}>Add New</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.payButton,
            userShareAmount === 0 && styles.payButtonDisabled,
          ]}
          onPress={userShareAmount === 0 ? null : toggleModal}
          disabled={userShareAmount === 0}>
          <Text style={styles.payButtonText}>
            {userShareAmount === 0 ? 'Paid' : 'Pay'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loadingMessages) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <StripeProvider publishableKey="your_publishable_key_here">
      <View style={styles.container}>
        <Header
          onPress={() => navigation.goBack()}
          title={`Group Chat ${totalBill}`}
        />
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{_id: currentUser.uid}}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderUsernameOnMessage
          showUserAvatar
        />
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          backdropOpacity={0.3}
          animationIn="slideInUp"
          animationOut="slideOutDown">
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pay Your Share</Text>
            <TextInput
              style={styles.modalInput}
              value={`Rs: ${userShareAmount} PKR`}
              editable={false}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Add Payment Message"
              onChangeText={text => setUserShareMsg(text)}
              value={userShareMsg}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleCardInput}>
              <Text style={styles.modalButtonText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          isVisible={isUpdateModalVisible}
          onBackdropPress={() => setUpdateModalVisible(false)}
          backdropOpacity={0.3}
          animationIn="slideInUp"
          animationOut="slideOutDown">
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Amount</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter new total amount"
              keyboardType="numeric"
              onChangeText={text => setNewTotalAmount(text)}
              value={newTotalAmount}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleUpdateTotal}>
              <Text style={styles.modalButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f7ee',
    paddingBottom: wp(3),
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
    paddingBottom: 40,
  },
  InputToolbar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  payButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
  },
  payButtonDisabled: {
    backgroundColor: '#ccc',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  paymentBubbleContainer: {
    backgroundColor: '#aad576',
    borderTopEndRadius: wp(12),
    borderBottomLeftRadius: wp(12),
    borderTopLeftRadius: wp(12),
    padding: wp(10),
    marginVertical: wp(5),
  },
  paymentBubbleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
