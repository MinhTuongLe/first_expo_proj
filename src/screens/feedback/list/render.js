/**
 * @Description:
 * @Created by ZiniTeam
 * @Date create:
 */
/** LIBRARY */
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
/** COMPONENT */
import HeaderBar from "../../partials/header_bar";
import CText from "../../../components/CText";
import CImage from "../../../components/CImage";
import CLoading from "../../../components/CLoading";
/** COMMON */
import { COLOR, CONFIG, LANG, DEVICE } from "../../../config";
import Helpers from "../../../helpers";
/** STYLES */
import styles from "./style";
import { Text } from "react-native-svg";

const renderItem = (index, item, props, onFunction) => {
  let time = Helpers.getShortTimeWithNow(item.description[0].time);
  let lastUser = item.description[0].user;
  let gender = CONFIG.users.find((f) => f.id === lastUser.gender);
  let newFullName = "";
  if (gender) {
    gender = gender.path;
  } else {
    gender = CONFIG.users[0].path;
  }
  if (lastUser.id === props.login.id) {
    newFullName = LANG[CONFIG.lang].me;
  } else {
    newFullName = Helpers.capitalizeName(
      lastUser.firstName,
      lastUser.lastName,
      CONFIG.settingLocal.softName
    );
  }

  return (
    <TouchableOpacity
      style={styles.rowItemStudent}
      onPress={() => onFunction.onPressItem(item)}
    >
      <CImage
        style={styles.img_item}
        resizeMode={"contain"}
        src={
          lastUser.avatar != "" && lastUser.avatar != null
            ? { uri: CONFIG.host + lastUser.avatar }
            : gender
        }
      />

      <View style={styles.nameArea}>
        <View style={styles.titleArea}>
          <CText style={styles.txtTitle}>{item.title}</CText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CText style={styles.txtDate}>{time.time}</CText>
            {time.type === time.des ? (
              <CText
                style={[styles.txtDate, { marginLeft: 5 }]}
                i18nKey={time.type}
              />
            ) : (
              <Text style={styles.txtDate}>{time.des} </Text>
            )}
          </View>
        </View>

        <CText style={styles.txtDes} numberOfLines={2}>
          <CText
            style={[
              styles.txtDes,
              { fontSize: Helpers.fS(14), fontWeight: "bold" },
            ]}
          >{`${newFullName}: `}</CText>
          {`${item.description[0].message}`}
        </CText>
      </View>
    </TouchableOpacity>
  );
};

const renderEmptyList = () => {
  return (
    <View style={DEVICE.gStyle.full_center}>
      {/* <Icon
        name={"square-question"}
        size={Helpers.fS(50)}
        color={COLOR.placeholderTextColor}
        type={"light"}
      /> */}
      <FontAwesome5
        name={"square-question"}
        size={Helpers.fS(50)}
        color={COLOR.placeholderTextColor}
      />
      <CText style={styles.txt_no_data} i18nKey={"txtNoData"} />
    </View>
  );
};

export const ViewListFeedback = ({
  state = null,
  props = null,
  onFunction = {
    onPressAdd: () => {},
    onRefresh: () => {},
    onLoadMore: () => {},
    onPressItem: () => {},
    onPressBack: () => {},
  },
}) => {
  return (
    <View style={styles.con}>
      <HeaderBar
        title={"txtDrawerFeedback"}
        hasBack={true}
        onBack={onFunction.onPressBack}
        iconRight={"comment-alt-plus"}
        onPressNext={onFunction.onPressAdd}
      />

      {state._loading ? (
        <CLoading />
      ) : (
        <FlatList
          contentContainerStyle={[styles.content, DEVICE.gStyle.grow]}
          refreshing={state._refreshing}
          data={state._data}
          renderItem={({ item, index }) =>
            renderItem(index, item, props, onFunction)
          }
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={renderEmptyList}
          onRefresh={onFunction.onRefresh}
          onEndReachedThreshold={0.5}
          onEndReached={onFunction.onLoadMore}
        />
      )}
    </View>
  );
};
