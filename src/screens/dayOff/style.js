/**
 * @Description: Styles Absent Screen
 * @Created by ZiniTeam
 * @Date create: 23/01/2019
 */
import {Platform} from 'react-native';
/** COMMON */
import {DEVICE, COLOR} from '../../config';
import CommonStyle from '../../helpers/common-style';
import Helpers from '../../helpers';

const styles = Object.assign({}, CommonStyle, {
  con: {flex: 1, backgroundColor: '#ffffff'},
  con_content: {
    paddingHorizontal: 10,
    backgroundColor: COLOR.backgroundMain,
    paddingBottom: 10,
  },
  con_choose_option: {
    height: DEVICE.s * 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  con_info: {},
  con_from_to: {},
  con_from: {},
  con_fromto_touch: {
    backgroundColor: COLOR.backgroundColorNote,
    width: Helpers.wS('31%'),
  },
  con_message: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLOR.borderColor,
    padding: 10,
  },
  con_info_day_off: {height: Helpers.fS(50), justifyContent: 'flex-start'},

  txt_fromto_title: {
    color: 'black',
    fontSize: Helpers.fS(16),
    fontFamily: DEVICE.fontRegular,
  },
  txt_fromto: {
    color: 'black',
    fontSize: Helpers.fS(16),
    fontFamily: DEVICE.fontRegular,
  },
  txt_message: {
    color: 'black',
    fontSize: Helpers.fS(16),
    fontFamily: DEVICE.fontLight,
    flex: 1,
  },
  txt_count_day_off: {
    color: 'black',
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(16),
  },
  txt_error: {
    color: 'red',
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
  },

  btn_done: {
    borderRadius: Helpers.wS('8%'),
    backgroundColor: COLOR.primaryButton,
    height: Helpers.wS('13%'),
    width: Helpers.wS('50%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  //button submit
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

  //ITEM ROW
  rowItemStudent: {
    flexDirection: 'row',
    height: Helpers.wS('16%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  //Avatar
  avatarArea: {marginRight: 10},
  avatarStudent: {
    width: Helpers.wS('8.53%'),
    height: Helpers.wS('8.53%'),
    backgroundColor: '#cccccc',
    borderRadius: Helpers.wS('8.53%') / 2,
  },
  //Name
  nameArea: {
    borderBottomWidth: 0.4,
    borderBottomColor: COLOR.borderColor,
    height: '100%',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  txtNameStudent: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    color: COLOR.txt_3,
  },

  //modal select student
  modalChooseClass: {
    flex: 1,
    width: DEVICE.width,
    height: DEVICE.height,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    backgroundColor: COLOR.cloGdaBannerItem,
  },
  boxContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    height: Helpers.hS('40%'),
    marginBottom: Platform.OS == 'ios' ? 15 : 35,
  },
  boxTitle: {height: Helpers.wS('10.66%'), paddingTop: 13},
  txtTitleBox: {
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(16),
    color: COLOR.txt_3,
  },
});

export default styles;
