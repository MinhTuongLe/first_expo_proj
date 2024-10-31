/**
 * @Description:
 * @Created by ZiniTeam
 * @Date create:
 */
/** LIBRARY */
import CommonStyle from '../../../helpers/common-style';
/** COMMON */
import {COLOR, DEVICE} from '../../../config';
import Helpers from '../../../helpers';

const styles = Object.assign({}, CommonStyle, {
  con: [DEVICE.gStyle.flex_1, {backgroundColor: COLOR.backgroundMain}],
  content: {paddingHorizontal: 10},
  rowItemStudent: {
    flexDirection: 'row',
    height: Helpers.wS('18.13%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
  //Avatar
  img_item: {
    width: Helpers.wS('13.33%'),
    height: Helpers.wS('13.33%'),
    borderRadius: Helpers.bR(Helpers.wS('13.33%')),
    overflow: 'hidden',
  },
  //Name
  nameArea: {
    borderBottomWidth: 0.4,
    borderBottomColor: COLOR.borderColor,
    flex: 1,
    height: Helpers.wS('18.13%'),
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  titleArea: [
    DEVICE.gStyle.row_align_center,
    {justifyContent: 'space-between'},
  ],

  txtTitle: [DEVICE.initFont.X_SMALL, {fontFamily: DEVICE.fontMedium, flex: 1}],
  txtDes: [DEVICE.initFont.XXX_SMALL, {color: COLOR.placeholderTextColor}],
  txtDate: [DEVICE.initFont.XXX_SMALL, {color: COLOR.placeholderTextColor}],
  txt_no_data: [
    DEVICE.initFont.X_SMALL,
    {color: COLOR.placeholderTextColor, marginTop: 10},
  ],
});

export default styles;
