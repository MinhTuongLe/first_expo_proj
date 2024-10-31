/**
 * @Description: Custom Loading
 * @Created by ZiniTeam
 * @Date create: 18/01/2019
 */
import {DEVICE, COLOR} from '../../config';
import {StyleSheet} from 'react-native';
import Helpers from '../../helpers';

export default {
  con: {flexDirection: 'row', marginTop: 30, justifyContent: 'center'},
  con_btn: {alignItems: 'center', marginRight: 20},
  con_img_avatar: [
    DEVICE.gStyle.center,
    {
      height: Helpers.wS('23%'),
      width: Helpers.wS('23%'),
      borderRadius: Helpers.bR(Helpers.wS('23%')),
    },
  ],
  con_shadow_non_choose: {
    ...StyleSheet.absoluteFill,
    backgroundColor: COLOR.backgroundSec,
    borderRadius: Helpers.bR(Helpers.wS('25%')),
  },

  img_avatar: {
    height: Helpers.wS('13%'),
    width: Helpers.wS('13%'),
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },

  txtName: {
    color: COLOR.txtColor,
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(17),
    marginBottom: 10,
  },
  txt_non_choose: {color: COLOR.txtColor, fontSize: Helpers.fS(14)},
};
