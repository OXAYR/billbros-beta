import {StyleSheet} from 'react-native';
import {colors, radius, fontFamily, fontSize} from '../../../Constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  texts: {
    fontSize: fontSize.four,
    color: colors.black,
    marginTop: hp(2),
    marginLeft: wp(3),
    marginRight: wp(3),
  },

  inputViewStyle: {
    flexDirection: 'row',
    width: wp(90),
    borderRadius: radius.radius1,
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: hp(0.1),
    justifyContent: 'space-evenly',
    marginBottom: hp(2),
    backgroundColor: colors.lightWhite,
    paddingHorizontal: wp(3),
  },
  searchIcon: {
    width: wp(6),
    height: hp(3),
    alignSelf: 'center',
  },
  searchInputText: {
    textAlign: 'left',
    width: wp(70),
    alignSelf: 'center',
    fontSize: fontSize.fontSize3point2,
    fontFamily: fontFamily.regular,
    color: colors.black,
  },

  placeholderTextColor: colors.lightGray,

  friendsText: {
    fontFamily: fontFamily.semiBold,
    color: colors.black,
    fontSize: fontSize.fontSize4,
    paddingHorizontal: wp(5),
    marginTop: hp(3),
  },

  accountText: {
    color: colors.lightGray,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.fontSize3,
    paddingHorizontal: wp(5),
    marginBottom: hp(3),
  },

  //
  chatView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(7),
    width: wp(95),
    alignSelf: 'center',
    borderBottomColor: colors.lightGray,
    borderBottomWidth: wp(0.2),
    marginBottom: hp(2.5),
  },

  chatImage: {
    height: hp(7),
    width: hp(7),
    borderRadius: radius.radius7,
    alignSelf: 'center',
  },

  chatNameContainer: {
    // backgroundColor: 'red',
    flex: 1,
    height: hp(7),
    width: wp(51),
    marginLeft: wp(3),
  },

  chatName: {
    color: colors.black,
    fontSize: fontSize.fontSize4,
    fontFamily: fontFamily.bold,
    textAlign: 'left',
  },

  chatMessage: {
    color: colors.gray,
    fontFamily: fontFamily.medium,
    marginTop: hp(0.7),
    textAlign: 'left',
    width: wp(60),
  },

  lastSeen: {
    color: colors.darkGreen,
    fontSize: fontSize.fontSize4point5,
    fontFamily: fontFamily.bold,
  },
  unreadCount: {
    borderRadius: radius.radius7,
    backgroundColor: colors.primary,
    // padding:hp(2),
    height: hp(3),
    width: hp(3),
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.white,
    fontWeight: '900',
    marginRight: wp(3),
  },

  ///ozziee
});
