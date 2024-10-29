/**
 * @Description: History Teacher Screen
 * @Created by ZiniTeam
 * @Date create: 14/05/2020
 */
import {Platform} from 'react-native';
/** COMMON */
import {DEVICE, COLOR} from '../../../config';
import CommonStyle from '../../../helpers/common-style';
import Helpers from '../../../helpers';

const styles = Object.assign({}, CommonStyle, {
  con: {flex: 1, backgroundColor: COLOR.bgGrey},
  con_calendar: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    margin: 10,
    borderRadius: 5,
  },

  box: {
    backgroundColor: COLOR.backgroundSec,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
  todayBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todayBoxChild: {
    flex: 1 / 2,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayContentTitle: [
    DEVICE.initFont.MEDIUM,
    {
      fontWeight: 'bold',
      color: COLOR.txtColor,
    },
  ],
  circelDate: {
    height: Helpers.wS('13.33%'),
    width: Helpers.wS('13.33%'),
    borderRadius: Helpers.bR(Helpers.wS('13.33%')),
    overflow: 'hidden',
    backgroundColor: COLOR.primaryApp,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateContent: [
    DEVICE.initFont.X_SMALL,
    {
      color: 'white',
      fontWeight: 'bold',
      lineHeight: 18,
    },
  ],
  monthContent: [
    DEVICE.initFont.XX_SMALL,
    {
      color: 'white',
      fontWeight: 'bold',
      lineHeight: 16,
    },
  ],
  todayContentDesc: [
    DEVICE.initFont.XXX_SMALL,
    {
      color: COLOR.txtColor,
    },
  ],
  title: [DEVICE.initFont.SMALL, {textAlign: 'left', fontWeight: 'bold'}],
  txtDate: [DEVICE.initFont.XXX_SMALL, {color: COLOR.text_2}],
  //DETAIL
  con_detail: {marginTop: 10},
  con_row_detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  con_row_icon: {
    width: Helpers.wS('6%'),
    height: Helpers.wS('6%'),
    borderRadius: Helpers.bR(Helpers.wS('6%')),
    marginRight: 5,
  },

  txt_row_detail: [DEVICE.initFont.X_SMALL],
  txt_no_data: [
    DEVICE.gStyle.txt_no_data,
    {textAlign: 'center', fontSize: DEVICE.initFont.X_SMALL.fontSize},
  ],

  historyBoxChild: {
    flex: 1 / 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyContentTitle: [
    DEVICE.initFont.X_SMALL,
    {
      color: COLOR.txtColor,
    },
  ],
  historyContentDesc: [
    DEVICE.initFont.SMALL,
    {
      color: COLOR.txtColor,
      fontWeight: 'bold',
    },
  ],
});

export default styles;
