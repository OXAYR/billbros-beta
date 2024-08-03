import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../../../Components/Text';
import {styles} from './style';
import FlatlistComponent from '../../../Components/FlatList';
import Card from '../../../Components/Card';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';
import {setToken, setUser} from '../../../Redux/reducer';
import firestore from '@react-native-firebase/firestore';

const Home = ({navigation}) => {
  const focused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
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

  // const fetchCurrentUser = async () => {
  //   // Fetch details of the currently logged-in user
  //   const currentUser = auth().currentUser;

  //   // You can then access the user's details
  //   if (currentUser) {
  //     const uid = currentUser.uid;
  //     console.log('HOME UID', uid);
  //     const userRef = firestore().collection('users').doc(uid);
  //     const userDoc = await userRef.get();

  //     if (userDoc.exists) {
  //       const userData = userDoc.data();
  //       console.log('User data from Firestore:', userData);
  //       dispatch(setUser(userData.username))
  //       // Do something with userData
  //     } else {
  //       console.log('No user data found in Firestore.');
  //     }
  //   } else {
  //     console.log('No user signed in.');
  //   }
  // }
  // const name = useSelector((state) => state?.reducer?.user);
  // console.log('NAME welcome screen', name)

  // useEffect(() => {
  //   focused && fetchCurrentUser()
  // }, [focused])

  const buttons = [
    {
      name: 'Tutorial',
      icon: require('../../../../assets/images/tutorial_icon.png'),
    },
    {
      name: 'Send Money',
      icon: require('../../../../assets/images/send_money_icon.png'),
    },
    {
      name: 'Payment',
      icon: require('../../../../assets/images/payment_icon.png'),
    },
    {
      name: 'Request',
      icon: require('../../../../assets/images/request_icon.png'),
    },
  ];
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
  console.log('NAME', name);
  const [cardData, setCardData] = useState(null);
  const [userCards, setUserCards] = useState([]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}>
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

      {userCards.map((card, index) => (
        <Card
          key={index}
          cardNumber={card.number}
          cardHolderName={card.name}
          expiryDate={card.expiry}
        />
      ))}

      <View style={styles.transactionsView}>
        <Text style={styles.transactionsText}>Transactions</Text>
        <Text style={styles.viewAllText}>View All</Text>
      </View>
      <FlatlistComponent data={transactions} />
    </ScrollView>
  );
};

export default Home;
