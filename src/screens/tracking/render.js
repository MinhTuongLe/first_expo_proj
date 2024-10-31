/**
 ** FileName:
 ** FileAuthor:
 ** FileCreateAt:
 ** FileDescription:
 **/
/* LIBRARY */
import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
/** COMPONENTS */
import CText from '../../components/CText';
import {ViewHistoryAttendance} from '../../screens/attendance/history/render';
/** COMMON */
import {DEVICE, CONFIG, COLOR} from '../../config';
import Helpers from '../../helpers';
/** STYLES */
import styles from './styles';

export const ViewTracking = ({
  state = null,
  item = null,
  settingStep = false,
}) => {
  return <ViewHistoryAttendance />;
};
