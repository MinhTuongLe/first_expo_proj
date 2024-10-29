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
  con: {flex: 1, backgroundColor: COLOR.backgroundMain},
  con_loading: [DEVICE.gStyle.center, {flex: 1}],
  con_separator_item: {
    height: '100%',
    width: 1,
    backgroundColor: COLOR.primaryButton,
    marginHorizontal: 10,
  },
  con_avatar: {
    width: Helpers.wS('10%'),
    height: Helpers.wS('10%'),
    borderRadius: Helpers.bR(Helpers.wS('10%')),
    overflow: 'hidden',
  },
  con_drove_kid: [{paddingHorizontal: 10}],
  con_pick_up_kid: {paddingHorizontal: 10},
  con_not_info: [
    DEVICE.gStyle.center,
    {height: Helpers.wS('30%'), backgroundColor: COLOR.backgroundMain},
  ],

  txt_no_data: {
    color: COLOR.borderColor,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(12),
    marginTop: 10,
  },

  //HEADER LIST
  con_header_content: [
    DEVICE.gStyle.row_align_center,
    {
      justifyContent: 'space-evenly',
      paddingVertical: 10,
      alignItems: 'flex-start',
    },
  ],
  con_header_item: [DEVICE.gStyle.align_center, {flex: 0.25}],
  con_header_item_center: [DEVICE.gStyle.align_center, {flex: 0.5}],
  txt_header_content: [DEVICE.initFont.XX_SMALL, {marginTop: 10}],
  txt_header_title: [
    DEVICE.initFont.X_SMALL,
    {fontFamily: DEVICE.fontMedium, marginTop: 10, textAlign: 'center'},
  ],

  img_header_item: {
    height: Helpers.wS('10%'),
    width: Helpers.wS('10%'),
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
    {width: '100%', justifyContent: 'flex-start', paddingVertical: 10},
  ],
  nameIconArea: [
    DEVICE.gStyle.row_align_center,
    {
      height: '100%',
      flex: 1,
    },
  ],

  note_ref: [
    DEVICE.initFont.X_SMALL,
    {
      height: Helpers.wS('20%'),
      borderWidth: 0.4,
      borderColor: COLOR.inactiveTintColor,
      borderRadius: 5,
      paddingHorizontal: 15,
      paddingVertical: 5,
      marginVertical: 10,
      textAlignVertical: 'top',
      marginHorizontal: 10,
    },
  ],

  avatarParent: {width: Helpers.wS('10%'), height: Helpers.wS('10%')},

  nameArea: {flex: 1, justifyContent: 'center'},
  txtNameStudent: [DEVICE.initFont.XX_SMALL, {fontFamily: DEVICE.fontBold}],
  txtNamePickup: [DEVICE.initFont.XXX_SMALL, {textTransform: 'capitalize'}],
  txtListStudent: [
    DEVICE.initFont.XX_SMALL,
    {
      fontFamily: DEVICE.fontBold,
      color: COLOR.primaryApp,
      paddingTop: 5,
      marginBottom: 10,
      fontWeight: 'bold',
    },
  ],

  con_time: {
    backgroundColor: COLOR.primaryButton,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  txt_time: {color: '#ffffff', fontFamily: DEVICE.fontBold},
});

export default styles;
