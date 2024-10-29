/**
 * @Description: Health Screen Logic
 * @Created by ZiniTeam
 * @Date create: 27/02/2019
 */
/** COMMON */
import {DEVICE, COLOR} from '../../../../config';
import Helpers from '../../../../helpers';
import CommonStyle from '../../../../helpers/common-style';

const styles = Object.assign({}, CommonStyle, {
  con: [
    DEVICE.gStyle.flex_1,
    {backgroundColor: COLOR.backgroundMain, position: 'relative'},
  ],
  selectedBar: [
    DEVICE.gStyle.justify_center,
    {
      position: 'absolute',
      bottom: 0,
      left: 0,
      paddingLeft: 10,
      width: DEVICE.width,
      height: Helpers.wS('10.66%'),
      backgroundColor: 'rgba(0, 0, 0, .9)',
      zIndex: 3,
    },
  ],
  txtSelected: [DEVICE.initFont.X_SMALL, {color: '#ffffff'}],
});

export default styles;
