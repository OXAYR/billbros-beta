/** @format */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {BarChart, LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import Header from '../../../Components/Header';
import {colors} from '../../../Constants';

const screenWidth = Dimensions.get('window').width;

const Trends = ({navigation}) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=true',
        );
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Data for BarChart
  const barChartData = {
    labels: cryptoData.map(crypto => crypto.name),
    datasets: [
      {
        data: cryptoData.map(crypto => crypto.market_cap / 1e9), // Market cap in billions
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Header onPress={() => navigation.goBack()} title="Recent Trends" />

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Market Cap Comparison</Text>
        <BarChart
          data={barChartData}
          width={screenWidth - 40} // Adjust width for the card
          height={220} // Adjust height for the chart
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(71, 116, 3, ${opacity})`,
            style: {
              borderRadius: 12,
            },
          }}
          style={styles.barChart}
        />
      </View>

      <View style={styles.dataContainer}>
        {cryptoData.map(crypto => (
          <View key={crypto.id} style={styles.card}>
            <Text style={styles.name}>
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </Text>
            <Text style={styles.price}>${crypto.current_price.toFixed(2)}</Text>
            <Text style={styles.change}>
              24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%
            </Text>
            <View style={styles.chartContainer}>
              <LineChart
                data={{
                  labels: Array(crypto.sparkline_in_7d.price.length).fill(''),
                  datasets: [
                    {
                      data: crypto.sparkline_in_7d.price,
                      color: (opacity = 1) => `rgba(71, 116, 3,  ${opacity})`, // Line color
                      strokeWidth: 2,
                    },
                  ],
                }}
                width={screenWidth - 40} // Adjust width for the card
                height={100} // Adjust height for the chart
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(71, 116, 3, ${opacity})`,
                  style: {
                    borderRadius: 12,
                  },
                }}
                bezier
                style={styles.lineChart}
              />
            </View>
          </View>
        ))}
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#e0f7fa',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    elevation: 3,
  },
  chartContainer: {
    width: '100%',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  barChart: {
    borderRadius: 12,
    overflow: 'hidden', // Ensures chart doesn’t overflow the container
  },
  dataContainer: {
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    elevation: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    color: '#4caf50',
    marginBottom: 5,
  },
  change: {
    fontSize: 16,
    color: '#f44336',
    marginBottom: 10,
  },
  chartContainer: {
    marginTop: 10,
    overflow: 'hidden', // Ensures chart doesn’t overflow
  },
  lineChart: {
    borderRadius: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

export default Trends;
