/**
 * @Description: Side Menu Style
 * @Created by ZiniTeam
 * @Date create: 15/01/2020
 */
/** COMMON */
import {DEVICE, COLOR, CONFIG} from '../../../config';
import CommonStyle from '../../../helpers/common-style';
import Helpers from '../../../helpers';
import {Platform, StyleSheet} from 'react-native';

const styles = Object.assign({}, CommonStyle, {
  con: {flex: 1, backgroundColor: COLOR.bgGrey},
  con_header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 0.4,
    borderBottomColor: COLOR.borderColor,
    backgroundColor: COLOR.backgroundSec,
  },
  con_list_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  con_border_ios: {
    borderWidth: 1,
    borderColor: COLOR.borderColor,
    borderStyle: 'dashed',
    marginVertical: 15,
    borderRadius: 5,
  },
  con_border_android: {
    borderWidth: 1.5,
    borderColor: COLOR.borderColor,
    borderStyle: 'dashed',
    borderRadius: 1,
    height: 1,
    marginVertical: 15,
  },
  con_avatar: {
    borderColor: COLOR.borderColor,
    borderWidth: 1,
    borderRadius: Helpers.bR(Helpers.wS('13%')),
    overflow: 'hidden',
    width: Helpers.wS('13%'),
    height: Helpers.wS('13%'),
    backgroundColor: '#fff',
  },
  avatar: {
    width: Helpers.wS('13%'),
    height: Helpers.wS('13%'),
    backgroundColor: '#fff',
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  //ITEM ROW
  content: {
    padding: 10,
    borderRadius: 5,
  },
  con_info_bank: {
    alignItems: 'flex-start',
    borderColor: COLOR.borderColorSec,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#ffffff',
  },
  con_button_payment: {padding: 10, justifyContent: 'flex-end'},
  con_title_left_item: {
    flex: 0.68,
  },
  con_title_right_item: {flex: 0.32, alignItems: 'flex-end'},
  rowItemStudent: {paddingHorizontal: 15},
  rowItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.borderColorSec,
  },
  itemCon: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  txtListFeeInvoice: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    color: COLOR.txt_3,
  },
  txt_total: [DEVICE.initFont.XXX_SMALL, {fontFamily: DEVICE.fontMedium}],
  txtListStudent: {
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(17),
    color: COLOR.primaryApp,
  },
  txt_title_item: [
    DEVICE.initFont.X_SMALL,
    {
      fontFamily: DEVICE.fontBold,
      color: COLOR.txtColor,
      textTransform: 'uppercase',
      fontWeight: 700,
    },
  ],
  txt_content_item: [
    DEVICE.initFont.XXX_SMALL,
    {fontFamily: DEVICE.fontMedium},
  ],
  txt_price_item: [DEVICE.initFont.MEDIUM, {fontFamily: DEVICE.fontBold}],
  txt_title_left_item: [DEVICE.initFont.XXX_SMALL, {paddingVertical: 10}],
  txt_res_right_item: [
    DEVICE.initFont.XXX_SMALL,
    {fontFamily: DEVICE.fontRegular, fontWeight: 700},
  ],
  txt_res_right_time: [DEVICE.initFont.X_SMALL],
  txtNameStudent: [DEVICE.initFont.SMALL, {marginLeft: 10}],
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
  txt_error: [
    DEVICE.initFont.X_SMALL,
    {
      color: COLOR.txtError,
      padding: 10,
    },
  ],
  // MODAL
  con_bg_modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    justifyContent: 'flex-end',
  },
  con_modal: {
    backgroundColor: COLOR.backgroundMain,
    borderRadius: 10,
    padding: 10,
    marginTop: 0,
  },
  modal_title: [DEVICE.initFont.SMALL, {textAlign: 'left', fontWeight: 'bold'}],
  modal_method: {
    // height: Helpers.wS('16%'),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  textMethod: [DEVICE.initFont.X_SMALL, {paddingLeft: 15}],
  bankInfo: {},
  bankText: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(14),
    color: COLOR.text_2,
  },
  bank: {paddingVertical: 5},
  note: {
    borderWidth: 1,
    borderColor: COLOR.borderColor,
    height: Helpers.wS('20%'),
    borderRadius: 5,
    textAlignVertical: 'top',
    paddingLeft: 15,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(14),
    color: COLOR.txt_3,
  },
  con_status: {
    backgroundColor: COLOR.txtError,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt_status: [
    DEVICE.initFont.XXX_SMALL,
    {color: '#ffffff', fontWeight: 'bold'},
  ],

  card_info: {
    // width: DEVICE.width - 36,
    // height: 200,
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLOR.borderColorSec,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(208, 231, 235, 0)',
    alignItems: 'flex-start',
    // width: DEVICE.width - 36,
    // height: 200,
  },
  con_card: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
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
  },
});

export default styles;
