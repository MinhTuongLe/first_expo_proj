/** COMMON */
import { ASSETS, DEVICE, COLOR } from '../../config';
import Helpers from '../../helpers';

export default {
  con_bg: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,.5)' },
  con_modal: { width: Helpers.wS('80%'), backgroundColor: 'rgba(255,255,255,.95)', borderRadius: 5 },
  con_content: { alignItems: 'center', justifyContent: 'center', padding: 10 },
  con_img: {
    height: Helpers.wS('25%'), width: Helpers.wS('25%'), elevation: 5, shadowColor: COLOR.borderColor,
    shadowOffset: { height: 2, width: 2 }, shadowOpacity: .3, shadowRadius: 3
  },
  con_btn: {
    height: 50, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderTopColor: COLOR.borderColor, borderTopWidth: 0.3
  },
  con_btn_left: {
    flex: .49, alignItems: 'center', justifyContent: 'center', padding: 5, borderLeftColor: COLOR.borderColor,
    borderLeftWidth: 0.3
  },
  con_btn_right: {
    flex: .49, alignItems: 'center', justifyContent: 'center', padding: 5, borderRightColor: COLOR.borderColor,
    borderRightWidth: 0.3
  },

  img: { height: '100%', width: '100%' },

  txt_name_app: { color: 'black', fontFamily: DEVICE.fontBold, fontSize: Helpers.fS(17), marginVertical: 5 },
  txt_des: { color: 'black', fontFamily: DEVICE.fontRegular, fontSize: Helpers.fS(16), marginVertical: 5 },
  txt_btn_left: { color: COLOR.primaryApp, fontFamily: DEVICE.fontMedium, fontSize: Helpers.fS(16) },
  txt_btn_right: { color: COLOR.primaryApp, fontFamily: DEVICE.fontBold, fontSize: Helpers.fS(16) },
}