/* eslint-disable prettier/prettier */
/**
 * @Description: Message Item
 * @Created by ZiniTeam
 * @Date create: 26/02/2019
 */
/** LIBRARY */
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
/** COMPONENT */
import CImage from "../../../components/CImage";
import CText from "../../../components/CText";
/** COMMON */
import { DEVICE, CONFIG, ASSETS, KEY, COLOR, LANG } from "../../../config";
import Helpers from "../../../helpers";
/** STYLES */
import styles from "./style";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";

class ItemChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: props.isLoading,
    };
    this._groupId = "";
    this._typeGroup = props.item.dataGroup.hasOwnProperty("totalStudent")
      ? KEY.GROUP
      : KEY.PERSONAL;
  }

  /** FUNCTIONS */
  _getDataFromServer = () => {
    this._groupId = this.props.item.dataChat.id;
    this.setState({ _loading: false });
  };

  _onPressItemChat = () => {
    let newFullName = this.props.item.dataGroup.title;
    if (this._typeGroup == KEY.PERSONAL) {
      newFullName = Helpers.capitalizeName(
        this.props.item.dataGroup.firstName,
        this.props.item.dataGroup.lastName,
        CONFIG.settingLocal.softName
      );
    }

    this.props.onPress(
      this._groupId,
      this._typeGroup == KEY.PERSONAL
        ? newFullName
        : this.props.item.dataGroup.title,
      this._typeGroup,
      this.props.item.dataGroup.avatar
    );
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._getDataFromServer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.setState({ _loading: true });
      this._getDataFromServer();
    }
  }

  /** RENDER */
  render() {
    let { item } = this.props;

    let time =
      item.dataChat?.lastestMessage?.createdAt &&
      item.dataChat?.lastestMessage?.createdAt !== 0
        ? Helpers.getShortTimeWithNow(item.dataChat.lastestMessage?.createdAt)
        : item.dataChat?.data?.createdAt && item.dataChat?.data?.createdAt !== 0
        ? Helpers.getShortTimeWithNow(item.dataChat.data.createdAt)
        : null;

    // let time = undefined;
    let uriAvatar =
      item.dataGroup.avatar != "" && item.dataGroup.avatar != null
        ? CONFIG.host + item.dataGroup.avatar
        : null;
    let icClass = ASSETS.imgFailed;
    let gender =
      this._typeGroup === KEY.PERSONAL && item.dataGroup.gender
        ? CONFIG.users[item.dataGroup.gender].path
        : CONFIG.users[0].path;
    let newFullName = item.dataGroup.fullName;
    if (this._typeGroup != KEY.PERSONAL) {
      icClass =
        CONFIG.classes.find((f) => f.id === item.dataGroup?.age) ||
        CONFIG.classes[CONFIG.classes.length - 1].path;
    } else {
      newFullName = Helpers.capitalizeName(
        item.dataGroup.firstName,
        item.dataGroup.lastName,
        CONFIG.settingLocal.softName
      );
    }

    if (item.dataGroup.hasOwnProperty("type")) {
      let find = CONFIG.users.find((f) => f.id === item.dataGroup.type);
      if (find) {
        gender = find.path;
      }
    }

    let fileExtension = this.props.getFileType(
      item.dataChat.lastestMessage.txtMessage
    );

    return (
      <TouchableOpacity
        style={styles.con_message_item}
        onPress={this._onPressItemChat}
        activeOpacity={0.5}
      >
        {this._typeGroup == KEY.PERSONAL ? (
          <CImage
            style={styles.img_avatar}
            resizeMode={"cover"}
            src={uriAvatar ? { uri: uriAvatar } : gender}
            type={"avatar"}
          />
        ) : (
          <Image
            style={styles.img_avatar}
            resizeMode={"cover"}
            source={icClass}
          />
        )}

        {item.dataChat.unreadMessages > 0 && (
          <View style={styles.con_unread_message}>
            <Text style={styles.txt_unread_message}>
              {item.dataChat.unreadMessages}
            </Text>
          </View>
        )}

        <View
          style={[
            styles.con_message_content,
            DEVICE.gStyle.column,
            // this._typeGroup == KEY.PERSONAL
            //   ? DEVICE.gStyle.space_between
            //   : DEVICE.gStyle.column,
          ]}
        >
          <View style={styles.con_message_info}>
            <View style={styles.con_message_name}>
              <Text style={styles.txt_person_info_fullname}>
                {this._typeGroup == KEY.PERSONAL
                  ? newFullName
                  : item.dataGroup.title}
              </Text>
              {time && (
                <View style={DEVICE.gStyle.row_align_center}>
                  <Text style={styles.txt_person_info_time}>{time.time}</Text>
                  {time.type === time.des ? (
                    <CText
                      style={[styles.txt_person_info_time, { marginLeft: 5 }]}
                      i18nKey={time.type}
                    />
                  ) : (
                    <CText
                      style={[styles.txt_person_info_time, { marginLeft: 5 }]}
                    >
                      {time.des}
                    </CText>
                  )}
                </View>
              )}
            </View>

            <View style={styles.con_message_name}>
              {!item.dataChat.lastestMessage.txtMessage ? (
                <CText
                  style={styles.txt_person_info_text_msgNew}
                  i18nKey={"txtNoDataMessage"}
                />
              ) : (
                <View style={{ flexDirection: "row", gap: 6 }}>
                  {item.dataChat.lastestMessage?.type === "file" ? (
                    // <Icon
                    //   name={fileExtension || "file"}
                    //   size={20}
                    //   color={
                    //     item.dataChat.unreadMessages === 0
                    //       ? COLOR.placeholderTextColor
                    //       : COLOR.txtColor
                    //   }
                    //   type={
                    //     item.dataChat.unreadMessages === 0 ? "light" : "regular"
                    //   }
                    // />
                    <FontAwesome5
                      name={fileExtension ? `file-${fileExtension}` : "file"}
                      size={20}
                      color={
                        item.dataChat.unreadMessages === 0
                          ? COLOR.placeholderTextColor
                          : COLOR.txtColor
                      }
                    />
                  ) : item.dataChat.lastestMessage?.type === "image" ? (
                    // <Icon
                    //   name={"file-image"}
                    //   size={20}
                    //   color={COLOR.placeholderTextColor}
                    //   type={
                    //     item.dataChat.unreadMessages === 0 ? "light" : "regular"
                    //   }
                    // />
                    <FontAwesome5
                      name={"file-image"}
                      size={20}
                      color={COLOR.placeholderTextColor}
                    />
                  ) : null}
                  <Text
                    style={[
                      item.dataChat.unreadMessages === 0
                        ? styles.txt_person_info_text_msgNew
                        : styles.txt_person_info_text_msgNew_unRead,
                      {
                        maxWidth: Helpers.wS("100%"),
                      },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    {item.dataChat.lastestMessage?.type === "file"
                      ? // item.dataChat.lastestMessage.txtMessage.split('/')[
                        //     item.dataChat.lastestMessage.txtMessage.split('/')
                        //       .length - 1
                        //   ]
                        item.dataChat.lastestMessage.txtMessage.replace(
                          /^.*[\\/]/,
                          ""
                        )
                      : item.dataChat.lastestMessage?.type === "image"
                      ? LANG[CONFIG.lang].image
                      : item.dataChat.lastestMessage.txtMessage}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

ItemChat.defaultProps = {
  isLoading: false,
  socket: null,
  item: {},
  onPress: () => {},
  getFileType: () => {},
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

export default connect(mapStateToProps, null)(ItemChat);
