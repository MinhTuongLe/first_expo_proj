/**
 * @Description: Side Menu Style
 * @Created by ZiniTeam
 * @Date create: 17/01/2019
 */
/** COMMON */
import {DEVICE, COLOR} from '../../config';
import CommonStyle from '../../helpers/common-style';
import Helpers from '../../helpers';

const styles = Object.assign({}, CommonStyle, {
  con: {flex: 1, backgroundColor: COLOR.backgroundMain},
  titleBox: {
    height: Helpers.wS('13%'),
    backgroundColor: COLOR.backgroundMain,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  txtTitleBox: {
    color: COLOR.primaryApp,
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(16),
    paddingVertical: 15,
  },

  //ITEM ROW
  rowItemStudent: {
    flexDirection: 'row',
    height: Helpers.wS('18.13%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  //Avatar
  avatarArea: {marginRight: 10},
  avatarStudent: {
    width: Helpers.wS('13.33%'),
    height: Helpers.wS('13.33%'),
    borderRadius: Helpers.bR(Helpers.wS('13.33%')),
    overflow: 'hidden',
  },
  //Name
  nameArea: {
    borderBottomWidth: 0.4,
    borderBottomColor: COLOR.borderColor,
    height: '100%',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtNameStudent: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    color: COLOR.txt_3,
    paddingVertical: 1,
  },
  parentRight: {
    flexDirection: 'row',
    width: Helpers.wS('16%'),
    justifyContent: 'space-between',
  },
});

export default styles;
