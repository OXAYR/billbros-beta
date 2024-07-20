import { Image, View } from 'react-native'
import React from 'react'
import Button from '../../../Components/Button'
import Text from '../../../Components/Text'
import { styles } from './style'
import Header from '../../../Components/Header'
import { colors } from '../../../Constants'
import auth from '@react-native-firebase/auth';
import { useRoute } from '@react-navigation/native'

const VerifyEmail = ({ navigation }) => {
    const route = useRoute();
    const { email, password } = route.params;
    console.log('PARAMS', route.params);

    const handleVerification = async () => {
        const userLogined = await auth().signInWithEmailAndPassword(email, password);

        console.log('User is signed in!', userLogined);
        if (userLogined?.user?.emailVerified) {
            navigation.navigate('Otp');

            // navigation.navigate('Home');
        } else {
            setEmailError('Your Email is not verified. Please check your email -> Spam Section');
            setTimeout(() => {
                auth().currentUser.sendEmailVerification();
                navigation.navigate('VerifyEmail')
            }, 3000)

        }

    }
    return (
        <><View style={{ backgroundColor: colors.white }}>
            <Header
            // onPress={() => navigation.goBack()} 
            />
        </View><View style={styles.mainContainer}>
                <Image style={styles.verifyImage} resizeMode='center' source={require('../../../../assets/images/verify_email_icon.png')} />
                {/* <Image style={styles.verifyImage} resizeMode='center' source={require('../../../../assets/images/verified_email_icon.png')} /> */}

                <Text style={styles.headText}>Verify your email</Text>

                {/* <Text style={styles.headText}>You’re verified!</Text> */}

                <Text style={styles.verifyDescp}>We sent a verification email to. Please tap the link inside that email to continue</Text>

                {/* <Text style={styles.verifyDescp}>Now you can fund your account so you’re ready to invest in crypto</Text> */}


                <Button
                    onPress={() => handleVerification()}
                    style={styles.btn} title='Continue'
                    btnTitleStyle={styles.btnText}>
                </Button>

                {/* <Button
                    onPress={() => navigation.navigate('SignUp')}
                    style={styles.btn} title='Let’s go'
                    btnTitleStyle={styles.btnText}>
                </Button> */}
            </View></>
    )
}

export default VerifyEmail