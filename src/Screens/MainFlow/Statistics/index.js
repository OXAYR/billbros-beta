import {Image, ScrollView, View} from 'react-native';
import React from 'react';
import Button from '../../../Components/Button';
import Text from '../../../Components/Text';
import {styles} from './style';
import Header from '../../../Components/Header';
import PieChart from 'react-native-pie-chart';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {colors} from '../../../Constants';
import FlatlistComponent from '../../../Components/FlatList';

const Statistics = ({navigation}) => {
  const transactions = [
    {
      name: 'Salary',
      icon: require('../../../../assets/images/green_cash.png'),
      time: '5:05 PM - Aug 22, 2029',
      price: 'Rs. 250,000',
      color: 'green',
    },
    {
      name: 'Wifi Bill',
      icon: require('../../../../assets/images/wifi_icon.png'),
      time: '5:05 PM - Aug 22, 2029',
      price: 'Rs. 2,500',
      color: 'red',
    },
    {
      name: 'Electricity Bill',
      icon: require('../../../../assets/images/person_icon.png'),
      time: '5:05 PM - Aug 22, 2029',
      price: 'Rs. 28,500',
      color: 'red',
    },
    {
      name: 'Card Bill',
      icon: require('../../../../assets/images/green_cash.png'),
      time: '5:05 PM - Aug 22, 2029',
      price: 'Rs. 32,700',
      color: 'green',
    },
  ];

  const coloredDots = [
    {
      name: 'Salary',
      icon: require('../../../../assets/images/midGreenDot.png'),
    },
    {
      name: 'Food & Drink',
      icon: require('../../../../assets/images/blueDot.png'),
    },
    {
      name: 'E-Wallet',
      icon: require('../../../../assets/images/greenDot.png'),
    },
    {
      name: 'Internet',
      icon: require('../../../../assets/images/darkGreenDot.png'),
    },
    {
      name: 'Shopping',
      icon: require('../../../../assets/images/redDot.png'),
    },
  ];
  const widthAndHeight = widthPercentageToDP(50);
  const series = [100, 100, 100, 100, 100];
  const sliceColor = [
    colors.chartBlue,
    colors.chartRed,
    colors.chartMidGreen,
    colors.chartDarkGreen,
    colors.chartGreen,
  ];
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}>
      <Header onPress={() => navigation.goBack()} title="Statistics" />
      <View style={styles.dateView}>
        <Image
          style={styles.calendarIcon}
          resizeMode="center"
          source={require('../../../../assets/images/calendar_icon.png')}
        />
        <Text style={styles.dateText}>November 19,2024</Text>
      </View>

      <View style={styles.chartView}>
        <View style={styles.innerChartView}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.75}
            coverFill={'#FFF'}
          />
        </View>
        <View style={styles.detailView}>
          {coloredDots.map(item => (
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.dotIcon}
                resizeMode="center"
                source={item.icon}
              />
              <Text style={styles.detailName}>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.incomeView}>
        <View style={styles.incomeExpenseView}>
          <Image
            style={styles.moneyIcon}
            resizeMode="center"
            source={require('../../../../assets/images/money_icon.png')}
          />
          <View style={styles.innerIncomeExpenseView}>
            <Text style={styles.price}>Rs. 50,789</Text>
            <Text style={styles.incomeText}>Income</Text>
          </View>
        </View>

        <View style={styles.incomeExpenseView2}>
          <Image
            style={styles.moneyIcon}
            resizeMode="center"
            source={require('../../../../assets/images/calculator_icon.png')}
          />
          <View style={styles.innerIncomeExpenseView}>
            <Text style={styles.price}>Rs. 52,789</Text>
            <Text style={styles.incomeText}>Expense</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonView}>
        <Button
          onPress={() => navigation.navigate('Budget')}
          btnTitleStyle={styles.incomeBtnText}
          style={styles.incomeButton}
          title="Budget"
        />
        <Button
          onPress={() => navigation.navigate('Trends')}
          btnTitleStyle={styles.expenseBtnText}
          style={styles.expenseButton}
          title="Trends"
        />
      </View>

      <View style={styles.transactionsView}>
        <Text style={styles.transactionsText}>Transactions</Text>
        <Text style={styles.viewAllText}>View All</Text>
      </View>
      <FlatlistComponent data={transactions} />
    </ScrollView>
  );
};

export default Statistics;
