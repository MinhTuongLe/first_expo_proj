/* eslint-disable prettier/prettier */
/**
 * @Description: Home Screen Logic
 * @Created by ZiniTeam
 * @Date create: 18/01/2019
 */
/** LIBRARY */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import firebase from 'react-native-firebase';
import Rate, {AndroidMarket} from 'react-native-rate';
import {Linking} from 'react-native';
/** COMMON */
import {CONFIG, ASSETS, KEY} from '../../config';
import Helpers from '../../helpers';
import Modules from '../../config/modules';
import Services from '../../services';
/** COMPONENT */
import ViewHomeScreen from './render';
/** REDUX */
import * as loginActions from '../../redux/actions/login';
import * as parentActions from '../../redux/actions/parent';
import * as teacherActions from '../../redux/actions/teacher';
import * as notificationActions from '../../redux/actions/notification';
import * as messagesActions from '../../redux/actions/messages';
import * as loadingActions from '../../redux/actions/loading';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loadForList: true,
      _loadForAlbum: true,
      _refreshing: false,
      _rating: false,
      _classChoose: null,
      _studentChoose: null,
      _dataAlbum: [],
      _dataClasses: props.login.data.classes,
      _dataStudents: props.login.data.students,
    };
    this._dataQuickAction = [
      {
        id: 'Menu',
        slug: 'menu',
        forUser: 'all',
        comingsoon: false,
        icon: ASSETS.icMenu,
        strText: 'txtHomeMenu',
      },
      {
        id: 'Schedule',
        slug: 'schedule',
        forUser: 'all',
        comingsoon: false,
        icon: ASSETS.icSchedule,
        strText: 'txtHomeSchedule',
      },
      {
        id: 'DayOff',
        slug: 'dayoff',
        forUser: 'parent',
        comingsoon: false,
        icon: ASSETS.icAbsent,
        strText: 'txtDrawerDayOff',
      },
      {
        id: 'Attendance',
        slug: 'attendant',
        forUser: KEY.TEACHER,
        comingsoon: !Modules.attendance,
        icon: ASSETS.icAttendance,
        strText: 'txtHomeAttendance',
      },
      {
        id: CONFIG.USER_TYPE == KEY.TEACHER ? 'TeacherHealth' : 'ParentHealth',
        slug:
          CONFIG.USER_TYPE == KEY.TEACHER ? 'teacherHealth' : 'parentHealth',
        forUser: 'all',
        comingsoon: !Modules.health,
        icon: ASSETS.icHealth,
        strText: 'txtHomeHealth',
      },
      {
        id:
          CONFIG.USER_TYPE === KEY.TEACHER
            ? 'TeacherFeeInvoice'
            : 'ParentFeeInvoice',
        slug: 'feeInvoice',
        forUser: 'all',
        comingsoon: false,
        icon: ASSETS.icFeeInvoice,
        strText: 'txtHomeFeeInvoice',
      },
      {
        id: 'HistoryTeacher',
        slug: 'historyTeacher',
        forUser: KEY.TEACHER,
        comingsoon: false,
        icon: ASSETS.icStatistics,
        strText: 'statistics',
      },
      {
        id: 'Tracking',
        slug: 'tracking',
        forUser: KEY.PARENT,
        comingsoon: false,
        icon: ASSETS.icAttendance,
        strText: 'tracking',
      },
    ];
  }

  /** FUNCTIONS */
  _onRefresh = () => {
    this.setState({_refreshing: true});
    this._getDataFromServer();
  };

  _getDataFromServer = async () => {
    let {setting, login} = this.props;

    let resultAlbum = [];
    let params = {
      classId: this.state._classChoose.id,
      limit: setting.config.value.maxAlbum ? setting.config.value.maxAlbum : 10,
      page: 1,
      school: login.data.school,
    };

    let resp = await Services.Album.list(params);
    if (resp) resultAlbum = resultAlbum.concat(resp);

    /** Sort */
    if (resultAlbum.length > 0) {
      resultAlbum.sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        return 0;
      });
    }
    this.setState({
      _dataAlbum: resultAlbum.length ? resultAlbum[0].data : [],
      _refreshing: false,
      _loadForAlbum: false,
    });
  };

  _getMasterData = async () => {
    let _user = this.props.login.data;
    let parents = [],
      teachers = [],
      _parents = [],
      _teachers = [],
      prevIdClass = null,
      i;

    for (i = 0; i < _user.classes.length; i++) {
      if (prevIdClass !== _user.classes[i].id) {
        prevIdClass = _user.classes[i].id;
        _parents = await Services.Parent.getParentsFromClass(
          _user.classes[i].id,
        );
        _teachers = await Services.User.getListTeacherByClassId(
          _user.classes[i].id,
        );

        if (_parents.length > 0) {
          let find = null;
          _parents.map((item, index) => {
            find = parents.find(f => f.id === item.id);
            if (!find) parents.push(item);
          });
        }

        if (_teachers.length > 0) {
          let find = null;
          _teachers.map((item, index) => {
            find = teachers.find(f => f.id === item.id);
            if (!find) teachers.push(item);
          });
        }
      }
    }

    parents.length > 0 &&
      this.props.parentActions.getParentMasterDataSuccess(parents);
    teachers.length > 0 &&
      this.props.teacherActions.getTeacherMasterDataSuccess(teachers);
    this.props.loadingActions.setLoading(false);
  };

  _checkAlreadyRatingApp = async () => {
    let _isAlreadyRate = await Helpers.getAsyStrRating();
    if (_isAlreadyRate) {
      _isAlreadyRate = JSON.parse(_isAlreadyRate);
      if (!_isAlreadyRate) {
        let _numberShowRate = await Helpers.getAsyStrNumberToRating();
        if (_numberShowRate) {
          _numberShowRate = JSON.parse(_numberShowRate);
          if (Number(_numberShowRate) >= 10) {
            await Helpers.setAsyStrNumberToRating('1');
            this._onToggleModalRating();
          } else {
            _numberShowRate = Number(_numberShowRate);
            _numberShowRate += 1;
            await Helpers.setAsyStrNumberToRating(
              JSON.stringify(_numberShowRate),
            );
          }
        }
      }
    } else {
      await Helpers.setAsyStrRating('false');
      await Helpers.setAsyStrNumberToRating('1');
    }
  };

  _checkClasses = async () => {
    let {_classChoose} = this.state;
    let {login} = this.props;
    let _dataClass = await Helpers.getAsyStrClassChoosed();
    if (_dataClass && _dataClass != '') {
      _dataClass = JSON.parse(_dataClass);
      _classChoose = _dataClass;
    } else {
      await Helpers.setAsyStrClassChoosed(
        JSON.stringify(login.data.classes[0]),
      );
      _classChoose = login.data.classes[0];
    }

    this.setState({
      _classChoose,
      _loadForList: false,
    });

    await this._getDataFromServer();
  };

  _checkStudents = async () => {
    let {_dataClasses, _dataStudents, _classChoose, _studentChoose} =
      this.state;
    let _dataStudent = await Helpers.getAsyStrStudentChoosed();
    let studentObj = null,
      classObj = null,
      find = null;

    _dataStudents = this.props.login.data.students;
    for (studentObj of _dataStudents) {
      for (classObj of _dataClasses) {
        find = classObj.students.find(f => f.id === studentObj.id);
        if (find) {
          studentObj.class = classObj;
          break;
        }
      }
    }

    if (_dataStudent && _dataStudent !== '') {
      _dataStudent = JSON.parse(_dataStudent);
      _classChoose = _dataStudent.class;
      _studentChoose = _dataStudent;
      if (_classChoose) {
        await Helpers.setAsyStrClassChoosed(JSON.stringify(_dataStudent.class));
      }
    } else {
      find = _dataClasses.find(f => f.id === _dataStudents[0].class.id);
      await Helpers.setAsyStrStudentChoosed(JSON.stringify(_dataStudents[0]));
      await Helpers.setAsyStrClassChoosed(JSON.stringify(find));
      _classChoose = find;
      _studentChoose = _dataStudents[0];
    }

    this.setState({
      _dataStudents,
      _classChoose,
      _studentChoose,
      _loadForList: false,
    });

    await this._getDataFromServer();
  };

  _onRefreshStudent = async idStudent => {
    this.setState({_loadForList: true});
    let {_dataStudents, _studentChoose} = this.state;
    let res = await Services.Student.getStudent(idStudent);
    if (res && res.code === 'SUCCESS_200') {
      res.data.class = res.data.classes[0];
      let findIdx = _dataStudents.findIndex(f => f.id === idStudent);
      if (findIdx !== -1) _dataStudents[findIdx] = res.data;
      if (_studentChoose.id === idStudent) _studentChoose = res.data;

      this.setState({_dataStudents, _studentChoose, _loadForList: false});
    }
  };

  /** HANDLE FUNCTIONS */
  _onPressChooseClass = async classObj => {
    if (classObj.id !== this.state._classChoose.id) {
      await Helpers.setAsyStrClassChoosed(JSON.stringify(classObj));
      this.setState({
        _classChoose: classObj,
        _loadForAlbum: true,
      });
      await this._checkClasses();
    }
  };

  _onPressChooseStudent = async studentObj => {
    if (studentObj.id !== this.state._studentChoose.id) {
      await Helpers.setAsyStrStudentChoosed(JSON.stringify(studentObj));
      this.setState({
        _studentChoose: studentObj,
        _loadForAlbum: true,
      });
      await this._checkStudents();
    }
  };

  _onToggleModalRating = () => {
    this.setState({_rating: !this.state._rating});
  };

  _onPressStartRating = () => {
    this._onToggleModalRating();
    let options = {
      AppleAppID: CONFIG.ratingAppleAppID,
      GooglePackageName: CONFIG.ratingGooglePackageName,
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
      openAppStoreIfInAppFails: true,
      inAppDelay: 1.0,
    };
    Rate.rate(options, async success => {
      if (success) await Helpers.setAsyStrRating('true');
    });
  };

  _onPressQuickAction = (id, slug) => {
    let {setting, navigation} = this.props;
    if (slug) {
      navigation.navigate(id, {
        data: slug,
        typeScreen: slug,
      });
    } else {
      Linking.openURL(
        'mailto:' + (setting.config.value.mailSales || CONFIG.mail_support),
      ).catch(error => console.log('Error send mail', error));
    }
  };

  _onPressAlbumItem = data => {
    this.props.navigation.navigate('AlbumDetail', {id: data});
  };

  _onPressSeeAllAlbum = async () => {
    this.props.navigation.navigate('Album');
  };

  /** LIFE CYCLE */
  componentDidMount() {
    let dataCurNotRead = this.props.notification.dataNotRead;
    //Number(dataCurNotRead) > 0 && firebase.notifications().setBadge(dataCurNotRead);

    if (!this.state._loadForList) this.setState({_loadForList: true});
    if (CONFIG.USER_TYPE === KEY.PARENT) {
      this._checkStudents();
      this._checkAlreadyRatingApp();
    } else this._checkClasses();

    this._getMasterData();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      if (CONFIG.USER_TYPE === KEY.PARENT) {
        this._checkStudents();
      } else this._checkClasses();
    });
  }

  componentWillUnmount() {
    this.focusListener();
  }

  /** RENDER */
  render() {
    let {
      _refreshing,
      _loadForList,
      _loadForAlbum,
      _rating,
      _dataAlbum,
      _dataClasses,
      _dataStudents,
      _studentChoose,
      _classChoose,
    } = this.state;
    let {login} = this.props;

    return (
      <ViewHomeScreen
        isRefreshing={_refreshing}
        isLoadForList={_loadForList}
        isLoadForAlbum={_loadForAlbum}
        isRating={_rating}
        data={{
          login: login,
          quickAction: this._dataQuickAction,
          album: _dataAlbum,
          classes: _dataClasses,
          students: _dataStudents,
          classChoose: _classChoose,
          studentChoose: _studentChoose,
        }}
        onPress={{
          iAlbum: this._onPressAlbumItem,
          seeAllAlbum: this._onPressSeeAllAlbum,
          quickAction: this._onPressQuickAction,
          startRating: this._onPressStartRating,
          chooseClass: this._onPressChooseClass,
          chooseStudent: this._onPressChooseStudent,
        }}
        onToggle={{
          modalRating: this._onToggleModalRating,
        }}
        onRefresh={this._onRefresh}
        onRefreshStudent={this._onRefreshStudent}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    teachers: state.teachers,
    parents: state.parents,
    setting: state.setting,
    login: state.login,
    notification: state.notification,
    messages: state.messages,
    isLoading: state.loading.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
    parentActions: bindActionCreators(parentActions, dispatch),
    teacherActions: bindActionCreators(teacherActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
    messagesActions: bindActionCreators(messagesActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
