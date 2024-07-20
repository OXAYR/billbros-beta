import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors, fontFamily, fontSize, radius } from "../../../Constants";

export const styles = StyleSheet.create({

    mainContainer:{
        flex:1,
        backgroundColor:colors.white,
        justifyContent:'center'
    },
    image:{
        height:hp(50),
        width:wp(85),
        alignSelf:'center',
    },
    welcomeText:{
        fontFamily:fontFamily.regular,
        color:colors.black,
        alignSelf:'center',
        fontSize:fontSize.fontSize5,
        alignItems:'center',
        marginTop:hp(5)

    },

    payperText:{
        color:colors.primary,
        fontFamily:fontFamily.bold,
        fontSize:fontSize.fontSize7
    },
    btn:{
        width:wp(80),
        backgroundColor:colors.darkGreen,
        alignSelf:'center',
        paddingVertical:hp(2),
        marginVertical:hp(2),
        borderRadius:radius.radius1
    },
    btnText:{
        color:colors.white,
        fontFamily:fontFamily.medium,
        textAlign:'center',
        fontSize:fontSize.fontSize4
    },

    alreadyText:{
        color:colors.black,
        alignSelf:'center',
        fontSize:fontSize.fontSize4,
        marginVertical:hp(2)
    },
})