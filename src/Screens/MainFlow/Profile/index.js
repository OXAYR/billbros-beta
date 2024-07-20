import {Image, Pressable, View} from 'react-native';
import React from 'react';
import Header from '../../../Components/Header';
import Text from '../../../Components/Text';
import {styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {setToken, setUser} from '../../../Redux/reducer';
import {firebase} from '@react-native-firebase/auth';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  // const name = useSelector((state) => state.reducer.user)
  // console.log('NAME', name);
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      dispatch(setToken(null));
      dispatch(setUser(null));
      console.log('User logged out successfully');

      // You can navigate to another screen or perform any other action after logout
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };
  const name = useSelector(state => state.reducer.user);
  // console.log('NAME', name.username);
  return (
    <View style={styles.mainContainer}>
      <Header onPress={() => navigation.goBack()} title="Profile" />
      <Image
        style={styles.authIcon}
        resizeMode="center"
        source={require('../../../../assets/images/auth_icon.png')}
      />
      <Text style={styles.detailsText}>User Detail's</Text>
      <View style={styles.userView}>
        <Image
          resizeMode="center"
          style={styles.userImage}
          source={require('../../../../assets/images/person_icon.png')}
        />
        <View style={styles.userDetail}>
          <Text numberOfLines={1} style={styles.userName}>
            {name?.username}
          </Text>
          <Text numberOfLines={1} style={styles.userNumber}>
            {name?.phoneNumber}
          </Text>
        </View>
      </View>
      <View style={styles.logoutViewOuter}>
        <Pressable onPress={() => handleLogout()} style={styles.logoutView}>
          <Image
            style={styles.logoutIcon}
            resizeMode="center"
            source={require('../../../../assets/images/logout_icon.png')}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;
