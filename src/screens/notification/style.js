/**
 * Created by dang.le from 05/09/2018
 */
import {DEVICE, COLOR} from '../../config';
import CommonStyle from '../../helpers/common-style';
import Helpers from '../../helpers';

const notificationStyle = Object.assign({}, CommonStyle, {
  container: [DEVICE.gStyle.flex_1, {backgroundColor: COLOR.backgroundMain}],
  container_content: [
    DEVICE.gStyle.flex_1,
    DEVICE.gStyle.align_center,
    {justifyContent: 'flex-start', paddingHorizontal: 10},
  ],
  txt_no_data: {
    color: COLOR.borderColor,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(12),
    marginTop: 10,
  },
  container_item: [
    DEVICE.gStyle.justify_center,
    {
      width: '100%',
      paddingHorizontal: 10,
    },
  ],
  container_item_inside: [
    DEVICE.gStyle.justify_center,
    {
      width: '100%',
      borderBottomColor: COLOR.borderColorSec,
      borderBottomWidth: 0.5,
      paddingVertical: 10,
    },
  ],
  container_item_icon: [DEVICE.gStyle.row_align_center],
  container_item_content: {marginTop: 0},
  txtDateTime: [
    DEVICE.initFont.XXXX_SMALL,
    {marginLeft: 10, color: COLOR.text_1},
  ],
  text_item_readed: [DEVICE.initFont.X_SMALL],
  text_item_notread: [DEVICE.initFont.X_SMALL, {fontFamily: DEVICE.fontBold}],
  seperator_line: {
    height: 0.25,
    width: DEVICE.width - 20,
    backgroundColor: COLOR.primaryApp,
  },
  d_container: [DEVICE.gStyle.flex_1, {backgroundColor: COLOR.backgroundMain}],
  d_container_content: [
    DEVICE.gStyle.flex_1,
    {paddingHorizontal: 10, width: '100%'},
  ],
  d_text_title: [DEVICE.initFont.SMALL, {fontFamily: DEVICE.fontBold}],
  d_image_item: {height: Helpers.wS('56%'), width: '100%', marginTop: 15},
  d_text_time: [
    DEVICE.initFont.XXXX_SMALL,
    {color: COLOR.text_2, marginTop: 5},
  ],
  d_text_info: [DEVICE.initFont.X_SMALL, {marginTop: 10, paddingBottom: 25}],
  txt_html_content: {
    paddingVertical: 10,
    color: COLOR.txtColor,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(14),
  },
});

export default notificationStyle;
