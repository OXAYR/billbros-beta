import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors, fontFamily, fontSize, radius } from "../../../Constants";

export const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center'
    },

    authText: {
        fontFamily: fontFamily.bold,
        color: colors.black,
        fontSize: fontSize.fontSize6,
        paddingHorizontal: wp(6)
    },
    authDescp: {
        textAlign: 'left',
        paddingHorizontal: wp(6),
        paddingVertical: hp(2),
        fontFamily: fontFamily.regular,
        color: colors.lightGray
    },
    verifyText: {
        paddingHorizontal: wp(6),
        color: colors.black,
        fontFamily: fontFamily.bold,
        fontSize: fontSize.fontSize4
    },
    cell: {
        // backgroundColor: 'black',
        justifyContent: 'space-evenly',
        marginTop:hp(4)
    },
    otpInput: {
        height: hp(5),
        width: wp(10),
        borderRadius: radius.radius3,
        borderColor: colors.lightGray,
        backgroundColor: colors.white,
        textAlign: 'center',
        fontFamily: fontFamily.bold,
        borderWidth: wp(0.3),
        fontSize: fontSize.fontSize4

    },
    otpInputFocus: {
        height: hp(5),
        width: wp(10),
        borderRadius: radius.radius3,
        borderColor: colors.darkGreen,
        backgroundColor: colors.white,
        textAlign: 'center',
        fontFamily: fontFamily.bold,
        fontSize: fontSize.fontSize4,
        borderWidth: wp(0.3),

    },
    placeholderTextColor: colors.black,
    btn: {
        width: wp(80),
        backgroundColor: colors.darkGreen,
        alignSelf: 'center',
        paddingVertical: hp(2),
        marginVertical: hp(2),
        borderRadius: radius.radius1,
        marginTop: hp(5)
    },
    btnText: {
        color: colors.white,
        fontFamily: fontFamily.semiBold,
        textAlign: 'center',
        fontSize: fontSize.fontSize4
    },
    resendText: {
        alignSelf: 'center',
        color: colors.darkGreen,
        fontFamily: fontFamily.medium
    },
})