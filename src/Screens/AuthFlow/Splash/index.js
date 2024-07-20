import { Image, StatusBar, View } from 'react-native'
import Text from '../../../Components/Text'
import React, { useEffect } from 'react'
import { styles } from './style'
import { colors } from '../../../Constants'

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Welcome')
    }, 3000)
  })
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={colors.primary} />
      {/* <Image style={styles.image} resizeMode='center' source={require('../../../../assets/images/logo.png')} /> */}
      <Text style={styles.headText}>Bill <Text style={{ color: colors.black }}>Bros</Text></Text>
      <Text style={styles.paymentText}>The payment application</Text>
    </View>
  )
}

export default Splash