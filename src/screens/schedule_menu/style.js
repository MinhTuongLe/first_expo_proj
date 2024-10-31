/**
 * @Description: Schedule Screen Layout
 * @Created by ZiniTeam
 * @Date create: 22/01/2019
 */
/** COMMON */
import {DEVICE, COLOR} from '../../config';
import CommonStyle from '../../helpers/common-style';
import Helpers from '../../helpers';

const styles = Object.assign({}, CommonStyle, {
  con: {flex: 1, backgroundColor: COLOR.backgroundMain},
  con_no_data: {alignItems: 'center', paddingVertical: 10},

  //ITEM SCHEDULE
  item_schedule: [
    DEVICE.gStyle.row,
    {
      backgroundColor: COLOR.backgroundSec,
      marginTop: 10,
      marginHorizontal: 10,
      borderRadius: 5,
    },
  ],
  con_title_item_schedule: [
    DEVICE.gStyle.center,
    {
      flex: 0.3,
      paddingHorizontal: 5,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
  ],
  con_title_item_schedule_2: {
    flex: 0.7,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  txt_title_item_schedule: [DEVICE.initFont.XX_SMALL],
  txt_subject_name: [DEVICE.initFont.X_SMALL],

  //ITEM MENU
  item_menu: [
    DEVICE.gStyle.column,
    DEVICE.gStyle.flex_1,
    {
      backgroundColor: COLOR.backgroundSec,
      paddingHorizontal: 10,
      marginTop: 10,
      marginHorizontal: 10,
      borderRadius: 5,
    },
  ],
  con_title_group: [
    DEVICE.gStyle.row_align_center,
    {
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: Helpers.wS('10.66%'),
      paddingTop: 13,
    },
  ],
  con_content_item_food: [
    DEVICE.gStyle.row_align_center,
    {height: Helpers.wS('16%'), width: '100%'},
  ],
  img_item_group: {height: '100%', width: '100%'},
  foodName: [
    DEVICE.gStyle.justify_center,
    DEVICE.gStyle.flex_1,
    {
      marginLeft: 10,
      height: '100%',
      borderBottomWidth: 0.4,
      borderBottomColor: COLOR.borderColorSec,
    },
  ],

  imageFood: [
    DEVICE.gStyle.align_center,
    {
      height: Helpers.wS('10%'),
      width: Helpers.wS('10%'),
      justifyContent: 'center',
    },
  ],

  txt_title_group: [
    DEVICE.initFont.X_SMALL,
    {
      color: COLOR.primaryApp,
      fontFamily: DEVICE.fontBold,
      fontSize: Helpers.fS(17),
    },
  ],
  txt_food_name: {
    color: 'black',
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(17),
  },

  //NO DATA
  emptyDate: [
    DEVICE.gStyle.align_center,
    {marginTop: (DEVICE.width * 1) / 3, backgroundColor: COLOR.backgroundMain},
  ],
  txt_no_data: [
    DEVICE.initFont.X_SMALL,
    {color: COLOR.placeholderTextColor, marginTop: 20},
  ],

  //CALENDAR
  con_header_content: [
    DEVICE.gStyle.row_align_center,
    DEVICE.gStyle.shadow,
    {padding: 10, backgroundColor: '#ffffff'},
  ],

  img_header_content: {
    height: 45,
    width: 45,
    borderRadius: Helpers.bR(45),
    borderWidth: 1,
    borderColor: COLOR.borderColor,
  },

  txt_open_calendar: [
    DEVICE.initFont.X_SMALL,
    {color: COLOR.primaryButton, fontFamily: DEVICE.fontRegular},
  ],
  txt_header_content: [
    DEVICE.initFont.X_SMALL,
    {fontFamily: DEVICE.fontMedium, marginLeft: 10},
  ],
  txt_topic: [DEVICE.initFont.XX_SMALL, {color: COLOR.text_2, paddingTop: 5}],
});

export default styles;
