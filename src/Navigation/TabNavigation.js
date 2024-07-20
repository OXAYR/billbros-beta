import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Statistics from '../Screens/MainFlow/Statistics';
import Home from '../Screens/MainFlow/Home';
import MyCard from '../Screens/MainFlow/MyCard';
import Profile from '../Screens/MainFlow/Profile';
import { colors, fontFamily, fontSize } from '../Constants';
import Pay from '../Screens/MainFlow/Pay';

const TabNavigation = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.lightGray,
                tabBarAllowFontScaling: false,
                headerTitleAllowFontScaling: true,
                tabBarHideOnKeyboard: true,

                tabBarLabelStyle: {
                    fontSize: fontSize.fontSize3point5,
                    fontFamily: fontFamily.semiBold,
                    marginBottom: hp(1),
                    textAlign: 'center',
                    alignSelf: 'center',
                    marginTop: hp(0.5)
                },

                tabBarStyle: {
                    height: hp(10),
                    borderTopColor: colors.gray,
                    fontFamily: fontFamily.regular,
                    borderTopWidth: hp(0.1),

                }
            })}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={styles.iconStyle}
                            resizeMode='center'
                            source={
                                focused
                                    ? require('../../assets/images/home_focused.png')
                                    : require('../../assets/images/home_unfocused.png')
                            }
                        />
                    ),
                }}
            />
            <Tab.Screen
                name='Statistics'
                component={Statistics}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={styles.iconStyle}
                            resizeMode='center'
                            source={
                                focused
                                    ? require('../../assets/images/stats_focused.png')
                                    : require('../../assets/images/stats_unfocused.png')
                            }
                        />
                    ),
                }}
            />
            <Tab.Screen
                name='Pay'
                component={Pay}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={styles.iconStylePay}
                            resizeMode='center'
                            source={
                                focused
                                    ? require('../../assets/images/send_icon.png')
                                    : require('../../assets/images/send_icon.png')
                            }
                        />
                    ),
                }}
            />
            <Tab.Screen
                name='MyCard'
                component={MyCard}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={styles.iconStyle}
                            resizeMode='center'
                            source={
                                focused
                                    ? require('../../assets/images/card_focused.png')
                                    : require('../../assets/images/card_unfocused.png')
                            }
                        />
                    ),
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={styles.iconStyle}
                            resizeMode='center'
                            source={
                                focused
                                    ? require('../../assets/images/profile_focused.png')
                                    : require('../../assets/images/profile_unfocused.png')
                            }
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    iconStyle: {
        height: hp(4),
        width: wp(9),
        marginTop: hp(1.5),
        // backgroundColor:'red'
    },
    iconStylePay: {
        height: hp(10),
        width: wp(30),
        marginBottom:hp(4)
        // marginTop: hp(1.5),
        // backgroundColor:'red'
    },
})

export default TabNavigation;