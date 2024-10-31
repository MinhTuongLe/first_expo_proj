/**
 * @Description: Side Menu Style
 * @Created by ZiniTeam
 * @Date create: 15/01/2020
 */
/** COMMON */
import {DEVICE, COLOR, CONFIG} from '../../../config';
import Helpers from '../../../helpers';
import CommonStyle from '../../../helpers/common-style';

const styles = Object.assign({}, CommonStyle, {
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLOR.backgroundMain,
    zIndex: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  con_avatar: {
    borderColor: COLOR.borderColor,
    borderWidth: 1,
    borderRadius: Helpers.bR(Helpers.wS('13%')),
    overflow: 'hidden',
    width: Helpers.wS('13%'),
    height: Helpers.wS('13%'),
    backgroundColor: '#fff',
  },
  avatar: {
    width: Helpers.wS('13%'),
    height: Helpers.wS('13%'),
    backgroundColor: '#fff',
  },
  con: {flex: 1, backgroundColor: COLOR.backgroundMain},
  con_no_data: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  con_header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.borderColor,
    backgroundColor: COLOR.backgroundMain,
    paddingHorizontal: 10,
  },
  con_status: {
    backgroundColor: COLOR.txtError,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //ITEM ROW
  rowItemStudent: [
    {
      flex: 1,
      justifyContent: 'center',
      borderRadius: 5,
      borderColor: COLOR.borderColor,
      borderWidth: 1,
      marginHorizontal: 10,
      backgroundColor: COLOR.backgroundSec,
    },
  ],
  itemCon_top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#d4d9e1',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 10,
  },
  itemCon_bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  item_bottom: {padding: 10},
  txt_title_item: [
    DEVICE.initFont.XX_SMALL,
    {
      fontFamily: DEVICE.fontMedium,
      textTransform: 'uppercase',
      fontWeight: 700,
    },
  ],
  txt_content_item: [
    DEVICE.initFont.XXX_SMALL,
    {fontFamily: DEVICE.fontMedium},
  ],
  txt_price_item: [DEVICE.initFont.MEDIUM, {fontFamily: DEVICE.fontBold}],
  txt_status_item: [
    DEVICE.initFont.XX_SMALL,
    {fontFamily: DEVICE.fontMedium, color: COLOR.primaryApp},
  ],
  txtListStudent: {
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(17),
    color: COLOR.primaryApp,
  },
  txtNameStudent: [DEVICE.initFont.SMALL, {marginLeft: 10}],
  txt_empty_fee: {
    color: COLOR.borderColor,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(12),
    marginTop: 10,
  },
  txt_status_item_unpaid: [
    DEVICE.initFont.XX_SMALL,
    {
      color: COLOR.txtError,
      borderWidth: 1,
      borderColor: COLOR.txtError,
      paddingHorizontal: 5,
      borderRadius: 5,
      borderStyle: 'dashed',
    },
  ],
  txt_status_item_unpaid_ios: [
    DEVICE.initFont.XX_SMALL,
    {
      color: COLOR.txtError,
      paddingHorizontal: 5,
    },
  ],
  txt_left_title: [DEVICE.initFont.X_SMALL],
  txt_status: [
    DEVICE.initFont.XXX_SMALL,
    {color: '#ffffff', fontWeight: 'bold'},
  ],
});

export default styles;
