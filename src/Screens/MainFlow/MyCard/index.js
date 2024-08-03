import {View, TouchableOpacity, Modal, StyleSheet, Alert} from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Card from '../../../Components/Card';
import {styles} from './style';
import Text from '../../../Components/Text';
import Header from '../../../Components/Header';
import {colors, fontSize} from '../../../Constants';

const MyCard = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cardData, setCardData] = useState(null);
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    fetchUserCards();
  }, []);

  const fetchUserCards = async () => {
    const userId = auth().currentUser.uid;
    const userDoc = await firestore().collection('users').doc(userId).get();
    const userData = userDoc.data();
    if (userData && userData.cards) {
      setUserCards(userData.cards);
    }
  };

  const handleCardInputChange = formData => {
    setCardData(formData);
  };

  const name = useSelector(state => state.reducer.user);
  const handleSubmit = async () => {
    if (cardData && cardData.valid) {
      try {
        const userId = auth().currentUser.uid;
        const newCard = {
          number: cardData.values.number,
          name: name?.username,
          expiry: cardData.values.expiry,
          type: cardData.values.type,
        };

        await firestore()
          .collection('users')
          .doc(userId)
          .update({
            cards: firestore.FieldValue.arrayUnion(newCard),
          });

        setUserCards([...userCards, newCard]);
        setModalVisible(false);
        Alert.alert('Success', 'Card added successfully');
      } catch (error) {
        console.error('Error adding card:', error);
        Alert.alert('Error', 'Failed to add card. Please try again.');
      }
    } else {
      Alert.alert('Invalid Card', 'Please enter valid card details');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header title="My Card" onPress={() => navigation.goBack()} />
      <Text style={styles.cardsText}>Your Cards</Text>
      <Text style={styles.manageText}>Manage with Ease</Text>

      {userCards.map((card, index) => (
        <Card
          key={index}
          cardNumber={card.number}
          cardHolderName={card.name}
          expiryDate={card.expiry}
        />
      ))}

      <TouchableOpacity
        style={modalStyles.addCardButton}
        onPress={() => setModalVisible(true)}>
        <Text style={modalStyles.addCardButtonText}>Add New Card</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalTitle}>Add New Card</Text>
            <CreditCardInput
              onChange={handleCardInputChange}
              requiresName
              labelStyle={modalStyles.inputLabel}
              inputStyle={modalStyles.input}
              validColor={'black'}
              invalidColor={'red'}
              placeholderColor={'darkgray'}
            />
            <View style={modalStyles.buttonContainer}>
              <TouchableOpacity
                style={[modalStyles.button, modalStyles.buttonCancel]}
                onPress={() => setModalVisible(false)}>
                <Text style={modalStyles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[modalStyles.button, modalStyles.buttonSubmit]}
                onPress={handleSubmit}>
                <Text style={modalStyles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const modalStyles = StyleSheet.create({
  addCardButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  addCardButtonText: {
    color: colors.white,
    fontSize: fontSize.fontSize4,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: fontSize.fontSize5,
    fontWeight: 'bold',
  },
  inputLabel: {
    color: 'black',
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: '45%',
  },
  buttonCancel: {
    backgroundColor: colors.gray,
  },
  buttonSubmit: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MyCard;
