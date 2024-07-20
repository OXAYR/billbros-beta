import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Button from '../../../Components/Button';
import Text from '../../../Components/Text';
import {styles} from './style';
import Header from '../../../Components/Header';
import {colors} from '../../../Constants';

const Pay = ({navigation}) => {
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

  const person = [
    {
      name: 'Add new',
      icon: require('../../../../assets/images/plus_icon.png'),
      color: colors.primary,
    },
    {
      name: 'Babrak',
      icon: require('../../../../assets/images/person_icon.png'),
    },
    {
      name: 'Uzair',
      icon: require('../../../../assets/images/person_icon.png'),
    },
    {
      name: 'Ali',
      icon: require('../../../../assets/images/person_icon.png'),
    },
    {
      name: 'Pasha',
      icon: require('../../../../assets/images/person_icon.png'),
    },
  ];
  return (
    <View style={styles.mainContainer}>
      <Header onPress={() => navigation.goBack()} title="Pay" />
      <View style={styles.greenView}>
        <View style={styles.whiteView}>
          <Image
            style={styles.personIcon}
            resizeMode="center"
            source={require('../../../../assets/images/pay_person_icon.png')}
          />
          <View>
            <Text style={styles.priceText}>Rs. 50,789</Text>
            <Text style={styles.currentText}>Current Balance</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonsView}>
        {buttons.map((button, index) => (
          <TouchableOpacity key={index} style={{alignItems: 'center'}}>
            <Image source={button.icon} style={styles.buttonsIcon} />
            <Text style={styles.buttonsText}>{button.name}</Text>
          </TouchableOpacity>
        ))}
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
        {person.map(item => (
          <View>
            <Image
              style={[item.color ? styles.plusIcon : styles.profileIcon]}
              resizeMode="center"
              source={item.icon}
            />
            <Text
              numberOfLines={1}
              style={item.color ? styles.addNewText : styles.profileName}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Pay;
