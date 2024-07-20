import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors, fontFamily, fontSize, radius } from "../../../Constants";

export const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    dateView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: wp(5),
    },
    calendarIcon: {
        height: hp(5),
        width: wp(10),
        alignSelf: 'center',
    },
    dateText: {
        fontFamily: fontFamily.medium,
        fontSize: fontSize.fontSize3point5,
        textAlign: 'center',
        alignSelf: 'center',
    },

    chartView: {
        flexDirection: 'row',
        width: wp(100),
        alignSelf: 'center',
        height: hp(25),
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    innerChartView: {
        alignSelf: 'center',
    },
    detailView: {
        justifyContent: 'center',
    },
    dotIcon: {
        height: hp(2),
        width: hp(2),
        alignSelf: 'center',
        paddingVertical: hp(1)
    },
    detailName: {
        fontFamily: fontFamily.medium,
        color: colors.gray,
        fontSize: fontSize.fontSize3,
        paddingHorizontal: wp(2),
        paddingVertical: hp(1)
    },
    incomeView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: hp(2),
        paddingHorizontal:wp(3)
    },
    incomeExpenseView: {
        backgroundColor: colors.whiteGray,
        borderRadius: radius.radius2,
        justifyContent: 'center',
        width: wp(45),
        height: hp(10),
        flexDirection: 'row',
        alignSelf: 'center'
    },
    incomeExpenseView2: {
        backgroundColor: colors.skinWhite,
        borderRadius: radius.radius2,
        justifyContent: 'center',
        width: wp(45),
        height: hp(10),
        flexDirection: 'row',
    },
    innerIncomeExpenseView: {
        justifyContent: 'center',
        paddingHorizontal: wp(2)
    },
    moneyIcon: {
        height: hp(5),
        width: wp(10),
        alignSelf: 'center',
    },

    price: {
        color: colors.black,
        fontFamily: fontFamily.bold,
        fontSize: fontSize.fontSize4,
        textAlign: 'center'
    },
    incomeText: {
        fontFamily: fontFamily.medium,
        color: colors.gray,
    },
    buttonView: {
        marginTop: hp(3),
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal:wp(3)
    },
    incomeButton: {
        backgroundColor: colors.cardColor,
        height: hp(6),
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(45),
        borderRadius: radius.radius1
    },
    expenseButton: {
        borderColor: colors.cardColor,
        borderWidth:wp(0.2),
        backgroundColor: colors.white,
        height: hp(6),
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(45),
        borderRadius: radius.radius1
    },
    incomeBtnText:{
        color:colors.white,
        fontFamily:fontFamily.medium,
        fontSize:fontSize.fontSize4,
        textAlign:'center'
    },
    expenseBtnText:{
        color:colors.cardColor,
        fontFamily:fontFamily.medium,
        fontSize:fontSize.fontSize4,
        textAlign:'center'
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
})