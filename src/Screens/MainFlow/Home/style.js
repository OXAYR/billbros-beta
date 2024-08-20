import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors, fontFamily, fontSize, radius} from '../../../Constants';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  detailView: {
    flexDirection: 'row',
    height: hp(8),
    justifyContent: 'space-between',
    width: wp(90),
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(3),
  },
  morningView: {
    width: wp(45),
    height: hp(8),
    justifyContent: 'center',
  },
  morningText: {
    color: colors.black,
    fontFamily: fontFamily.medium,
    textAlign: 'left',
    fontSize: fontSize.fontSize3point5,
  },
  name: {
    color: colors.darkGreen,
    fontFamily: fontFamily.bold,
    fontSize: fontSize.fontSize4point5,
    textAlign: 'left',
  },
  profileView: {
    width: wp(45),
    height: hp(8),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  notificationIcon: {
    height: hp(5),
    width: wp(6),
    alignSelf: 'center',
    marginHorizontal: wp(3),
  },
  personIcon: {
    height: hp(5),
    width: hp(5),
    alignSelf: 'center',
    borderColor: colors.darkGreen,
    borderWidth: wp(0.15),
    borderRadius: radius.radius6,
  },
  cardView: {
    marginTop: hp(3),
    backgroundColor: colors.cardColor,
    height: hp(25),
    width: wp(90),
    borderRadius: radius.radius1,
    alignSelf: 'center',
  },
  debitView: {
    height: hp(5),
    flexDirection: 'row',
    width: wp(90),
    borderTopLeftRadius: radius.radius1,
    borderTopRightRadius: radius.radius1,
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
  },
  debitText: {
    color: colors.white,
    fontFamily: fontFamily.regular,
    textAlign: 'left',
    fontSize: fontSize.fontSize3,
    flex: 1,
  },
  bankName: {
    color: colors.white,
    fontFamily: fontFamily.bold,
  },
  // bankLogo:{
  //     height:hp(5),
  //     width:wp(15),
  //     // backgroundColor:'red'
  // },
  chipIcon: {
    height: hp(5),
    width: wp(10),
    marginHorizontal: wp(5),
  },
  numberView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5.5),
  },

  numberText: {
    color: colors.white,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.fontSize4,
    marginTop: hp(1),
  },
  validView: {
    flexDirection: 'row',
    marginTop: hp(2),
    paddingHorizontal: wp(5.5),
  },
  validText: {
    color: colors.white,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.fontSize2,
    textAlign: 'left',
  },
  validDate: {
    color: colors.white,
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.fontSize3point2,
    alignSelf: 'center',
    paddingHorizontal: wp(3),
  },
  ciromaView: {
    flexDirection: 'row',
    borderBottomLeftRadius: radius.radius1,
    borderBottomRightRadius: radius.radius1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5.5),
    marginTop: hp(0.5),
  },
  ciromaText: {
    color: colors.white,
    fontFamily: fontFamily.bold,
    textAlign: 'left',
  },
  masterCardIcon: {
    height: hp(5),
    width: wp(15),
  },
  insightView: {
    height: hp(10),
    backgroundColor: colors.cardColor,
    width: wp(90),
    alignSelf: 'center',
    marginVertical: hp(2.5),
    borderRadius: radius.radius1,
    flexDirection: 'row',
  },
  insightInnerView: {
    alignSelf: 'center',
    paddingHorizontal: wp(2),
  },

  currentView: {
    flexDirection: 'row',
    width: wp(45),
    height: hp(9),
    alignSelf: 'center',
    borderRightColor: colors.white,
    borderRightWidth: wp(0.2),
    borderBottomLeftRadius: radius.radius1,
    borderTopLeftRadius: radius.radius1,
  },
  cashIcon: {
    alignSelf: 'center',
    height: hp(5),
    width: wp(10),
    marginHorizontal: wp(2),
  },
  insightText: {
    color: colors.white,
    fontFamily: fontFamily.bold,
    fontSize: fontSize.fontSize4,
    textAlign: 'left',
  },
  currentText: {
    color: colors.white,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.fontSize3point2,
    textAlign: 'left',
  },
  balanceView: {
    height: hp(9),
    width: wp(45),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    fontFamily: fontFamily.bold,
    color: colors.white,
    fontSize: fontSize.fontSize4,
  },
  taxText: {
    textAlign: 'left',
    color: colors.white,
    fontFamily: fontFamily.regular,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonsIcon: {
    height: hp(6.5),
    width: hp(6.5),
  },
  buttonsText: {
    color: colors.black,
    textAlign: 'center',
    marginTop: hp(1),
    fontFamily: fontFamily.regular,
    fontSize: fontSize.fontSize3point2,
  },
  transactionsView: {
    justifyContent: 'space-between',
    marginVertical: hp(3),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(5.5),
  },
  transactionsText: {
    fontFamily: fontFamily.bold,
    color: colors.black,
    textAlign: 'left',
    fontSize: fontSize.fontSize4,
  },
  viewAllText: {
    color: colors.darkGreen,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.fontSize3point5,
  },

  recentChatsContainer: {
    marginTop: 20,
  },
  recentChatsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  groupItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  groupMembers: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
