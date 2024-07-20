import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors, fontFamily, fontSize } from "../../../Constants";

export const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: hp(10),
        width: wp(90),
        alignSelf: 'center',
    },
    headText: {
        fontFamily: fontFamily.bold,
        fontSize:fontSize.fontSize10,
        color:colors.primary,
        alignSelf:'center',
    },
    paymentText:{
        color:colors.lightGray,
        fontFamily:fontFamily.regular,
        fontStyle:'italic'
        
    },
})