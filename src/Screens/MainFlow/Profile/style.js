import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors, fontFamily, fontSize, radius } from "../../../Constants";

export const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    detailsText:{
        fontSize:fontSize.fontSize5,
        color:colors.primary,
        fontFamily:fontFamily.bold,
        textAlign:'center',
        marginVertical:hp(3)
    },
    authIcon:{
        height:hp(30),
        width:wp(60),
        alignSelf:'center'
    },
    userView: {
        flexDirection: 'row',
        height: hp(10),
        width: wp(80),
        alignSelf: 'center',
    },
    userImage: {
        height: hp(6.5),
        width: hp(6.5),
        alignSelf: 'center',
        borderWidth:wp(0.2),
        borderColor:colors.cardColor,
        borderRadius:radius.radius7
    },
    userDetail: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal:wp(5)
    },
    userName: {
        fontFamily: fontFamily.bold,
        color: colors.black,
        fontSize: fontSize.fontSize5,
        textAlign: 'left',
        width:wp(55)
    },
    userNumber: {
        fontFamily: fontFamily.regular,
        color: colors.gray,
        fontSize: fontSize.fontSize4,
        textAlign: 'left',
        width:wp(55)
    },
    logoutViewOuter:{
        flex:1,
        justifyContent:'flex-end',
        marginVertical:hp(3)
    },
    logoutView:{
        flexDirection:'row',
        borderTopColor:colors.lightGray,
        borderTopWidth:wp(0.1),
        height:hp(8),
        alignItems:'center',
        width:wp(85),
        alignSelf:'center',
    },
    logoutIcon:{
        height:hp(7),
        width:wp(10),
    },
    logoutText:{
        fontFamily:fontFamily.bold,
        fontSize:fontSize.fontSize4point5,
        color:colors.black,
        paddingHorizontal:wp(3)
    },
})