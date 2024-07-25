import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  View,
  ActivityIndicator,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Text from '../../../Components/Text';
import InputField from '../../../Components/InputField';
import Header from '../../../Components/Header';
import {firebase} from '@react-native-firebase/auth';
import {styles} from './style';
import {colors} from '../../../Constants';

const MINIMUM_AMOUNT_IN_USD = 0.5;
const INR_TO_USD_CONVERSION_RATE = 0.012; // Example conversion rate

const createChatId = (user1Id, user2Id) => {
  return [user1Id, user2Id].sort().join('_');
};

const fetchChatsForUser = async userId => {
  try {
    const chatsSnapshot = await firebase
      .firestore()
      .collection('chats')
      .where('participantIds', 'array-contains', userId)
      .get();

    const chats = chatsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log('Chats for user:', chats);
    return chats;
  } catch (error) {
    console.error('Error fetching chats for user:', error);
  }
};

const fetchChatById = async chatId => {
  try {
    const chatSnapshot = await firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .get();

    if (chatSnapshot.exists) {
      const chatData = chatSnapshot.data();
      console.log('Chat data:', chatData);
      return chatData;
    } else {
      console.error('Chat not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching chat:', error);
  }
};

const Payment = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState({});
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [highlightedUsers, setHighlightedUsers] = useState([]);
  const [totalBill, setTotalBill] = useState('');
  const [splitAmount, setSplitAmount] = useState(0);
  const [groupChats, setGroupChats] = useState([]);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    const fetchAllChatData = async () => {
      try {
        const chatsSnapshot = await firebase
          .firestore()
          .collection('chats')
          .get();

        const chatsData = chatsSnapshot.docs.map(doc => ({
          chatId: doc.id,
          participantIds: doc.data().participantIds,
        }));

        console.log('All chats data:', chatsData);
        return chatsData;
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };
    fetchAllChatData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const currentUser = firebase.auth().currentUser;
        setCurrentUser(currentUser);
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

          console.log('Here are the users:', allUsers);

          const userGroupChats = await fetchChatsForUser(currentUser.uid);
          setGroupChats(userGroupChats);
          console.log('Here are the group chats:', userGroupChats);

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
        console.error('Error fetching users or group chats:', error);
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
    if (selectedParticipants.length < 4) {
      if (!selectedParticipants.find(user => user.id === userId)) {
        setSelectedParticipants([...selectedParticipants, selectedUser]);
      } else {
        setSelectedParticipants(
          selectedParticipants.filter(user => user.id !== userId),
        );
      }
    } else {
      if (selectedParticipants.find(user => user.id === userId)) {
        setSelectedParticipants(
          selectedParticipants.filter(user => user.id !== userId),
        );
      } else {
        Alert.alert('Maximum 4 participants allowed');
      }
    }
  };

  const handleUserLongPress = userId => {
    if (highlightedUsers.includes(userId)) {
      setHighlightedUsers(highlightedUsers.filter(id => id !== userId));
    } else {
      setHighlightedUsers([...highlightedUsers, userId]);
    }
  };

  const handleBillChange = value => {
    setTotalBill(value);
    if (selectedParticipants.length > 0) {
      setSplitAmount((value / (selectedParticipants.length + 1)).toFixed(2));
    } else {
      setSplitAmount(0);
    }
  };

  const handleCreateGroup = async () => {
    const amountInINR = parseFloat(totalBill);
    const amountInUSD = amountInINR * INR_TO_USD_CONVERSION_RATE;

    if (amountInUSD < MINIMUM_AMOUNT_IN_USD) {
      Alert.alert(
        'Error',
        `Amount must convert to at least $0.50. The current amount converts to approximately $${amountInUSD.toFixed(
          2,
        )}.`,
      );
      return;
    }

    if (selectedParticipants.length > 0) {
      navigation.navigate('Chat', {
        selectedParticipants,
        totalBill,
        splitAmount,
      });

      try {
        const participantIds = selectedParticipants.map(user => user.id);
        const chatId = [currentUser.uid, ...participantIds].sort().join('_');

        const chatDoc = await firebase
          .firestore()
          .collection('chats')
          .doc(chatId)
          .get();

        if (chatDoc.exists) {
          console.log('Chat already exists, not creating a new one.');
          return; // Exit the function if chat already exists
        }

        const shares = participantIds.map(id => ({
          userId: id,
          shareAmount: splitAmount || 0,
        }));

        const chatData = {
          Name: `Group Chat users${participantIds.length}`,
          participantIds: [currentUser.uid, ...participantIds],
          totalBill: totalBill || 0,
          shares,
        };

        console.log('Here are the chat data---->', chatData);

        await firebase
          .firestore()
          .collection('chats')
          .doc(chatId)
          .set(chatData);

        console.log('Chat document created or updated successfully');
      } catch (error) {
        console.error('Error creating or updating chat:', error);
      }
    } else {
      Alert.alert('Please select at least one participant');
    }
  };

  const getLastMessage = async userId => {
    try {
      const currentUser = firebase.auth().currentUser;
      const chatId = createChatId(currentUser.uid, userId);
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

  const GroupChatList = ({groupChats}) => {
    const handleGroupChatPress = chat => {
      const {participantIds, totalBill, splitAmount, id} = chat;
      navigation.navigate('Chat', {
        selectedParticipants: participantIds.map(id => ({id})),
        totalBill,
        splitAmount,
        id,
      });
    };

    return (
      <FlatList
        data={groupChats}
        renderItem={({item}) => (
          <Pressable onPress={() => handleGroupChatPress(item)}>
            <View style={styles.chatItem}>
              <Text style={styles.chatName}>{item.Name}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={item => item.id}
      />
    );
  };

  const renderGroupChats = () => (
    <View style={styles.groupChatsContainer}>
      <GroupChatList groupChats={groupChats} />
    </View>
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

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'users' && styles.activeTab]}
          onPress={() => setActiveTab('users')}>
          <Text style={styles.tabText}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'groupChats' && styles.activeTab]}
          onPress={() => setActiveTab('groupChats')}>
          <Text style={styles.tabText}>Group Chats</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'users' ? (
        <>
          <Text style={styles.friendsText}>Friends</Text>
          <Text style={styles.accountText}>Selected User Accounts</Text>

          <TextInput
            style={styles.billInput}
            placeholder="Enter total bill"
            keyboardType="numeric"
            value={totalBill}
            onChangeText={handleBillChange}
          />

          {selectedParticipants.length > 0 && (
            <View>
              <Text style={styles.splitText}>Split Amount: ${splitAmount}</Text>
              <FlatList
                data={selectedParticipants}
                renderItem={({item}) => (
                  <View style={styles.participantView}>
                    <Text style={styles.participantName}>
                      {item.name || item.username}
                    </Text>
                    <Text style={styles.participantAmount}>${splitAmount}</Text>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </View>
          )}

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
                  onLongPress={() => handleUserLongPress(item.id)}
                  style={[
                    styles.chatView,
                    highlightedUsers.includes(item.id) && styles.highlighted,
                  ]}>
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
                  <Text style={styles.unreadCount}>
                    {unreadMessages[item.id]}
                  </Text>
                </Pressable>
              )}
              keyExtractor={item => item.id}
            />
          )}

          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateGroup}>
            <Text style={styles.createButtonText}>Create Group Chat</Text>
          </TouchableOpacity>
        </>
      ) : (
        renderGroupChats()
      )}
    </View>
  );
};

export default Payment;
