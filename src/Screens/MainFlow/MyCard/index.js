import { View } from 'react-native'
import React from 'react'
import Card from '../../../Components/Card'
import { styles } from './style'
import Text from '../../../Components/Text'
import Header from '../../../Components/Header'

const MyCard = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <Header
        title='My Card'
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.cardsText}>Your Cards</Text>
      <Text style={styles.manageText}>Manage with Ease</Text>

      <Card />
    </View>
  )
}

export default MyCard