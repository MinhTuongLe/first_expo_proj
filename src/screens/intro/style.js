/**
 * @Description: Style of Intro screen
 * @Created by ZiniTeam
 * @Date create: 06/11/2018
 */
import {DEVICE, COLOR} from '../../config';
import Helpers from '../../helpers';

export default introStyle = {
  /* Container */
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  con_indicator: {marginTop: 50},
  /* Logo */
  img_logo: {width: Helpers.wS('40%'), height: Helpers.wS('40%')},
  con_bg_modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  con_cfm: {
    width: Helpers.wS('70%'),
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  con_head_cfm: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.primaryApp,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  con_content_cfm: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  con_grp_btn_cfm: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  con_btn_cfm: {
    width: '40%',
    backgroundColor: COLOR.primaryButton,
    height: DEVICE.s * 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  txt_head_cfm: {
    color: '#ffffff',
    fontFamily: DEVICE.fSemiBold,
    fontSize: Helpers.fS(20),
    textAlign: 'center',
    paddingVertical: 5,
  },
  txt_content_cfm: {
    color: COLOR.txt_3,
    fontFamily: DEVICE.fRegular,
    fontSize: Helpers.fS(16),
    textAlign: 'center',
    paddingVertical: 10,
  },
  txt_left_btn_cfm: {
    color: '#ffffff',
    fontFamily: DEVICE.fSemiBold,
    fontSize: Helpers.fS(18),
  },
};
