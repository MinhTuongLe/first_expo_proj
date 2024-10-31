/**
 ** Name:
 ** Author:
 ** CreateAt:
 ** Description:
 **/
/** COMMON */
import {DEVICE, COLOR} from '../../../config';
import CommonStyle from '../../../helpers/common-style';
import Helpers from '../../../helpers';

const styles = Object.assign({}, CommonStyle, {
  //HEADER LIST
  con_header_list: [
    DEVICE.gStyle.shadow,
    {
      backgroundColor: COLOR.backgroundSec,
      borderRadius: 10,
    },
  ],
  con_header_content: [
    DEVICE.gStyle.row_align_center,
    DEVICE.gStyle.shadow,
    {
      justifyContent: 'space-evenly',
      paddingVertical: 10,
      alignItems: 'flex-start',
    },
  ],
  con_header_item: [DEVICE.gStyle.align_center, {flex: 0.25}],
  con_header_item_center: [DEVICE.gStyle.align_center, {flex: 0.5}],
  con_avatar_student: {
    height: Helpers.wS('15%'),
    width: Helpers.wS('15%'),
    borderRadius: Helpers.bR(Helpers.wS('15%')),
    borderWidth: 1,
    borderColor: COLOR.borderColor,
  },

  txt_header_content: [DEVICE.initFont.XX_SMALL, {marginTop: 4}],
  txt_header_title: [
    DEVICE.initFont.X_SMALL,
    {fontFamily: DEVICE.fontMedium, marginTop: 4, textAlign: 'center'},
  ],

  img_header_item: {
    width: Helpers.wS('10%'),
    height: Helpers.wS('10%'),
    borderRadius: Helpers.bR(Helpers.wS('10%')),
  },
  avatarStudent: {
    height: Helpers.wS('15%'),
    width: Helpers.wS('15%'),
    borderRadius: Helpers.bR(Helpers.wS('15%')),
    borderWidth: 1,
    borderColor: COLOR.borderColor,
  },
  avatarClass: {
    height: Helpers.wS('10%'),
    width: Helpers.wS('10%'),
    borderRadius: Helpers.bR(Helpers.wS('10%')),
  },
});

export default styles;
