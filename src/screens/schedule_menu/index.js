/**
 * @Description: Schedule Screen Logic
 * @Created by ZiniTeam
 * @Date create: 22/01/2019
 */
/** LIBRARY */
import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
/** COMPONENT */
import RenderScheduleMenuScreen from './render';
/** COMMON */
import Helpers from '../../helpers';
import {CONFIG, KEY, ASSETS} from '../../config';
import Services from '../../services';

let rangeTime = [
  {
    name: 'txtMenuScheMorning',
    timeStart: '07:00',
    timeEnd: '10:00',
    foods: [],
  },
  {
    name: 'txtMenuScheAfternoon',
    timeStart: '11:00',
    timeEnd: '12:30',
    foods: [],
  },
  {
    name: 'txtMenuScheNoon',
    timeStart: '15:00',
    timeEnd: '15:30',
    foods: [],
  },
  {
    name: 'txtMenuScheNight',
    timeStart: '16:30',
    timeEnd: '17:30',
    foods: [],
  },
];

const TYPE_SCREEN = {
  schedule: 'schedule',
  menu: 'menu',
};

class ScheduleAndMenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _loadForList: true,
      _studentChoose: null,
      _classChoose: null,
      _dataSchedule: null,
      _dataMenu: null,
      _dataRender: null,
      _dataStudents: props.login.data.students,
      _dataClasses: props.login.data.classes,
    };
    this._typeScreen = props.route.params?.typeScreen ?? 'schedule'; // 'schedule' (default) or 'menu'
    this._currentDate = moment().format(CONFIG.formatDate);
  }

  /** FUNCTIONS */
  _checkClasses = async () => {
    let _classChoose = null;
    /** Check class choosed from storage */
    _classChoose = await Helpers.getAsyStrClassChoosed();
    if (_classChoose) {
      _classChoose = JSON.parse(_classChoose);
    }

    this.setState({
      _classChoose: _classChoose || null,
      _loading: false,
      _loadForList: false,
    });
  };

  _checkStudents = async () => {
    let {_studentChoose} = this.state;
    let {login} = this.props;
    let findClass = null;
    /** Check student choosed from storage */
    _studentChoose = await Helpers.getAsyStrStudentChoosed();
    if (_studentChoose) {
      _studentChoose = JSON.parse(_studentChoose);
      /** Check class of student */
      if (CONFIG.USER_TYPE === KEY.PARENT) {
        let classObj, find;
        for (classObj of login.data.classes) {
          find = classObj.students.find(f => f.id === _studentChoose.id);
          if (find) {
            findClass = classObj;
            break;
          }
        }
      }
    }

    this.setState({
      _classChoose: findClass,
      _studentChoose: _studentChoose || null,
      _loading: false,
      _loadForList: false,
    });
  };

  _loadItems = async (day, isCurDay) => {
    let {_classChoose} = this.state;
    let {setting} = this.props;
    let tmpRangeTime = setting.config.value.rangeTimeMenu || rangeTime;
    let _tmp = {};

    /** Create default for date choosed */
    _tmp[day.dateString] = [];

    /** Call server and fetch data for date choosed */
    let params = {
      dateUse: day.dateString,
      classId: _classChoose.id,
    };
    let res = await this._getDataFromServer(params);
    // console.log("DATA_MENU", res)
    if (res && res.data) {
      let i,
        _slots = [],
        dataPrepare = [];
      if (this._typeScreen === TYPE_SCREEN.schedule) {
        // TYPE SCREEN SCHEDULE
        if (!isCurDay) {
          let subject;
          for (subject of res.data) {
            dataPrepare.push({
              flag: -1,
              timeStart: subject.timeStart,
              timeEnd: subject.timeEnd,
              subject: subject.title,
              topic: subject.topic,
            });
          }
        } else {
          let flag = -1;
          for (i = 0; i < res.data.length; i++) {
            if (i < res.data.length - 1) {
              let tmpTimeA = moment(res.data[i].timeStart, 'HH:mm'),
                tmpTimeB = moment(res.data[i + 1].timeStart, 'HH:mm'),
                tmpNow = moment();

              if (tmpNow.isBetween(tmpTimeA, tmpTimeB)) {
                flag = 1;
              } else if (
                tmpNow.isAfter(tmpTimeA) &&
                !tmpNow.isBetween(tmpTimeA, tmpTimeB)
              ) {
                flag = -1;
              } else if (
                tmpNow.isBefore(tmpTimeB) &&
                !tmpNow.isBetween(tmpTimeA, tmpTimeB)
              ) {
                flag = 0;
              }
            } else {
              let tmpNow = moment(),
                tmpTime = moment(res.data[i].timeStart, 'HH:mm');
              if (tmpNow.isAfter(tmpTime)) {
                flag = 1;
              } else {
                flag = 0;
              }
            }

            dataPrepare.push({
              flag,
              timeStart: res.data[i].timeStart,
              timeEnd: res.data[i].timeEnd,
              subject: res.data[i].title,
              topic: res.data[i].topic,
            });
          }
        }
        _slots = dataPrepare;
      } else {
        //TYPE SCREEN FOOD MENU
        let dataOfDate = res.data;
        // console.log('dataOfDate');
        // console.log(dataOfDate);
        for (i = 0; i < dataOfDate.slotFeedings.length; i++) {
          let foods = [],
            tmpFood = null;
          /** Find thumbnail and data of food */
          for (tmpFood of dataOfDate.slotFeedings[i].foods) {
            let icFood = CONFIG.foods.find(f => f.id === tmpFood.thumbnail);
            if (icFood) {
              icFood = icFood.path;
            } else {
              icFood = ASSETS.imgFailed;
            }

            foods.push({
              path: icFood,
              data: tmpFood,
            });
          }

          /** Find range time */
          if (typeof tmpRangeTime[i] !== 'undefined') {
            //Fix case chi co ca an sang
            tmpRangeTime[i].foods = foods;
          }
        }
        _slots = tmpRangeTime;
      }

      for (i = 0; i < _slots.length; i++) {
        _tmp[day.dateString].push(_slots[i]);
      }
    }
    this.setState({_dataRender: _tmp});
  };

  _getDataFromServer = async params => {
    let result = null;
    if (this._typeScreen === TYPE_SCREEN.schedule) {
      result = await Services.Schedule.get(params);
    }
    if (this._typeScreen === TYPE_SCREEN.menu) {
      result = await Services.Menu.get(params);
    }
    return result;
  };

  _rowHasChanged = (r1, r2) => {
    return r1.updatedAt !== r2.updatedAt;
  };

  /** HANDLE FUNCTIONS */
  _onPressChooseClass = classObj => {
    if (classObj.id !== this.state._classChoose.id) {
      Helpers.setAsyStrClassChoosed(JSON.stringify(classObj));
      let _dateChoose = Object.keys(this.state._dataRender)[0];
      this.setState({_dataRender: null, _classChoose: classObj});
      this._loadItems({dateString: _dateChoose});
    }
  };

  _onPressChooseStudent = studentObj => {
    if (studentObj.id !== this.state._studentChoose.id) {
      Helpers.setAsyStrStudentChoosed(JSON.stringify(studentObj));
      let _dateChoose = Object.keys(this.state._dataRender)[0];
      this.setState({_dataRender: null, _studentChoose: studentObj});
      this._loadItems({dateString: _dateChoose});
    }
  };

  /** HANDLE FUNCTIONS */
  _onPressBack = () => {
    this.props.route.params?.onRefresh?.();
    this.props.navigation.goBack();
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

  /** RENDER */
  render() {
    let {
      _loading,
      _loadForList,
      _dataRender,
      _dataClasses,
      _dataStudents,
      _classChoose,
      _studentChoose,
    } = this.state;

    return (
      <RenderScheduleMenuScreen
        loading={_loading}
        loadForHeader={_loadForList}
        data={{
          dataRender: _dataRender,
          classes: _dataClasses,
          students: _dataStudents,
          classChoose: _classChoose,
          studentChoose: _studentChoose,
          currentDate: this._currentDate,
        }}
        onPress={{
          chooseClass: this._onPressChooseClass,
          chooseStudent: this._onPressChooseStudent,
        }}
        calendar={{
          loadItems: this._loadItems,
          rowHasChanged: this._rowHasChanged,
        }}
        typeScreen={this._typeScreen}
        onPressBack={this._onPressBack}
        props={this.props}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    setting: state.setting,
  };
};

export default connect(mapStateToProps, null)(ScheduleAndMenuScreen);
