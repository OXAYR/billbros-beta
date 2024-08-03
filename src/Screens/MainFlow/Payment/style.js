import {StyleSheet} from 'react-native';
import {colors, radius, fontFamily, fontSize} from '../../../Constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  inputViewStyle: {
    marginVertical: 10,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 5,
  },
  searchInputText: {
    textAlign: 'left',
    width: wp(70),
    alignSelf: 'center',
    fontSize: fontSize.fontSize3point2,
    fontFamily: fontFamily.regular,
    color: colors.black,
  },
  placeholderTextColor: colors.placeholder,
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: colors.primary,
  },
  tabContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 3,
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: colors.text,
  },
  friendsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  accountText: {
    fontSize: 16,
    marginVertical: 5,
    color: colors.textSecondary,
  },
  billInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    marginVertical: 10,
  },
  splitText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  participantView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  participantName: {
    fontSize: 16,
    color: colors.text,
  },
  participantAmount: {
    fontSize: 16,
    color: colors.primary,
  },
  chatView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  highlighted: {
    backgroundColor: colors.highlight,
  },
  chatImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  chatNameContainer: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  chatMessage: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  lastSeen: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  unreadCount: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 10,
  },
  createButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  groupChatsContainer: {
    flex: 1,
    marginTop: 10,
  },
  chatItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
