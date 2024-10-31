/* eslint-disable prettier/prettier */
/**
 * @Description: Message Screen Logic
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** LIBRARY */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import firebase from 'react-native-firebase';
/** COMPONENT */
import {RenderMessageScreen} from './render';
/** COMMON */
import {CONFIG, KEY, fileLastExtensions} from '../../config';
import Helpers from '../../helpers';
import sailsApi from '../../config/sails.api';
/** REDUX */
import * as messagesActions from '../../redux/actions/messages';
import * as loadingActions from '../../redux/actions/loading';
import * as classActions from '../../redux/actions/activeClass';
import * as studentActions from '../../redux/actions/activeStudent';
import NavigationService from '../../navigation/NavigationService';
import moment from 'moment';
import Services from '../../services';

class MessageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _chatId: null,
      _classChoose: null,
      _studentChoose: null,
      _dataStudents: props.login.data.students,
      _dataClasses: props.login.data.classes,
      _arrChatId: [],
      _arrChat: [],
      _loadForList: true,
    };
    this._dataFromNotification = props.route.params?.dataFromNotification;
  }

  /** FUNCTIONS */
  _checkClasses = async () => {
    let _classChoose = null;
    _classChoose = this.props.activeClass;

    this.setState(
      {
        _classChoose: _classChoose || this.state._dataClasses[0],
        _loadForList: false,
      },
      () => this._onRefresh(),
    );
  };

  _checkStudents = async () => {
    let {_studentChoose, _dataStudents, _classChoose, _dataClasses} =
      this.state;

    if (this.props.activeStudent) {
      _studentChoose = this.props.activeStudent;
      _classChoose = _dataClasses.find(
        f => f.id === this.props.activeStudent.class.id,
      );
    } else {
      _studentChoose = _dataStudents[0];
      _classChoose = _dataClasses.find(f => f.id === _dataStudents[0].class.id);
    }

    this.setState(
      {
        _classChoose: _classChoose || null,
        _studentChoose: _studentChoose || null,
        _loadForList: false,
      },
      () => this._onRefresh(),
    );
  };

  /** HANDLE FUNCTIONS */
  _onPressChooseClass = async classObj => {
    if (classObj.id !== this.state._classChoose.id) {
      this.props.classActions.changeClass(classObj);
    }
  };

  _onPressChooseStudent = async studentObj => {
    if (studentObj.id !== this.state._studentChoose.id) {
      this.props.studentActions.changeStudent(studentObj);
    }
  };

  _initSocketConnect1 = () => {
    this._socket = this.props.io.sails.connect(CONFIG.hostSocket);
    this._socket.on('connect', () => {
      console.log('SOCKET IS CONNECTED');
      if (this._dataFromNotification) {
        let dataMessageParse = JSON.parse(
          this._dataFromNotification.notification,
        );
        let title = '',
          type = KEY.GROUP;
        if (dataMessageParse.title) {
          title = dataMessageParse.title;
        } else {
          type = KEY.PERSONAL;
          title = Helpers.capitalizeName(
            dataMessageParse.user.firstName,
            dataMessageParse.user.lastName,
            CONFIG.settingLocal.softName,
          );
        }

        this._onPressItem(
          this._dataFromNotification.messageId,
          title,
          type,
          dataMessageParse.user.avatar,
        );
      } else {
        if (this.props.teachers.data && this.props.parents.data) {
          this._getDataFromServer();
        }
      }
    });
  };

  _initSocketConnect = () => {
    // console.log('INIT_DATA_MESAGE');
    if (this.props.teachers.data && this.props.parents.data) {
      this._getDataFromServer();
    }
  };

  _initChat = params => {
    let {_chatId} = this.state;

    if (params.id) {
      if (_chatId && _chatId != 'CHAT_' + params.id) {
        this._socket.off(_chatId);
      }
      _chatId = 'CHAT_' + params.id;
      this.setState({_chatId});
      return 'CHAT_' + params.id;
    }
    return null;
  };

  _getDataFromServer = async () => {
    let {login} = this.props;
    let {_arrChat} = this.state;
    let i,
      j,
      // find,
      // _arrGroupIds = [],
      // _arrParent = [],
      // _arrTeacher = [],
      // _arrGroup = [],
      // arrParam = [];
      dataRequest = {};
    // let tmpClasses = login.data.classes;

    _arrChat = [];
    // check type User
    // if (CONFIG.USER_TYPE === KEY.TEACHER) {
    //   // user type is teacher
    //   find = parents.data.findIndex(f => f.id === login.data.id);
    //   if (find !== -1) {
    //     parents.data.splice(find, 1);
    //   }
    //   _arrParent = parents.data;
    // } else {
    //   // user type is parent
    //   find = teachers.data.findIndex(f => f.id === login.data.id);
    //   if (find !== -1) {
    //     teachers.data.splice(find, 1);
    //   }
    //   _arrTeacher = teachers.data;
    // }

    // prepare array chat
    // for (i = 0; i < tmpClasses.length; i++) {
    //   if (_arrGroupIds.indexOf(tmpClasses[i].id) === -1) {
    //     _arrGroupIds.push(tmpClasses[i].id);
    //     _arrGroup.push(tmpClasses[i]);
    //   }
    // }
    // _arrChat = [..._arrGroup, ..._arrParent, ..._arrTeacher];

    // let tmpParams = {};
    // for (i = 0; i < _arrChat.length; i++) {
    //   tmpParams = { userId: login.data.id };
    //   if (_arrChat[i].hasOwnProperty('totalStudent')) {
    //     tmpParams.classId = _arrChat[i].id;
    //   } else {
    //     tmpParams.teacherId =
    //       CONFIG.USER_TYPE === KEY.PARENT ? _arrChat[i].id : login.data.id;
    //     tmpParams.parentId =
    //       CONFIG.USER_TYPE === KEY.TEACHER ? _arrChat[i].id : login.data.id;
    //   }
    //   arrParam.push(tmpParams);
    // }
    // console.log('this.state._classChoose: ', this.state._classChoose);
    if (this.state._classChoose) {
      dataRequest = {
        school: login.data.school,
        classId: this.state._classChoose?.id,
        userId: login.data.id,
        dateUse: moment().format('YYYY-MM-DD'),
      };

      this._socket = this.props.io.sails.connect(CONFIG.hostSocket);
      this._socket.on('connect', () => {
        console.log('SOCKET IS CONNECTED');
        this._socket.get(
          '/api/v4/mobile' + sailsApi.message.listGroupOfClass,
          dataRequest,
          async rs => {
            // console.log('rs: ', rs);
            if (rs?.data?.length > 0) {
              for (j = 0; j < rs?.data?.length; j++) {
                // let tmp = _arrChat[i];
                _arrChat[j] = {};
                _arrChat[j].dataGroup = rs.data[j].classObj;
                _arrChat[j].dataChat = rs.data[j];
                let timeLastSeen = rs.data[j].lastSeen.find(
                  mess => mess.user === login.data.id,
                );
                let params = {
                  messageId: rs.data[j].id,
                  userId: login.data.id,
                  lastSeen: timeLastSeen?.lastSeen ?? 1588698000000,
                };

                let resultData = await Services.Message.countUnreadMessage(
                  params,
                );

                // let resultData = this._countUnreadMessage(rs.data[i].id, timeLastSeen)
                _arrChat[j].dataChat.unreadMessages = resultData.countUnread;

                // Check message realtime
                this._onWaitMessage(rs.data[j].id);
              }
              // _arrChat.sort(
              //   (a, b) => b.dataChat.timeLastMessage - a.dataChat.timeLastMessage,
              // );

              // console.log('_arrChat: ', _arrChat);

              this.setState({_arrChat, _loading: false});

              this.props.loadingActions.setLoading(false);
            }
          },
        );
        if (CONFIG.USER_TYPE === KEY.TEACHER) {
          this._socket.get(
            '/api/v4/mobile' + sailsApi.message.listGroupOfParent,
            dataRequest,
            rs => {
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
                // _arrChat.sort(
                //   (a, b) => b.dataChat.timeLastMessage - a.dataChat.timeLastMessage,
                // );

                this.setState({_arrChat, _loading: false});

                this.props.loadingActions.setLoading(false);
              }
            },
          );
        } else {
          this._socket.get(
            '/api/v4/mobile' + sailsApi.message.listGroupOfTeacher,
            {
              school: login.data.school,
              classId: this.state._studentChoose?.class?.id,
              parentId: login.data.id,
              dateUse: moment().format('YYYY-MM-DD'),
            },
            rs => {
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
                // _arrChat.sort(
                //   (a, b) => b.dataChat.timeLastMessage - a.dataChat.timeLastMessage,
                // );

                this.setState({_arrChat, _loading: false});

                this.props.loadingActions.setLoading(false);
              }
            },
          );
        }
      });
    }
  };

  _countUnreadMessage = async (messagesId, timeLastSeen) => {
    let {login} = this.props;

    // let timeLastSeen = rs.data[i].lastSeen.find(mess => mess.user === login.data.id)
    let params = {
      messageId: messagesId,
      userId: login.data.id,
      lastSeen: timeLastSeen?.lastSeen ?? 1588698000000,
    };

    let resultData = await Services.Message.countUnreadMessage(params);
    return resultData;
  };

  _onWaitMessage = messageId => {
    let {login} = this.props;
    this._socket.on('CHAT_' + messageId, async newMessage => {
      if (newMessage.hasOwnProperty('data')) {
        this.setState({_loading: true});
        let {_arrChat} = this.state;
        let find = _arrChat.findIndex(f => f.dataChat?.id === messageId);
        if (find !== -1) {
          if (
            newMessage?.lastestMessage?.createdAt &&
            _arrChat[find].dataChat.lastestMessage.createdAt !==
              newMessage.lastestMessage.createdAt
          ) {
            _arrChat[find].dataChat.lastestMessage = newMessage.lastestMessage;
          }

          if (
            newMessage?.data.createdAt &&
            _arrChat[find].dataChat.lastestMessage.createdAt !==
              newMessage.data.createdAt
          ) {
            _arrChat[find].dataChat.lastestMessage = newMessage.data;
          }
        }

        // console.log('_arrChat[find].dataChat: ', _arrChat[find].dataChat);
        let timeLastSeen = _arrChat[find].dataChat.lastSeen.find(
          mess => mess.user === login.data.id,
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
        this.setState({_arrChat, _loading: false});
      }
    });
  };

  _onPressItem = (id, titleDetail, type, avatar) => {
    let {login, messages, notification} = this.props;
    let msgNotRead = messages.msgNotRead;
    let dataNotRead = notification.dataNotRead;
    let sumBadge = msgNotRead + dataNotRead;
    if (Number(msgNotRead) > 0) {
      this.props.messagesActions.setNotRead(msgNotRead - 1);
      // firebase.notifications().setBadge(sumBadge - 1);
    }

    let params = {
      id: id,
      type: type,
      titleDetail: titleDetail,
      avatar: avatar,
      idUserSend: login.data.id,
    };
    let chatId = this._initChat(params);

    if (chatId) {
      NavigationService.navigate('MessageDetailScreen', {
        data: params,
        socket: this._socket,
        chatId,
        onRefresh: () => this._onRefresh(),
      });
    }
  };

  _onRefresh = () => {
    this._getDataFromServer();
  };

  _onContactList = () => {
    if (this.props.navigation.navigate) {
      this.props?.navigation?.navigate('ContactList', {
        socket: this._socket,
        onPressItemChat: this._onPressItem,
        dataChat: this.state._arrChat,
      });
    }
  };

  _getFileType = filename => {
    const extension = filename?.split('.').pop().toLowerCase();

    for (const fileType in fileLastExtensions) {
      if (fileLastExtensions[fileType].extension.includes(extension)) {
        return fileLastExtensions[fileType].name;
      }
    }

    return '';
  };

  /** LIFE CYCLE */
  componentDidMount() {
    if (CONFIG.USER_TYPE === KEY.PARENT) {
      this._checkStudents();
    }
    if (CONFIG.USER_TYPE === KEY.TEACHER) {
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
    }
    if (CONFIG.USER_TYPE === KEY.TEACHER) {
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
    let {
      _loading,
      _showModalSetting,
      _arrChat,
      _loadForList,
      _dataClasses,
      _dataStudents,
      _studentChoose,
      _classChoose,
    } = this.state;

    return (
      <RenderMessageScreen
        props={this.props}
        isLoading={_loading}
        showModalSetting={_showModalSetting}
        data={{
          listChat: _arrChat,
        }}
        onPress={{
          item: this._onPressItem,
          contact: this._onContactList,
        }}
        _loadForList={_loadForList}
        _dataClasses={_dataClasses}
        _dataStudents={_dataStudents}
        _studentChoose={_studentChoose}
        _classChoose={_classChoose}
        _onPressChooseClass={this._onPressChooseClass}
        _onPressChooseStudent={this._onPressChooseStudent}
        _getFileType={this._getFileType}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    parents: state.parents,
    teachers: state.teachers,
    io: state.io.io,
    notification: state.notification,
    messages: state.messages,
    isLoading: state.loading.isLoading,
    activeClass: state.activeClass,
    activeStudent: state.activeStudent,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    messagesActions: bindActionCreators(messagesActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
    classActions: bindActionCreators(classActions, dispatch),
    studentActions: bindActionCreators(studentActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen);
