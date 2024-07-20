import { View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { styles } from './style';
import Header from '../../../Components/Header';
import Button from '../../../Components/Button';
import Text from '../../../Components/Text'
import { colors } from '../../../Constants';
import InputField from '../../../Components/InputField';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Otp = ({ navigation }) => {
    const CELL_COUNT = 6;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const [phoneNo, setPhoneNo] = useState('')
    // const [otpInput, setOtpInput] = useState('')
    const [confirmData, setConfirmData] = useState('')

    const [hideView, setHideView] = useState(false)

    const [phoneNoError, setPhoneNoError] = useState('')

    const phoneRegex = /^(?:\+?92?(\d{9})|0?(\d{10}))$/;
    const validatePhoneNumber = () => {
        if (!phoneRegex.test(phoneNo)) {
            setPhoneNoError('The length of Phone number should be 11');
        }
        else {
            setPhoneNoError('')
        }
    };


    const sendOtp = async () => {
        const phoneSnapshot = await firestore().collection('users').where('phoneNumber', '==', phoneNo).get();
        if (!phoneSnapshot.empty) {
            const mobileNumber = '+92' + phoneNo
            const response = await auth().signInWithPhoneNumber(mobileNumber)
            setConfirmData(response)
            setHideView(true)
            console.log('Response of Send OTP Function...........', response);
        }
        else if (phoneNo.length < 10) {
            setPhoneNoError('Please enter number of length 11!')
        }
        else if (phoneNo.length < 12) {
            setPhoneNoError('Please register this number first!')
        }
    }

    const submitOtp = async () => {
        const response = await confirmData.confirm(value)
        console.log('YOUR NUMBER IS VERIFIED', response)
        navigation.navigate('Home')
    }

    return (
        <><View style={{ backgroundColor: colors.white }}>
            <Header
            // onPress={() => navigation.goBack()}
            />
        </View>
            <View style={styles.mainContainer}>
                <Text style={styles.authText}>Enter phone number for verification</Text>
                <Text style={styles.authDescp}>Enter the 11-digit phone number.</Text>
                <InputField
                    leftIcon={require('../../../../assets/images/person_icon.png')}
                    numberOfLines={1}
                    placeholder='Enter phone no.'
                    label='Phone No'
                    value={phoneNo}
                    onChangeText={(value) => setPhoneNo(value)}
                    onBlur={validatePhoneNumber}
                    keyboardType='number-pad'
                    error={phoneNoError}
                />
                <Button
                    onPress={() => sendOtp()}
                    style={styles.btn} title='Send Otp'
                    btnTitleStyle={styles.btnText}>
                </Button>

                {/* {hideView &&
                    <> */}
                        <Text style={styles.authText}>Enter authentication code</Text>
                        <Text style={styles.authDescp}>Enter the 7-digit code we just texted to your phone number.</Text>
                        <Text style={styles.verifyText}>Verification Code</Text>

                        <CodeField
                            ref={ref}
                            {...props} // Spread the props here
                            value={value}
                            onChangeText={(text)=>setValue(text)}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.cell}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <TextInput
                                    placeholder='-'
                                    placeholderTextColor={styles.placeholderTextColor}
                                    key={index}
                                    style={[styles.otpInput, isFocused && styles.otpInputFocus]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </TextInput>
                            )} />
                        <Button
                            onPress={() => submitOtp()}
                            style={styles.btn} title='Continue'
                            btnTitleStyle={styles.btnText}>
                        </Button>

                        <Text style={styles.resendText}>Resend Code</Text>

                    {/* </>} */}

            </View>

        </>

    )
}

export default Otp