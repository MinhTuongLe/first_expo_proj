/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/**
 * @Description: Message Detail Screen Layout
 * @Created by ZiniTeam
 * @Date create: 26/02/2019
 */
/** LIBRARY */
import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import Icon from "react-native-fontawesome-pro";
import moment from "moment";
/** COMPONENT */
import HeaderBar from "../../partials/header_bar";
import CImage from "../../../components/CImage";
import CInput from "../../../components/CInput/CInput";
import CText from "../../../components/CText";
/** COMMON */
import {
  DEVICE,
  COLOR,
  CONFIG,
  fileLastExtensions,
  LANG,
} from "../../../config";
import Helpers from "../../../helpers";
/** STYLES */
import styles from "./style";
import { blue } from "../../../components/config/colors";
import Lightbox from "../../../components/CPopup/Lightbox";

const SPRING_CONFIG = {
  TENSION: 500000,
  FRICTION: 500000,
};

export const RenderMessageDetailScreen = ({
  loadMore = () => {},
  language = "en",
  data = {
    choosed: {},
    messages: [],
    existedData: [],
  },
  onPress = {
    send: () => {},
  },
  onPressUploadImage = {
    upload: () => {},
  },
  onPressUploadFile = {
    upload: () => {},
  },
  onBack = () => {},
  getFileType = () => {},
  onPreviewImage = () => {},
  onDownloadFile = () => {},
  _isPreview,
  onAccessDir = () => {},
}) => {
  return (
    <View style={DEVICE.gStyle.container}>
      {/* HEADER */}
      <HeaderBar
        title={data.choosed ? data.choosed.titleDetail : ""}
        hasBack
        titleUpperCase={false}
        onBack={onBack}
        hasMultiLang={false}
      />

      {/* CONTENT */}
      <KeyboardAvoidingView
        style={DEVICE.gStyle.container}
        behavior={"padding"}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: -500 })}
      >
        <FlatList
          style={DEVICE.gStyle.container}
          contentContainerStyle={styles.pall_10}
          data={data.messages}
          inverted={data.messages.length > 0}
          onEndReached={loadMore}
          onEndReachedThreshold={0.001}
          extraData={data.messages}
          ListEmptyComponent={RenderListMessageEmpty}
          renderItem={({ item, index }) => {
            let isSend =
              data.choosed.idUserSend == item.userObj?.id ? true : false;
            let nextMes = data.messages[index + 1]
              ? data.messages[index + 1]
              : null;
            let isExisted = data.existedData[index];
            return RenderMessageItem(
              index,
              data.messages.length || 0,
              item,
              data.choosed,
              nextMes,
              isSend,
              getFileType,
              onPreviewImage,
              onDownloadFile,
              _isPreview,
              isExisted,
              onAccessDir
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.con_footer}>
          <Icon
            containerStyle={styles.pl_20}
            name={"camera"}
            color={"#ffffff"}
            size={Helpers.fS(20)}
            type={"light"}
            onPress={() => onPressUploadImage.upload()}
          />
          <Icon
            containerStyle={styles.pl_15}
            name={"paperclip"}
            color={"#ffffff"}
            size={Helpers.fS(20)}
            type={"light"}
            onPress={() => onPressUploadFile.upload()}
          />

          <CInput
            ref={(ref) => (this.inputRef = ref)}
            style={styles.text_input}
            placeholder={
              language === "vi" ? "Nhập tin nhắn..." : "Input message..."
            }
            placeholderTextColor={"#ffffff"}
            multiline={true}
            isBorder={false}
            isRemove={false}
          />

          <Icon
            containerStyle={styles.ph_20}
            name={"arrow-right"}
            color={"#ffffff"}
            size={Helpers.fS(25)}
            type={"light"}
            onPress={() => onPress.send(this.inputRef)}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const RenderMessageItem = (
  index,
  lengthData,
  data,
  gMessages,
  nextMes,
  isSend,
  getFileType,
  onPreviewImage,
  onDownloadFile,
  _isPreview,
  isExisted,
  onAccessDir
) => {
  let isShowAvatar = false,
    timeNow = moment(),
    timeData = moment(data.createdAt),
    timeDataNextMsg = nextMes
      ? moment(nextMes.createdAt)
      : moment(data.createdAt),
    isFirstMess =
      (nextMes && data.userObj.id != nextMes.userObj.id) || !nextMes,
    txtRelation = "";

  let gender = CONFIG.users[0].path;
  if (
    gMessages.avatar &&
    (gMessages.avatar == "" || gMessages.avatar == null)
  ) {
    if (gMessages.hasOwnProperty("gender")) {
      gender = CONFIG.users.find((f) => f.id === gMessages.gender);
      if (gender) {
        gender = gender.path;
      }
    }
  }
  if (data.userObj.avatar == "" || data.userObj.avatar == null) {
    if (data.userObj.hasOwnProperty("gender")) {
      gender = CONFIG.users.find((f) => f.id === data.userObj.gender);
      if (gender) {
        gender = gender.path;
      }
    }
  }

  //check time > 5 minutes show text time + avatar
  if (!isSend) {
    if ((!isSend && isFirstMess) || !timeData.isSame(timeDataNextMsg, "day")) {
      isShowAvatar = true;
      if (!data.userObj.hasOwnProperty("userType")) {
        let find = CONFIG.users.find((f) => f.id === data.userObj.gender);
        if (find) {
          txtRelation = find.family;
        }
      } else {
        txtRelation = "teacher";
      }
    }
  }

  let fileExtension = getFileType(data.txtMessage);
  let time = Helpers.getShortTimeWithNow(timeData);
  let timeDesc = Helpers.formatToTimeZone(data?.createdAt);

  // let isExisted = false;

  // const checkFile = async () => {
  //   isExisted = await onCheckExistedFile(data.txtMessage);
  //   console.log('isExisted: ', isExisted);
  // };

  // // Gọi hàm checkFile
  // checkFile();

  return (
    <View>
      {(!timeData.isSame(timeDataNextMsg, "day") ||
        index == lengthData - 1) && (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            padding: 10,
            marginHorizontal: 10,
          }}
        >
          <View
            style={{
              height: 1,
              width: "30%",
              backgroundColor: COLOR.backgroundColorNote,
            }}
          />
          {!timeData.isSame(timeNow, "day") ? (
            <Text
              style={{
                color: COLOR.text_2,
                fontFamily: DEVICE.fontLight,
                fontSize: Helpers.fS(10),
              }}
            >
              {`${time.time} ${
                time.type === time.des ? LANG[CONFIG.lang][time.type] : time.des
              }`}
            </Text>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <CText
                style={{
                  color: COLOR.text_2,
                  fontFamily: DEVICE.fontLight,
                  fontSize: Helpers.fS(10),
                }}
                i18nKey={"today"}
              />
              {/* <Text
                style={{
                  color: COLOR.text_2,
                  fontFamily: DEVICE.fontLight,
                  fontSize: Helpers.fS(10),
                }}>
                {
                  `${time.time} ${
                      time.type === time.des
                        ? LANG[CONFIG.lang][time.type]
                        : time.des
                    }`
                  }
              </Text> */}
            </View>
          )}

          <View
            style={{
              height: 1,
              width: "30%",
              backgroundColor: COLOR.backgroundColorNote,
            }}
          />
        </View>
      )}
      <View
        style={[
          styles.con_item,
          { justifyContent: isSend ? "flex-end" : "flex-start" },
        ]}
      >
        {isShowAvatar ? (
          <CImage
            style={styles.img_avatar}
            src={
              gMessages.avatar &&
              gMessages.avatar != "" &&
              gMessages.avatar != null
                ? { uri: CONFIG.host + gMessages.avatar }
                : data.userObj.avatar &&
                  data.userObj.avatar != "" &&
                  data.userObj.avatar != null
                ? { uri: CONFIG.host + data.userObj.avatar }
                : gender
            }
            resizeMode={"cover"}
            type={"avatar"}
          />
        ) : (
          <View style={styles.con_avatar} />
        )}

        {data && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: isSend ? "flex-end" : "flex-start",
            }}
          >
            <View
              style={[
                styles.con_send,
                isSend
                  ? {
                      backgroundColor: COLOR.primaryApp,
                      borderBottomRightRadius: 0,
                    }
                  : { backgroundColor: "#ffffff", borderTopLeftRadius: 0 },
              ]}
            >
              {/* {isShowAvatar &&
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ backgroundColor: COLOR.primaryButton, paddingHorizontal: 5, paddingVertical: 3, borderRadius: 3 }}>
                    <CText style={{ color: '#ffffff', fontFamily: DEVICE.fontBold, fontSize: Helpers.fS(12) }} i18nKey={txtRelation} />
                  </View>

                  <Text style={{ color: COLOR.cor_xam, fontFamily: DEVICE.fontLight, fontSize: Helpers.fS(12) }}>  {data.user.fullName}</Text>
                </View>
              } */}

              {data.txtMessage.includes("messeageFile") &&
              data.type !== "text" ? (
                data.type === "file" ? (
                  <View>
                    {fileExtension &&
                      fileExtension === fileLastExtensions.image.name && (
                        <View
                          style={[
                            styles.con_photo,
                            {
                              marginBottom: 6,
                            },
                          ]}
                        >
                          <Lightbox
                            underlayColor={"black"}
                            springConfig={{
                              tension: SPRING_CONFIG.TENSION,
                              friction: SPRING_CONFIG.FRICTION,
                            }}
                            swipeToDismiss={false}
                            // renderContent={() => (
                            //   <RenderSwiper data={this._data} curIndex={0} />
                            // )}
                            onOpen={() => onPreviewImage(true)}
                            onClose={() => onPreviewImage(false)}
                            didOpen={() => onPreviewImage(true)}
                          >
                            <CImage
                              style={[
                                styles.img_photo,
                                styles.pr_10,
                                {
                                  height: Helpers.wS(
                                    _isPreview ? "100%" : "40%"
                                  ),
                                  width: Helpers.wS(
                                    _isPreview ? "100%" : "50%"
                                  ),
                                },
                              ]}
                              src={{
                                uri: CONFIG.host + data.txtMessage,
                              }}
                              resizeMode={"cover"}
                            />
                          </Lightbox>
                        </View>
                      )}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                        gap: 6,
                      }}
                    >
                      <Icon
                        name={fileExtension || "file"}
                        size={20}
                        color={!isSend ? blue : "#efeff2"}
                        type={"light"}
                      />
                      <Pressable
                        onPress={() =>
                          onDownloadFile(
                            CONFIG.host + data.txtMessage,
                            // data.txtMessage.split('/')[
                            //   data.txtMessage.split('/').length - 1
                            // ],
                            data.txtMessage.replace(/^.*[\\/]/, "")
                          )
                        }
                      >
                        <Text
                          style={[
                            {
                              color: isSend ? "#ffffff" : "black",
                              textDecorationLine: "underline",
                              maxWidth: Helpers.wS("40%"),
                            },
                            styles.txt_message,
                          ]}
                          numberOfLines={1}
                          ellipsizeMode="middle"
                        >
                          {/* {
                            data.txtMessage.split('/')[
                              data.txtMessage.split('/').length - 1
                            ]
                          } */}
                          {data.txtMessage.replace(/^.*[\\/]/, "")}
                        </Text>
                      </Pressable>
                      {isExisted == true && (
                        <Pressable
                          style={{ marginLeft: 4 }}
                          onPress={onAccessDir}
                        >
                          <Icon
                            name={"folder"}
                            size={20}
                            color={blue}
                            type={"light"}
                          />
                        </Pressable>
                      )}
                    </View>
                  </View>
                ) : (
                  <View style={styles.con_photo}>
                    {/* <Pressable
                      onPress={() =>
                        onPreviewImage(CONFIG.host + data.txtMessage)
                      }>
                      <CImage
                        style={[styles.img_photo, styles.pr_10]}
                        src={{
                          uri: CONFIG.host + data.txtMessage,
                        }}
                        resizeMode={'contain'}
                      />
                    </Pressable> */}
                    <Lightbox
                      underlayColor={"black"}
                      springConfig={{
                        tension: SPRING_CONFIG.TENSION,
                        friction: SPRING_CONFIG.FRICTION,
                      }}
                      swipeToDismiss={false}
                      // renderContent={() => (
                      //   <RenderSwiper data={this._data} curIndex={0} />
                      // )}
                      onOpen={() => onPreviewImage(true)}
                      onClose={() => onPreviewImage(false)}
                      didOpen={() => onPreviewImage(true)}
                    >
                      <CImage
                        style={[
                          styles.img_photo,
                          styles.pr_10,
                          {
                            height: Helpers.wS(_isPreview ? "100%" : "40%"),
                            width: Helpers.wS(_isPreview ? "100%" : "50%"),
                          },
                        ]}
                        src={{
                          uri: CONFIG.host + data.txtMessage,
                        }}
                        resizeMode={"cover"}
                      />
                    </Lightbox>
                  </View>
                )
              ) : (
                <Text
                  style={[
                    { color: isSend ? "#ffffff" : "black" },
                    styles.txt_message,
                    isShowAvatar ? { paddingTop: 3 } : {},
                  ]}
                >
                  {data.txtMessage}
                </Text>
              )}
              <Text
                style={{
                  color: isSend ? "#ffffff" : "black",
                  fontFamily: DEVICE.fontRegular,
                  fontSize: Helpers.fS(10),
                  marginTop: 5,
                }}
              >
                {timeDesc || ""}
              </Text>
            </View>
          </View>
        )}

        {data.photo && (
          <View style={styles.con_photo}>
            <Lightbox
              underlayColor={"black"}
              springConfig={{
                tension: SPRING_CONFIG.TENSION,
                friction: SPRING_CONFIG.FRICTION,
              }}
              swipeToDismiss={false}
              // renderContent={() => (
              //   <RenderSwiper data={this._data} curIndex={0} />
              // )}
              onOpen={() => onPreviewImage(true)}
              onClose={() => onPreviewImage(false)}
              didOpen={() => onPreviewImage(true)}
            >
              <CImage
                style={[
                  styles.img_photo,
                  styles.pr_10,
                  {
                    height: Helpers.wS(_isPreview ? "100%" : "40%"),
                    width: Helpers.wS(_isPreview ? "100%" : "50%"),
                  },
                ]}
                src={data.photo}
                resizeMode={"cover"}
              />
            </Lightbox>
          </View>
        )}
      </View>
    </View>
  );
};

const RenderListMessageEmpty = () => {
  return (
    <View
      style={[DEVICE.gStyle.full_center, { marginTop: (DEVICE.width * 2) / 3 }]}
    >
      <Icon
        containerStyle={{ marginTop: 40 }}
        name={"comments"}
        size={Helpers.fS(80)}
        color={COLOR.placeholderTextColor}
        type={"solid"}
      />
      <CText style={styles.txt_no_cmt_1} i18nKey={"txtNoDataMessage"} />
    </View>
  );
};
