import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  View,
  ActivityIndicator,
} from 'react-native';
import Text from '../../../Components/Text';
import InputField from '../../../Components/InputField';
import Header from '../../../Components/Header';
import {firebase} from '@react-native-firebase/auth';
import {styles} from './style';
import {colors} from '../../../Constants';

const Payment = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          const usersSnapshot = await firebase
            .firestore()
            .collection('users')
            .get();
          const usersData = usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          const allUsers = usersData.filter(
            user => user.id !== currentUser.uid,
          );

          const usersWithLastMessages = await Promise.all(
            allUsers.map(async user => {
              const lastMessage = await getLastMessage(user.id);
              return {...user, lastMessage};
            }),
          );

          const initialUnreadMessages = {};
          usersWithLastMessages.forEach(user => {
            if (!user.lastMessage.fromCurrentUser && user.lastMessage.unread) {
              initialUnreadMessages[user.id] = 1;
            } else {
              initialUnreadMessages[user.id] = 0;
            }
          });

          setUnreadMessages(initialUnreadMessages);
          setUsers(usersWithLastMessages);
        } else {
          console.error('No current user logged in');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();

    const unsubscribeFocus = navigation.addListener('focus', () => {
      fetchUsers();
    });

    return unsubscribeFocus;
  }, [navigation]);

  const handleSearch = text => {
    setSearchQuery(text);
  };

  const handleUserPress = userId => {
    const selectedUser = users.find(user => user.id === userId);
    navigation.navigate('Chat', {selectedUser});
  };

  const getLastMessage = async userId => {
    try {
      const currentUser = firebase.auth().currentUser;
      const chatId = [currentUser.uid, userId].sort().join('_');
      const messageSnapshot = await firebase
        .firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get();

      if (!messageSnapshot.empty) {
        const lastMessage = messageSnapshot.docs[0].data();
        const isFromCurrentUser = lastMessage.user.id === currentUser.uid;
        const unread = !isFromCurrentUser && !lastMessage.read;
        return {
          text: lastMessage.text,
          fromCurrentUser: isFromCurrentUser,
          unread,
        };
      } else {
        return {text: '', fromCurrentUser: true, unread: false};
      }
    } catch (error) {
      console.error('Error fetching last message:', error);
      return {text: '', fromCurrentUser: true, unread: false};
    }
  };

  const filteredUsers = users.filter(
    user =>
      (user.name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.phoneNumber ?? '')
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.mainContainer}>
      <Header title="Payment" onPress={() => navigation.goBack()} />
      <InputField
        leftIcon={require('../../../../assets/images/search_icon.png')}
        numberOfLines={1}
        placeholder="Search name or number"
        inputViewStyle={styles.inputViewStyle}
        style={styles.searchInputText}
        placeholderTextColor={styles.placeholderTextColor}
        leftIconStyle={styles.searchIcon}
        onChangeText={handleSearch}
      />

      <Text style={styles.friendsText}>Friends</Text>
      <Text style={styles.accountText}>Selected User Accounts</Text>

      {loading ? (
        <ActivityIndicator
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          size={50}
          color={colors.primary}
        />
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={({item}) => (
            <Pressable
              onPress={() => handleUserPress(item.id)}
              style={styles.chatView}>
              <Image
                resizeMode="center"
                style={styles.chatImage}
                source={
                  item.icon ||
                  require('../../../../assets/images/person_icon.png')
                }
              />
              <View style={styles.chatNameContainer}>
                <Text style={styles.chatName} numberOfLines={1}>
                  {item.name || item.username}
                </Text>
                <Text
                  style={[
                    styles.chatMessage,
                    {
                      color: item.lastMessage.fromCurrentUser
                        ? colors.primary
                        : colors.gray,
                    },
                  ]}
                  numberOfLines={1}>
                  {item.lastMessage.text}
                </Text>
              </View>
              {item.price && (
                <Text
                  style={[styles.lastSeen, {color: item.color}]}
                  numberOfLines={1}>
                  {item.price}
                </Text>
              )}
              {/* {unreadMessages[item.id] > 0 && ( */}
              {/*  <Text style={styles.unreadCount}>{unreadMessages[item.id]}</Text> */}
              <Text style={styles.unreadCount}>5</Text>

              {/* )} */}
            </Pressable>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default Payment;
