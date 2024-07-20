import {ScrollView, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {styles} from './style';
import Header from '../../../Components/Header';
import Text from '../../../Components/Text';
import InputField from '../../../Components/InputField';
import Button from '../../../Components/Button';
import {colors} from '../../../Constants';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {useDispatch} from 'react-redux';
import {setToken, setUser} from '../../../Redux/reducer';

const SignUp = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [phoneNoError, setPhoneNoError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    setLoading(true);
    // const defaultImage = require('../../../assets/images/chill.jpg')
    // const userId = uuid.v4()

    try {
      if (email.length > 0 && password.length > 8) {
        const userSignUp = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        const userId = userSignUp.user.uid;

        await firestore().collection('users').doc(userId).set({
          email: email,
          username: username,
          phoneNumber: phoneNo,
          userId: userId,
          profileImage: null,
        });
        //Email Verification to the email you have entered
        // auth().currentUser.sendEmailVerification()
        // dispatch(setToken(userId))
        // dispatch(setUser(userSignUp))
        console.log('User is Signed UP!', userSignUp);
      } else {
        setLoading(false);
        setEmailError('Please enter email');
        setPassword('Please enter password');
      }
      setEmail('');
      setPassword('');
      setUsername('');
      setPhoneNo('');

      setEmailError('');
      setPasswordError('');
      setUsernameError('');
      // setAddressError('')
      setPhoneNoError('');
      // setConfirmPasswordError('')
      // Navigate to the Home screen
      setLoading(false);
      navigation.navigate('SignIn');
    } catch (error) {
      setLoading(false);
      console.log('ERROR', error.message);

      if (error.code === 'auth/email-already-in-use') {
        setEmailError('That email address is already in use!');
        console.log('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        console.log("User doesn't have an account!");
        setEmailError("User doesn't have an account!");
        setPassword('');

        setTimeout(() => {
          setEmail('');
          setPassword('');
          setEmailError('');
          setPasswordError('');
          navigation.navigate('SignUp');
        }, 2000);
      } else if (error.code === 'auth/operation-not-allowed') {
        setPasswordError('This operation is notallowed');
        console.log('That password is wrong');
      } else if (error.code === 'auth/weak-password') {
        setPasswordError('That password is weak');
        console.log('That password is wrong');
      } else {
        // Handle other errors here, including 'auth/invalid-credential'
        console.log('Sign-in failed:', error.message);
        setEmailError('Invalid credentials');
        setPasswordError('Invalid credentials');

        // Navigate to the SignUp screen or handle the error as needed
        // ...
      }
    }
  };

  //Email Logic
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleEmail = async input => {
    setEmail(input);
    setEmailError(false);

    const emailSnapshot = await firestore()
      .collection('users')
      .where('email', '==', input)
      .get();
    if (!emailSnapshot.empty) {
      setEmailError('That email address is already in use!');
    }
  };

  const validateEmail = () => {
    if (!emailRegex.test(email)) {
      setEmailError('Invalid Email Pattern');
    }
  };

  //Phone number logic
  const phoneRegex = /^\d{11}$/;
  const handlePhoneNo = async input => {
    setPhoneNo(input);
    // setPhoneNoError(false);
    const phoneSnapshot = await firestore()
      .collection('users')
      .where('phoneNumber', '==', input)
      .get();
    if (!phoneSnapshot.empty) {
      setPhoneNoError('That phone number is already in use!');
    }
  };
  const validatePhoneNumber = () => {
    if (!phoneRegex.test(phoneNo)) {
      setPhoneNoError('The length of Phone number should be 11');
    }
  };
  //Password Logic
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,}$/;
  const handlePassword = input => {
    setPassword(input);
    // setPasswordError(false);
  };
  const validatePassword = () => {
    if (password) {
      if (!passwordRegex.test(password)) {
        setPasswordError(
          'Must contain 1 Capital letter, 1 special character, and 1 number',
        );
        setShowPasswordIcon(false);
      } else {
        setPasswordError('');
        setShowPasswordIcon(true);
      }
    } else {
      setPasswordError('');
      setShowPasswordIcon(false);
    }
  };

  //Username Logic
  const handleUsername = async input => {
    setUsername(input); // Update state immediately when the input changes
    // setUsernameError(false); // Reset the username error

    // const usernameSnapshot = await firestore().collection('users').where('username', '==', input).get();
    // if (!usernameSnapshot.empty) {
    //   setUsernameError('Username is already taken');
    // }
  };

  const validateUsername = () => {
    if (username.length === 0) {
      // console.log('Hello')
      setUsernameError('Please Enter First Name');
    } else {
      setUsernameError('');
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}>
      <Header onPress={() => navigation.goBack()} />
      <Text style={styles.loginText}>Create your account</Text>
      <Text style={styles.loginDescp}>
        User-friendly solutions. Join us now to unlock a brighter online
        journey.
      </Text>

      <InputField
        leftIcon={require('../../../../assets/images/person_icon.png')}
        numberOfLines={1}
        placeholder="Enter first name"
        label="First Name"
        onChangeText={handleUsername}
        onBlur={validateUsername}
        error={usernameError}
      />

      <InputField
        leftIcon={require('../../../../assets/images/mail_icon.png')}
        numberOfLines={1}
        placeholder="Enter email"
        label="Email"
        keyboardType={'email-address'}
        onChangeText={handleEmail}
        onBlur={validateEmail}
        error={emailError}
      />

      <InputField
        leftIcon={require('../../../../assets/images/mobile_icon.png')}
        numberOfLines={1}
        placeholder="Enter phone no."
        label="Phone"
        keyboardType={'number-pad'}
        error={phoneNoError}
        onChangeText={handlePhoneNo}
        onBlur={validatePhoneNumber}
      />

      <InputField
        leftIcon={require('../../../../assets/images/lock_icon.png')}
        numberOfLines={1}
        placeholder="Enter password"
        label="Password"
        secureTextEntry={true}
        rightIcon={
          showPasswordIcon
            ? require('../../../../assets/images/tic_icon.png')
            : null
        }
        onChangeText={handlePassword}
        error={passwordError}
        onBlur={validatePassword}
      />
      <View style={styles.checkBoxView}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
          tintColors={{true: 'green', false: 'gray'}}
          boxType={'square'}
          onAnimationType={'bounce'}
          offAnimationType={'fill'}
          // onChange={ }
          // onValueChange={ }
          // value={false}  //current value of box will be falsed
        />
        <Text
          style={[
            styles.agreeText,
            {color: toggleCheckBox ? colors.gray : 'red'},
          ]}>
          I certify that I am 18 years of age or older, and I agree to the{' '}
          <Text style={{color: colors.darkGreen}}>User Agreement</Text> and{' '}
          <Text style={{color: colors.darkGreen}}>Privacy Policy</Text>
        </Text>
      </View>

      <Button
        onPress={() => {
          if (toggleCheckBox) {
            handleSignUp();
          }
        }}
        loading={loading}
        style={styles.btn}
        title="Continue"
        btnTitleStyle={styles.btnText}></Button>
    </ScrollView>
  );
};

export default SignUp;
