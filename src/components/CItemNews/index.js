/**
 * @Description: Custom Item Album
 * @Created by ZiniTeam
 * @Date create: 21/01/2019
 */
/** LIBRARY */
import React from "react";
import { View, TouchableOpacity } from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
/** COMMON */
import { DEVICE, CONFIG } from "../../config";
import Helpers from "../../helpers";
/** COMPONENT */
import CImage from "../CImage";
import CText from "../CText";
/** STYLE */
import styles from "./styles";

const regex = /(<([^>]+)>)/gi;
const postFormat = [
  {
    name: "standard",
    icon: "",
  },
  {
    name: "video",
    icon: "video",
  },
  {
    name: "audio",
    icon: "headphones-alt",
  },
  {
    name: "gallery",
    icon: "images",
  },
];

export default class CItemNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _title: "",
      _postFormat: postFormat[0], // standard, video, audio, gallery
      _featuredMedia: null,
      _time: null,
      _categories: null,
    };
  }

  /** LIFE CYCLE */
  async componentDidMount() {
    let { data } = this.props;
    let { _title, _featuredMedia, _time, _categories, _postFormat } =
      this.state;

    /** Prepare Title */
    _title = decode(data.title.rendered.replace(regex, ""));
    /** Prepare Time create */
    _time = await Helpers.parseTimeNews(data.date);
    /** Prepare Featured media */
    if (typeof data.featured_media === "object" && data.featured_media.sizes) {
      _featuredMedia = data.featured_media.sizes.medium;
    }
    /** Prepare Categories */
    if (data.categories && data.categories.length > 0) {
      _categories = data.categories;
    }
    /** Prepare Format post */
    if (data.format) {
      _postFormat = postFormat.find((f) => f.name === data.format);
    }

    this.setState({
      _title,
      _time,
      _categories,
      _featuredMedia,
      _postFormat,
      _loading: false,
    });
  }

  /** RENDER */
  render() {
    let {
      containerStyle,
      imageStyle,
      titleStyle,
      index,
      typeShow,
      onPressCategory,
    } = this.props;
    let { _loading, _title, _time, _featuredMedia, _categories, _postFormat } =
      this.state;

    if (_loading) return null;

    if (typeShow === "image_left") {
      return (
        <View
          style={[
            DEVICE.gStyle.flex_1,
            DEVICE.gStyle.row_align_start,
            index === 0 ? styles.pb_10 : styles.pv_10,
            containerStyle,
          ]}
        >
          <View style={styles.con_image}>
            <CImage
              style={[styles.image, imageStyle]}
              src={{ uri: _featuredMedia }}
              resizeMode={"cover"}
            />
            {_postFormat.name !== "standard" && (
              <View
                style={{
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                  backgroundColor: "black",
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                }}
              >
                <CText
                  style={[
                    DEVICE.initFont.XX_SMALL,
                    { fontSize: Helpers.fS(2), color: "#ffffff" },
                  ]}
                >
                  {"02:00"}
                </CText>
              </View>
            )}
          </View>

          <View style={styles.con_infor}>
            <CText
              style={[DEVICE.initFont.XX_SMALL, styles.txt_title, titleStyle]}
              numberOfLines={2}
            >
              {_postFormat.name !== "standard" && (
                // <Icon
                //   containerStyle={[styles.pr_5]}
                //   name={_postFormat.icon}
                //   color={"black"}
                //   size={Helpers.fS(12)}
                //   type={"solid"}
                // />
                <FontAwesome5
                  style={[styles.pr_5]}
                  name={_postFormat.icon}
                  color={"black"}
                  size={Helpers.fS(12)}
                  solid
                />
              )}
              {_title}
            </CText>

            <View style={[DEVICE.gStyle.row_align_center]}>
              <CText style={[DEVICE.initFont.XXX_SMALL, styles.txt_time]}>
                {_time.data + " "}
              </CText>
              <CText
                style={[DEVICE.initFont.XXX_SMALL, styles.txt_time]}
                i18nKey={_time.des}
              />
            </View>

            {_categories && _categories.length > 0 && (
              <View style={DEVICE.gStyle.row_align_center}>
                {_categories.map((item, index) => {
                  if (index >= 2) return null;
                  return (
                    <TouchableOpacity
                      key={index.toString()}
                      onPress={() => onPressCategory(item)}
                    >
                      <View style={DEVICE.gStyle.row_align_center}>
                        <CText
                          style={[
                            DEVICE.initFont.XX_SMALL,
                            styles.txt_category,
                          ]}
                        >
                          {item.name + (index == 1 ? "..." : "")}
                        </CText>
                        {index < 1 && index !== _categories.length - 1 && (
                          <CText
                            style={[
                              DEVICE.initFont.XX_SMALL,
                              styles.txt_category,
                            ]}
                          >
                            {" | "}
                          </CText>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      );
    }

    if (typeShow === "image_right") {
      return (
        <View
          style={[
            DEVICE.gStyle.flex_1,
            DEVICE.gStyle.row_align_start,
            index === 0 ? { paddingBottom: 10 } : { paddingVertical: 10 },
            containerStyle,
          ]}
        >
          <View
            style={[styles.con_infor, { paddingLeft: 0, paddingRight: 10 }]}
          >
            <CText
              style={[DEVICE.initFont.XX_SMALL, styles.txt_title, titleStyle]}
              numberOfLines={2}
            >
              {_postFormat.name !== "standard" && (
                // <Icon
                //   containerStyle={[styles.pr_5]}
                //   name={_postFormat.icon}
                //   color={"black"}
                //   size={Helpers.fS(12)}
                //   type={"solid"}
                // />
                <FontAwesome5
                  style={[styles.pr_5]}
                  name={_postFormat.icon}
                  color={"black"}
                  size={Helpers.fS(12)}
                  solid
                />
              )}
              {_title}
            </CText>

            <View style={[DEVICE.gStyle.row_align_center]}>
              <CText style={[DEVICE.initFont.XXX_SMALL, styles.txt_time]}>
                {_time.data + " "}
              </CText>
              <CText
                style={[DEVICE.initFont.XXX_SMALL, styles.txt_time]}
                i18nKey={_time.des}
              />
            </View>

            {_categories && (
              <View style={DEVICE.gStyle.row_align_center}>
                {_categories.map((item, index) => {
                  if (index > 2) return null;
                  return (
                    <TouchableOpacity onPress={() => onPressCategory(item)}>
                      <View style={DEVICE.gStyle.row_align_center}>
                        <CText
                          style={[
                            DEVICE.initFont.XX_SMALL,
                            styles.txt_category,
                          ]}
                        >
                          {item.name + (index == 1 ? "..." : "")}
                        </CText>
                        {index < 1 && index !== _categories.length - 1 && (
                          <CText
                            style={[
                              DEVICE.initFont.XX_SMALL,
                              styles.txt_category,
                            ]}
                          >
                            {" | "}
                          </CText>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>

          <View style={styles.con_image}>
            <CImage
              style={[styles.image, imageStyle]}
              src={{ uri: _featuredMedia }}
              resizeMode={"cover"}
            />
            {_postFormat.name !== "standard" && (
              <View
                style={{
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                  backgroundColor: "black",
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                }}
              >
                <CText
                  style={[
                    DEVICE.initFont.XXX_SMALL,
                    { fontSize: Helpers.fS(10), color: "#ffffff" },
                  ]}
                >
                  {"02:00"}
                </CText>
              </View>
            )}
          </View>
        </View>
      );
    }

    if (typeShow === "column") {
      return (
        <View
          style={[
            DEVICE.gStyle.flex_1,
            DEVICE.gStyle.column_align_start,
            DEVICE.gStyle.shadow,
            styles.mv_10,
            styles.pb_5,
            styles.con_cul_container,
            containerStyle,
          ]}
        >
          <View style={styles.con_cul_image}>
            <CImage
              style={[styles.image_cul, imageStyle]}
              src={{ uri: _featuredMedia }}
              resizeMode={"cover"}
            />
            {_postFormat.name !== "standard" && (
              <View
                style={{
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                  backgroundColor: "black",
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                }}
              >
                <CText
                  style={[DEVICE.initFont.XXX_SMALL, { color: "#ffffff" }]}
                >
                  {"02:00"}
                </CText>
              </View>
            )}
          </View>

          <View style={styles.con_cul_infor}>
            <CText
              style={[
                DEVICE.initFont.XX_SMALL,
                styles.txt_cul_title,
                titleStyle,
              ]}
              numberOfLines={2}
            >
              {_postFormat.name !== "standard" && (
                // <Icon
                //   containerStyle={[styles.pr_5]}
                //   name={_postFormat.icon}
                //   color={"black"}
                //   size={Helpers.fS(12)}
                //   type={"solid"}
                // />
                <FontAwesome5
                  style={[styles.pr_5]}
                  name={_postFormat.icon}
                  color={"black"}
                  size={Helpers.fS(12)}
                  solid
                />
              )}
              {_title}
            </CText>

            <View style={[DEVICE.gStyle.row_align_center]}>
              <CText style={[DEVICE.initFont.XXX_SMALL, styles.txt_cul_time]}>
                {_time.data + " "}
              </CText>
              <CText
                style={[DEVICE.initFont.XXX_SMALL, styles.txt_cul_time]}
                i18nKey={_time.des}
              />
            </View>

            {_categories && (
              <View style={DEVICE.gStyle.row_align_center}>
                {_categories.map((item, index) => {
                  if (index > 1) return null;
                  return (
                    <TouchableOpacity onPress={() => onPressCategory(item)}>
                      <View style={DEVICE.gStyle.row_align_center}>
                        <CText
                          style={[
                            DEVICE.initFont.XX_SMALL,
                            styles.txt_cul_category,
                          ]}
                        >
                          {item.name + (index == 1 ? "..." : "")}
                        </CText>
                        {index < 1 && index !== _categories.length - 1 && (
                          <CText
                            style={[
                              DEVICE.initFont.XX_SMALL,
                              styles.txt_cul_category,
                            ]}
                          >
                            {" | "}
                          </CText>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      );
    }

    if (typeShow === "card") {
      return (
        <View
          style={[
            DEVICE.gStyle.column_align_center,
            DEVICE.gStyle.shadow,
            styles.pb_10,
            index !== 0 && styles.mt_20,
            styles.con_card_container,
            containerStyle,
          ]}
        >
          <View style={styles.con_card_image}>
            <CImage
              style={[styles.image_card, imageStyle]}
              src={{ uri: _featuredMedia }}
              resizeMode={"cover"}
            />
            {_postFormat.name !== "standard" && (
              <View
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  backgroundColor: "black",
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                }}
              >
                <CText
                  style={[DEVICE.initFont.XXX_SMALL, { color: "#ffffff" }]}
                >
                  {"02:00"}
                </CText>
              </View>
            )}
          </View>

          <View style={styles.con_card_infor}>
            <CText
              style={[
                DEVICE.initFont.XX_SMALL,
                styles.txt_card_title,
                titleStyle,
              ]}
              numberOfLines={2}
            >
              {_postFormat.name !== "standard" && (
                // <Icon
                //   containerStyle={[styles.pr_5]}
                //   name={_postFormat.icon}
                //   color={"black"}
                //   size={Helpers.fS(12)}
                //   type={"solid"}
                // />
                <FontAwesome5
                  containerStyle={[styles.pr_5]}
                  name={_postFormat.icon}
                  color={"black"}
                  size={Helpers.fS(12)}
                  solid
                />
              )}
              {_title}
            </CText>

            <View style={[DEVICE.gStyle.row_align_center]}>
              <CText style={[DEVICE.initFont.XXX_SMALL, styles.txt_card_time]}>
                {_time.data + " "}
              </CText>
              <CText
                style={[DEVICE.initFont.XXX_SMALL, styles.txt_card_time]}
                i18nKey={_time.des}
              />
            </View>

            {_categories && (
              <View style={DEVICE.gStyle.row_align_center}>
                {_categories.map((item, index) => {
                  if (index > 3) return null;
                  return (
                    <TouchableOpacity onPress={() => onPressCategory(item)}>
                      <View style={DEVICE.gStyle.row_align_center}>
                        <CText
                          style={[
                            DEVICE.initFont.XX_SMALL,
                            styles.txt_card_category,
                          ]}
                        >
                          {item.name + (index == 3 ? "..." : "")}
                        </CText>
                        {index < 3 && index !== _categories.length - 1 && (
                          <CText
                            style={[
                              DEVICE.initFont.XX_SMALL,
                              styles.txt_card_category,
                            ]}
                          >
                            {" | "}
                          </CText>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      );
    }

    return null;
  }
}
