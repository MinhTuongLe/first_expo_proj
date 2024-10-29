/**
 * @Description: Custom Loading
 * @Created by ZiniTeam
 * @Date create: 18/01/2019
 */
import {DEVICE, COLOR} from '../../config';
import Helpers from '../../helpers';

export default {
  con: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: COLOR.cloGdaBannerItem,
  },

  con_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  txt_loading: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    color: '#ffffff',
  },
};
