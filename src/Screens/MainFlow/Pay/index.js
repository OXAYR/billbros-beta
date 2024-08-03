import {
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {firebase} from '@react-native-firebase/auth';
import Button from '../../../Components/Button';
import Text from '../../../Components/Text';
import {styles} from './style';
import Header from '../../../Components/Header';
import {colors} from '../../../Constants';

const Pay = ({navigation}) => {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchGroups();
    fetchUsers();
  }, []);
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

  const renderGroups = () => (
    <View style={styles.groupsContainer}>
      <Text style={styles.groupsHeader}>Your Groups</Text>
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
          <Text style={styles.groupName}>{item.Name}</Text>
          <Text style={styles.groupMembers}>
            {item.participantIds.length} members
          </Text>
        </TouchableOpacity>
      ))}
      {groups.length === 0 && (
        <Text style={styles.emptyListText}>No groups found</Text>
      )}
    </View>
  );

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

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <Header onPress={() => navigation.goBack()} title="Pay" />
        <View style={styles.greenView}>
          <View style={styles.whiteView}>
            <Image
              style={styles.personIcon}
              resizeMode="center"
              source={require('../../../../assets/images/pay_person_icon.png')}
            />
            <Pressable onPress={() => navigation.navigate('Payment')}>
              <Text style={styles.priceText}>Create a Group Chat</Text>
              <Text style={styles.currentText}>
                to share bill among friends
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.transactionsView}>
          <Text style={styles.transactionsText}>Friends</Text>
          <Text
            onPress={() => navigation.navigate('Payment')}
            style={styles.viewAllText}>
            View All
          </Text>
        </View>
        <View style={styles.personView}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.addNewPersonContainer}>
              <Image
                style={styles.plusIcon}
                resizeMode="center"
                source={require('../../../../assets/images/plus_icon.png')}
              />
              <Text style={styles.addNewText}>Add new</Text>
            </TouchableOpacity>
            {users.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.personContainer}
                onPress={() => navigation.navigate('Payment')}>
                <Image
                  style={styles.profileIcon}
                  resizeMode="center"
                  source={
                    item.profileImage
                      ? {uri: item.profileImage}
                      : require('../../../../assets/images/person_icon.png')
                  }
                />
                <Text numberOfLines={1} style={styles.profileName}>
                  {item.username || 'No Name'}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {renderGroups()}
      </ScrollView>
    </View>
  );
};

export default Pay;
