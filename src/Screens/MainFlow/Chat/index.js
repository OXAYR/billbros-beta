import React, {useState, useEffect, useCallback} from 'react';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
} from 'react-native-gifted-chat';
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

const ChatScreen = ({route, navigation}) => {
  const {selectedParticipants, totalBill, splitAmount} = route.params;
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    const userIds = selectedParticipants
      .map(user => user.id)
      .sort()
      .join('_');

    const chatId = `${currentUser.uid}_${userIds}`;

    const unsubscribe = firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        console.log('here are the snapshot of the chat---->', snapshot);
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
    console.log('here are the unsubscribe------>', unsubscribe);

    return () => unsubscribe();
  }, [navigation]);

  const onSend = useCallback(
    (messages = []) => {
      const userIds = selectedParticipants
        .map(user => user.id)
        .sort()
        .join('_');
      const chatId = `${currentUser.uid}_${userIds}`;
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
    [selectedParticipants],
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleCardInput = formData => {
    // Handle the card input data here
    console.log('Card Data:', formData);
    // toggleModal(); // Close modal after handling
  };

  const handleInputTextChange = text => {
    setInputText(text);
  };

  const renderInputToolbar = props => (
    <View style={styles.inputContainer}>
      <InputToolbar {...props} containerStyle={{flex: 1}} />
      {inputText === '' && (
        <TouchableOpacity style={styles.payButton} onPress={toggleModal}>
          <Text style={styles.payButtonText}>Pay</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderComposer = props => (
    <Composer {...props} onTextChanged={handleInputTextChange} />
  );

  return (
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
          renderBubble={props => {
            console.log('here are the props----->', props);
            return (
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
            );
          }}
          renderInputToolbar={renderInputToolbar}
          renderComposer={renderComposer}
        />
      )}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <CreditCardInput onChange={handleCardInput} />
          <TouchableOpacity style={styles.submitButton} onPress={toggleModal}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
  payButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
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
