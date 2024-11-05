/**
 * @Description: Album Detail Screen Layout
 * @Created by ZiniTeam
 * @Date create: 21/01/2019
 */
/** LIBRARY */
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
/** COMPONENT */
import HeaderBar from "../../partials/header_bar";
import CText from "../../../components/CText";
import CImage from "../../../components/CImage";
import CInput from "../../../components/CInput/CInput";
import CImageGalary from "../../../components/CImageGallery";
import CLoading from "../../../components/CLoading";
/** COMMON */
import { DEVICE, COLOR, CONFIG, LANG } from "../../../config";
import Helpers from "../../../helpers";
/** STYLES */
import styles from "../style";

const RenderEmptyList = () => {
  return (
    <View style={styles.con_empty_comment}>
      {/* <Icon
        name={"comments"}
        size={Helpers.fS(50)}
        color={COLOR.placeholderTextColor}
        type={"solid"}
      /> */}
      <FontAwesome5
        name={"comments"}
        size={Helpers.fS(50)}
        color={COLOR.placeholderTextColor}
        solid
      />

      {/* <CText style={styles.txt_no_comment_1} i18nKey={'txtNoDataCmt'} /> */}
      <CText style={styles.txt_no_comment_2} i18nKey={"txtNoDataCmt1"} />
    </View>
  );
};

class ViewAlbumDetailScreen extends React.PureComponent {
  /** RENDER */
  render() {
    let { isLoading, isLiked, data, onPress, language } = this.props;
    let time = Helpers.getShortTimeWithNow(data.createAt);
    let newFullNameOwner = "";
    if (data.owner) {
      newFullNameOwner = Helpers.capitalizeName(
        data.owner.firstName,
        data.owner.lastName,
        CONFIG.settingLocal.softName
      );
    }

    return (
      <View style={styles.d_con}>
        {/* Header */}
        <HeaderBar
          title={"txtDrawerAlbum"}
          hasBack
          titleCenter={false}
          onBack={onPress.goBack}
        />

        {!isLoading && (
          <KeyboardAvoidingView
            style={DEVICE.gStyle.flex_1}
            behavior={"padding"}
            keyboardVerticalOffset={Platform.select({
              ios: 0,
              android: -500,
            })}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <>
                {!isLoading && (
                  <CImageGalary
                    data={data.photos}
                    photoCount={data.photos.length}
                  />
                )}

                <View style={styles.d_con_info}>
                  <Text style={styles.d_txt_title}>{data.title}</Text>
                  <View style={DEVICE.gStyle.row_align_center}>
                    <CText style={styles.d_txt_time} i18nKey={"by"} />
                    <Text style={styles.d_txt_owner}> {newFullNameOwner}</Text>
                    <CText style={styles.d_txt_time}>{" - "}</CText>

                    {time.type !== time.des ? (
                      <Text
                        style={[
                          styles.d_txt_time,
                          { color: COLOR.inactiveTintColor },
                        ]}
                      >
                        {time.des}
                      </Text>
                    ) : (
                      <>
                        <Text
                          style={[
                            styles.d_txt_time,
                            { color: COLOR.inactiveTintColor },
                          ]}
                        >
                          {" "}
                          {time.time}{" "}
                        </Text>
                        <CText
                          style={[
                            styles.d_txt_time,
                            { color: COLOR.inactiveTintColor },
                          ]}
                          i18nKey={time.type}
                        />
                      </>
                    )}
                  </View>
                </View>

                <View style={styles.d_seperator_line} />

                <View
                  style={
                    (styles.d_con_info,
                    { backgroundColor: COLOR.backgroundSec })
                  }
                >
                  {data.whoLike.length > 0 && (
                    <View>
                      <View
                        style={[
                          DEVICE.gStyle.row_align_center,
                          styles.mt_10,
                          styles.ml_10,
                        ]}
                      >
                        {/* <Icon
                          name={"thumbs-up"}
                          color={!isLiked ? COLOR.txt_3 : COLOR.primaryButton}
                          size={Helpers.fS(20)}
                          type={!isLiked ? "light" : "solid"}
                        /> */}
                        <FontAwesome5
                          name={"thumbs-up"}
                          color={!isLiked ? COLOR.txt_3 : COLOR.primaryButton}
                          size={Helpers.fS(20)}
                          // type={!isLiked ? "light" : "solid"}
                        />
                        {isLiked && data.whoLike.length == 1 && (
                          <CText
                            style={[styles.d_txt_info_item, styles.ml_10]}
                            i18nKey={"likeContent"}
                          />
                        )}
                        {isLiked && data.whoLike.length > 1 && (
                          <View style={DEVICE.gStyle.row_align_center}>
                            <CText
                              style={[styles.d_txt_info_item, styles.ml_10]}
                              i18nKey={"youAnd"}
                            />
                            <CText
                              style={[styles.d_txt_info_item, styles.ml_5]}
                              i18nKey={"somePeopleLikeContent"}
                            />
                          </View>
                        )}
                        {!isLiked && data.whoLike.length >= 1 && (
                          <View style={DEVICE.gStyle.row_align_center}>
                            <Text style={[styles.d_txt_info_item, styles.ml_5]}>
                              {data.whoLike.length}
                            </Text>
                            <CText
                              style={[styles.d_txt_info_item]}
                              i18nKey={"likes"}
                            />
                          </View>
                        )}
                      </View>

                      <View style={styles.mh_10}>
                        <View style={styles.d_seperator_line} />
                      </View>
                    </View>
                  )}

                  <View style={styles.d_con_action}>
                    <TouchableOpacity
                      style={styles.d_con_action_1}
                      onPress={onPress.like}
                    >
                      {/* <Icon
                        name={"thumbs-up"}
                        color={isLiked ? COLOR.primaryButton : COLOR.txt_3}
                        size={Helpers.fS(20)}
                        type={!isLiked ? "light" : "solid"}
                      /> */}
                      <FontAwesome5
                        name={"thumbs-up"}
                        color={isLiked ? COLOR.primaryButton : COLOR.txt_3}
                        size={Helpers.fS(20)}
                        // type={!isLiked ? "light" : "solid"}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.d_con_action_1}
                      onPress={() => onPress.cmt(this.inputRef)}
                    >
                      {/* <Icon
                        name={"comment-lines"}
                        color={COLOR.txt_3}
                        size={Helpers.fS(20)}
                        type={"light"}
                      /> */}
                      <FontAwesome5
                        name={"comment-lines"}
                        color={COLOR.txt_3}
                        size={Helpers.fS(20)}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.d_seperator_line} />
                </View>
              </>

              <View style={styles.d_con_info}>
                <FlatList
                  data={data.comments}
                  renderItem={({ item, index }) => {
                    let isLast = index === data.comments.length - 1;
                    let newFullName = Helpers.capitalizeName(
                      item.firstName,
                      item.lastName,
                      CONFIG.settingLocal.softName
                    );
                    let time =
                      typeof item.createAt === "string"
                        ? item.createAt
                        : Helpers.getShortTimeWithNow(item.createAt);
                    let gender = CONFIG.users[0].path;
                    if (item.hasOwnProperty("gender")) {
                      gender = CONFIG.users.find((f) => f.id === item.gender);
                      if (gender) {
                        gender = gender.path;
                      }
                    } else if (
                      item.hasOwnProperty("avatar") &&
                      item.avatar !== "" &&
                      item.avatar !== null
                    ) {
                      gender = {
                        uri: CONFIG.host + item.avatar,
                      };
                    }

                    return (
                      <View style={styles.con_cmt}>
                        <CImage
                          style={[
                            styles.img_avatar,
                            {
                              borderColor: COLOR.borderColor,
                              borderWidth: 1,
                            },
                          ]}
                          src={gender}
                          resizeMode={"cover"}
                        />

                        <View
                          style={[
                            styles.con_cmt_info_1,
                            isLast && {
                              borderBottomWidth: 0,
                            },
                          ]}
                        >
                          <View style={styles.con_cmt_info_top}>
                            <Text style={styles.txt_cmt_name}>
                              {newFullName}
                            </Text>
                            {typeof item.createAt === "string" ? (
                              <Text style={styles.txt_cmt_time}>{time}</Text>
                            ) : time.type !== time.des ? (
                              <View style={DEVICE.gStyle.row_align_center}>
                                {/* <Text style={styles.txt_cmt_time}>
                                  {time.time}
                                  {' - '}
                                </Text> */}
                                <CText style={styles.txt_cmt_time}>
                                  {time.des}
                                </CText>
                              </View>
                            ) : (
                              <View style={DEVICE.gStyle.row_align_center}>
                                <Text style={styles.txt_cmt_time}>
                                  {Helpers.formatToTimeZone(item?.createAt)}
                                </Text>
                                {/* <Text style={styles.txt_cmt_time}>
                                  {time.time}{' '}
                                </Text> */}
                                {/* <CText
                                  style={styles.txt_cmt_time}
                                  i18nKey={time.type}
                                /> */}
                              </View>
                            )}
                          </View>
                          <Text style={styles.txt_cmt_msg}>
                            {item.contentCmt}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  ListEmptyComponent={RenderEmptyList}
                />
              </View>
            </ScrollView>

            <View
              style={[
                DEVICE.gStyle.row_align_center,
                {
                  paddingVertical: Platform.OS === "android" ? 5 : 15,
                  borderTopColor: "#f2f2f2",
                  borderTopWidth: 1,
                },
                { paddingBottom: 0, backgroundColor: COLOR.primaryApp },
              ]}
            >
              <CInput
                ref={(ref) => (this.inputRef = ref)}
                style={styles.con_input_comment}
                placeholder={LANG[CONFIG.lang].txtAlbumDetailComment}
                placeholderTextColor={"#ffffff"}
                returnKeyType={"done"}
                blurOnSubmit={true}
                keyboardShouldPersistTaps={"handled"}
                isBorder={false}
                isRemove={false}
              />

              {/* <Icon
                containerStyle={styles.ph_20}
                name={"arrow-right"}
                color={"#ffffff"}
                size={Helpers.fS(25)}
                type={"light"}
                onPress={() => onPress.send(this.inputRef)}
              /> */}
              <Pressable onPress={() => onPress.send(this.inputRef)}>
                <FontAwesome5
                  style={styles.ph_20}
                  name={"arrow-right"}
                  color={"#ffffff"}
                  size={Helpers.fS(25)}
                />
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        )}

        {isLoading && (
          <View style={DEVICE.gStyle.full_center}>
            <CLoading />
          </View>
        )}
      </View>
    );
  }
}
ViewAlbumDetailScreen.defaultProps = {
  isLoading: false,
  isLiked: false,
  data: {},
  onPress: {
    like: () => {},
    cmt: () => {},
    send: () => {},
  },
};
export default ViewAlbumDetailScreen;
