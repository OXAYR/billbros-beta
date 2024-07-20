import { StyleSheet } from "react-native";
import { colors, fontFamily, fontSize, radius } from "../../../Constants";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center'
    },
    verifyImage: {
        alignSelf: 'center',
        height: hp(35),
        width: wp(100),
    },
    headText: {
        fontFamily: fontFamily.bold,
        color:colors.black,
        fontSize:fontSize.fontSize6,
        textAlign:'center'
    },
    verifyDescp:{
        textAlign:'center',
        width:wp(90),
        alignSelf:'center',
        marginTop:hp(3),
        color:colors.gray,
        fontFamily:fontFamily.regular
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
})