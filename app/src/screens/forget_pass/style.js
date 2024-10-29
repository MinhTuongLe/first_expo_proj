/**
 * Created by dang.le from 05/09/2018
 */
/** COMMON */
import {DEVICE, COLOR} from '../../config';
import Helpers from '../../helpers';
import CommonStyle from '../../helpers/common-style';

const forgetPassStyle = {
  background: {width: '100%', height: '100%'},
  container: {flex: 1, paddingHorizontal: 20},

  motto_group: {marginTop: 10},
  motto_group_text: {
    color: COLOR.txtColor,
    fontSize: Helpers.fS(17),
    fontFamily: DEVICE.fontMedium,
    textAlign: 'center',
  },

  input_group: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 15,
    alignItems: 'center',
    height: Helpers.wS('16%'),
  },
  input_group_icon: {opacity: 0.7, marginRight: 10},
  input_group_text: {
    flex: 1,
    width: '100%',
    fontSize: Helpers.fS(17),
    fontFamily: DEVICE.fontMedium,
  },

  message_group: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 10,
  },
  message_group_label: {
    color: '#ffffff',
    marginLeft: 5,
    fontSize: Helpers.fS(14),
    fontFamily: DEVICE.fontRegular,
  },

  submit_group: {width: '100%', padding: 0},
  submit_group_submit: {
    width: '100%',
    borderRadius: Helpers.wS('12.8%') / 2,
    backgroundColor: COLOR.primaryButton,
    marginTop: 20,
    height: Helpers.wS('12.8%'),
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(18),
  },

  goback_group: {padding: 8, marginTop: 10, alignItems: 'center'},
  goback_group_text: {
    color: '#ffffff',
    fontSize: Helpers.fS(16),
    textAlign: 'center',
  },

  txtContactGroup: {marginBottom: 30},
  txtContact: {
    textAlign: 'center',
    color: COLOR.txtColor,
    fontSize: Helpers.fS(16),
    fontFamily: DEVICE.fontRegular,
  },
  txtNum: {fontFamily: DEVICE.fontBold},

  // HEADER
  con: {height: Helpers.hS('7%') + CommonStyle.statusBarHeight},
  con_header_bar: {
    height: Helpers.hS('7%'),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  status_bar: {height: CommonStyle.statusBarHeight},

  con_header_left: {
    width: Helpers.wS('10%'),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  con_header_center: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text_header_center: {
    fontSize: Helpers.fS(18),
    color: '#ffffff',
    fontFamily: DEVICE.fontBold,
  },
};

export default forgetPassStyle;
