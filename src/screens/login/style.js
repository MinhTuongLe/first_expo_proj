/**
 * @Description: Login Screen Styles
 * @Created by ZiniTeam
 * @Date create: 18/01/2019
 */
/** COMMON **/
import { DEVICE, COLOR } from "../../config";
import Helpers from "../../helpers";
import CommonStyle from "../../helpers/common-style";

const styles = Object.assign({}, CommonStyle, {
  background: { width: "100%", height: "100%" },
  con_flex: { flex: 1 },
  con_content: { flex: 1, justifyContent: "flex-end", paddingHorizontal: 20 },
  con_top_content: { alignItems: "center", marginTop: Helpers.wS("20%") },
  container: { flex: 1, paddingHorizontal: 38 },

  logoSmall: {
    width: Helpers.wS("17.33%"),
    height: Helpers.wS("24%"),
    justifyContent: "center",
    alignItems: "center",
  },

  txtTittleLogin: {
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(17),
    color: "#ffffff",
  },

  input_group: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
    height: Helpers.wS("16%"),
  },
  input_group_icon: { opacity: 0.7, marginRight: 10 },
  input_group_text: {
    flex: 1,
    width: "100%",
    color: COLOR.txtColor,
    fontSize: Helpers.fS(17),
    fontFamily: DEVICE.fontMedium,
  },

  forget_group: { marginTop: 20 },
  accept_term_group: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  accept_term_label: {
    color: "#ffffff",
    fontSize: Helpers.fS(12),
    fontFamily: DEVICE.fontMedium,
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  forget_group_label_left: {
    color: "#ffffff",
    fontSize: Helpers.fS(14),
    fontFamily: DEVICE.fontMedium,
    textAlign: "center",
  },

  txtContactGroup: { marginBottom: 30 },
  txtContact: {
    textAlign: "center",
    color: COLOR.txtColor,
    fontSize: Helpers.fS(16),
    fontFamily: DEVICE.fontRegular,
  },
  txtNum: { fontFamily: DEVICE.fontBold },

  message_group: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  message_group_icon: { opacity: 0.7 },
  message_group_label: {
    color: "red",
    marginLeft: 5,
    fontSize: Helpers.fS(14),
    fontFamily: DEVICE.fontRegular,
  },

  submit_group: { width: "100%", paddingHorizontal: 0 },
  submit_group_submit: {
    width: "100%",
    borderRadius: Helpers.wS("12.8%") / 2,
    backgroundColor: COLOR.primaryButton,
    marginTop: 20,
    height: Helpers.wS("12.8%"),
    alignItems: "center",
    justifyContent: "center",
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(17),
  },
  textButton: { fontSize: Helpers.fS(16) },
  btnLoginOldAcc: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    height: Helpers.wS("16%"),
    borderRadius: Helpers.wS("8%"),
    borderWidth: 1,
    borderColor: "#ffffff",
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(17),
  },

  btnToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  // HEADER
  con: {
    height: Helpers.hS("7%"),
    alignItems: "center",
    justifyContent: "flex-end",
  },

  con_header_left: {
    width: Helpers.wS("10%"),
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    zIndex: 10,
  },

  text_header_center: {
    fontSize: Helpers.fS(17),
    color: "#ffffff",
    fontFamily: DEVICE.fontBold,
  },
});

export default styles;
