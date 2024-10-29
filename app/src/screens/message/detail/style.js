/**
 * @Description: Message Detail Screen Style
 * @Created by ZiniTeam
 * @Date create: 26/02/2019
 */
/** COMMON */
import commonStyle from '../../../helpers/common-style';
import {DEVICE, COLOR} from '../../../config';
import Helpers from '../../../helpers';

export default styles = Object.assign({}, commonStyle, {
  con_footer: {
    flexDirection: 'row',
    height: Helpers.hS('8%'),
    backgroundColor: COLOR.primaryApp,
    borderTopColor: '#f2f2f2',
    borderTopWidth: 1,
    alignItems: 'center',
  },
  text_input: {
    flex: 1,
    paddingLeft: 15,
    color: '#ffffff',
    fontSize: Helpers.fS(16),
    fontFamily: DEVICE.fontRegular,
  },
  con_item: {width: '100%', flexDirection: 'row', marginTop: 2},
  con_avatar: {width: Helpers.wS('10%') + 10},
  con_photo: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    // width: Helpers.wS('50%'),
    // borderColor: '#f2f2f2',
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  con_send: {borderRadius: 5, padding: 10, maxWidth: Helpers.wS('70%')},
  img_avatar: {
    height: Helpers.wS('9%'),
    width: Helpers.wS('9%'),
    borderRadius: Helpers.bR(Helpers.wS('9%')),
    borderWidth: 0.5,
    borderColor: COLOR.borderColor,
    overflow: 'hidden',
    marginRight: 10,
  },
  img_photo: {
    height: Helpers.wS('40%'),
    width: Helpers.wS('50%'),
    borderRadius: 5,
  },
  txt_message: {fontFamily: DEVICE.fontRegular, fontSize: Helpers.fS(16)},
  txt_no_cmt_1: {
    color: COLOR.borderColor,
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(16),
    marginTop: 10,
  },
  txt_no_cmt_2: {
    color: COLOR.borderColor,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(12),
    marginTop: 10,
  },
  txtTimeMessItem: {
    marginTop: 10,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(12),
    color: '#aaaaaa',
  },
});
