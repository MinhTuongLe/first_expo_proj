/**
 * Created by dang.le from 04/09/2018
 */
import { combineEpics } from 'redux-observable';
import { loginEpic, changeInfoEpic } from './loginEpic';
import { homeEpic } from './homeEpic';
import { newsEpic } from './newsEpic';
import { albumEpic } from './albumEpic';
import { notificationEpic } from './notificationEpic';
import { healthEpic } from './healthEpic';
import { attendantEpic } from './attendantEpic';

export default combineEpics(
  loginEpic,
  changeInfoEpic,
  homeEpic,
  newsEpic,
  albumEpic,
  notificationEpic,
  healthEpic,
  attendantEpic
)