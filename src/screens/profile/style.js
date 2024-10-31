/**
 * Created by dang.le from 11/09/2018
 */
import {DEVICE, COLOR} from '../../config';
import Helpers from '../../helpers';
import CommonStyle from '../../helpers/common-style';

const profileStyle = Object.assign({}, CommonStyle, {
  container: {flex: 1, backgroundColor: COLOR.backgroundMain},
  container_content: {flex: 1},
  container_content_avatar: {
    width: '100%',
    backgroundColor: COLOR.backgroundMain,
  },
  container_avatar: {
    backgroundColor: '#f2f2f2',
    borderRadius: Helpers.wS('13.33%') / 2,
  },
  container_icon_edit: {
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
  container_content_info_2: {
    height: Helpers.wS('16.5%'),
    width: '100%',
    backgroundColor: '#ffffff',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  container_info_item: {
    flexDirection: 'row',
    width: '100%',
    height: Helpers.wS('16%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container_info_item_1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '10%',
  },
  avatarBox_left: {flexDirection: 'row', alignItems: 'center'},
  image_avatar: {
    height: Helpers.wS('13.33%'),
    width: Helpers.wS('13.33%'),
    borderRadius: Helpers.wS('13.33%') / 2,
    zIndex: 9,
  },
  avatarBox: {
    flexDirection: 'row',
    height: Helpers.wS('18.66%'),
    backgroundColor: COLOR.backgroundMain,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  text_name_account: {
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(16),
    color: COLOR.txtColor,
    marginLeft: 20,
  },
  text_info_item: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(17),
    color: COLOR.txtColor,
  },
  tabContent: {
    // height: Helpers.wS('11.73%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 10,
    backgroundColor: COLOR.backgroundSec,
  },
  tabItem: {
    backgroundColor: COLOR.backgroundMain,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 5,
    paddingVertical: 12,
    flex: 0.5,
  },
  txtTabItem: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    color: COLOR.txtColor,
  },
  contentInfo: {flex: 1},
  infoFormData: {justifyContent: 'space-between', height: '100%'},
  container_content_info: {paddingHorizontal: 10, paddingTop: 15},
  container_family_info: {flex: 1},
  container_content_item: {
    flexDirection: 'row',
    width: '100%',
    height: Helpers.wS('16%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container_info_item_2: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    paddingLeft: 10,
  },
  input_group_text: {
    width: '100%',
    fontSize: Helpers.fS(16),
    fontFamily: DEVICE.fontRegular,
    color: COLOR.txtColor,
    height: '100%',
  },
  container_info_item_note: {
    flexDirection: 'row',
    height: Helpers.hS('7.64%'),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  message_group_label: {
    flex: 1,
    color: COLOR.txtColor,
    marginLeft: 10,
    fontSize: Helpers.fS(17),
    fontFamily: DEVICE.fontRegular,
  },
  submit_group_submit: {
    borderRadius: Helpers.wS('12.8%') / 2,
    backgroundColor: COLOR.primaryButton,
    marginBottom: 10,
    height: Helpers.wS('12.8%'),
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: Helpers.fS(18),
    fontFamily: DEVICE.fontBold,
  },
  txt_allow_noti: {
    fontSize: Helpers.fS(16),
    fontFamily: DEVICE.fontRegular,
    color: COLOR.txtColor,
  },
  con_btn_logout: [
    DEVICE.gStyle.center,
    {
      height: Helpers.wS('10%'),
      paddingHorizontal: 5,
      borderRadius: 5,
      // borderWidth: 1,
      borderColor: COLOR.primaryButton,
    },
  ],
  con_content: [
    DEVICE.gStyle.container,
    {height: '100%', backgroundColor: COLOR.backgroundMain},
  ],
  con_content_input: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
});

export default profileStyle;
