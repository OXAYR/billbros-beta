import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors, fontFamily, fontSize, radius } from "../../../Constants";

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    greenView: {
        borderRadius: radius.radius5,
        backgroundColor: colors.darkGreen,
        alignSelf: 'center',
        width: wp(90),
        height: hp(15),
        paddingHorizontal: wp(2)
    },
    whiteView: {
        marginTop: hp(3),
        borderRadius: radius.radius4,
        flexDirection: 'row',
        backgroundColor: colors.white,
        height: hp(17),
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    personIcon: {
        height: hp(15),
        width: wp(30),
        alignSelf: 'center'
    },
    priceText: {
        color: colors.darkGreen,
        fontFamily: fontFamily.bold,
        fontSize: fontSize.fontSize4point5,
        textAlign: 'left'
    },
    currentText: {
        color: colors.darkGray,
        fontFamily: fontFamily.regular,
        fontSize: fontSize.fontSize3point5,
        textAlign: 'left'
    },
    buttonsView: {
        paddingTop:hp(7),
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    buttonsIcon: {
        height: hp(6.5),
        width: hp(6.5)
    },
    buttonsText: {
        color: colors.black,
        textAlign: 'center',
        marginTop: hp(1),
        fontFamily: fontFamily.regular,
        fontSize: fontSize.fontSize3point2
    },
    transactionsView: {
        justifyContent: 'space-between',
        marginVertical: hp(3),
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:wp(5.5)

    },
    transactionsText: {
        fontFamily: fontFamily.bold,
        color: colors.black,
        textAlign: 'left',
        fontSize: fontSize.fontSize4
    },
    viewAllText:{
        color:colors.darkGreen,
        fontFamily:fontFamily.medium,
        fontSize:fontSize.fontSize3point5
    },
    personView:{
        flexDirection:'row',
        height:hp(10),
        justifyContent:'space-around',
        alignItems:'center',
        paddingHorizontal:wp(3)
        // alignSelf:'center'
    },
    profileIcon:{
        height: hp(6.5),
        width: hp(6.5),
        borderColor:colors.darkGreen,
        borderWidth:wp(0.2),
        borderRadius:radius.radius8,
        alignSelf:'center'

    },
    plusIcon:{
        height: hp(6.5),
        width: hp(6.5),
        borderColor:colors.darkGreen,
        borderWidth:wp(0.2),
        borderRadius:radius.radius8,
        backgroundColor:colors.cardColor,
        alignSelf:'center'

    },
    profileName:{
        color: colors.black,
        textAlign: 'center',
        alignSelf:'center',
        marginTop: hp(1),
        fontFamily: fontFamily.medium,
        fontSize: fontSize.fontSize3point2,
        width:wp(15)
    },
    addNewText:{
        color: colors.primary,
        textAlign: 'center',
        alignSelf:'center',
        marginTop: hp(1),
        fontFamily: fontFamily.medium,
        fontSize: fontSize.fontSize3point2,
        width:wp(15),
    },
})