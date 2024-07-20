import {View, Keyboard} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import Header from '../../../Components/Header';
import Text from '../../../Components/Text';
import InputField from '../../../Components/InputField';
import Button from '../../../Components/Button';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {setToken, setUser} from '../../../Redux/reducer';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const moveToSignUpScreen = () => {
    setEmailError('');
    setPasswordError('');
    setEmail('');
    setPassword('');
    navigation.navigate('SignUp');
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!email && !password) {
        setLoading(false);
        console.log('ERROR1');
        setEmailError('Please enter email');
        setPasswordError('Please enter password');
        return;
      }

      if (
        (email && !emailRegex.test(email)) ||
        (password && !passwordRegex.test(password))
      ) {
        console.log('ERROR2');
        setLoading(false);
        setEmailError('Invalid Email Pattern');
        setPasswordError(
          'Must contain 1 Capital letter, 1 special character, and 1 number; Password must be at least 8 characters long',
        );

        return;
      }

      if (!email) {
        console.log('ERROR3');
        setLoading(false);
        setEmailError('Please enter email');
        return;
      }

      if (!password) {
        console.log('ERROR4');
        setLoading(false);
        setPasswordError('Please enter password');
        return;
      }

      const userLogined = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      setEmail('');
      setPassword('');
      setEmailError('');
      setPasswordError('');
      Keyboard.dismiss();
      setLoading(false);

      // Fetch details of the currently logged-in user
      const currentUser = auth().currentUser;

      // You can then access the user's details
      if (currentUser) {
        const uid = currentUser.uid;
        console.log('HOME UID', uid);
        const userRef = firestore().collection('users').doc(uid);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          console.log('User data from Firestore:', userData);

          dispatch(setUser(userData));
          dispatch(setToken(userLogined.user.uid));
        } else {
          console.log('No user data found in Firestore.');
        }
      } else {
        console.log('No user signed in.');
      }
      setLoading(false);

      console.log('USER LOGINED', userLogined);

      //EMAIL VERIFICATION
      // navigation.navigate('Home');
      // if (userLogined?.user?.emailVerified) {
      //   setEmail('');
      //   setPassword('');
      //   setEmailError('');
      //   setPasswordError('');
      //   Keyboard.dismiss()
      //   // navigation.navigate('Otp');

      //   // dispatch(setToken(userLogined))
      //   // dispatch(setUser(userLogined))

      //   // navigation.navigate('Home');
      // } else {
      //   setEmailError('Your Email is not verified. Please check your email -> Spam Section');
      //   auth().currentUser.sendEmailVerification();
      //   navigation.navigate('VerifyEmail', { email: email, password: password })
      // }
    } catch (error) {
      setLoading(false);
      console.log('ERROR', error.message, error.code);

      if (error.code === 'auth/invalid-email') {
        setEmailError('That email address is invalid!');
        console.log('That email address is invalid!');
      } else if (error.code === 'auth/wrong-password') {
        setPasswordError('That password is wrong');
        console.log('That password is wrong');
      } else if (error.code === 'auth/user-not-found') {
        console.log("User doesn't have an account!");
        setEmailError("User doesn't have an account!");
        setPassword('');

        setTimeout(() => {
          setLoading(false);
          setEmail('');
          setPassword('');
          setEmailError('');
          setPasswordError('');
          navigation.navigate('SignUp');
        }, 3000);
      } else {
        console.log('Sign-in failed:', error.message, error);
        setEmailError('Invalid credentials');
        setPasswordError('Invalid credentials');
      }
    }
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleEmail = async input => {
    setEmail(input);
    setEmailError('');
  };

  const validateEmail = () => {
    if (email) {
      if (!emailRegex.test(email)) {
        setEmailError('Invalid Email Pattern');
      } else {
        setEmailError('');
      }
    } else {
      setEmailError('');
    }
  };

  //Password Logic
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,}$/;
  const handlePassword = input => {
    setPassword(input);
    setPasswordError('');
    setShowPasswordIcon(false);
  };

  const validatePassword = () => {
    if (password) {
      if (!passwordRegex.test(password)) {
        setPasswordError(
          'Must contain 1 Capital letter, 1 special character, and 1 number',
        );
      } else {
        setPasswordError('');
        setShowPasswordIcon(true);
      }
    } else {
      setPasswordError('');
      setShowPasswordIcon(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header onPress={() => navigation.goBack()} />
      <Text style={styles.loginText}>Login to Bill Bros</Text>
      <Text style={styles.loginDescp}>
        Login to Bill Bros is your pathway to a seamless digital experience.
      </Text>

      <InputField
        leftIcon={require('../../../../assets/images/mail_icon.png')}
        numberOfLines={1}
        placeholder="Enter email"
        label="Email"
        onChangeText={handleEmail}
        onBlur={validateEmail}
        error={emailError}
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
        onBlur={validatePassword}
        onChangeText={handlePassword}
        error={passwordError}
      />
      <View style={styles.textsView}>
        <Text
          onPress={() => navigation.navigate('Otp')}
          style={styles.forgotText}>
          Forgot Password
        </Text>
        <Text style={styles.privacyText}>Privacy Policy</Text>
      </View>

      <Button
        onPress={() => handleLogin()}
        loading={loading}
        style={styles.btn}
        title="Login"
        btnTitleStyle={styles.btnText}></Button>

      <Button
        onPress={() => moveToSignUpScreen()}
        style={styles.btnWallet}
        title="Sign Up"
        btnTitleStyle={styles.btnTextWallet}></Button>
    </View>
  );
};

export default SignIn;
