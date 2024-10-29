/**
 ** Name:
 ** Author:
 ** CreateAt:
 ** Description:
 **/
/* LIBRARY */
import React from 'react';
import {View, Text, Image} from 'react-native';
import moment from 'moment';
/* COMPONENTS */
import CImage from '../../../components/CImage';
/* COMMON */
import {CONFIG, DEVICE, LANG, ASSETS} from '../../../config';
import Helpers from '../../../helpers';
/** STYLES */
import styles from './style';

export const ViewHeaderInfoChildren = ({selectedStudent, dataClass}) => {
  let dob = moment(selectedStudent.dateOfBirth, 'YYYY-MM-DD').format(
    'DD/MM/YYYY',
  );
  let gender = CONFIG.students.find(f => f.id === selectedStudent.gender);
  if (gender) {
    gender = gender.path;
  } else {
    gender = CONFIG.students[0].path;
  }
  let avatarChildren =
    selectedStudent.avatar &&
    selectedStudent.avatar != '' &&
    selectedStudent.avatar != null
      ? {uri: CONFIG.host + selectedStudent.avatar}
      : gender;
  let newFullName = Helpers.capitalizeName(
    selectedStudent.firstName,
    selectedStudent.lastName,
    CONFIG.settingLocal.softName,
  );
  let a = moment();
  let diff = moment.duration(a.diff(selectedStudent.dateOfBirth));

  let icClass =
    CONFIG.classes.find(f => f.id === dataClass?.age) ||
    CONFIG.classes[CONFIG.classes.length - 1].path;

  return (
    <View style={styles.con_header_list}>
      <View style={styles.con_header_content}>
        <View style={styles.con_header_item}>
          <CImage
            style={styles.img_header_item}
            src={ASSETS.icBirth}
            resizeMode={'contain'}
          />

          {selectedStudent && (
            <>
              <Text style={styles.txt_header_content}>{dob}</Text>
              {/* <Text
                style={{
                  color: 'black',
                  fontSize: Helpers.fS(11),
                  fontFamily: DEVICE.fontRegular,
                  paddingLeft: 5,
                }}>{`(${
                diff.years() > 0
                  ? diff.years() + ' ' + LANG[CONFIG.lang].years
                  : ''
              }${
                diff.months() > 0
                  ? ' ' +
                    diff.months() +
                    ' ' +
                    LANG[CONFIG.lang].month.toLowerCase()
                  : ''
              })`}</Text> */}
            </>
          )}
        </View>

        <View style={styles.con_header_item_center}>
          <CImage
            style={styles.con_avatar_student}
            src={avatarChildren}
            resizeMode={'cover'}
          />

          {selectedStudent && (
            <Text style={styles.txt_header_title}>{newFullName}</Text>
          )}
        </View>

        <View style={[styles.con_header_item, {justifyContent: 'center'}]}>
          <Image
            style={styles.avatarClass}
            source={icClass}
            resizeMode={'contain'}
          />
          <Text
            style={[
              styles.txt_header_content,
              {width: '100%', textAlign: 'center'},
            ]}
            numberOfLines={2}>
            {dataClass.title}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ViewHeaderInfoChildren;
