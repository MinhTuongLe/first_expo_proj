/**
 * @Description: Style Custom Image Galary
 * @Created by ZiniTeam
 * @Date create: 21/01/2019
 */
import {Platform} from 'react-native';
import {DEVICE} from '../../config';
import Helpers from '../../helpers';

const STATUS_BAR_OFFSET = Platform.OS === 'android' ? 25 : 0;

export default {
  container: {position: 'relative'},
  mask: {
    width: DEVICE.width,
    height: DEVICE.height,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },

  header: {
    width: DEVICE.width,
    height: Helpers.hS('7%'),
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: STATUS_BAR_OFFSET,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  positionItem: {
    position: 'absolute',
    width: DEVICE.width,
    height: Helpers.hS('7%'),
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right_header: {flexDirection: 'row'},
  itemRight: {marginLeft: Helpers.wS('6%')},
  txtCount: {
    color: '#ffffff',
    fontSize: Helpers.fS(16),
    fontFamily: DEVICE.fontBold,
  },
  infoImage: {
    width: DEVICE.width,
    height: DEVICE.height,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 3,
    justifyContent: 'space-between',
  },
  description: {width: '100%', paddingHorizontal: 15, marginBottom: 10},
  txtDescription: {
    color: '#ffffff',
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(12),
    marginBottom: 10,
  },
  txtSeeMore: {
    color: '#ffffff',
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(14),
  },
};
