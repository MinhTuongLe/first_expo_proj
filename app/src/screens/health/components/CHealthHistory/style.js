/**
 * @Description: Health Screen Logic
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** COMMON */
import { DEVICE, COLOR, CONFIG } from '../../../../config';
import CommonStyle from '../../../../helpers/common-style';

const styles = Object.assign({}, CommonStyle, {
  txt_info_title_2: [DEVICE.initFont.X_SMALL,{fontFamily: DEVICE.fontMedium}],
  txt_text_global: [DEVICE.initFont.X_SMALL],
  header_title: [DEVICE.initFont.SMALL,{color: COLOR.primaryApp, fontFamily: DEVICE.fontBold}]
})

export default styles;
