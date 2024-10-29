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
  con_footer: {marginHorizontal: 15, marginBottom: 15},
  submit_group_submit: [
    DEVICE.initFont.SMALL,
    {
      width: '100%',
      borderRadius: Helpers.wS('12.8%') / 2,
      backgroundColor: COLOR.primaryButton,
      height: Helpers.wS('12.8%'),
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: DEVICE.fontBold,
    },
  ],
  //ITEM ROW
  rowItemStudent: {
    flexDirection: 'row',
    height: Helpers.wS('18.13%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  //Avatar
  avatarArea: {},
  avatarStudent: {
    width: Helpers.wS('13.33%'),
    height: Helpers.wS('13.33%'),
    borderRadius: Helpers.bR(Helpers.wS('13.33%')),
    overflow: 'hidden',
  },
  //Name
  nameArea: {
    borderBottomWidth: 0.4,
    borderBottomColor: COLOR.borderColorSec,
    height: '100%',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  txtNameStudent: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    color: COLOR.txt_3,
    paddingVertical: 3,
  },
  parentRight: {
    flexDirection: 'row',
    width: Helpers.wS('16%'),
    justifyContent: 'space-between',
  },
});

export default styles;
