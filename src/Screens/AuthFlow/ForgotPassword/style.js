import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors, fontFamily, fontSize, radius } from "../../../Constants";

export const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center'
    },
    loginText: {
        fontFamily: fontFamily.bold,
        color: colors.black,
        fontSize: fontSize.fontSize6,
        paddingHorizontal: wp(6)
    },
    loginDescp: {
        textAlign: 'left',
        paddingHorizontal: wp(6),
        paddingVertical: hp(2),
        fontFamily: fontFamily.regular,
        color: colors.lightGray
    },
    textsView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // width:wp(90),
        // alignSelf:'center'
    },
    forgotText: {
        color: colors.darkGreen,
        fontFamily: fontFamily.semiBold,
        // textAlign:'left',
        // width:wp(45)
    },
    privacyText: {
        color: colors.darkGreen,
        fontFamily: fontFamily.semiBold,
        // textAlign:'right',
        // width:wp(45)

    },
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

    btnWallet: {
        width: wp(80),
        backgroundColor: colors.white,
        alignSelf: 'center',
        paddingVertical: hp(2),
        marginVertical: hp(2),
        borderRadius: radius.radius1,
        borderColor: colors.darkGreen,
        borderWidth: wp(0.3)
    },
    btnTextWallet: {
        color: colors.black,
        fontFamily: fontFamily.semiBold,
        textAlign: 'center',
        fontSize: fontSize.fontSize4
    },
})