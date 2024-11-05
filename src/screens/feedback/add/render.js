/**
 * @Description:
 * @Created by ZiniTeam
 * @Date create:
 */
/** LIBRARY */
import React from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
/** COMPONENT */
import HeaderBar from "../../partials/header_bar";
import CText from "../../../components/CText";
import CImage from "../.././../components/CImage";
/** COMMON */
import { COLOR, CONFIG, DEVICE, LANG } from "../../../config";
import Helpers from "../../../helpers";
/** STYLES */
import styles from "./style";

const renderTeacher = (item, index, onFunction, state) => {
  let gender = CONFIG.users.find((f) => f.id === item.gender);
  if (gender) {
    gender = gender.path;
  } else {
    gender = CONFIG.users[0].path;
  }
  let newFullName = Helpers.capitalizeName(
    item.firstName,
    item.lastName,
    CONFIG.settingLocal.softName
  );

  return (
    <View style={styles.con_item}>
      <CImage
        style={styles.con_avatar}
        resizeMode={"contain"}
        src={
          item.avatar != "" && item.avatar != null
            ? { uri: CONFIG.host + item.avatar }
            : gender
        }
      />

      <CText style={styles.txt_name} numberOfLines={2}>
        {newFullName}
      </CText>

      {/* <Icon
        containerStyle={styles.con_icon}
        name={"times-circle"}
        size={Helpers.fS(17)}
        type={"light"}
        onPress={() => onFunction.onDeleteTeacher(item)}
      /> */}
      <Pressable onPress={() => onFunction.onDeleteTeacher(item)}>
        <FontAwesome5
          style={styles.con_icon}
          name={"times-circle"}
          size={Helpers.fS(17)}
        />
      </Pressable>
    </View>
  );
};

export const ViewAddFeedbackScreen = ({
  state = null,
  props = null,
  onFunction = {
    onChangeTitle: () => {},
    onChangeDes: () => {},
    onPressSend: () => {},
    onToggle: () => {},
    onPressContact: () => {},
    onPressBack: () => {},
    onDeleteTeacher: () => {},
  },
}) => {
  return (
    <View style={styles.con}>
      <HeaderBar
        hasBack={true}
        title={"txtDrawerFeedback"}
        iconRight="arrow-right"
        onBack={onFunction.onPressBack}
        onPressNext={onFunction.onPressSend}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={DEVICE.gStyle.grow}
        keyboardShouldPersistTaps={"handled"}
      >
        <View
          style={[
            styles.con_block,
            DEVICE.gStyle.row_align_start,
            styles.pv_20,
          ]}
        >
          <CText style={styles.txt_block_title}>{`${
            LANG[props.language].to
          }:`}</CText>
          <FlatList
            data={state._dataTeacherSelected}
            renderItem={({ item, index }) =>
              renderTeacher(item, index, onFunction, state)
            }
            keyExtractor={(item, index) => index.toString}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          {/* <Icon
            containerStyle={[styles.pl_10, { alignSelf: "center" }]}
            name={"address-book"}
            size={Helpers.fS(25)}
            color={"black"}
            type={"light"}
            onPress={onFunction.onPressContact}
          /> */}
          <Pressable onPress={onFunction.onPressContact}>
            <FontAwesome5
              style={[styles.pl_10, { alignSelf: "center" }]}
              name={"address-book"}
              size={Helpers.fS(25)}
              color={"black"}
            />
          </Pressable>
        </View>

        <TouchableOpacity
          style={styles.con_check_principal}
          disabled={state._isReply}
          onPress={onFunction.onToggle}
        >
          {/* <Icon
            name={state._isSendPrincipal ? "check-circle" : "circle"}
            size={Helpers.fS(20)}
            type={"light"}
          /> */}
          <FontAwesome5
            name={state._isSendPrincipal ? "check-circle" : "circle"}
            size={Helpers.fS(20)}
            type={"light"}
          />
          <CText style={styles.txt} i18nKey={"send_feedback_to_principal"} />
        </TouchableOpacity>

        <View
          style={[
            styles.con_block,
            styles.pv_10,
            { width: "100%", borderBottomWidth: 0 },
          ]}
        >
          <CText style={styles.txt_block_title}>{`${
            LANG[props.language].title
          }:`}</CText>
          <TextInput
            style={styles.txt_title}
            value={state._title}
            onChangeText={(value) => onFunction.onChangeTitle(value)}
            editable={!state._isReply}
            multiline
            cursorColor={COLOR.txtColor}
          />
        </View>

        <View style={styles.con_des}>
          <TextInput
            style={styles.txt_des}
            value={state._des}
            textAlignVertical={"top"}
            placeholder={LANG[CONFIG.lang].content}
            placeholderTextColor={COLOR.placeholderTextColor}
            multiline={true}
            onChangeText={(value) => onFunction.onChangeDes(value)}
            cursorColor={COLOR.txtColor}
          />
        </View>
      </ScrollView>
    </View>
  );
};
