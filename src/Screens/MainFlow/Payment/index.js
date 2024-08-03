import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import Modal from 'react-native-modal';
import Header from '../../../Components/Header';
import {colors} from '../../../Constants';

const MINIMUM_AMOUNT_IN_USD = 0.5;
const PKR_TO_USD_CONVERSION_RATE = 0.0035; // Example conversion rate (1 PKR = 0.0035 USD)

const Payment = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [totalBill, setTotalBill] = useState('');
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    fetchUsers();
    fetchGroups();
  }, []);

  const fetchUsers = async () => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const usersSnapshot = await firebase
          .firestore()
          .collection('users')
          .get();
        const usersData = usersSnapshot.docs
          .map(doc => ({id: doc.id, ...doc.data()}))
          .filter(user => user.id !== currentUser.uid);
        console.log('Fetched users:', usersData);
        setUsers(usersData);
      } else {
        console.error('No current user logged in');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchGroups = async () => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const groupsSnapshot = await firebase
          .firestore()
          .collection('chats')
          .where('participantIds', 'array-contains', currentUser.uid)
          .get();
        const groupsData = groupsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched groups:', groupsData);
        setGroups(groupsData);
      } else {
        console.error('No current user logged in');
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleUserLongPress = userId => {
    console.log('User long pressed:', userId);
    if (selectedParticipants.length < 3) {
      const selectedUser = users.find(user => user.id === userId);
      if (!selectedParticipants.some(user => user.id === userId)) {
        setSelectedParticipants([...selectedParticipants, selectedUser]);
      } else {
        setSelectedParticipants(
          selectedParticipants.filter(user => user.id !== userId),
        );
      }
    } else if (selectedParticipants.some(user => user.id === userId)) {
      setSelectedParticipants(
        selectedParticipants.filter(user => user.id !== userId),
      );
    } else {
      Alert.alert('Maximum 3 participants allowed (excluding yourself)');
    }
    console.log('Selected participants:', selectedParticipants);
  };

  const toggleModal = () => {
    if (selectedParticipants.length === 0) {
      Alert.alert('Please select at least one participant');
    } else {
      setModalVisible(!isModalVisible);
    }
  };

  const createGroup = async () => {
    if (groupName.trim() === '' || totalBill.trim() === '') {
      Alert.alert('Error', 'Please enter both group name and total bill');
      return;
    }

    const amountInPKR = parseFloat(totalBill);
    const amountInUSD = amountInPKR * PKR_TO_USD_CONVERSION_RATE;

    if (amountInUSD < MINIMUM_AMOUNT_IN_USD) {
      Alert.alert(
        'Error',
        `Amount must convert to at least $0.50. The current amount converts to approximately $${amountInUSD.toFixed(
          2,
        )}.`,
      );
      return;
    }

    try {
      const currentUser = firebase.auth().currentUser;
      const participantIds = [
        ...selectedParticipants.map(user => user.id),
        currentUser.uid,
      ];
      const chatId = participantIds.sort().join('_');

      const chatDoc = await firebase
        .firestore()
        .collection('chats')
        .doc(chatId)
        .get();

      if (chatDoc.exists) {
        Alert.alert('Error', 'A group with these participants already exists');
        return;
      }

      const chatData = {
        Name: groupName,
        participantIds,
        adminId: currentUser.uid,
        totalBill: amountInPKR,
        totalBillUSD: amountInUSD,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await firebase.firestore().collection('chats').doc(chatId).set(chatData);

      Alert.alert('Success', 'Group created successfully');
      toggleModal();
      setGroupName('');
      setTotalBill('');
      setSelectedParticipants([]);
      fetchGroups(); // Refresh the groups list
    } catch (error) {
      console.error('Error creating group:', error);
      Alert.alert('Error', 'Failed to create group. Please try again.');
    }
  };

  const renderUsers = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.listHeader}>Total users: {users.length}</Text>
      {users.map(item => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.userItem,
            selectedParticipants.some(user => user.id === item.id) &&
              styles.selectedUser,
          ]}
          onLongPress={() => handleUserLongPress(item.id)}>
          <Text style={[styles.userName, {color: 'black'}]}>
            {item.username || 'No Name'}
          </Text>
        </TouchableOpacity>
      ))}
      {users.length === 0 && (
        <Text style={styles.emptyListText}>No users found</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>
          Create Group ({selectedParticipants.length})
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderGroups = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.listHeader}>Total groups: {groups.length}</Text>
      {groups.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.groupItem}
          onPress={() =>
            navigation.navigate('Chat', {
              groupId: item.id,
              selectedParticipants: item.participantIds,
              totalBill: item.totalBill,
            })
          }>
          <Text style={[styles.groupName, {color: 'black'}]}>{item.Name}</Text>
          <Text style={styles.groupMembers}>
            {item.participantIds.length} members
          </Text>
        </TouchableOpacity>
      ))}
      {groups.length === 0 && (
        <Text style={styles.emptyListText}>No groups found</Text>
      )}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <Header onPress={() => navigation.goBack()} title={'Payment'} />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'users' && styles.activeTab]}
          onPress={() => setActiveTab('users')}>
          <Text style={styles.tabText}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'groups' && styles.activeTab]}
          onPress={() => setActiveTab('groups')}>
          <Text style={styles.tabText}>Groups</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'users' ? renderUsers() : renderGroups()}
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create Group</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter group name"
            value={groupName}
            onChangeText={setGroupName}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter total bill (in PKR)"
            keyboardType="numeric"
            value={totalBill}
            onChangeText={setTotalBill}
          />
          <Text style={styles.conversionText}>
            Minimum amount: PKR{' '}
            {(MINIMUM_AMOUNT_IN_USD / PKR_TO_USD_CONVERSION_RATE).toFixed(2)} ($
            {MINIMUM_AMOUNT_IN_USD.toFixed(2)})
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonPrimary]}
              onPress={createGroup}>
              <Text
                style={[styles.modalButtonText, styles.modalButtonTextPrimary]}>
                Create
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  listHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userItem: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedUser: {
    backgroundColor: '#E3F2FD',
  },
  userName: {
    fontSize: 16,
    color: 'black',
  },
  groupItem: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  groupMembers: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
  },
  modalButtonPrimary: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  modalButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  modalButtonTextPrimary: {
    color: 'white',
  },
  conversionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
});

export default Payment;
