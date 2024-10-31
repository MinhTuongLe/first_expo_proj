/* eslint-disable prettier/prettier */
/**
 * @Description: Header Bar Style
 * @Created by ZiniTeam
 * @Date create: 18/01/2019
 */
/** COMMON */
import {DEVICE, COLOR} from '../../../config';
import CommonStyle from '../../../helpers/common-style';
import Helpers from '../../../helpers';

const styles = Object.assign({}, CommonStyle, {
  con: {
    height: Helpers.hS('10%') + CommonStyle.statusBarHeight,
    backgroundColor: COLOR.primaryApp,
    paddingTop: 12,
  },
  con_header_bar: {
    height: Helpers.hS('10%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 4, height: 4},
    shadowColor: '#ababab',
    shadowOpacity: 0.3,
    elevation: 5,
  },
  status_bar: {height: CommonStyle.statusBarHeight},
  con_header_left: {
    width: Helpers.wS('10%'),
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'absolute',
    left: 10,
    zIndex: 10,
  },
  con_header_center: {
    position: 'absolute',
    // top: Helpers.isIphoneX() ? 5 : 0,
    top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: Helpers.wS('11%'),
  },
  con_header_right: {
    width: Helpers.wS('50%'),
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
    zIndex: 10,
    height: '100%',
  },
  con_custom_header_right: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    marginRight: 10,
  },
  text_header_center: {
    fontSize: Helpers.fS(18),
    color: '#ffffff',
    fontFamily: DEVICE.fontBold,
  },
  txt_header_right: {
    fontSize: Helpers.fS(16),
    fontFamily: DEVICE.fontMedium,
    color: '#ffffff',
  },
  txt_hello: {
    fontSize: Helpers.fS(16),
    fontFamily: DEVICE.fontRegular,
    color: '#ffffff',
  },
  txt_hello_name: {
    fontSize: Helpers.fS(16),
    fontFamily: DEVICE.fontBold,
    color: '#ffffff',
  },
  con_avatar: {
    backgroundColor: COLOR.backgroundSec,
    height: Helpers.hS('5%'),
    width: Helpers.hS('5%'),
    borderRadius: Helpers.bR(Helpers.hS('5%')),
    overflow: 'hidden',
  },
  img_avatar: {height: '100%', width: '100%'},
  txt_name: {
    color: '#ffffff',
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(14),
    paddingHorizontal: 5,
  },
});

export default styles;
