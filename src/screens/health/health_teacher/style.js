/**
 * @Description: Health Screen Logic
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
import {Platform} from 'react-native';
/** COMMON */
import {DEVICE, COLOR} from '../../../config';
import CommonStyle from '../../../helpers/common-style';
import Helpers from '../../../helpers';

const styles = Object.assign({}, CommonStyle, {
  con: {flex: 1, backgroundColor: COLOR.backgroundMain},
  con_left_row_student: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  con_avatar: {
    borderColor: COLOR.borderColor,
    borderWidth: 1,
    width: Helpers.wS('13%'),
    height: Helpers.wS('13%'),
    borderRadius: Helpers.bR(Helpers.wS('13%')),
    overflow: 'hidden',
  },
  titleBox: {
    justifyContent: 'center',
    elevation: 5,
    shadowColor: 'grey',
    shadowOffset: {height: 3, width: 3},
    shadowOpacity: 0.3,
  },
  txtTitleBox: {
    color: COLOR.primaryApp,
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(16),
    paddingTop: 15,
  },

  con_not_info: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt_not_info: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    color: COLOR.txtColor,
    marginTop: 20,
  },

  //SEARCH
  searchBox: {backgroundColor: '#ffffff', padding: 10},
  searchContent: {
    width: '100%',
    height: Helpers.wS('10.66%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLOR.borderColor,
    borderRadius: Helpers.bR(15),
    paddingHorizontal: 10,
  },
  searchStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
  },

  listStudentContent: {paddingHorizontal: 15, paddingBottom: 15, zIndex: 0},
  //ITEM ROW
  rowItemStudent: {
    flex: 1,
    flexDirection: 'row',
    height: Helpers.wS('16%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  //Avatar
  avatarArea: {marginRight: 15, overflow: 'hidden'},
  avatarStudent: {
    width: Helpers.wS('13%'),
    height: Helpers.wS('13%'),
    borderRadius: Helpers.bR(Helpers.wS('13%')),
  },
  //Name
  nameArea: {
    borderBottomWidth: 0.4,
    borderBottomColor: COLOR.borderColor,
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  txtNameStudent: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    color: COLOR.txt_3,
  },
  txtInfoStudent: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(10),
    color: COLOR.txt_3,
  },
  /**
   * INFO HEALTH
   */
  dayChoose: {
    height: Helpers.fS(50),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayChooseLeft: {flexDirection: 'row', alignItems: 'center'},
  areaInput: [
    DEVICE.initFont.X_SMALL,
    {
      borderWidth: 1,
      borderColor: COLOR.borderColor,
      borderRadius: Helpers.bR(10),
      height: Helpers.wS('21.33%'),
      padding: 10,
      marginBottom: 20,
    },
  ],
  btnUpdate: {
    borderRadius: Helpers.wS('8%'),
    backgroundColor: COLOR.primaryButton,
    height: Helpers.wS('16%'),
    width: Helpers.wS('80%'),
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: Helpers.fS(20),
  },
  //TAB HEALTHY
  con_tab: {
    height: Helpers.hS('7%'),
    width: DEVICE.width - 20,
    flexDirection: 'row',
    backgroundColor: COLOR.backgroundMain,
    borderRadius: 10,
    overflow: 'hidden',
  },
  con_tab_global: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: COLOR.backgroundSec,
    padding: 5,
  },
  txt_title: {
    marginLeft: 10,
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(16),
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

  modalChooseClass: {
    flex: 1,
    width: DEVICE.width,
    height: DEVICE.height,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,.5)',
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
  boxTitle: {
    height: Helpers.wS('10.66%'),
    paddingTop: 13,
    elevation: 5,
    shadowColor: 'grey',
    shadowOffset: {height: 3, width: 3},
    shadowOpacity: 0.3,
  },
  txtTitleBox: {
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(16),
    color: COLOR.txt_3,
    marginLeft: 15,
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
  //ITEM ROW
  rowItemClass: {
    height: Helpers.wS('16%'),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  txt_empty_data: {
    color: COLOR.placeholderTextColor,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    marginTop: 20,
  },
  txt_empty_student: {
    color: COLOR.placeholderTextColor,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    marginTop: 20,
  },
});

export default styles;
