/**
 * @Description: News Screen Styles
 * @Created by ZiniTeam
 * @Date create: 29/01/2019
 */
import { DEVICE, COLOR } from '../../config';
import Helpers from '../../helpers';
import CommonStyle from '../../helpers/common-style';

const styles = Object.assign({}, CommonStyle, {
  /** Image left / right */
  con_infor: { flex: .7, justifyContent: "flex-start", paddingLeft: 10 },
  con_image: { flex: .3, borderRadius: 5, justifyContent: "center", alignItems: "center" },

  txt_title: { color: COLOR.cor_xam, fontWeight: "bold" },
  txt_excerpt: { color: COLOR.cor_xam },
  txt_time: { color: COLOR.text_2 },
  txt_category: { color: COLOR.primaryButton, fontWeight: "bold" },

  image: { width: Helpers.wS("28%"), height: Helpers.wS("22%"), borderRadius: 5, borderColor: COLOR.borderColor, borderWidth: 1 },

  /** Column */
  con_cul_container: { backgroundColor: "white", borderRadius: 5, marginHorizontal: 5 },
  con_cul_infor: { justifyContent: "flex-start", paddingTop: 5, paddingHorizontal: 5 },
  con_cul_image: { justifyContent: "center", alignItems: "center" },

  txt_cul_title: { color: COLOR.cor_xam, fontWeight: "bold" },
  txt_cul_excerpt: { color: COLOR.cor_xam, paddingTop: 2 },
  txt_cul_time: { color: COLOR.text_2, paddingTop: 2 },
  txt_cul_category: { color: COLOR.primaryButton, fontWeight: "bold", fontSize: Helpers.fS(10), paddingTop: 2 },

  image_cul: { width: Helpers.wS("46.4%"), height: Helpers.wS("34.5%"), borderTopLeftRadius: 5, borderTopRightRadius: 5 },

  /** Card */
  con_card_container: { backgroundColor: "white", borderRadius: 5, marginHorizontal: 10 },
  con_card_infor: { justifyContent: "center", paddingTop: 5, paddingHorizontal: 10 },
  con_card_image: { justifyContent: "center", alignItems: "center" },

  txt_card_title: { color: COLOR.cor_xam, fontWeight: "bold" },
  txt_card_excerpt: { color: COLOR.cor_xam, paddingTop: 5 },
  txt_card_time: { color: COLOR.text_2, paddingTop: 5 },
  txt_card_category: { color: COLOR.primaryButton, fontWeight: "bold", fontSize: Helpers.fS(10), paddingTop: 5 },

  image_card: { width: Helpers.wS("94.6%"), height: Helpers.wS("71%"), borderTopLeftRadius: 5, borderTopRightRadius: 5 }
});

export default styles;