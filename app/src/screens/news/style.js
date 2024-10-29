/**
 * @Description: News Screen Styles
 * @Created by ZiniTeam
 * @Date create: 29/01/2019
 */
import {DEVICE, COLOR} from '../../config';
import Helpers from '../../helpers';
import CommonStyle from '../../helpers/common-style';

const styles = Object.assign({}, CommonStyle, {
  container: {flex: 1, backgroundColor: COLOR.backgroundMain},
  d_container: [DEVICE.gStyle.flex_1, {backgroundColor: COLOR.backgroundMain}],
  d_container_content: {paddingBottom: 10, marginTop: 10},
  img_news_item: [
    {
      height: Helpers.wS('28%'),
      width: Helpers.wS('36%'),
      borderRadius: 5,
      padding: 1,
    },
  ],
  d_text_title: [DEVICE.initFont.SMALL, {fontFamily: DEVICE.fontBold}],
  d_text_motto: [
    DEVICE.initFont.XX_SMALL,
    {fontFamily: DEVICE.fontBold, marginTop: 10},
  ],
  d_image_item: {height: Helpers.wS('56%'), width: '100%', marginTop: 15},
  d_text_time: [
    DEVICE.initFont.XXXX_SMALL,
    {color: COLOR.text_2, marginTop: 5},
  ],

  s_container_suggest_item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 3,
    borderTopWidth: 0.4,
    borderBottomWidth: 0.4,
    borderTopColor: COLOR.primaryApp,
    borderBottomColor: COLOR.primaryApp,
  },
  s_dot_suggest: {
    backgroundColor: 'black',
    height: 5,
    width: 5,
    borderRadius: 2.5,
    marginRight: 5,
    marginLeft: 10,
  },

  txt_no_item: {
    color: COLOR.borderColor,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(12),
    marginTop: 10,
  },
  txt_html_content: {
    color: COLOR.txtColor,
    fontSize: Helpers.fS(14),
    fontFamily: DEVICE.fontRegular,
    paddingVertical: 10,
  }, //LOCAL STYLE NOT AVAILABLE WITH HTML
  con_img_detail: {width: '100%', height: Helpers.hS('25%')},
  img_detail: {height: '100%', width: '100%'},
  image_news: {
    width: Helpers.wS('28%'),
    height: Helpers.wS('22%'),
  },
});

export default styles;
