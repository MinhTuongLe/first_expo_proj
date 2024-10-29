/* eslint-disable prettier/prettier */
/**
 * @Description: Message Item Style
 * @Created by ZiniTeam
 * @Date create: 26/04/2019
 */
/** COMMON */
import commonStyle from '../../../helpers/common-style';
import {DEVICE, COLOR} from '../../../config';
import Helpers from '../../../helpers';

const styles = Object.assign({}, commonStyle, {
  con_message_content: [
    DEVICE.gStyle.flex_1,
    {
      borderBottomColor: COLOR.borderColorSec,
      borderBottomWidth: 0.5,
      display: 'flex',
      justifyContent: 'center',
    },
  ],
  con_message_item: [
    DEVICE.gStyle.row_align_center,
    {
      paddingHorizontal: 10,
      height: Helpers.wS('18.13%'),
    },
  ],
  con_message_info: [
    DEVICE.gStyle.flex_1,
    DEVICE.gStyle.column,
    {
      paddingTop: 0,
      paddingHorizontal: 10,
      display: 'flex',
      justifyContent: 'center',
    },
  ],
  con_unread_message: [
    DEVICE.gStyle.center,
    {
      backgroundColor: COLOR.primaryTextNote,
      width: Helpers.wS('5%'),
      height: Helpers.wS('5%'),
      borderRadius: Helpers.wS('5%') / 2,
      position: 'absolute',
      top: 9,
      left: Helpers.wS('12%'),
      zIndex: 101,
    },
  ],
  con_message_name: [
    DEVICE.gStyle.row_space_between,
    DEVICE.initFont.XXX_SMALL,
    ,
    {
      // marginBottom: 10,
      // backgroundColor: 'yellow',
      paddingVertical: 1,
    },
  ],

  txt_unread_message: [DEVICE.initFont.X_SMALL, {color: COLOR.backgroundMain}],
  txt_person_info_fullname: DEVICE.initFont.X_SMALL,
  txt_person_info_time: [
    DEVICE.initFont.XXXX_SMALL,
    {marginLeft: 10, color: COLOR.placeholderTextColor},
  ],
  txt_person_info_text_msgNew: [
    DEVICE.initFont.XXX_SMALL,
    {flex: 1, paddingRight: 5, color: COLOR.placeholderTextColor},
  ],
  txt_person_info_text_msgNew_unRead: [
    DEVICE.initFont.XXX_SMALL,
    {flex: 1, paddingRight: 5, color: COLOR.white, fontWeight: '900'},
  ],

  img_avatar: {
    width: Helpers.wS('13.33%'),
    height: Helpers.wS('13.33%'),
    borderRadius: Helpers.bR(Helpers.wS('13.33%')),
    overflow: 'hidden',
  },
});

export default styles;
