/* eslint-disable prettier/prettier */
/**
 * @Description: Message Screen Layout
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** LIBRARY */
import React from "react";
import { View, FlatList, Platform } from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
/** COMPONENT */
import HeaderBar from "../partials/header_bar";
import ItemChat from "./itemChat";
import CText from "../../components/CText";
/** COMMON */
import { DEVICE, COLOR, CONFIG, KEY } from "../../config";
import Helpers from "../../helpers";

const RenderEmpty = () => {
  return (
    <View
      style={[
        DEVICE.gStyle.full_center,
        { flex: 1, marginTop: (DEVICE.width * 2) / 3 },
      ]}
    >
      {/* <Icon
        containerStyle={{ marginTop: 20 }}
        name={"comment"}
        size={Helpers.fS(50)}
        color={COLOR.placeholderTextColor}
        type={"solid"}
      /> */}
      <FontAwesome5
        style={{ marginTop: 20 }}
        name={"comment"}
        size={Helpers.fS(50)}
        color={COLOR.placeholderTextColor}
        solid
      />

      <CText style={DEVICE.gStyle.txt_no_data} i18nKey={"txtNoDataMessage2"} />
    </View>
  );
};

export const RenderMessageScreen = ({
  props = null,
  isLoading = false,
  data = {
    listChat: [],
  },
  onPress = {
    item: () => {},
    contact: () => {},
  },
  _loadForList,
  _dataClasses,
  _dataStudents,
  _studentChoose,
  _classChoose,
  _onPressChooseClass,
  _onPressChooseStudent,
  _getFileType,
}) => {
  return (
    <View style={DEVICE.gStyle.container}>
      {/* HEADER */}
      <HeaderBar
        title={"txtTab2"}
        titleCenter={false}
        iconRight={"address-card"}
        onPressNext={onPress.contact}
        hasCustomHeaderRight={true}
        loadCustomHeaderRight={_loadForList}
        dataCustomHeaderRight={
          CONFIG.USER_TYPE === KEY.PARENT ? _dataStudents : _dataClasses
        }
        dataChooseCustomHeaderRight={
          CONFIG.USER_TYPE === KEY.PARENT ? _studentChoose : _classChoose
        }
        onCustomHeaderRight={
          CONFIG.USER_TYPE === KEY.PARENT
            ? _onPressChooseStudent
            : _onPressChooseClass
        }
      />

      {/* CONTENT */}
      {!isLoading &&
        RenderGroupContent(
          isLoading,
          data.listChat,
          onPress.item,
          _getFileType
        )}
    </View>
  );
};

const RenderGroupContent = (
  isLoading = false,
  listDataChat = [],
  onPressItem = () => {},
  _getFileType = () => {}
) => {
  listDataChat = listDataChat.filter(
    (f) => f.dataChat.lastestMessage.txtMessage !== ""
  );
  return (
    <FlatList
      style={DEVICE.gStyle.container}
      data={listDataChat}
      renderItem={({ item, index }) => (
        <ItemChat
          index={index}
          isLoading={isLoading}
          item={item}
          onPress={onPressItem}
          total={listDataChat?.length}
          getFileType={_getFileType}
        />
      )}
      extraData={isLoading}
      keyExtractor={(item, index) => index.toString()}
      getItemLayout={(data, index) => ({
        length: Helpers.wS("18.13%"),
        offset: Helpers.wS("18.13%") * index,
        index,
      })}
      removeClippedSubviews={Platform.OS === "android"}
      ListEmptyComponent={RenderEmpty}
    />
  );
};
