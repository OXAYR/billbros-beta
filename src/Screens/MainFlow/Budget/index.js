/** @format */

import Header from '../../../Components/Header';

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import {colors} from '../../../Constants';

const screenWidth = Dimensions.get('window').width;

const Budget = ({navigation}) => {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Static data for chart
  const data = [
    {
      name: 'Restaurant',
      population: 1000, // Example expense, adjust or add dynamic handling as needed
      color: '#ff6f61',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Movie',
      population: 500, // Example expense, adjust or add dynamic handling as needed
      color: '#6a5acd',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Utilities',
      population: 1500, // Example expense, adjust or add dynamic handling as needed
      color: '#ffa500',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Savings',
      population: income ? parseFloat(income) - (1000 + 500 + 1500) : 0, // Example calculation
      color: '#28a745',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:5000/predict', {
        method: 'POST',
        body: {
          income: 1000,
          expenses: 20,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPrediction(data.predicted_savings);
    } catch (error) {
      Alert.alert('Error', response.json());
      console.error('Error fetching prediction:', error);
      Alert.alert('Error', 'Failed to fetch prediction data.');
    } finally {
      setLoading(false);
    }
  };

  const totalExpenses = 1000 + 500 + 1500;
  const savings = income ? parseFloat(income) - totalExpenses : 0;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Header onPress={() => navigation.goBack()} title="Budget Prediction" />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your monthly income"
          keyboardType="numeric"
          value={income}
          onChangeText={setIncome}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your total expenses"
          keyboardType="numeric"
          value={expenses}
          onChangeText={setExpenses}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Get Prediction"
          onPress={handlePredict}
          style={{backgroundColor: colors.primary}}
        />
      </View>

      <View style={styles.dataContainer}>
        <View style={styles.card}>
          <Text style={styles.label}>Monthly Income</Text>
          <Text style={styles.value}>${income}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Total Expenses</Text>
          <Text style={styles.value}>${expenses}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Savings</Text>
          <Text style={styles.value}>${savings}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Prediction</Text>
          <Text style={styles.value}>
            {loading
              ? 'Loading...'
              : `$${prediction ? prediction.toFixed(2) : 'Error'}`}
          </Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Prediction Summary</Text>
        <PieChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Save Prediction" onPress={() => {}} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    backgroundColor: colors.primary,
  },
  dataContainer: {
    width: '100%',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});

export default Budget;
