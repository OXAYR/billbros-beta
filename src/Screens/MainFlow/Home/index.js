import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../../../Components/Text';
import {styles} from './style';
import FlatlistComponent from '../../../Components/FlatList';
import Card from '../../../Components/Card';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';

const Home = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [userCards, setUserCards] = useState([]);
  const [recentGroups, setRecentGroups] = useState([]);

  useEffect(() => {
    fetchRecentGroups();
    fetchUserCards();
  }, []);

  const fetchUserCards = async () => {
    const userId = auth().currentUser.uid;
    const userDoc = await firestore().collection('users').doc(userId).get();
    const userData = userDoc.data();
    if (userData && userData.cards) {
      setUserCards(userData.cards);
    }
  };

  const fetchRecentGroups = async () => {
    const currentUser = auth().currentUser.uid;
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
      console.log('Fetched groups in the home :', groupsData);
      setRecentGroups(groupsData);
    } else {
      console.error('No current user logged in');
    }
  };

  const transactions = [
    {
      name: 'Salary',
      icon: require('../../../../assets/images/green_cash.png'),
      time: '5:05 PM - Aug 22, 2029',
      price: 'Rs. 250,000',
      color: 'green',
    },
    {
      name: 'Wifi Bill',
      icon: require('../../../../assets/images/wifi_icon.png'),
      time: '5:05 PM - Aug 22, 2029',
      price: 'Rs. 2,500',
      color: 'red',
    },
    {
      name: 'Electricity Bill',
      icon: require('../../../../assets/images/person_icon.png'),
      time: '5:05 PM - Aug 22, 2029',
      price: 'Rs. 28,500',
      color: 'red',
    },
    {
      name: 'Card Bill',
      icon: require('../../../../assets/images/green_cash.png'),
      time: '5:05 PM - Aug 22, 2029',
      price: 'Rs. 32,700',
      color: 'green',
    },
  ];

  const name = useSelector(state => state.reducer.user);

  const renderTransactions = () => (
    <>
      <View style={styles.transactionsView}>
        <Text style={styles.transactionsText}>Transactions</Text>
        <Text style={styles.viewAllText}>View All</Text>
      </View>
      <FlatlistComponent data={transactions} />
    </>
  );

  const renderRecentChats = () => (
    <View style={styles.groupsContainer}>
      <Text style={styles.groupsHeader}>Your Groups</Text>
      {recentGroups.map((item, key) => (
        <TouchableOpacity
          key={key}
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
      {recentGroups.length === 0 && (
        <Text style={styles.emptyListText}>No groups found</Text>
      )}
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailView}>
          <View style={styles.morningView}>
            <Text style={styles.morningText}>Good morning,</Text>
            <Text style={styles.name}>
              {name?.username ? name?.username : 'User'} !
            </Text>
          </View>
          <View style={styles.profileView}>
            <Image
              resizeMode="center"
              style={styles.notificationIcon}
              source={require('../../../../assets/images/notification_icon.png')}
            />
            <TouchableOpacity
              style={styles.personIcon}
              onPress={() => navigation.navigate('Profile')}>
              <Image
                style={styles.personIcon}
                resizeMode="center"
                source={require('../../../../assets/images/person_icon.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {userCards?.length > 0 ? (
          userCards?.map((card, index) => (
            <Card
              key={index}
              cardNumber={card.number}
              cardHolderName={card.name}
              expiryDate={card.expiry}
            />
          ))
        ) : (
          <Card />
        )}

        {activeTab === 'transactions'
          ? renderTransactions()
          : renderRecentChats()}
      </ScrollView>
    </View>
  );
};

export default Home;
