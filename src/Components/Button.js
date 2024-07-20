import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Text from '../Components/Text';
import { colors, fontSize, radius } from "../Constants";

const CustomButton = (props) => {
    return (
        <TouchableOpacity
            onPress={props?.onPress}
            style={props?.style ? props?.style : styles.btn}>
            {props?.loading ?
                <ActivityIndicator size={25} color={props?.ActivityIndicatorColor ? props?.ActivityIndicatorColor : colors.white} animating={props?.loading} />
                :
                <Text
                    style={props?.btnTitleStyle ? props.btnTitleStyle : styles.btnText}>
                    {props?.title} </Text>
            }
        </TouchableOpacity >
    );
};
const styles = StyleSheet.create({
    btn: {
        alignSelf: 'center',
        backgroundColor: colors.primaryColor,
        paddingVertical: hp(1),
        marginTop: hp(3),
        width: wp(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius.radius3
    },
    btnText: {
        fontWeight: '500',
        textAlign: "center",
        justifyContent: 'center',
        fontSize: fontSize.fontSize4,
        color: colors.white,
    }
});
export default CustomButton;