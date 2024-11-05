/* eslint-disable prettier/prettier */
/**
 * @Description: Side Menu Layout
 * @Created by ZiniTeam
 * @Date create: 17/01/2019
 */
/** LIBRARY */
import React from "react";
import {
  Text,
  View,
  FlatList,
  Linking,
  ActivityIndicator,
  Image,
  Pressable,
} from "react-native";
import { connect } from "react-redux";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
/** COMPONENT */
import HeaderBar from "../partials/header_bar";
import CText from "../../components/CText";
import CImage from "../../components/CImage";
/** COMMON */
import { LANG, CONFIG, DEVICE, COLOR, KEY, ASSETS } from "../../config";
import Helpers from "../../helpers";
import Services from "../../services";
import sailsApi from "../../config/sails.api";

/** STYLES */
import styles from "./style";
import { bindActionCreators } from "redux";
/** REDUX */
import * as classActions from "../../redux/actions/activeClass";
import * as studentActions from "../../redux/actions/activeStudent";
import * as loadingActions from "../../redux/actions/loading";

class ContactListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _loadForList: true,
      _refreshing: false,
      _classChoose: null,
      _studentChoose: null,
      _dataParent: [],
      _dataClasses: props.login.data.classes,
      _dataStudent: props.login.data.students,
      _arrChat: [],
    };
  }

  /** FUNCTIONS */
  _checkClasses = async () => {
    let _classChoose = this.props.activeClass || this.state._dataClasses[0];
    this.setState({
      _classChoose: _classChoose || null,
      _loading: false,
      _loadForList: false,
      _refreshing: false,
    });

    await this._getParentByClassId(_classChoose);
    await this._getDataFromServer();
  };

  _checkStudents = async () => {
    let { _studentChoose, _dataStudent, _classChoose, _dataClasses } =
      this.state;

    if (this.props.activeStudent) {
      _studentChoose = this.props.activeStudent;
      _classChoose = _dataClasses.find(
        (f) => f.id === this.props.activeStudent.class.id
      );
    } else {
      _studentChoose = _dataStudent[0];
      _classChoose = _dataClasses.find(
        (f) => f.id === _dataStudent[0].class.id
      );
    }

    this.setState({
      _classChoose: _classChoose || null,
      _studentChoose: _studentChoose || null,
      _loading: false,
      _loadForList: false,
      _refreshing: false,
    });

    await this._getParentByClassId(_classChoose);
    await this._getDataFromServer();
  };

  _getParentByClassId = async (_classChoose) => {
    let { _dataParent } = this.state;
    _dataParent = [];
    let resParent = await Services.Parent.getParentsFromClass(_classChoose.id);

    if (resParent) {
      if (resParent.code === "PARENT_ERR_ID_REQUIRED") {
        _dataParent = [];
      } else if (resParent.length > 0) {
        _dataParent = resParent.sort(function (a, b) {
          return a.students[0].createdAt - b.students[0].createdAt;
        });
      }
    }

    this.setState({
      _dataParent,
      _loading: false,
      _loadForList: false,
      _refreshing: false,
    });
  };

  _onRefresh = () => {
    this.setState({ _refreshing: true });
    if (CONFIG.USER_TYPE === KEY.PARENT) {
      this._checkStudents();
    } else if (CONFIG.USER_TYPE === KEY.TEACHER) {
      this._checkClasses();
    }
  };

  /** HANDLE FUNCTIONS */
  _onPressBack = () => {
    this.props.route.params?.onRefresh?.();
    this.props.navigation.goBack();
  };

  _renderClass = () => {
    let { _classChoose, _dataParent } = this.state;
    let icClass = ASSETS.imgFailed;
    let newAvatar = _classChoose.newAvatar || null;
    newAvatar = CONFIG.classes.find((f) => f.id === _classChoose.thumbnail);
    if (newAvatar) {
      newAvatar = newAvatar.path;
    }

    return (
      <View>
        <View style={styles.titleBox}>
          <CText
            style={styles.txtTitleBox}
            i18nKey={"txtClassTitle"}
            upperCase
          />
        </View>
        <View style={styles.rowItemStudent} onPress={this._onPressItemStudent}>
          <View style={styles.avatarArea}>
            <Image
              style={styles.avatarStudent}
              resizeMode={"cover"}
              source={newAvatar ? newAvatar : icClass}
            />
          </View>
          <View style={styles.nameArea}>
            <View style={{ paddingVertical: 10 }}>
              <Text
                style={[
                  styles.txtNameStudent,
                  { fontFamily: DEVICE.fontMedium },
                ]}
              >
                {_classChoose.title}
              </Text>
            </View>
            <View style={[styles.parentRight, { justifyContent: "flex-end" }]}>
              {/* <Icon
                name={"comment-lines"}
                size={Helpers.fS(20)}
                color={COLOR.primaryApp}
                type={"light"}
                onPress={() =>
                  this._onPressItem(
                    _classChoose.id,
                    _classChoose.title,
                    "class"
                  )
                }
              /> */}
              <Pressable
                onPress={() =>
                  this._onPressItem(
                    _classChoose.id,
                    _classChoose.title,
                    "class"
                  )
                }
              >
                <FontAwesome5
                  name={"comment"}
                  size={Helpers.fS(20)}
                  color={COLOR.primaryApp}
                />
              </Pressable>
            </View>
          </View>
        </View>
        {_dataParent.length > 0 && (
          <View style={styles.titleBox}>
            <CText style={styles.txtTitleBox} i18nKey={"txtParent"} upperCase />
          </View>
        )}
      </View>
    );
  };

  _renderParent = (item, index) => {
    let uriAvatar =
      item.avatar != "" && item.avatar != null
        ? CONFIG.host + item.avatar
        : null;
    let gender = CONFIG.users.find((f) => f.id === item.gender);
    if (gender) {
      gender = gender.path;
    } else {
      gender = CONFIG.students[0].path;
    }
    let newParentFullName = Helpers.capitalizeName(
      item.firstName,
      item.lastName,
      CONFIG.settingLocal.softName
    );
    let newStudentFullName = Helpers.capitalizeName(
      item.students[0].firstName,
      item.students[0].lastName,
      CONFIG.settingLocal.softName
    );

    return (
      <View style={styles.rowItemStudent} onPress={this._onPressItemStudent}>
        <View style={styles.avatarArea}>
          <CImage
            style={styles.avatarStudent}
            resizeMode={"cover"}
            src={uriAvatar ? { uri: uriAvatar } : gender}
            type={"avatar"}
          />
        </View>
        <View style={styles.nameArea}>
          <View style={{ paddingVertical: 10 }}>
            <Text
              style={[styles.txtNameStudent, { fontFamily: DEVICE.fontMedium }]}
            >
              {newParentFullName}
            </Text>
            <Text style={[styles.txtNameStudent, { fontSize: Helpers.fS(12) }]}>
              {`${
                item.gender === 0
                  ? LANG[CONFIG.lang].momOf
                  : LANG[CONFIG.lang].dadOf
              } ${newStudentFullName}`}
            </Text>
          </View>
          {CONFIG.USER_TYPE === KEY.TEACHER && (
            <View style={[styles.parentRight, { justifyContent: "flex-end" }]}>
              <Pressable
                onPress={() =>
                  this._onPressItem(item.id, newParentFullName, "parent")
                }
              >
                <FontAwesome5
                  name={"comment"}
                  size={Helpers.fS(20)}
                  color={COLOR.primaryApp}
                />
              </Pressable>
            </View>
          )}
        </View>
      </View>
    );
  };

  _renderEmptyList = () => {
    return (
      <View style={{ marginTop: 100, alignItems: "center" }}>
        <FontAwesome5
          containerStyle={{ marginTop: 10 }}
          name={"search"}
          size={50}
          color={COLOR.placeholderTextColor}
          solid
        />
        <CText style={styles.txt_no_data} i18nKey={"noDataParents"} />
      </View>
    );
  };

  /** HANDLE FUNCTIONS */
  _onPressChooseClass = async (classObj) => {
    if (classObj.id !== this.state._classChoose.id) {
      this.props.classActions.changeClass(classObj);
    }
  };

  _onPressChooseStudent = async (studentObj) => {
    if (studentObj.id !== this.state._studentChoose.id) {
      this.props.studentActions.changeStudent(studentObj);
    }
  };

  _onPressPhone = (phone) => {
    if (phone) {
      Linking.openURL("tel:" + phone).catch((error) =>
        console.log("Error call to ", phone)
      );
    }
  };

  _onPressItem = async (id, fullName, type) => {
    let filter = [];
    let { _arrChat } = this.state;

    if (type === "class") {
      filter = _arrChat.find((f) => f.dataGroup.id === id);
    } else if (type === "parent") {
      filter = _arrChat.find((f) => f.dataChat?.parentObj?.id === id);
    }

    if (filter) {
      let typeGroup = filter.dataGroup.hasOwnProperty("totalStudent")
        ? KEY.GROUP
        : KEY.PERSONAL;

      this.props.route.params.onPressItemChat(
        filter.dataChat.id,
        typeGroup === KEY.PERSONAL ? fullName : filter.dataGroup.title,
        typeGroup,
        filter.dataGroup.avatar
      );
    }
  };

  _onWaitMessage = (messageId) => {
    let { login } = this.props;
    this._socket.on("CHAT_" + messageId, async (newMessage) => {
      if (newMessage.hasOwnProperty("data")) {
        this.setState({ _loading: true });
        let { _arrChat } = this.state;
        let find = _arrChat.findIndex((f) => f.dataChat?.id === messageId);
        if (find !== -1) {
          if (
            _arrChat[find].dataChat.lastestMessage.createdAt !==
            newMessage.lastestMessage.createdAt
          ) {
            _arrChat[find].dataChat.lastestMessage = newMessage.lastestMessage;
          }
        }
        let timeLastSeen = _arrChat[find].dataChat.lastSeen.find(
          (mess) => mess.user === login.data.id
        );
        let params = {
          messageId: messageId,
          userId: login.data.id,
          lastSeen: timeLastSeen?.lastSeen ?? 1588698000000,
        };

        let resultData = await Services.Message.countUnreadMessage(params);
        // let resultData = this._countUnreadMessage(rs.data[i].id, timeLastSeen)
        _arrChat[find].dataChat.unreadMessages = resultData.countUnread;
        // _arrChat.sort(
        //   (a, b) => b.dataChat.timeLastMessage - a.dataChat.timeLastMessage,
        // );
        this.setState({ _arrChat, _loading: false });
      }
    });
  };

  _getDataFromServer = async () => {
    let { login } = this.props;
    let { _arrChat } = this.state;
    let i,
      j,
      dataRequest = {};

    _arrChat = [];
    if (this.state._classChoose) {
      dataRequest = {
        school: login.data.school,
        classId: this.state._classChoose?.id,
        userId: login.data.id,
        dateUse: moment().format("YYYY-MM-DD"),
      };

      this._socket = this.props.io.sails.connect(CONFIG.hostSocket);
      this._socket.on("connect", () => {
        console.log("SOCKET IS CONNECTED");
        this._socket.get(
          "/api/v4/mobile" + sailsApi.message.listGroupOfClass,
          dataRequest,
          async (rs) => {
            if (rs?.data?.length > 0) {
              for (j = 0; j < rs?.data?.length; j++) {
                // let tmp = _arrChat[i];
                _arrChat[j] = {};
                _arrChat[j].dataGroup = rs.data[j].classObj;
                _arrChat[j].dataChat = rs.data[j];
                let timeLastSeen = rs.data[j].lastSeen.find(
                  (mess) => mess.user === login.data.id
                );
                let params = {
                  messageId: rs.data[j].id,
                  userId: login.data.id,
                  lastSeen: timeLastSeen?.lastSeen ?? 1588698000000,
                };

                let resultData = await Services.Message.countUnreadMessage(
                  params
                );
                // let resultData = this._countUnreadMessage(rs.data[i].id, timeLastSeen)
                _arrChat[j].dataChat.unreadMessages = resultData.countUnread;

                // Check message realtime
                this._onWaitMessage(rs.data[j].id);
              }

              this.setState({ _arrChat, _loading: false });
              this.props.loadingActions.setLoading(false);
            }
          }
        );
        if (CONFIG.USER_TYPE === KEY.TEACHER) {
          this._socket.get(
            "/api/v4/mobile" + sailsApi.message.listGroupOfParent,
            dataRequest,
            (rs) => {
              if (rs?.data?.length > 0) {
                for (i = 0; i < rs?.data?.length; i++) {
                  // let tmp = _arrChat[i];
                  _arrChat[i + 1] = {};
                  _arrChat[i + 1].dataGroup = rs.data[i].parentObj;
                  _arrChat[i + 1].dataChat = rs.data[i];
                  _arrChat[i + 1].dataChat.unreadMessages =
                    rs.data[i].countUnread;

                  // Check message realtime
                  this._onWaitMessage(rs.data[i].id);
                }

                this.setState({ _arrChat, _loading: false });
                this.props.loadingActions.setLoading(false);
              }
            }
          );
        } else {
          this._socket.get(
            "/api/v4/mobile" + sailsApi.message.listGroupOfTeacher,
            {
              school: login.data.school,
              classId: this.state._studentChoose?.class?.id,
              parentId: login.data.id,
              dateUse: moment().format("YYYY-MM-DD"),
            },
            (rs) => {
              if (rs?.data?.length > 0) {
                for (i = 0; i < rs?.data?.length; i++) {
                  // let tmp = _arrChat[i];
                  _arrChat[i + 1] = {};
                  _arrChat[i + 1].dataGroup = rs.data[i].teacherObj;
                  _arrChat[i + 1].dataChat = rs.data[i];
                  _arrChat[i + 1].dataChat.unreadMessages =
                    rs.data[i].countUnread;

                  // Check message realtime
                  this._onWaitMessage(rs.data[i].id);
                }

                this.setState({ _arrChat, _loading: false });
                this.props.loadingActions.setLoading(false);
              }
            }
          );
        }
      });
    }
  };

  /** LIFE CYCLE */
  componentDidMount() {
    if (CONFIG.USER_TYPE === KEY.PARENT) {
      this._checkStudents();
    } else if (CONFIG.USER_TYPE === KEY.TEACHER) {
      this._checkClasses();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (CONFIG.USER_TYPE === KEY.PARENT) {
      if (
        this.props.activeStudent.id &&
        this.props.activeStudent.id !== this.state._studentChoose.id
      ) {
        this._checkStudents();
      }
    } else if (CONFIG.USER_TYPE === KEY.TEACHER) {
      if (
        this.props.activeClass.id &&
        this.props.activeClass.id !== this.state._classChoose.id
      ) {
        this._checkClasses();
      }
    }
  }

  /** RENDER */
  render() {
    const {
      _loadForList,
      _dataStudent,
      _studentChoose,
      _dataClasses,
      _classChoose,
      _dataParent,
      _refreshing,
    } = this.state;
    if (this.state._loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"small"} color={COLOR.primaryApp} />
        </View>
      );
    }
    return (
      <View style={styles.con}>
        {/* HEADER */}
        <HeaderBar
          title={"txtContactList"}
          hasBack
          onBack={this._onPressBack}
          hasCustomHeaderRight={true}
          loadCustomHeaderRight={_loadForList}
          dataCustomHeaderRight={
            CONFIG.USER_TYPE === KEY.PARENT ? _dataStudent : _dataClasses
          }
          dataChooseCustomHeaderRight={
            CONFIG.USER_TYPE === KEY.PARENT ? _studentChoose : _classChoose
          }
          onCustomHeaderRight={
            CONFIG.USER_TYPE === KEY.PARENT
              ? this._onPressChooseStudent
              : this._onPressChooseClass
          }
        />

        {_loadForList ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={"small"} color={"black"} />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 10 }}
            data={_dataParent}
            renderItem={({ item, index }) => this._renderParent(item, index)}
            keyExtractor={(item, index) => index.toString()}
            refreshing={_refreshing}
            onRefresh={this._onRefresh}
            ListEmptyComponent={this._renderEmptyList}
            scrollIndicatorInsets={{ right: 1 }}
            ListHeaderComponent={this._renderClass}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    language: state.language.language,
    activeClass: state.activeClass,
    activeStudent: state.activeStudent,
    io: state.io.io,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    classActions: bindActionCreators(classActions, dispatch),
    studentActions: bindActionCreators(studentActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactListScreen);
