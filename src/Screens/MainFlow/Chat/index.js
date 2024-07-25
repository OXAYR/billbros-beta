import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import {firebase} from '../../../../firebase';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
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

const ChatScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {stripe, loading, error} = useSelector(state => state.stripe);
  const {selectedParticipants, totalBill, id} = route.params;
  console.log('here are the route----->', route.params);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

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
        }));
        setMessages(messagesList);
        setLoadingMessages(false);
      });

    return () => unsubscribe();
  }, [chatId]);

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

  const handleCardInput = async formData => {
    // console.log(
    //   'here is the formadata------->',
    //   formData.values.expiry,
    //   formData.values.cvc,
    //   formData.values.number,
    //   formData.values,
    //   formData.values.expiry.split('/')[0],
    //   formData.values.expiry.split('/')[1],
    // );
    // const {paymentMethod, error} = await createPaymentMethod({
    //   type: 'pm_card_visa',
    //   card: {
    //     number: formData.values.number,
    //     exp_month: formData.values.expiry.split('/')[0],
    //     exp_year: formData.values.expiry.split('/')[1],
    //     cvc: formData.values.cvc,
    //   },
    // });
    // console.log('here is the payment method ------->', paymentMethod, error);
    const amount = (totalBill / (selectedParticipants.length + 1)).toFixed(2);
    const payload = {
      amount: parseInt(amount * 100),
      currency: 'PKR',
      description: 'This is the payment for the order now',
      payment_method: 'pm_card_visa',
    };
    toggleModal();
    const response = await dispatch(createPaymentIntent(payload));
    console.log(
      'here is the stripe------->',
      response.payload.clientSecret,
      response.payload.paymentIntentId,
    );
    if (response.payload.clientSecret && response.payload.paymentIntentId) {
      const payloadConfirmPaymentIntent = {
        paymentIntentId: response.payload.paymentIntentId,
        payment_method: 'pm_card_visa',
      };
      const responsepayment = await dispatch(
        confirmPaymentIntent(payloadConfirmPaymentIntent),
      );
      console.log('here is the response', responsepayment);
    }
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
      <TouchableOpacity style={styles.payButton} onPress={toggleModal}>
        <Text style={styles.payButtonText}>Pay</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <StripeProvider publishableKey="your-publishable-key">
      <View style={styles.container}>
        <Header
          title={`Group Chat ${totalBill}`}
          onPress={() => navigation.goBack()}
        />
        {loadingMessages ? (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size={50}
            color={colors.primary}
          />
        ) : (
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: currentUser.uid,
              name: currentUser.displayName,
            }}
            renderBubble={props => (
              <View style={styles.chatContainer}>
                <Bubble
                  {...props}
                  wrapperStyle={{
                    left: {backgroundColor: '#f0f0f0'},
                    right: {backgroundColor: '#0078fe'},
                  }}
                  textStyle={{
                    left: {color: '#000'},
                    right: {color: '#fff'},
                  }}
                />
              </View>
            )}
            renderInputToolbar={renderInputToolbar}
          />
        )}
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={styles.modalContent}>
            <CreditCardInput
            // onChange={handleCardInput}
            />
            <TouchableOpacity
              style={styles.submitButton}
              // onPress={toggleModal}
              onPress={handleCardInput}>
              <Text style={styles.submitButtonText}>Submit</Text>
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
    backgroundColor: colors.white,
    paddingBottom: 32,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    margin: 10,
  },
  payButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
