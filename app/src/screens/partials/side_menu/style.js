/* eslint-disable prettier/prettier */
/**
 * @Description: Side Menu Style
 * @Created by ZiniTeam
 * @Date create: 17/01/2019
 */
/** COMMON */
import {Platform} from 'react-native';
import {DEVICE, COLOR} from '../../../config';
import CommonStyle from '../../../helpers/common-style';
import Helpers from '../../../helpers';

const styles = Object.assign({}, CommonStyle, {
  con: DEVICE.gStyle.container,
  con_header: {backgroundColor: COLOR.primaryApp},
  con_footer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLOR.backgroundSec,
  },
  con_status_bar: {
    height: CommonStyle.statusBarHeight,
    backgroundColor: COLOR.primaryApp,
  },
  con_header_bar: [
    DEVICE.gStyle.row_align_center,
    {
      // flex: 1,
      backgroundColor: COLOR.primaryApp,
      paddingHorizontal: 20,
      paddingVertical: 10,
      // paddingBottom: (Platform.OS === "ios" && Helpers.isIphoneX()) ? 0 : 20,
      paddingTop: 45,
    },
  ],
  con_scroll: {
    height: DEVICE.height - Helpers.hS('18%') - CommonStyle.statusBarHeight,
  },
  con_item: [
    DEVICE.gStyle.row_align_center,
    {paddingHorizontal: 20, height: Helpers.wS('13%')},
  ],
  con_item_r: {
    height: '100%',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 20,
  },

  txt_name: [
    DEVICE.initFont.SMALL,
    {color: '#ffffff', fontFamily: DEVICE.fontBold, fontWeight: 'bold'},
  ],
  txt_info: [DEVICE.initFont.XXX_SMALL],
  txt_sub: [DEVICE.initFont.XX_SMALL, {marginTop: 0, color: '#ffffff'}],
  txt_category: DEVICE.initFont.X_SMALL,
  txt_btn: [DEVICE.initFont.XXX_SMALL, {color: '#ffffff'}],

  btn_update: [
    DEVICE.gStyle.full_center,
    {
      paddingHorizontal: 10,
      backgroundColor: COLOR.primaryButton,
      borderRadius: 3,
      marginLeft: 10,
    },
  ],

  image_avatar: {
    height: Helpers.hS('7%'),
    width: Helpers.hS('7%'),
    borderRadius: Helpers.bR(Helpers.hS('7%')),
    borderWidth: 1,
    borderColor: COLOR.placeholderTextColor,
  },
});

export default styles;
