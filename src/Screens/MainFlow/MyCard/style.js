import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors, fontFamily, fontSize } from "../../../Constants";

export const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    cardsText: {
        color: colors.darkGreen,
        fontFamily: fontFamily.semiBold,
        fontSize: fontSize.fontSize4,
        paddingHorizontal: wp(5),
        marginTop:hp(3)
    },
    manageText: {
        fontFamily: fontFamily.regular,
        color: colors.black,
        fontSize:fontSize.fontSize3point5,
        paddingHorizontal: wp(5),
        marginBottom:hp(3)
    },
})