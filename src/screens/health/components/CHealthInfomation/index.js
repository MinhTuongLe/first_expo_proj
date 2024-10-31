/**
 * @Description: Health Screen Layout
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** LIBRARY */
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
/** STYLES */
import styles from './style';
/** COMMON */
import {COLOR, DEVICE} from '../../../../config';
import CText from '../../../../components/CText';
import Helpers from '../../../../helpers';

const INIT = {
  TXT_HEIGHT: 'txtHeight',
  TXT_WEIGHT: 'txtWeight',
  TXT_BLOOD: 'txtBloodGroup',
  TXT_ALLERGY: 'txtAllergy',
  TXT_EYE: 'txtEye',
  TXT_HEART: 'txtHeart',
  TXT_EAR: 'txtEar',
};

class CHealthInfomation extends React.Component {
  constructor(props) {
    super(props);
    this._dataStudent = props.dataStudent ? props.dataStudent : null;
  }

  render() {
    let height =
      this._dataStudent && this._dataStudent.height !== 0
        ? this._dataStudent.height
        : '-';
    let weight =
      this._dataStudent && this._dataStudent.weight !== 0
        ? this._dataStudent.weight
        : '-';
    let bloodGroup =
      this._dataStudent && this._dataStudent.bloodGroup !== ''
        ? this._dataStudent.bloodGroup
        : '-';
    let allergy =
      this._dataStudent && this._dataStudent.allergy !== ''
        ? this._dataStudent.allergy
        : '-';
    let eyes =
      this._dataStudent && this._dataStudent.eyes !== ''
        ? this._dataStudent.eyes
        : '-';
    let heartRate =
      this._dataStudent && this._dataStudent.heartRate !== ''
        ? this._dataStudent.heartRate
        : '-';
    let ears =
      this._dataStudent && this._dataStudent.ears !== ''
        ? this._dataStudent.ears
        : '-';
    let notes =
      this._dataStudent && this._dataStudent.notes !== ''
        ? this._dataStudent.notes
        : '-';

    return (
      <View
        style={{
          padding: 10,
          backgroundColor: COLOR.backgroundSec,
          marginTop: 10,
          borderRadius: 10,
        }}>
        <CText
          style={styles.header_title}
          i18nKey={'txtHealthInfo'}
          upperCase
        />
        {/* <View style={styles.con_info}>
          <View style={DEVICE.gStyle.row_align_center}>
            <Icon containerStyle={{ width: 30 }} name={'child'} size={Helpers.fS(20)} color={'black'} type={"light"} />
            <CText style={styles.txt_info_title} i18nKey={INIT.TXT_HEIGHT} />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={styles.txt_info_result}>{height}</Text>
            {height != '-' && <Text style={[styles.txt_info_result, { fontSize: Helpers.fS(14), fontFamily: DEVICE.fontRegularm, marginLeft: 5 }]}>{'cm'}</Text>}
          </View>
        </View>

        <View style={styles.con_info}>
          <View style={DEVICE.gStyle.row_align_center}>
            <Icon containerStyle={{ width: 30 }} name={'weight'} size={Helpers.fS(20)} color={'black'} type={"light"} />
            <CText style={styles.txt_info_title} i18nKey={INIT.TXT_WEIGHT} />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={styles.txt_info_result}>{weight}</Text>
            {weight != '-' && <Text style={[styles.txt_info_result, { fontSize: Helpers.fS(14), fontFamily: DEVICE.fontRegularm, marginLeft: 5 }]}>{'kg'}</Text>}
          </View>
        </View> */}

        <View style={styles.con_info}>
          <View style={DEVICE.gStyle.row_align_center}>
            <Icon
              containerStyle={{width: 30}}
              name={'tint'}
              size={Helpers.fS(20)}
              color={'black'}
              type={'light'}
            />
            <CText style={styles.txt_info_title} i18nKey={INIT.TXT_BLOOD} />
          </View>

          <Text style={styles.txt_info_result}>{bloodGroup}</Text>
        </View>

        <View style={styles.con_info}>
          <View style={DEVICE.gStyle.row_align_center}>
            <Icon
              containerStyle={{width: 30}}
              name={'allergies'}
              size={Helpers.fS(20)}
              color={'black'}
              type={'light'}
            />
            <CText style={styles.txt_info_title} i18nKey={INIT.TXT_ALLERGY} />
          </View>

          <Text style={styles.txt_info_result}>{allergy}</Text>
        </View>

        <View style={styles.con_info}>
          <View style={DEVICE.gStyle.row_align_center}>
            <Icon
              containerStyle={{width: 30}}
              name={'eye'}
              size={Helpers.fS(20)}
              color={'black'}
              type={'light'}
            />
            <CText style={styles.txt_info_title} i18nKey={INIT.TXT_EYE} />
          </View>

          <Text style={styles.txt_info_result}>{eyes}</Text>
        </View>

        <View style={styles.con_info}>
          <View style={DEVICE.gStyle.row_align_center}>
            <Icon
              containerStyle={{width: 30}}
              name={'heart'}
              size={Helpers.fS(20)}
              color={'black'}
              type={'light'}
            />
            <CText style={styles.txt_info_title} i18nKey={INIT.TXT_HEART} />
          </View>

          <Text style={styles.txt_info_result}>{heartRate}</Text>
        </View>

        <View style={styles.con_info}>
          <View style={DEVICE.gStyle.row_align_center}>
            <Icon
              containerStyle={{width: 30}}
              name={'ear'}
              size={20}
              color={'black'}
              type={'light'}
            />
            <CText style={styles.txt_info_title} i18nKey={INIT.TXT_EAR} />
          </View>

          <Text style={styles.txt_info_result}>{ears}</Text>
        </View>
        <View style={styles.con_info_note}>
          <ScrollView>
            <Text style={styles.txt_text_global}>{notes}</Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default CHealthInfomation;
