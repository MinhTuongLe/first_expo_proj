/* eslint-disable prettier/prettier */
/**
 ** FileName:
 ** FileAuthor:
 ** FileCreateAt:
 ** FileDescription:
 **/
/** COMMON */
import {DEVICE, COLOR} from '../../../config';
import CommonStyle from '../../../helpers/common-style';
import Helpers from '../../../helpers';

const styles = Object.assign({}, CommonStyle, {
  con: [DEVICE.gStyle.flex_1, {backgroundColor: COLOR.backgroundMain}],
  con_avatar: {
    borderColor: COLOR.borderColor,
    borderWidth: 1,
    width: Helpers.wS('10%'),
    height: Helpers.wS('10%'),
    borderRadius: Helpers.bR(Helpers.wS('10%')),
    overflow: 'hidden',
  },

  //HEADER LIST
  con_header_list: [DEVICE.gStyle.shadow, {backgroundColor: '#ffffff'}],
  con_header_content: [
    DEVICE.gStyle.row_align_center,
    DEVICE.gStyle.shadow,
    {
      justifyContent: 'space-evenly',
      paddingVertical: 10,
      alignItems: 'flex-start',
    },
  ],
  con_header_item: [DEVICE.gStyle.align_center, {flex: 0.25}],
  con_header_item_center: [DEVICE.gStyle.align_center, {flex: 0.5}],
  con_avatar_student: {borderRadius: Helpers.bR(Helpers.wS('15%'))},

  txt_header_content: [DEVICE.initFont.XX_SMALL, {marginTop: 10}],
  txt_header_title: [
    DEVICE.initFont.X_SMALL,
    {fontFamily: DEVICE.fontMedium, marginTop: 10, textAlign: 'center'},
  ],

  img_header_item: {
    width: Helpers.wS('10%'),
    height: Helpers.wS('10%'),
    borderRadius: Helpers.bR(Helpers.wS('10%')),
  },
  avatarStudent: {
    height: Helpers.wS('15%'),
    width: Helpers.wS('15%'),
    borderRadius: Helpers.bR(Helpers.wS('15%')),
    borderWidth: 1,
    borderColor: COLOR.borderColor,
  },

  //ITEM ROW
  rowItemStudent: [
    DEVICE.gStyle.row_align_center,
    {
      flex: 1,
      paddingHorizontal: 15,
      height: Helpers.wS('16%'),
      width: '100%',
      justifyContent: 'flex-start',
    },
  ],
  nameIconArea: [
    DEVICE.gStyle.row_align_center,
    {
      borderBottomWidth: 0.4,
      borderBottomColor: COLOR.borderColor,
      height: '100%',
      flex: 1,
    },
  ],
  con_header_list_parent: {
    height: Helpers.wS('15%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  avatarParent: {
    width: Helpers.wS('10%'),
    height: Helpers.wS('10%'),
    borderRadius: Helpers.bR(Helpers.wS('10%')),
  },

  nameArea: [DEVICE.gStyle.justify_center, DEVICE.gStyle.flex_1],
  txtNameStudent: [DEVICE.initFont.X_SMALL],
  txtNamePickup: [DEVICE.initFont.XXX_SMALL],
  txtListStudent: [
    DEVICE.initFont.SMALL,
    {fontFamily: DEVICE.fontBold, color: COLOR.primaryApp},
  ],
  //BUTTON
  buttonArea: {paddingHorizontal: 15, flex: 1, justifyContent: 'flex-end'},
  submit_group_submit: {
    borderRadius: Helpers.wS('12.8%') / 2,
    backgroundColor: COLOR.primaryButton,
    marginBottom: 10,
    width: Helpers.wS('100%') - 30,
    height: Helpers.wS('12.8%'),
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: Helpers.fS(18),
    fontFamily: DEVICE.fontBold,
  },
  submit_group_update: {
    borderRadius: Helpers.wS('12.8%') / 2,
    backgroundColor: COLOR.primaryButton,
    marginBottom: 10,
    width: Helpers.wS('50%') - 20,
    height: Helpers.wS('12.8%'),
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: Helpers.fS(18),
    fontFamily: DEVICE.fontBold,
  },
  submit_group_back: {
    borderRadius: Helpers.wS('12.8%') / 2,
    backgroundColor: COLOR.inactiveTintColor,
    marginBottom: 10,
    width: Helpers.wS('50%') - 20,
    height: Helpers.wS('12.8%'),
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: Helpers.fS(18),
    fontFamily: DEVICE.fontBold,
  },

  txt_no_data: {
    color: COLOR.borderColor,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(12),
    marginTop: 10,
  },
  note_ref: [
    DEVICE.initFont.X_SMALL,
    {
      flex: 1,
      borderWidth: 0.4,
      borderColor: COLOR.borderColor,
      borderRadius: 5,
      paddingHorizontal: 15,
      paddingVertical: 5,
      marginHorizontal: 15,
      marginVertical: 10,
      textAlignVertical: 'top',
      height: Helpers.wS('25%'),
      marginBottom: 70,
    },
  ],

  txtError: [
    DEVICE.initFont.X_SMALL,
    {color: COLOR.txtError, paddingVertical: 10},
  ],
  txtSuccess: [
    DEVICE.initFont.X_SMALL,
    {color: COLOR.primaryApp, paddingVertical: 10},
  ],
});
export default styles;
