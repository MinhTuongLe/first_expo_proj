/**
 * @Description: Attendance Screen Layout
 * @Created by ZiniTeam
 * @Date create: 25/03/2019
 */
/** COMMON */
import {DEVICE, COLOR} from '../../config';
import Helpers from '../../helpers';
import CommonStyle from '../../helpers/common-style';

const styles = Object.assign({}, CommonStyle, {
  con: [DEVICE.gStyle.flex_1, {backgroundColor: COLOR.backgroundMain}],

  //CALENDAR
  txt_open_calendar: [
    DEVICE.initFont.X_SMALL,
    {color: COLOR.primaryButton, fontFamily: DEVICE.fontMedium},
  ],
  txt_empty: [DEVICE.gStyle.txt_no_data, {marginTop: 20}],

  //TRACKING
  con_tracking: [DEVICE.flex_1, {paddingVertical: 20, paddingHorizontal: 10}],
  con_row_item_tracking: [
    DEVICE.gStyle.row,
    DEVICE.gStyle.align_flex_start,
    {
      height: Helpers.hS('10%'),
      justifyContent: 'flex-start',
    },
  ],
  con_item_left: [
    DEVICE.gStyle.align_center,
    {height: '100%', paddingHorizontal: 15},
  ],
  con_column_tracking: {flex: 1, width: 1, backgroundColor: COLOR.primaryApp},
  con_column_tracking_inActive: {
    flex: 1,
    width: 1,
    backgroundColor: COLOR.text_2,
  },
  con_tracking_title: [{flex: 1}],
  con_tracking_time: [{flex: 0.2, justifyContent: 'flex-start'}],

  con_item: [DEVICE.gStyle.row_align_center, DEVICE.gStyle.flex_1],

  txt_step_tracking_active: [
    DEVICE.initFont.XXX_SMALL,
    {
      width: Helpers.wS('3%'),
      height: Helpers.wS('3%'),
      borderRadius: Helpers.wS(Helpers.wS('3%')),
      backgroundColor: COLOR.primaryApp,
      color: '#ffffff',
    },
  ],
  txt_step_tracking_inActive: [
    DEVICE.initFont.XXX_SMALL,
    {
      width: Helpers.wS('3%'),
      height: Helpers.wS('3%'),
      borderRadius: Helpers.wS(Helpers.wS('3%')),
      backgroundColor: COLOR.backgroundMain,
      color: COLOR.text_2,
      borderColor: COLOR.text_2,
      borderWidth: 1,
    },
  ],
  txt_tracking_title_active: [
    DEVICE.initFont.X_SMALL,
    {paddingBottom: 20, color: COLOR.primaryApp, fontFamily: DEVICE.fontBold},
  ],
  txt_tracking_title_inActive: [
    DEVICE.initFont.X_SMALL,
    {color: COLOR.text_2, paddingBottom: 20},
  ],
  txt_header_tracking: [
    DEVICE.initFont.MEDIUM,
    {color: COLOR.primaryApp, fontFamily: DEVICE.fontBold, padding: 10},
  ],
  txt_tracking_time: [
    DEVICE.initFont.X_SMALL,
    {paddingBottom: 2, color: COLOR.primaryApp, marginTop: -5},
  ],
  txt_tracking_description: [DEVICE.initFont.XXX_SMALL, {color: COLOR.text_2}],
  txt_no_data: {
    color: COLOR.borderColor,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(12),
    marginTop: 10,
  },
});

export default styles;
