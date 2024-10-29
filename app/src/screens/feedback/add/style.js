/**
 * @Description:
 * @Created by ZiniTeam
 * @Date create:
 */
/** LIBRARY */
import CommonStyle from '../../../helpers/common-style';
/** COMMON */
import {COLOR, DEVICE} from '../../../config';
import {Platform} from 'react-native';
import Helpers from '../../../helpers';

const styles = Object.assign({}, CommonStyle, {
  con: [DEVICE.gStyle.flex_1, {backgroundColor: COLOR.backgroundMain}],
  content: {flex: 1, padding: 10, paddingBottom: 20},
  con_block: [
    DEVICE.gStyle.row_align_center,
    {borderBottomWidth: 1, borderBottomColor: COLOR.borderColorSec},
  ],
  submit_group_submit: [
    DEVICE.initFont.SMALL,
    {
      width: '100%',
      borderRadius: Helpers.bR(5),
      backgroundColor: COLOR.primaryButton,
      height: Helpers.wS('12.8%'),
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: DEVICE.fontBold,
    },
  ],
  con_loading: {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    alignSelf: 'center',
  },
  con_check_principal: [
    DEVICE.gStyle.row_align_center,
    {
      paddingVertical: 15,
      marginVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: COLOR.borderColorSec,
    },
  ],
  con_footer: {marginHorizontal: 15, marginBottom: 15},
  con_des: [
    {
      borderRadius: 5,
      borderColor: COLOR.borderColorSec,
      borderWidth: 1,
      height: 120,
      backgroundColor: COLOR.backgroundSec,
      padding: 10,
    },
  ],

  txt_block_title: [DEVICE.initFont.X_SMALL, {fontWeight: 'bold'}],
  txt_title: [DEVICE.initFont.X_SMALL, {flex: 1, padding: 10, width: '70%'}],
  txt_des: [DEVICE.initFont.X_SMALL, {flex: 1}],
  txt_error: [
    DEVICE.initFont.X_SMALL,
    {color: COLOR.primaryTextNote, paddingBottom: 10},
  ],
  txt: [DEVICE.initFont.X_SMALL, {paddingLeft: 10}],

  //ITEM ROW
  con_item: [
    DEVICE.gStyle.align_center,
    {
      width: Helpers.wS('22%'),
      marginRight: 10,
      padding: 5,
      borderRadius: 5,
      overflow: 'hidden',
    },
  ],
  con_avatar: {
    borderRadius: Helpers.bR(Helpers.wS('13%')),
    overflow: 'hidden',
    width: Helpers.wS('13%'),
    height: Helpers.wS('13%'),
    borderWidth: 1,
    borderColor: COLOR.placeholderTextColor,
  },
  con_icon: {position: 'absolute', right: 5, top: 0},

  txt_name: [
    DEVICE.initFont.XXX_SMALL,
    {fontFamily: DEVICE.fontMedium, textAlign: 'center'},
  ],
});

export default styles;
