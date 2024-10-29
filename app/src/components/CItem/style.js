/**
 * @Description: Style Item Album
 * @Created by ZiniTeam
 * @Date create: 21/01/2019
 */
/** COMMON */
import CommonStyle from '../../helpers/common-style';
import {DEVICE, COLOR} from '../../config';
import Helpers from '../../helpers';

const styles = Object.assign({}, CommonStyle, {
  con_item: {paddingHorizontal: 10},
  con_info_item: [DEVICE.gStyle.row],
  con_social_item: [DEVICE.gStyle.row_align_center],
  con_title: {paddingVertical: 10},
  con_infor: {flex: 0.7, justifyContent: 'flex-start', paddingLeft: 10},
  con_image: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  img_item: {height: Helpers.wS('50.6%')},

  txt_title_item: [DEVICE.initFont.X_SMALL, {fontFamily: DEVICE.fMedium}],
  txt_info_item: [
    DEVICE.initFont.XXXX_SMALL,
    {color: COLOR.text_1, paddingTop: 0},
  ],
  txt_info_result_item: [
    DEVICE.initFont.XXXX_SMALL,
    {color: COLOR.primaryApp, paddingTop: 0},
  ],
  d_txt_time: [DEVICE.initFont.XXX_SMALL, {color: COLOR.text_1, marginTop: 0}],

  seperator_line: {
    height: 0.5,
    width: '100%',
    backgroundColor: COLOR.borderColor,
    padding: 0,
  },

  //NEWS STYLE CONTENT
  itemNews: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 15,
  },
  imageThumb: {
    width: Helpers.wS('34.66%'),
    height: Helpers.wS('28%'),
  },
  itemContent: {flex: 1, marginLeft: 10, flexDirection: 'column'},
  txtTitleItem: {color: COLOR.cor_xam, fontWeight: 'bold'},
  txtMotto: {color: COLOR.cor_xam, marginTop: 2},
  txtTime: {color: COLOR.text_2},
});

export default styles;
