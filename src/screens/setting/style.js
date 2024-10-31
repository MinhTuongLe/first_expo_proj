/**
 * @Description: Settings
 * @Created by ZiniTeam
 * @Date create: 14/11/2019
 */
/** COMMON */
import {StyleSheet} from 'react-native';
import {DEVICE, COLOR} from '../../config';
import CommonStyles from '../../helpers/common-style';
import Helpers from '../../helpers';

const styles = Object.assign({}, CommonStyles, {
  con: {flex: 1, backgroundColor: COLOR.bgGrey},
  con_list: {flex: 1},
  con_content_list: {paddingTop: 25},
  con_item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderTopColor: COLOR.borderColor,
    borderTopWidth: 0.4,
    borderBottomColor: COLOR.borderColor,
    borderBottomWidth: 0.4,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  con_bg_picker_ios: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  con_content_picker_ios: {height: 200, width: DEVICE.width},
  con_header_picker_ios: {
    height: 50,
    borderTopWidth: 0.4,
    borderTopColor: COLOR.borderColor,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  con_picker_android: {
    height: 35,
    width: Helpers.wS('45%'),
    alignItems: 'flex-end',
  },
  con_picker_ios: {
    backgroundColor: '#ffffff',
    borderTopWidth: 0.4,
    borderTopColor: COLOR.borderColor,
    paddingBottom: 25,
  },
  con_bg_grey: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,.5)',
  },

  txt_item_title: {
    color: 'black',
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(16),
  },
  txt_item_result: {
    color: COLOR.placeholderTextColor,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
  },
  txt_item_picker: {
    color: 'black',
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(18),
  },
  txt_header_picker_ios_left: {
    color: COLOR.primaryApp,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
  },
  txt_header_picker_ios_right: {
    color: COLOR.primaryApp,
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(16),
  },
});

export default styles;
