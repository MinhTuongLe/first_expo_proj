/**
 * @Description:
 * @Created by ZiniTeam
 * @Date create:
 */
import {Platform} from 'react-native';
/** COMMON */
import {DEVICE, COLOR} from '../../config';
import CommonStyle from '../../helpers/common-style';
import Helpers from '../../helpers';

const styles = Object.assign({}, CommonStyle, {
  con: [DEVICE.gStyle.flex_1, {backgroundColor: COLOR.backgroundMain}],

  //ITEM ROW
  con_header: [
    DEVICE.gStyle.row_align_center,
    DEVICE.gStyle.flex_1,
    {
      justifyContent: 'flex-end',
      height: Helpers.wS('18%'),
      backgroundColor: COLOR.backgroundMain,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 0.4,
      borderBottomColor: COLOR.borderColor,
    },
  ],
  rowItemStudent: [
    DEVICE.gStyle.row_align_center,
    {height: Helpers.wS('16%'), justifyContent: 'flex-start'},
  ],
  //Avatar
  avatarArea: {marginRight: 10},
  avatarStudent: {
    width: Helpers.wS('13%'),
    height: Helpers.wS('13%'),
  },
  //Name
  nameArea: [
    DEVICE.gStyle.row_space_between,
    DEVICE.gStyle.flex_1,
    {
      borderBottomWidth: 0.4,
      borderBottomColor: COLOR.borderColor,
      height: '100%',
      marginLeft: 15,
    },
  ],
  txtNameStudent: [DEVICE.initFont.X_SMALL, DEVICE.gStyle.flex_1],

  selectedBar: [
    DEVICE.gStyle.justify_center,
    {
      position: 'absolute',
      bottom: 0,
      left: 0,
      paddingLeft: 10,
      width: DEVICE.width,
      height: Helpers.wS('10.66%'),
      backgroundColor: 'rgba(0, 0, 0, .5)',
      zIndex: 3,
    },
  ],
  txtSelected: [DEVICE.initFont.X_SMALL, {color: '#ffffff'}],
  modalChooseClass: [
    DEVICE.gStyle.flex_1,
    {
      width: DEVICE.width,
      height: DEVICE.height,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      backgroundColor: 'rgba(0, 0, 0, .5)',
    },
  ],
  boxContent: [
    DEVICE.gStyle.flex_1,
    {
      backgroundColor: '#ffffff',
      borderRadius: 5,
      padding: 10,
      margin: 10,
      height: Helpers.hS('40%'),
      marginBottom: Platform.OS == 'ios' ? 15 : 35,
    },
  ],
  boxTitle: {height: Helpers.wS('10.66%'), paddingTop: 13},
  txtTitleBox: [DEVICE.initFont.X_SMALL, {fontFamily: DEVICE.fontBold}],
  //Name
  nameClass: [
    DEVICE.gStyle.row_align_center,
    {
      borderBottomWidth: 0.4,
      borderBottomColor: COLOR.borderColor,
      height: '100%',
      width: '100%',
    },
  ],
  txtNameClass: [DEVICE.initFont.X_SMALL, {marginLeft: 10}],
  //ITEM ROW
  rowItemClass: [
    DEVICE.gStyle.row_align_center,
    DEVICE.gStyle.flex_1,
    {
      height: Helpers.wS('16%'),
      backgroundColor: COLOR.backgroundMain,
      paddingHorizontal: 15,
      paddingTop: 10,
    },
  ],
  txt_empty: [DEVICE.gStyle.txt_no_data, {marginTop: 20}],
  txt_open_calendar: [
    DEVICE.initFont.X_SMALL,
    {color: '#2FA6DE', fontFamily: DEVICE.fontMedium},
  ],

  btnArea: [
    DEVICE.gStyle.row_align_center,
    {flex: 0.4, justifyContent: 'flex-end'},
  ],
  btnHeader: [
    DEVICE.gStyle.align_center,
    {
      borderWidth: 0.6,
      borderColor: COLOR.borderColor,
      borderRadius: 5,
      width: Helpers.wS('16%'),
      paddingVertical: 7,
    },
  ],
  txtTextHeader: [DEVICE.initFont.X_SMALL, {color: COLOR.placeholderTextColor}],
  txtTextHeaderNotCurr: [DEVICE.initFont.X_SMALL],

  img_item: {
    borderWidth: 1,
    borderColor: COLOR.borderColor,
    width: Helpers.wS('13%'),
    height: Helpers.wS('13%'),
    borderRadius: Helpers.bR(Helpers.wS('13%')),
    overflow: 'hidden',
  },

  con_history_btn: [
    DEVICE.gStyle.align_center,
    {width: Helpers.wS('16%'), paddingVertical: 7},
  ],
  con_history_btn_row: [DEVICE.gStyle.row_align_center],

  //BUTTON
  buttonArea: {paddingHorizontal: 15},
  submit_group_submit: {
    borderRadius: Helpers.wS('12.8%') / 2,
    backgroundColor: COLOR.primaryButton,
    marginVertical: 10,
    height: Helpers.wS('12.8%'),
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: Helpers.fS(18),
    fontFamily: DEVICE.fontBold,
  },
});

export default styles;
