import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Pressable,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors, fontFamily, fontSize, radius } from "../Constants";
import Text from "./Text";

const FlatlistComponent = (props) => {
    return (
        <Pressable 
        onLongPress={props?.groupNavigate} style={styles.mainContainer}>

            <FlatList
                data={props?.data}
                renderItem={({ item }) => {

                    return (
                        <Pressable onPress={props?.navigate} style={styles.chatView}>
                            <Image resizeMode="center" style={styles.chatImage} source={item.icon || require('../../assets/images/person_icon.png')} />
                            <View style={styles.chatNameContainer}>
                                <Text style={styles.chatName} numberOfLines={1} >{item.name || item.username}</Text>
                                <Text style={styles.chatMessage} numberOfLines={1} >{item.time || item.email}</Text>
                            </View>
                            {item.price && <Text style={[styles.lastSeen, { color: item.color }]} numberOfLines={1}>{item.price}</Text>
                            }
                        </Pressable>
                    );
                }}
                keyExtractor={(item) => item.id}

            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },

    chatView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: hp(7),
        width: wp(95),
        alignSelf: "center",
        borderBottomColor: colors.lightGray,
        borderBottomWidth: wp(0.2),
        marginBottom: hp(2.5),
    },

    chatImage: {
        height: hp(7),
        width: hp(7),
        borderRadius: radius.radius7,
        alignSelf: 'center',
    },

    chatNameContainer: {
        height: hp(7),
        width: wp(51),
        marginLeft: wp(3),
    },

    chatName: {
        color: colors.black,
        fontSize: fontSize.fontSize4,
        fontFamily: fontFamily.bold,
        textAlign: 'left'
    },

    chatMessage: {
        color: colors.gray,
        fontFamily: fontFamily.medium,
        marginTop: hp(0.7),
        textAlign: 'left'
    },

    lastSeen: {
        color: colors.darkGreen,
        fontSize: fontSize.fontSize4point5,
        fontFamily: fontFamily.bold,
    }

});
export default FlatlistComponent; 