/**
 * @Description: Height & Weight Screen Logic
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** LIBRARY */
import React from 'react';
import moment from 'moment';
/** COMPONENT */
import ViewHeightWeight from './render';
import {getMonthsDifference} from '../../../../utils/dateTime';

class CHeightWeight extends React.Component {
  render() {
    let {dataStudent} = this.props;
    let arrHeightWeightData = [];
    let heightStudentNow = 0;
    let weightStudentNow = 0;
    let birthdayStudent = moment().format('YYYY-MM-DD');

    if (dataStudent) {
      arrHeightWeightData = dataStudent.w_h_History;
      if (arrHeightWeightData.length > 0) {
        arrHeightWeightData.sort(
          (a, b) =>
            moment(b.date, 'YYYY-MM-DD').unix() -
            moment(a.date, 'YYYY-MM-DD').unix(),
        );
      }
      heightStudentNow = dataStudent.height;
      weightStudentNow = dataStudent.weight;
      birthdayStudent = dataStudent.dateOfBirth;
    }

    let diff = moment.duration(moment().diff(dataStudent.dateOfBirth));
    let idxPickerActive = diff.years();

    return (
      <ViewHeightWeight
        data={{
          heightNow: heightStudentNow,
          weightNow: weightStudentNow,
          h_w: arrHeightWeightData,
          birthday: birthdayStudent,
          gender: dataStudent.gender,
          idxPickerActive: idxPickerActive,
        }}
      />
    );
  }
}

export default CHeightWeight;
