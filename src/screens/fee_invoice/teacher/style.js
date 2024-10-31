/**
 * @Description: Side Menu Style
 * @Created by ZiniTeam
 * @Date create: 17/01/2019
 */
/** COMMON */
import {DEVICE, COLOR} from '../../../config';
import Helpers from '../../../helpers';
import CommonStyle from '../../../helpers/common-style';

const styles = Object.assign({}, CommonStyle, {
  con: {flex: 1, backgroundColor: COLOR.backgroundMain},
  titleBox: {
    height: Helpers.wS('10.66%'),
    backgroundColor: COLOR.backgroundMain,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtTitleBox: {
    color: COLOR.primaryApp,
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(16),
    paddingTop: 15,
  },
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
    backgroundColor: '#fff',
    borderRadius: Helpers.bR(Helpers.wS('13%')),
    overflow: 'hidden',
  },
  con_not_info: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    height: DEVICE.height - Helpers.hS('7%') - CommonStyle.statusBarHeight,
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

  listStudentContent: {paddingHorizontal: 10},
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
    width: Helpers.wS('13%'),
    height: Helpers.wS('13%'),
    backgroundColor: '#fff',
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

  //MODAL
  modalChooseClass: {
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  boxTitle: {height: Helpers.wS('10.66%'), paddingTop: 13},
  txtTitleModal: {
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(16),
    color: COLOR.txt_3,
  },

  sortChoose: {flexDirection: 'row', justifyContent: 'flex-start'},
  sortItem: {
    height: Helpers.wS('10.66%'),
    paddingHorizontal: 10,
    marginTop: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLOR.borderColor,
    borderRadius: 7,
    justifyContent: 'center',
  },
  txtSortItem: {
    fontSize: Helpers.fS(16),
    fontFamily: DEVICE.fontMedium,
    color: COLOR.txt_3,
  },

  txt_empty_student: {
    color: COLOR.borderColor,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(12),
    marginTop: 10,
  },
});

export default styles;
