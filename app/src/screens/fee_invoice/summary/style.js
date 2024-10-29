/**
 ** FileName:
 ** FileAuthor:
 ** FileCreateAt:
 ** FileDescription:
 **/
/** LIBRARY */
import {StyleSheet} from 'react-native';
/* COMMON */
import {DEVICE, COLOR} from '../../../config';
import CommonStyle from '../../../helpers/common-style';
import Helpers from '../../../helpers';

export default styles = Object.assign({}, CommonStyle, {
  loading: [
    DEVICE.gStyle.full_center,
    {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(0,0,0,.5)',
      zIndex: 100,
    },
  ],
  con: {flex: 1, backgroundColor: COLOR.backgroundMain},
  con_row_init: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  con_separator: {borderBottomWidth: 1, borderBottomColor: COLOR.borderColor},
  con_border_ios: {
    borderWidth: 1,
    borderColor: COLOR.borderColor,
    borderStyle: 'dashed',
    margin: 10,
    borderRadius: 5,
  },
  con_border_android: {
    borderWidth: 1.5,
    borderColor: COLOR.borderColor,
    borderStyle: 'dashed',
    borderRadius: 1,
    height: 1,
    margin: 10,
  },
  con_input_note: {
    borderWidth: 1,
    borderColor: COLOR.borderColor,
    height: Helpers.wS('30%'),
    borderRadius: 5,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    color: COLOR.txt_3,
  },
  con_button: [
    DEVICE.gStyle.center,
    {
      borderRadius: Helpers.wS('12.8%') / 2,
      backgroundColor: COLOR.primaryButton,
      height: Helpers.wS('12.8%'),
      fontSize: Helpers.fS(18),
      fontFamily: DEVICE.fontBold,
    },
  ],

  txt_title_left_item: [DEVICE.initFont.SMALL, {color: COLOR.text_2}],
  txt_res_right_item: [DEVICE.initFont.SMALL, {}],
  txt_title: {
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(18),
    color: 'black',
    padding: 10,
  },
  txt_title_2: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    color: COLOR.text_1,
  },
  txt_result: {
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(16),
    color: COLOR.txtColor,
    flex: 1,
    textAlign: 'right',
  },
  txt_error: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    color: 'red',
    marginLeft: 10,
  },
  txt_success: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    color: COLOR.primaryApp,
  },

  card_info: {
    width: DEVICE.width - 20,
    height: Helpers.wS('54.3%'),
    marginHorizontal: 10,
    borderRadius: 10,
  },
  con_card: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
  },
  con_row_card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtCard: {
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(16),
    color: '#ffffff',
  },
});
