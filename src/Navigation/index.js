import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Splash from '../Screens/AuthFlow/Splash';
import SignUp from '../Screens/AuthFlow/SignUp';
import SignIn from '../Screens/AuthFlow/SignIn';
import Welcome from '../Screens/AuthFlow/Welcome';
import Otp from '../Screens/AuthFlow/Otp';
import VerifyEmail from '../Screens/AuthFlow/VerifyEmail';
import ForgotPassword from '../Screens/AuthFlow/ForgotPassword';
import TabNavigation from './TabNavigation';
import Payment from '../Screens/MainFlow/Payment';
import Chat from '../Screens/MainFlow/Chat';
import Budget from '../Screens/MainFlow/Budget';
import Trends from '../Screens/MainFlow/RecentTrends';

const StackNavigation = () => {
  const token = useSelector(state => state?.reducer?.token);
  console.log('Stack Token', token);
  return token ? <MainStack /> : <AuthStack />;
};
export default StackNavigation;

const AuthStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Otp"
        component={Otp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="tabnavigation">
      <Stack.Screen
        name="tabnavigation"
        component={TabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Budget"
        component={Budget}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Trends"
        component={Trends}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
