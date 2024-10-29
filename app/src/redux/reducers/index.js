/**
 * Created by dang.le from 04/09/2018
 */
import {combineReducers} from 'redux';
import socketReducer from './socket';
import settingsReducer from './setting';
import loginReducer from './login';
import newsReducer from './news';
import notificationReducer from './notification';
import homeReducer from './home';
import albumReducer from './album';
import healthReducer from './health';
import attendantReducer from './attendant';
import connectionReducer from './connection';
import parentReducer from './parent';
import teacherReducer from './teacher';
import loadingReducer from './loading';
import languageReducer from './language';
import messagesReducer from './messages';
import schoolReducer from './school';
import classReducer from './activeClass';
import studentReducer from './activeStudent';

export default combineReducers({
  //for global
  io: socketReducer,
  setting: settingsReducer,
  parents: parentReducer,
  teachers: teacherReducer,
  login: loginReducer,
  activeClass: classReducer,
  activeStudent: studentReducer,
  //for screens
  home: homeReducer,
  messages: messagesReducer,
  news: newsReducer,
  album: albumReducer,
  health: healthReducer,
  notification: notificationReducer,
  attendant: attendantReducer,
  connection: connectionReducer,
  loading: loadingReducer,
  language: languageReducer,
  school: schoolReducer,
});
