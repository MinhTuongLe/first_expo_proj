/**
 * @Description:
 * @Created by ZiniTeam
 * @Date create:
 */
/** LIBRARY */
import CommonStyle from '../../../helpers/common-style';
/** COMMON */
import {COLOR, DEVICE} from '../../../config';
import Helpers from '../../../helpers';

const styles = Object.assign({}, CommonStyle, {
  con: [DEVICE.gStyle.flex_1, {backgroundColor: COLOR.backgroundMain}],

  con_list: {flexGrow: 1, padding: 10},
  con_item: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.borderColorSec,
    paddingVertical: 10,
  },
  con_item_header_latest: [DEVICE.gStyle.row_align_center, {paddingBottom: 10}],
  con_item_header: [DEVICE.gStyle.row_align_center],
  con_item_img: {
    width: Helpers.wS('13.33%'),
    height: Helpers.wS('13.33%'),
    borderRadius: Helpers.bR(Helpers.wS('13.33%')),
    overflow: 'hidden',
  },
  con_msg: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: COLOR.backgroundSec,
    marginTop: 10,
  },
  con_info_latest: {flex: 1, paddingLeft: 10},
  con_title_latest: [
    DEVICE.gStyle.row_space_between,
    DEVICE.gStyle.row_align_center,
  ],
  con_obj_latest: [DEVICE.gStyle.row_align_end],

  txt_name: [DEVICE.initFont.X_SMALL, {flex: 1, fontFamily: DEVICE.fontBold}],
  txt_time: [DEVICE.initFont.XXX_SMALL, {color: COLOR.text_2}],
  txt_obj: [DEVICE.initFont.XX_SMALL],
  txt_des: [DEVICE.initFont.XX_SMALL],
  txt_no_data: [
    DEVICE.initFont.X_SMALL,
    {color: COLOR.placeholderTextColor, marginTop: 10},
  ],
  txt_title: [
    DEVICE.initFont.MEDIUM,
    {fontFamily: DEVICE.fontBold, paddingVertical: 10},
  ],
});

export default styles;
