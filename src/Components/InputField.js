import { Image, StyleSheet, TextInput, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors, fontFamily, fontSize, radius } from "../Constants";
import Text from "./Text";

const InputField = (props) => {
    return (
        <>
            <Text style={styles.label} >{props?.label}</Text>
            <View style={props?.inputViewStyle ? props.inputViewStyle : styles.inputView}>
                <Image style={props.leftIconStyle ? props.leftIconStyle : styles.leftIcon} resizeMode="center" source={props?.leftIcon} />
                <TextInput
                    multiline={props?.multiline}
                    numberOfLines={props?.numberOfLines}
                    style={props?.style ? props.style : styles.textInput}
                    allowFontScaling={false}
                    secureTextEntry={props?.secureTextEntry}
                    placeholder={props?.placeholder}
                    placeholderTextColor={props?.placeholderTextColor ? props?.placeholderTextColor : styles.placeholderTextColor}
                    value={props?.value}
                    keyboardType={props?.keyboardType}
                    onChangeText={props?.onChangeText}
                    onBlur={props?.onBlur}
                    onFocus={props?.onFocus}
                    onLayout={props?.onLayout}
                >
                </TextInput>
                {/* {props?.rightIcon && */}
                <Image style={styles.leftIcon} resizeMode="center" source={props?.rightIcon} />
                {/* } */}
            </View>
            {props?.error &&
                <Text allowFontScaling={false} style={styles.error}>{props?.error}</Text>
            }

        </>
    );
};

const styles = StyleSheet.create({
    inputView: {
        flexDirection: 'row',
        width: wp(90),
        borderRadius: radius.radius1,
        borderColor: colors.darkGreen,
        borderWidth: wp(0.3),
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: hp(0.1),
        justifyContent: 'space-evenly',
        marginBottom: hp(2),
    },
    leftIcon: {
        height: hp(5),
        width: wp(7),
        alignSelf: 'center'
    },
    textInput: {
        textAlign: 'left',
        width: wp(70),
        alignSelf: 'center',
        fontSize: fontSize.fontSize3point7,
        fontFamily: fontFamily.medium,
    },
    label: {
        color: colors.black,
        fontFamily: fontFamily.semiBold,
        paddingHorizontal: wp(6),
        paddingVertical: hp(1),
        fontSize: fontSize.fontSize4
    },
    error: {
        fontSize: fontSize.fontSize3point2,
        color: colors.chartRed,
        fontFamily: fontFamily.medium,
        paddingHorizontal: wp(5),
    },

    placeholderTextColor: colors.black
});
export default InputField;