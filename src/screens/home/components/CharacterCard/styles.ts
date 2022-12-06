import {StyleSheet} from 'react-native';
import {
  cardBackGround,
  white,
  greenStatus,
  redStatus,
  mediumGray,
} from '@constants/colors';
import {GENERAL_BOX_SHADOW} from '@constants/commonStyles';

const SIZES = {
  TITLE: 22,
  SUBTITLE: 18,
};
const SIZE_STATUS = 11;

export default StyleSheet.create({
  container: {
    ...GENERAL_BOX_SHADOW,
    borderRadius: 5,
    backgroundColor: cardBackGround,
    height: 180,
    flexDirection: 'row',
    display: 'flex',
  },
  image: {
    flex: 2,
  },
  containerInfo: {
    flex: 3,
    padding: 13,
  },
  title: {
    fontSize: SIZES.TITLE,
    fontWeight: 'bold',
    color: white,
  },
  containerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusPoint: {
    height: SIZE_STATUS,
    width: SIZE_STATUS,
    marginRight: 5,
    borderRadius: 50,
  },
  backGroudGreen: {
    backgroundColor: greenStatus,
  },
  backGroudRed: {
    backgroundColor: redStatus,
  },
  backGroudGray: {
    backgroundColor: mediumGray,
  },
  subtitle: {
    fontSize: SIZES.SUBTITLE,
    fontWeight: 'bold',
    color: white,
  },
  containerLocation: {
    marginTop: 20,
  },
  colorLocation: {
    color: mediumGray,
  },
});
