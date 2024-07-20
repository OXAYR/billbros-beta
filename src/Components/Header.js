import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors, fontFamily, fontSize } from "../Constants";
import Text from "./Text";

const Header = (props) => {
    return (
        <View style={styles.mainContainer}>
            <View style={{ width: wp(30) }}>
                {props?.onPress && <TouchableOpacity onPress={props?.onPress}>
                    <Image style={styles.leftIcon} resizeMode="center" source={require('../../assets/images/back_icon.png')} />
                </TouchableOpacity>}

            </View>
            <Text style={styles.title}>{props?.title}</Text>
            <View style={{ width: wp(30) }} />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.white,
        width: wp(100),
        marginVertical: hp(2),
        flexDirection: 'row',
    },
    leftIcon: {
        height: hp(4),
        width: wp(10),
        marginHorizontal: wp(3),
    },
    title: {
        fontFamily: fontFamily.semiBold,
        color: colors.darkGreen,
        fontSize: fontSize.fontSize5,
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1

    },


});
export default Header;