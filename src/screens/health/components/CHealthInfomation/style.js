/**
 * @Description: Health Screen Logic
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** COMMON */
import {DEVICE, COLOR} from '../../../../config';
import Helpers from '../../../../helpers';
import CommonStyle from '../../../../helpers/common-style';

const styles = Object.assign({}, CommonStyle, {
  txt_title_i: {
    color: COLOR.primaryApp,
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(16),
  },
  txt_text_global: {
    color: 'black',
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
  },
  con_info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Helpers.wS('12.8%'),
  },
  con_info_note: {
    height: Helpers.hS('15%'),
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    borderColor: COLOR.borderColor,
    borderWidth: 0.5,
  },
  txt_info_title: {
    marginLeft: 5,
    color: 'black',
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
  },
  txt_info_result: {
    color: 'black',
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
  },
  header_title: [
    DEVICE.initFont.SMALL,
    {color: COLOR.primaryApp, fontFamily: DEVICE.fontBold},
  ],
});

export default styles;
