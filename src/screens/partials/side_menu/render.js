/**
 * @Description: Side Menu Layout
 * @Created by ZiniTeam
 * @Date create: 17/01/2019
 */
/** LIBRARY */
import React from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
/** COMMON */
import { DEVICE, LANG, CONFIG, COLOR } from "../../../config";
/** COMMON */
import InfoUserDrawer from "./infoUserDrawer";
import CText from "../../../components/CText";
import CConfirm from "../../../components/CConfirm";
import Helpers from "../../../helpers";

/** STYLES */
import styles from "./style";

class ViewSideMenu extends React.PureComponent {
  /** RENDER */
  render() {
    let {
      data,
      onPress,
      isOpenModelConfirm,
      loginActions,
      notificationActions,
      navigation,
      dataUser,
    } = this.props;
    if (!data.setting.config) {
      data.setting.config = {
        value: {
          name: "",
          version: "",
          description: "",
          hotline: "",
        },
      };
    }

    return (
      <View style={[styles.con, { backgroundColor: COLOR.backgroundSec }]}>
        <CConfirm
          closeModal={onPress.closeModal}
          type="deleteAccount"
          navigation={navigation}
          dataUser={dataUser}
          loginActions={loginActions}
          notificationActions={notificationActions}
          show={isOpenModelConfirm}
        />
        <InfoUserDrawer fullName={data.fullNameUser} onPress={onPress.avatar} />

        <ScrollView
          style={{ backgroundColor: COLOR.backgroundSec }}
          keyboardShouldPersistTaps={"handled"}
          showsVerticalScrollIndicator={false}
        >
          {data.category.map((item, index) => {
            if (item.comingsoon) return;
            return (
              <TouchableOpacity
                key={"iSideMenu-" + index}
                style={styles.con_item}
                onPress={item.onPress}
              >
                <FontAwesome5
                  name={item.n_icon}
                  size={Helpers.fS(23)}
                  color={COLOR.text_2}
                />
                <View style={styles.con_item_r}>
                  <Text style={styles.txt_category}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={[styles.con_footer, Helpers.isIphoneX() && styles.pb_20]}>
          {/* <View style={DEVICE.gStyle.space_between}>
            <Text style={styles.txt_info}>{data.setting.config.value.name}</Text>
          </View> */}

          <View style={DEVICE.gStyle.row}>
            <Text style={styles.txt_info}>
              {data.setting.config.value.name} - Version:{"\u00A0"}
              {data.setting.config.value.version}
            </Text>
            {data.needUpdate && (
              <TouchableOpacity onPress={onPress.goToStore}>
                <View style={styles.btn_update}>
                  <CText style={styles.txt_btn} i18nKey={"txtUpdate"} />
                </View>
              </TouchableOpacity>
            )}
          </View>
          {data.setting.config.value.hotline !== "" && (
            <TouchableOpacity
              onPress={() => onPress.phone(data.setting.config.value.hotline)}
            >
              <Text style={styles.txt_info}>
                {data.setting.config.value.hotline}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

export default ViewSideMenu;
