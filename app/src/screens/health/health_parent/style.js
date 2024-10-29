/**
 * @Description: Health Screen Logic
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** COMMON */
import {Platform} from 'react-native';
import {DEVICE, COLOR} from '../../../config';
import CommonStyle from '../../../helpers/common-style';
import Helpers from '../../../helpers';

const styles = Object.assign({}, CommonStyle, {
  /** MAIN */
  con: {flex: 1, backgroundColor: COLOR.backgroundMain},
  con_tab: {
    height: Helpers.hS('7%'),
    width: DEVICE.width - 20,
    flexDirection: 'row',
    backgroundColor: COLOR.backgroundMain,
    borderRadius: 10,
    overflow: 'hidden',
  },
  con_tab_global: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: COLOR.backgroundSec,
    padding: 5,
  },

  txt_title: [
    DEVICE.initFont.X_SMALL,
    {marginLeft: 10, fontFamily: DEVICE.fontMedium},
  ],
});

export default styles;
