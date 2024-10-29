/**
 * @Description: Attendance Screen Layout
 * @Created by ZiniTeam
 * @Date create: 25/03/2019
 */
import {Platform} from 'react-native';
/** COMMON */
import {DEVICE, COLOR} from '../../config';
import CommonStyle from '../../helpers/common-style';
import Helpers from '../../helpers';

const styles = Object.assign({}, CommonStyle, {
  con: {flex: 1, backgroundColor: COLOR.backgroundMain},

  //ITEM ROW
  con_header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Helpers.wS('18%'),
    backgroundColor: COLOR.backgroundMain,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: COLOR.borderColor,
  },
  rowItemStudent: {
    flexDirection: 'row',
    height: Helpers.wS('16%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  //Avatar
  avatarArea: {marginRight: 10},
  avatarStudent: {
    width: Helpers.wS('13%'),
    height: Helpers.wS('13%'),
  },
  //Name
  nameArea: {
    borderBottomWidth: 0.4,
    borderBottomColor: COLOR.borderColor,
    height: '100%',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
  },
  txtNameStudent: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    color: COLOR.txt_3,
    flex: 1,
  },

  selectedBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingLeft: 10,
    width: DEVICE.width,
    height: Helpers.wS('10.66%'),
    backgroundColor: 'rgba(0, 0, 0, .5)',
    justifyContent: 'center',
    zIndex: 3,
  },
  txtSelected: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    color: '#ffffff',
  },
  modalChooseClass: {
    flex: 1,
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
  //Name
  nameClass: {
    flexDirection: 'row',
    borderBottomWidth: 0.4,
    borderBottomColor: COLOR.borderColor,
    height: '100%',
    alignItems: 'center',
    width: '100%',
  },
  txtNameClass: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    color: COLOR.txt_3,
    marginLeft: 10,
  },
  //ITEM ROW
  rowItemClass: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: Helpers.wS('16%'),
    backgroundColor: COLOR.backgroundMain,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  txt_empty: {
    color: COLOR.borderColor,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(12),
    marginTop: 10,
  },
  txt_open_calendar: [
    DEVICE.initFont.X_SMALL,
    {color: COLOR.primaryButton, fontFamily: DEVICE.fontRegular},
  ],

  btnArea: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnHeader: {
    borderWidth: 0.6,
    borderColor: COLOR.borderColor,
    borderRadius: 5,
    width: Helpers.wS('16%'),
    paddingVertical: 7,
    alignItems: 'center',
  },
  txtTextHeader: {
    color: COLOR.placeholderTextColor,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
  },
  txtTextHeaderNotCurr: {
    color: 'black',
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
  },

  img_item: {
    borderWidth: 1,
    borderColor: COLOR.borderColor,
    borderRadius: Helpers.bR(Helpers.wS('13%')),
    overflow: 'hidden',
    width: Helpers.wS('13%'),
    height: Helpers.wS('13%'),
  },

  con_history_btn: {
    width: Helpers.wS('16%'),
    paddingVertical: 7,
    alignItems: 'center',
  },
  con_history_btn_row: {flexDirection: 'row', alignItems: 'center'},

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
