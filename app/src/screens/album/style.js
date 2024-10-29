/**
 * @Description: Home Screen Style
 * @Created by ZiniTeam
 * @Date create: 18/01/2019
 */
/** COMMON */
import {DEVICE, COLOR} from '../../config';
import CommonStyle from '../../helpers/common-style';
import Helpers from '../../helpers';
import {darkColors} from '../../components/config';

const styles = Object.assign({}, CommonStyle, {
  con: {flex: 1, backgroundColor: COLOR.backgroundMain},
  txt_title: [
    DEVICE.initFont.X_SMALL,
    {
      fontFamily: DEVICE.fontBold,
      textAlignVertical: 'center',
    },
  ],
  img_album: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  con_album_item: [
    // DEVICE.gStyle.shadow,
    CommonStyle.mb_15,
    CommonStyle.mh_10,
    {
      borderWidth: 1,
      borderColor: darkColors.colors.grey2,
      paddingHorizontal: 0,
      borderRadius: 5,
      backgroundColor: COLOR.backgroundSec,
    },
  ],
  con_album_title: {
    paddingHorizontal: 10,
  },

  //NO DATA
  con_empty_comment: [
    DEVICE.gStyle.full_center,
    {height: 150, width: DEVICE.width - 20},
  ],
  emptyDate: [DEVICE.gStyle.align_center, {marginTop: (DEVICE.width * 1) / 3}],
  txt_no_data: [
    DEVICE.initFont.X_SMALL,
    {color: COLOR.placeholderTextColor, marginTop: 20},
  ],
  txt_no_comment_1: {
    color: COLOR.borderColor,
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(16),
    marginTop: 10,
  },
  txt_no_comment_2: {
    color: COLOR.borderColor,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(12),
    marginTop: 10,
  },

  // Action Btn
  con_action_btn: [
    DEVICE.gStyle.center,
    {
      position: 'absolute',
      bottom: Helpers.hS('5%'),
      right: Helpers.hS('5%'),
      height: Helpers.wS('10%'),
      width: Helpers.wS('10%'),
      borderRadius: Helpers.bR(Helpers.wS('10%')),
      backgroundColor: COLOR.primaryButton,
    },
  ],
  con_icon_add: {
    height: Helpers.fS(28),
    width: Helpers.fS(28),
    borderRadius: Helpers.bR(Helpers.fS(28)),
    backgroundColor: '#ffffff',
    padding: 2,
  },

  /** ALBUM DETAIL */
  d_con: [DEVICE.gStyle.flex_1, {backgroundColor: COLOR.backgroundMain}],
  d_con_content: {},
  d_con_flist_thumb: [DEVICE.gStyle.column],
  d_con_info: {paddingHorizontal: 10},
  d_con_action: [DEVICE.gStyle.row, {paddingTop: 10}],
  d_con_action_1: [
    DEVICE.gStyle.row,
    DEVICE.gStyle.center,
    {flex: 0.5, paddingVertical: 5},
  ],
  d_con_flist_cmt: [DEVICE.gStyle.column],
  d_con_input: [
    DEVICE.gStyle.row,
    DEVICE.gStyle.center,
    {
      height: Helpers.hS('6%'),
      width: DEVICE.width,
      backgroundColor: '#ffffff',
      borderTopColor: COLOR.borderColor,
      borderTopWidth: 0.5,
    },
  ],

  d_img_album: {height: Helpers.wS('23%'), width: Helpers.wS('23%')},

  d_txt_title: [
    DEVICE.initFont.X_SMALL,
    {fontFamily: DEVICE.fontMedium, marginTop: 5},
  ],
  d_txt_time: [DEVICE.initFont.XXXX_SMALL, {color: COLOR.text_1, marginTop: 2}],
  d_txt_owner: [
    DEVICE.initFont.XXXX_SMALL,
    {color: COLOR.primaryApp, marginTop: 2},
  ],
  d_txt_info_item: [DEVICE.initFont.XX_SMALL],
  d_txt_input: [
    DEVICE.initFont.XX_SMALL,
    {marginLeft: 10, marginRight: 10, width: Helpers.wS('86%')},
  ],

  d_seperator_line: {
    height: 0.4,
    width: '100%',
    backgroundColor: COLOR.borderColorSec,
    marginTop: 10,
  },

  /** COMMENT ITEM */
  con_cmt: [
    DEVICE.gStyle.row_justify_center,
    {paddingTop: 15, paddingBottom: 10},
  ],
  con_cmt_info_1: [
    DEVICE.gStyle.justify_center,
    {
      marginLeft: 10,
      paddingBottom: 15,
      flex: 1,
      borderBottomWidth: 0.4,
      borderBottomColor: COLOR.borderColorSec,
    },
  ],
  con_cmt_info_top: [DEVICE.gStyle.space_between, DEVICE.gStyle.align_center],
  con_input_comment: {
    flex: 1,
    color: '#ffffff',
    fontSize: Helpers.fS(16),
    fontFamily: DEVICE.fontRegular,
    marginLeft: 10,
  },

  img_avatar: {
    height: Helpers.wS('13.33%'),
    width: Helpers.wS('13.33%'),
    borderRadius: Helpers.bR(Helpers.wS('13.33%')),
    overflow: 'hidden',
  },

  txt_cmt_name: [
    DEVICE.initFont.XX_SMALL,
    {fontFamily: DEVICE.fontMedium, fontWeight: 'bold'},
  ],
  txt_cmt_time: [
    DEVICE.initFont.XXX_SMALL,
    {color: COLOR.text_1, fontFamily: DEVICE.fontLight},
  ],
  txt_cmt_msg: [
    DEVICE.initFont.XX_SMALL,
    {width: Helpers.wS('77.33%'), marginTop: 0},
  ],
  txt_empty: [DEVICE.initFont.XX_SMALL, {textAlign: 'center'}],
  txt_empty_data: [
    DEVICE.initFont.X_SMALL,
    {
      fontFamily: DEVICE.fontMedium,
      color: COLOR.placeholderTextColor,
      marginTop: 10,
    },
  ],
});

export default styles;
