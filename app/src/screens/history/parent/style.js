/**
 * @Description: History Teacher Screen
 * @Created by ZiniTeam
 * @Date create: 14/05/2020
 */
import { Platform } from 'react-native';
/** COMMON */
import { DEVICE, COLOR } from '../../../config';
import CommonStyle from '../../../helpers/common-style';
import Helpers from '../../../helpers';

const styles = Object.assign({}, CommonStyle, {
  con: { flex: 1, backgroundColor: COLOR.backgroundMain },
  con_calendar: {
    borderWidth: .5, borderColor: COLOR.placeholderTextColor, margin: 10, borderRadius: 5, shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  //DETAIL
  con_detail: { marginTop: 20 },
  con_row_detail: { flexDirection: "row", alignItems: "center", marginVertical: 5, paddingHorizontal: 10 },
  con_row_icon: { width: Helpers.wS("6%"), height: Helpers.wS("6%"), borderRadius: Helpers.bR(Helpers.wS("3%")), marginRight: 20 },

  txt_row_detail: [DEVICE.initFont.X_SMALL],
});

export default styles;