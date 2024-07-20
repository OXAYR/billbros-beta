import { View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import Header from '../../../Components/Header'
import Text from '../../../Components/Text'
import InputField from '../../../Components/InputField'
import Button from '../../../Components/Button'
import { colors } from '../../../Constants'
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const handleEmail = async (input) => {
        setEmail(input);
        setEmailError(false);
    };

    const validateEmail = () => {
        if (!emailRegex.test(email)) {
            setEmailError('Invalid Email Pattern');
        }
        setEmailError('')
    };

    const handleForgotPassword = async () => {
        try {
            if (email) {
                const checkEmail = await firebase.auth().fetchSignInMethodsForEmail(email);
                const response = auth().sendPasswordResetEmail(email)
                Alert.alert('Password Reset email send successfully!')
                // console.log('Forgot Password Response', response);
                // console.log('Forgot Password Check Email', checkEmail);
            }
            else {
                setEmailError('Please enter email first !')
            }

        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                setEmailError('That email address is invalid!');
            }

        }

    }
    return (
        <><View style={{ backgroundColor: colors.white }}>
            <Header
                onPress={() => navigation.goBack()} />
        </View><View style={styles.mainContainer}>
                <Text style={styles.loginText}>Forgot Password</Text>
                <Text style={styles.loginDescp}>Re-Login to Bill Bros for seamless digital experience.</Text>

                <InputField
                    leftIcon={require('../../../../assets/images/mail_icon.png')}
                    numberOfLines={1}
                    placeholder='Enter email'
                    label='Email'
                    onChangeText={handleEmail}
                    onFocus={validateEmail}
                    error={emailError}
                />

                <Button
                    onPress={() => navigation.navigate('SignUp')}
                    style={styles.btn} title='Send'
                    btnTitleStyle={styles.btnText}>
                </Button>


            </View></>
    )
}

export default ForgotPassword