/**
 * @Description: Kid Info Screen Style
 * @Created by ZiniTeam
 * @Date create: 18/11/2019
 */
/** COMMON */
import {DEVICE, COLOR} from '../../config';
import Helpers from '../../helpers';

export default {
  con: {flex: 1, backgroundColor: COLOR.backgroundMain},
  con_content: {flex: 1},
  con_avatar_box: {
    flexDirection: 'row',
    height: Helpers.wS('18.66%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    backgroundColor: COLOR.backgroundMain,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.borderColorSec,
  },
  con_avatar: {
    backgroundColor: '#f2f2f2',
    borderRadius: Helpers.wS('13.33%') / 2,
  },
  con_icon_edit: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: -10,
    backgroundColor: COLOR.primaryApp,
    height: Helpers.wS('5.6%'),
    width: Helpers.wS('5.6%'),
    borderRadius: Helpers.wS('5.6%') / 2,
    borderColor: '#ffffff',
    borderWidth: 1,
    zIndex: 10,
  },
  con_content_item: {
    flexDirection: 'row',
    width: '100%',
    height: Helpers.wS('16%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  con_info_item_1: {width: '9%'},
  con_info_item_2: {flex: 1, height: '100%', alignItems: 'center'},
  submit_group_submit: {
    borderRadius: Helpers.wS('12.8%') / 2,
    backgroundColor: COLOR.primaryButton,
    height: Helpers.wS('12.8%'),
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: Helpers.fS(18),
    fontFamily: DEVICE.fontBold,
    marginHorizontal: 10,
    marginBottom: 10,
  },

  img_avatar: {
    height: Helpers.wS('13.33%'),
    width: Helpers.wS('13.33%'),
    borderRadius: Helpers.wS('13.33%') / 2,
  },

  txt_name_account: {
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(16),
    color: COLOR.txtColor,
    marginLeft: 20,
  },
  input_group_text: {
    width: '100%',
    fontSize: Helpers.fS(16),
    fontFamily: DEVICE.fontRegular,
    color: COLOR.txtColor,
    height: '100%',
  },
};
