import {backGroud} from '@constants/colors';
import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backGroud,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 0,
  },
  separator: {
    height: 15,
  },
  text: {
    color: 'black',
  },
  footer: {
    margin: 50,
  },
});
