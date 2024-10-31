/**
 * @Description: Health Screen Logic
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */

/** COMMON */
import {DEVICE, COLOR} from '../../../../config';
import CommonStyle from '../../../../helpers/common-style';
import {StyleSheet} from 'react-native';
import Helpers from '../../../../helpers';

const styles = Object.assign({}, CommonStyle, {
  /** MAIN */
  con: {flex: 1},
  txt_info_title_2: [DEVICE.initFont.X_SMALL, {fontFamily: DEVICE.fontMedium}],

  //HEADER
  con_header_month: {width: Helpers.wS('40%')},
  con_header_height: {width: Helpers.wS('35%')},
  con_header_weight: {width: Helpers.wS('25%')},

  //ITEM
  rowInfo: [DEVICE.gStyle.row],
  rowInfoMonthOld: [
    DEVICE.gStyle.row,
    {
      width: Helpers.wS('40%'),
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingVertical: 5,
    },
  ],
  rowInfoH_col: [
    DEVICE.gStyle.justify_center,
    {width: Helpers.wS('35%'), alignItems: 'flex-start', paddingVertical: 5},
  ],
  rowInfoW_col: [
    DEVICE.gStyle.justify_center,
    {width: Helpers.wS('25%'), alignItems: 'flex-start', paddingVertical: 5},
  ],
  con_item_change: [DEVICE.gStyle.row_align_center],
  con_separator: {
    width: '100%',
    height: 10,
    backgroundColor: COLOR.backgroundMain,
  },

  txtRowInfoMonthOld: [DEVICE.initFont.X_SMALL, {width: Helpers.wS('30%')}],
  txtRowInfoH_W: [DEVICE.initFont.X_SMALL, {fontFamily: DEVICE.fontMedium}],
  txtInfoChanged: [DEVICE.initFont.XX_SMALL],
  header_title: [
    DEVICE.initFont.XX_SMALL,
    {color: COLOR.primaryApp, fontFamily: DEVICE.fontBold},
  ],

  con_unit: [
    DEVICE.gStyle.row_align_center,
    {justifyContent: 'flex-end', paddingBottom: 10},
  ],
  con_chart: {margin: 10},
  con_item: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  con_bg_picker_ios: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  con_content_picker_ios: {height: 200, width: DEVICE.width},
  con_header_picker_ios: {
    height: 50,
    borderTopWidth: 0.4,
    borderTopColor: COLOR.borderColor,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  con_picker_android: {
    height: 35,
    width: Helpers.wS('45%'),
    alignItems: 'flex-end',
  },
  con_picker_ios: {
    backgroundColor: '#ffffff',
    borderTopWidth: 0.4,
    borderTopColor: COLOR.borderColor,
    paddingBottom: 25,
  },
  con_picker_main: {
    borderWidth: 0.5,
    alignSelf: 'flex-end',
    flex: 0.4,
    borderRadius: 5,
    height: 36,
    justifyContent: 'center',
  },
  con_bg_grey: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,.5)',
  },

  con_empty: {
    color: COLOR.placeholderTextColor,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    marginTop: 20,
  },

  txt_item_title: {
    color: 'black',
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(16),
  },
  txt_item_result: {
    color: COLOR.primaryButton,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
  },
  txt_item_picker: {
    color: 'black',
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(18),
  },
  txt_header_picker_ios_left: {
    color: COLOR.primaryApp,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
  },
  txt_header_picker_ios_right: {
    color: COLOR.primaryApp,
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(16),
  },

  txtLabelChart: [
    DEVICE.initFont.XXX_SMALL,
    {color: COLOR.placeholderTextColor},
  ],
  txt_unit: [DEVICE.initFont.XX_SMALL],
});

export default styles;
