/**
 * @Description: History Teacher Screen
 * @Created by ZiniTeam
 * @Date create: 14/05/2020
 */
/** LIBRARY */
import React from 'react';
import {View, ScrollView, Text, FlatList} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
/** COMPONENTS */
import Header_bar from '../../partials/header_bar';
import CText from '../../../components/CText';
/** STYLES */
import styles from './style';
/** COMMON */
import {COLOR, DEVICE, CONFIG, LANG} from '../../../config';
import Helpers from '../../../helpers';
import CLoading from '../../../components/CLoading';
import {extractDate} from '../../../utils/dateTime';

const ViewListEmpty = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Icon
        containerStyle={{marginTop: 10}}
        name={'search'}
        size={50}
        color={COLOR.placeholderTextColor}
        type={'solid'}
      />
      <CText
        style={styles.txt_no_data}
        numberOfLines={2}
        i18nKey={'txtNoDataAttendance'}
      />
    </View>
  );
};

const renderItem = (item, index, length) => {
  const {day, month} = extractDate(item.date);
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: index === 0 ? 10 : 0,
        borderBottomColor: COLOR.borderColorSec,
        borderBottomWidth: index < length - 1 ? 1 : 0,
        paddingBottom: index < length - 1 ? 10 : 0,
        paddingTop: index > 0 ? 15 : 0,
      }}>
      {index === 0 && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={[
              styles.historyBoxChild,
              {
                alignItems: 'flex-start',
                flex: 1 / 2,
                marginTop: 0,
              },
            ]}>
            <View
              style={{
                width: Helpers.wS('13.33%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.todayContentDesc}>
                {LANG[CONFIG.lang].day}
              </Text>
            </View>
          </View>
          <View style={[styles.historyBoxChild, {marginTop: 0}]}>
            <Text style={styles.todayContentDesc}>
              {LANG[CONFIG.lang].txtInClass}
            </Text>
          </View>
          <View style={[styles.historyBoxChild, {marginTop: 0}]}>
            <Text style={styles.todayContentDesc}>
              {LANG[CONFIG.lang].txtOutClass}
            </Text>
          </View>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={[
            styles.historyBoxChild,
            {
              alignItems: 'flex-start',
              flex: 1 / 2,
            },
          ]}>
          <View style={styles.circelDate}>
            <Text style={styles.dateContent}>{day}</Text>
            <Text style={styles.monthContent}>
              {LANG[CONFIG.lang].txtInfoCalendar.monthNamesShort[month - 1]}
            </Text>
          </View>
        </View>
        <View style={styles.historyBoxChild}>
          <Text style={styles.historyContentDesc}>{item.countPresent}</Text>
        </View>
        <View style={styles.historyBoxChild}>
          <Text style={styles.historyContentDesc}>{item.countAbsent}</Text>
        </View>
      </View>
    </View>
  );
};

export const ViewHistoryTeacher = ({
  state = null,
  onFunction = {
    onPressChooseClass: () => {},
    onBack: () => {},
  },
}) => {
  const {_data} = state;

  return (
    <View style={styles.con}>
      <Header_bar
        title={'statistics'}
        hasBack
        onBack={onFunction.onBack}
        hasCustomHeaderRight={true}
        loadCustomHeaderRight={state._loadForList}
        dataCustomHeaderRight={state._dataClasses}
        dataChooseCustomHeaderRight={state._classChoose}
        onCustomHeaderRight={onFunction.onPressChooseClass}
      />

      <ScrollView style={[styles.con, {backgroundColor: COLOR.backgroundMain}]}>
        {!state._loading && (
          <View style={styles.con_detail}>
            <View style={styles.box}>
              <Text style={styles.title}>{LANG[CONFIG.lang].today}</Text>
              <View style={styles.todayBox}>
                <View style={styles.todayBoxChild}>
                  <Text style={styles.todayContentTitle}>
                    {_data.countTodayPresent}
                  </Text>
                  <Text style={styles.todayContentDesc}>
                    {LANG[CONFIG.lang].txtInClass}
                  </Text>
                </View>
                <View
                  style={{
                    height: '100%',
                    width: 1,
                    backgroundColor: COLOR.borderColorSec,
                  }}></View>
                <View style={styles.todayBoxChild}>
                  <Text style={styles.todayContentTitle}>
                    {_data.countTodayAbsent}
                  </Text>
                  <Text style={styles.todayContentDesc}>
                    {LANG[CONFIG.lang].txtOutClass}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.box, {marginTop: 10}]}>
              <Text style={styles.title}>{LANG[CONFIG.lang].history}</Text>
              <View style={styles.todayBox}>
                <FlatList
                  contentContainerStyle={{
                    flexGrow: 1,
                  }}
                  data={_data.historyData}
                  renderItem={({item, index}) =>
                    renderItem(item, index, _data.historyData.length)
                  }
                  onEndReachedThreshold={0.05}
                  ListEmptyComponent={ViewListEmpty}
                  stickyHeaderIndices={[0]}
                  scrollIndicatorInsets={{right: 1}}
                />
              </View>
            </View>
          </View>
        )}

        {state._loading && (
          <View style={DEVICE.gStyle.full_center}>
            <CLoading />
          </View>
        )}
      </ScrollView>
    </View>
  );
};
