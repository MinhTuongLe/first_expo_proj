/**
 ** FileName:
 ** FileAuthor:
 ** FileCreateAt:
 ** FileDescription:
 **/
/* LIBRARY */
import {StyleSheet} from 'react-native';
/** COMMON */
import CommonStyle from '../../../helpers/common-style';
import {DEVICE, COLOR, CONFIG} from '../../../config';
import Helpers from '../../../helpers';

export default styles = Object.assign({}, CommonStyle, {
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
    zIndex: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  p_15: {padding: 15},
  con: {flex: 1, backgroundColor: COLOR.bgGrey},
  con_error: {flexDirection: 'row', alignItems: 'center', marginTop: 20},
  con_invoice: {
    borderColor: COLOR.borderColor,
    borderWidth: 0.4,
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    backgroundColor: COLOR.backgroundMain,
  },
  content: {flex: 1, padding: 15},
  submit_group_submit: {
    width: '100%',
    borderRadius: Helpers.wS('12.8%') / 2,
    backgroundColor: COLOR.primaryButton,
    height: Helpers.wS('12.8%'),
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: Helpers.fS(18),
    fontFamily: DEVICE.fontBold,
  },
  con_row_init: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  con_bg_popup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.bgLoading,
  },
  con_content_popup: {
    padding: 15,
    borderRadius: 5,
    width: Helpers.wS('70%'),
    backgroundColor: COLOR.backgroundMain,
    alignItems: 'center',
    justifyContent: 'space-around',
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
    textAlign: 'center',
  },
  txt_label_card: {
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(16),
    color: COLOR.text_1,
  },
  txt_input_card: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    color: COLOR.text_2,
  },
  txt_title: [DEVICE.initFont.SMALL, {fontFamily: DEVICE.fontBold}],
  txt_title_2: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    color: COLOR.text_1,
  },
  txt_result: {
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(16),
    color: COLOR.text_1,
    width: Helpers.wS('50%'),
    textAlign: 'right',
  },
});
