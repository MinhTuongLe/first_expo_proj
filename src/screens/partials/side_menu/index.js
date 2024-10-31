/* eslint-disable prettier/prettier */
/**
 * @Description: Side Menu Logic
 * @Created by ZiniTeam
 * @Date create: 17/01/2019
 */
/** LIBRARY */
import React from 'react';
import {Linking} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
/** COMPONENT */
import ViewSideMenu from './render';
/** COMMON */
import {CONFIG, LANG, KEY} from '../../../config';
import Helpers from '../../../helpers';
import Modules from '../../../config/modules';
import * as loginActions from '../../../redux/actions/login';
import * as notificationActions from '../../../redux/actions/notification';

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _fullName: '',
      _categoriesSort: [],
      _needUpdate: false,
      _currentVersion: '',
      _linkToStore: '',
      _isOpenModelConfirm: false,
    };
    this._categories = [
      {
        id: 'statistics',
        forUser: !Modules.attendance ? '' : KEY.TEACHER,
        title: LANG[CONFIG.lang].statistics,
        n_icon: 'chart-bar',
        onPress: () => {
          this._onPressCategory('HistoryTeacher', 'historyTeacher');
        },
      },
      {
        id: 'tracking',
        forUser: KEY.PARENT,
        title: LANG[CONFIG.lang].tracking,
        n_icon: 'map-marker-alt',
        onPress: () => {
          this._onPressCategory('Tracking', 'tracking');
        },
      },
      {
        id: 'menu',
        forUser: 'all',
        title: LANG[CONFIG.lang].txtHomeMenu,
        n_icon: 'utensils-alt',
        onPress: () => {
          this._onPressCategory('Menu', 'menu');
        },
      },
      {
        id: 'schedule',
        forUser: 'all',
        title: LANG[CONFIG.lang].txtDrawerSchedule,
        n_icon: 'calendar-alt',
        onPress: () => {
          this._onPressCategory('Schedule', 'schedule');
        },
      },
      {
        id: 'attendant',
        forUser: !Modules.attendance ? '' : KEY.TEACHER,
        title: LANG[CONFIG.lang].txtHomeAttendance,
        n_icon: 'ballot-check',
        onPress: () => {
          this._onPressCategory('Attendance', 'attendance');
        },
      },
      {
        id: 'dayoff',
        forUser: KEY.PARENT,
        title: LANG[CONFIG.lang].txtDrawerDayOff,
        n_icon: 'calendar-times',
        onPress: () => {
          this._onPressCategory('DayOff', 'dayoff');
        },
      },
      {
        id: CONFIG.USER_TYPE == KEY.TEACHER ? 'teacherHealth' : 'parentHealth',
        forUser: !Modules.health ? '' : 'all',
        title: LANG[CONFIG.lang].txtDrawerHealth,
        n_icon: 'heartbeat',
        onPress: () => {
          this._onPressCategory(
            CONFIG.USER_TYPE == KEY.TEACHER ? 'TeacherHealth' : 'ParentHealth',
            CONFIG.USER_TYPE == KEY.TEACHER ? 'teacherHealth' : 'parentHealth',
          );
        },
      },
      {
        id: 'album',
        forUser: 'all',
        title: LANG[CONFIG.lang].txtDrawerAlbum,
        n_icon: 'images',
        onPress: () => {
          this._onPressCategory('Album', 'album');
        },
      },
      {
        id:
          CONFIG.USER_TYPE == KEY.TEACHER
            ? 'teacherFeeInvoice'
            : 'parentFeeInvoice',
        forUser: !Modules.feeInvoice ? '' : 'all',
        title: LANG[CONFIG.lang].txtDrawerFeeInvoice,
        n_icon: 'money-bill-wave',
        onPress: () => {
          this._onPressCategory(
            CONFIG.USER_TYPE == KEY.TEACHER
              ? 'TeacherFeeInvoice'
              : 'ParentFeeInvoice',
            CONFIG.USER_TYPE == KEY.TEACHER
              ? 'teacherFeeInvoice'
              : 'parentFeeInvoice',
          );
        },
      },
      {
        id: 'contact',
        forUser: 'all',
        title: LANG[CONFIG.lang].txtDrawerContact,
        n_icon: 'envelope',
        onPress: () =>
          Linking.openURL(
            'mailto:' +
              (props.setting.config.value.mailSales
                ? props.setting.config.value.mailSales
                : CONFIG.mail_support),
          ).catch(error => console.log('Error send mail')),
      },
      {
        id: 'feedback',
        forUser: 'all',
        title: LANG[CONFIG.lang].txtDrawerFeedback,
        n_icon: 'comments',
        onPress: () => this._onPressCategory('ListFeedback', 'listFeedback'),
      },
      {
        id: 'delete-account',
        forUser: 'all',
        title: LANG[CONFIG.lang].txtDrawerDeleteAccount,
        n_icon: 'user-slash',
        onPress: this._onPressDeleteAccount,
      },
    ];
  }

  /** FUNCTIONS */
  _prepareData = () => {
    let i,
      {_categoriesSort} = this.state;
    if (CONFIG.USER_TYPE === KEY.DRIVER) {
      let find = this._categories.find(f => f.id === 'contact');
      if (find) {
        _categoriesSort.push(find);
      }
    } else {
      for (i = 0; i < this._categories.length; i++) {
        if (
          this._categories[i].forUser === 'all' ||
          this._categories[i].forUser === CONFIG.USER_TYPE
        ) {
          _categoriesSort.push(this._categories[i]);
        }
      }
    }

    let newFullName = '';
    if (this.props.login.data) {
      newFullName = Helpers.capitalizeName(
        this.props.login.data.firstName,
        this.props.login.data.lastName,
        CONFIG.settingLocal.softName,
      );
    }

    this.setState({
      _fullName: newFullName,
      _categoriesSort,
    });
  };

  _onRefresh = () => {
    this.setState({_categoriesSort: []}, () => this.componentDidMount());
  };

  _onPressPhone = phone => {
    Linking.openURL('tel:' + phone).catch(error => console.log('Error call'));
  };

  _onPressAvatar = () => {
    // console.log(
    //   'this.props.navigation.navigate: ',
    //   this.props?.navigation?.navigate,
    // );
    if (this.props?.navigation?.navigate) {
      this.props.navigation.navigate('Profile', {
        onRefresh: () => this._onRefresh(),
      });
      this.props.navigation.closeDrawer();
    }
  };

  _onPressCategory = async (name, slug) => {
    this.props.navigation.navigate(name, {
      typeScreen: slug,
    });
    this.props.navigation.closeDrawer();
  };

  _onPressDeleteAccount = () => {
    this.setState({
      _isOpenModelConfirm: true,
    });
  };

  _onCloseModel = () => {
    this.setState({
      _isOpenModelConfirm: false,
    });
  };

  _goToStore = () => {
    Linking.openURL(this.state._linkToStore);
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._prepareData();
  }

  /** RENDER */
  render() {
    let {_categoriesSort, _needUpdate, _currentVersion, _isOpenModelConfirm} =
      this.state;
    let {setting} = this.props;

    return (
      <ViewSideMenu
        data={{
          needUpdate: _needUpdate,
          currentVersion: _currentVersion,
          setting,
          category: _categoriesSort,
          fullNameUser: this.state._fullName,
        }}
        onPress={{
          phone: this._onPressPhone,
          avatar: this._onPressAvatar,
          goToStore: this._goToStore,
          closeModal: this._onCloseModel,
        }}
        isOpenModelConfirm={_isOpenModelConfirm}
        loginActions={this.props.loginActions}
        notificationActions={this.props.notificationActions}
        navigation={this.props.navigation}
        dataUser={this.props.login.data}
      />
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
};
export default connect(state => {
  return {
    login: state.login,
    setting: state.setting,
  };
}, mapDispatchToProps)(SideMenu);
