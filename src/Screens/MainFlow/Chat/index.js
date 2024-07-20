import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {firebase} from '../../../../firebase';
import {
  StyleSheet,
  Image,
  View,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Header from '../../../Components/Header';
import {colors} from '../../../Constants';

const ChatScreen = ({route, navigation}) => {
  //   console.log('here is the firebase quth------->', firebase);
  const {selectedUser} = route.params;
  const [messages, setMessages] = useState([]);
  const currentUser = firebase.auth().currentUser;
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {
    const chatId = [currentUser.uid, selectedUser.id].sort().join('_');
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
        setLoadingMessages(false); // Set loading to false after messages are fetched
      });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    const chatId = [currentUser.uid, selectedUser.id].sort().join('_');
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
        read: false, // Add read status
      });
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: styles.leftBubble,
          right: styles.rightBubble,
        }}
        textStyle={{
          left: styles.leftBubbleText,
          right: styles.rightBubbleText,
        }}
      />
    );
  };

  // const renderAvatar = (props) => {
  //     const { user } = props.currentMessage;
  //     const avatarSource = user._id === currentUser.uid
  //         ? require('../../../../assets/images/profile_focused.png')
  //         : require('../../../../assets/images/profile_unfocused.png');

  //     return (
  //         <Image
  //             source={avatarSource}
  //             style={styles.avatar}
  //         />
  //     );
  // };
  return (
    <View style={styles.container}>
      <Header
        title={selectedUser.username}
        onPress={() => navigation.goBack()}
      />
      <ImageBackground
        source={require('../../../../assets/images/chat_bg.jpg')} // replace with your background image path
        style={styles.backgroundImage}>
        {loadingMessages ? (
          <ActivityIndicator
            size={50}
            color={colors.primary}
            style={styles.loadingIndicator}
          />
        ) : (
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: currentUser.uid,
              name: currentUser.displayName,
            }}
            renderBubble={renderBubble}
          />
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backgroundImage: {
    flex: 1,
  },
  leftBubble: {
    marginVertical: heightPercentageToDP(0.2),
    marginHorizontal: widthPercentageToDP(-10),
    backgroundColor: '#e1ffc7',
  },
  rightBubble: {
    marginVertical: heightPercentageToDP(0.2),
    marginHorizontal: widthPercentageToDP(1),
    backgroundColor: '#007aff',
  },
  leftBubbleText: {
    textAlign: 'left',
    color: '#000',
  },
  rightBubbleText: {
    color: '#fff',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // avatar: {
  //     width: 40,
  //     height: 40,
  //     borderRadius: 20,
  //     marginRight: 8, // Space between avatar and bubble
  //     marginLeft: 8,
  // },
});

export default ChatScreen;
