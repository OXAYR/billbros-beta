import { Image, View } from 'react-native'
import Text from '../../../Components/Text'
import React from 'react'
import { styles } from './style'
import Button from '../../../Components/Button'
import { colors } from '../../../Constants'

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <Image resizeMode='center' style={styles.image} source={require('../../../../assets/images/welcome_logo.png')} />
      <Text style={styles.welcomeText}>Welcome to <Text style={styles.payperText}>Bill <Text style={{ color: colors.black }}>Bros</Text></Text></Text>
      <Button
        onPress={() => navigation.navigate('SignUp')}
        style={styles.btn} title={'Create New account'}
        btnTitleStyle={styles.btnText}>
      </Button>
      <Text onPress={() => navigation.navigate('SignIn')} style={styles.alreadyText}>I already have an account</Text>
    </View>
  )
}

export default Welcome