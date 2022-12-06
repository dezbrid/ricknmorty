import {StyleSheet} from 'react-native';
import {extraLightGray, white} from '@constants/colors';
import {GENERAL_BOX_SHADOW} from '@constants/commonStyles';

const ICON_SIZE = 25;
const CLEAR_ICON_SIZE = 18;

export default StyleSheet.create({
  container: {
    margin: 20,
  },
  barSearch: {
    alignItems: 'center',
    backgroundColor: white,
    height: 45,
    borderRadius: 20,
    flexDirection: 'row',
    paddingRight: 15,
    paddingLeft: 10,
  },
  iconSearch: {
    marginRight: 10,
    height: ICON_SIZE,
    width: ICON_SIZE,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
  },
  clearIcon: {
    width: CLEAR_ICON_SIZE,
    height: CLEAR_ICON_SIZE,
  },
  barSearchShadow: {
    ...GENERAL_BOX_SHADOW,
    borderWidth: 1,
    borderColor: extraLightGray,
  },
  textError: {
    marginLeft: 20,
    fontSize: 12,
    color: 'red',
  },
});
