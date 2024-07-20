import Button from "./Button"
import { View, Image, StyleSheet } from "react-native"
import Text from "./Text"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import { colors, radius, fontFamily, fontSize } from "../Constants"


const Card = (props) => {
    return (
        <View style={styles.cardView}>
            <View style={styles.debitView}>
                <Text style={styles.debitText}>Debit.</Text>
                <Text style={styles.bankName}>Bill Bros</Text>
                {/* <Image style={styles.bankLogo} resizeMode='center' source={require('../../../../assets/images/jazzcash.png')}/> */}
            </View>
            <Image style={styles.chipIcon} resizeMode='center' source={require('../../assets/images/cardChip.png')} />

            <View style={styles.numberView}>
                <Text style={styles.numberText}>5355</Text>
                <Text style={styles.numberText}>0348</Text>
                <Text style={styles.numberText}>5945</Text>
                <Text style={styles.numberText}>5045</Text>
            </View>

            <View style={styles.validView}>
                <Text style={styles.validText}>VALID{'\n'}THRU</Text>
                <Text style={styles.validDate}>19/23</Text>
            </View>

            <View style={styles.ciromaView}>
                <Text style={styles.ciromaText}>CIROMA CHINEYE ADEKUNLE</Text>
                <Image style={styles.masterCardIcon} resizeMode='center' source={require('../../assets/images/masterCardIcon.png')} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    cardView: {
        marginTop: hp(3),
        backgroundColor: colors.cardColor,
        height: hp(25),
        width: wp(90),
        borderRadius: radius.radius1,
        alignSelf: 'center'
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
        fontSize: fontSize.fontSize3point2,
        flex: 1
    },
    bankName: {
        color: colors.white,
        fontFamily: fontFamily.bold
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
        paddingHorizontal: wp(5.5)
    },

    numberText: {
        color: colors.white,
        fontFamily: fontFamily.medium,
        fontSize: fontSize.fontSize4,
        marginTop: hp(1)
    },
    validView: {
        flexDirection: 'row',
        marginTop: hp(2),
        paddingHorizontal: wp(5.5)
    },
    validText: {
        color: colors.white,
        fontFamily: fontFamily.regular,
        fontSize: fontSize.fontSize2,
        textAlign: 'left'
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
        textAlign: 'left'
    },
    masterCardIcon: {
        height: hp(5),
        width: wp(15)
    },
})
export default Card