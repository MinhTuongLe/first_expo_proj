/**
 * @Description: Absent Screen Layout
 * @Created by ZiniTeam
 * @Date create: 23/01/2019
 */
/** LIBRARY */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Animated,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import moment from 'moment';
/** STYLES */
import styles from './style';
/** COMMON */
import {COLOR, LANG, CONFIG, DEVICE} from '../../config';
import Helpers from '../../helpers';
/** COMPONENT */
import CButton from '../../components/CButton';
import CInput from '../../components/CInput/CInput';
import HeaderBar from '../partials/header_bar';
import CCalendar from '../../components/CCalendar/calendar';
import CText from '../../components/CText';

class ViewDayOffScreen extends React.Component {
  render() {
    let {
      invalidDay,
      isMoreDay,
      isShowFCalendar,
      isShowTCalendar,
      data,
      onPress,
      anim,
      loadForHeader,
      state,
    } = this.props;
    let currDay = moment().format('YYYY-MM-DD');
    let mFromDay = moment(data.fromDay, 'YYYY-MM-DD').format('DD/MM/YYYY');
    let mToDay = moment(data.toDay, 'YYYY-MM-DD').format('DD/MM/YYYY');
    let mSumDayOff =
      moment(data.toDay, 'YYYY-MM-DD').diff(
        moment(data.fromDay, 'YYYY-MM-DD'),
        'days',
      ) + 1;

    return (
      <View style={styles.con}>
        {/* HEADER */}
        <HeaderBar
          title={'txtDrawerDayOff'}
          hasBack
          hasCustomHeaderRight={true}
          loadCustomHeaderRight={loadForHeader}
          dataCustomHeaderRight={data.students}
          dataChooseCustomHeaderRight={data.studentChoose}
          onCustomHeaderRight={onPress.chooseStudent}
          onBack={onPress.goBack}
        />

        {/* CONTENT */}
        <KeyboardAvoidingView
          style={DEVICE.gStyle.container}
          behavior={'padding'}
          enabled
          keyboardVerticalOffset={Platform.select({
            ios: Helpers.isIphoneX() ? 15 : 0,
            android: -500,
          })}>
          <View style={DEVICE.gStyle.container}>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
              <View style={styles.con_content}>
                {/* TOGGLE FULL DAY or HALF DAY */}
                <View style={styles.con_choose_option}>
                  <TouchableOpacity
                    style={DEVICE.gStyle.row}
                    onPress={!isMoreDay ? () => onPress.toggleDay() : null}>
                    <CText
                      style={[
                        styles.txt_fromto_title,
                        {color: isMoreDay ? 'black' : COLOR.inactiveTintColor},
                      ]}
                      i18nKey={'multiDay'}
                    />
                    <Icon
                      containerStyle={styles.ml_10}
                      name={isMoreDay ? 'check-circle' : 'circle'}
                      size={DEVICE.s * 25}
                      color={isMoreDay ? 'black' : COLOR.inactiveTintColor}
                      type={'light'}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={DEVICE.gStyle.row}
                    onPress={isMoreDay ? () => onPress.toggleDay() : null}>
                    <CText
                      style={[
                        styles.txt_fromto_title,
                        {color: isMoreDay ? COLOR.inactiveTintColor : 'black'},
                      ]}
                      i18nKey={'oneDay'}
                    />
                    <Icon
                      containerStyle={styles.ml_10}
                      name={isMoreDay ? 'circle' : 'check-circle'}
                      size={DEVICE.s * 25}
                      color={isMoreDay ? COLOR.inactiveTintColor : 'black'}
                      type={'light'}
                    />
                  </TouchableOpacity>
                </View>

                {/* CHOOSE FROM DAY and TO DAY */}
                <View>
                  <TouchableOpacity
                    style={{
                      height: Helpers.fS(50),
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => onPress.fromDay()}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon
                        name={'calendar-alt'}
                        size={Helpers.fS(20)}
                        color={'black'}
                        type={'light'}
                      />
                      <CText
                        style={[styles.txt_fromto_title, styles.ml_10]}
                        i18nKey={'txtAbsentFrom'}
                      />
                    </View>
                    <Text style={styles.txt_fromto_title}>{mFromDay}</Text>
                  </TouchableOpacity>

                  {isShowFCalendar && (
                    <CCalendar
                      theme={{
                        textDayFontFamily: DEVICE.fontRegular,
                        textMonthFontFamily: DEVICE.fontBold,
                        textDayHeaderFontFamily: DEVICE.fontMedium,
                      }}
                      minDate={currDay}
                      maxDate={'2030-01-01'}
                      monthFormat={'MMMM - yyyy'}
                      onPressArrowLeft={substractMonth => substractMonth()}
                      onPressArrowRight={addMonth => addMonth()}
                      onDayPress={day => onPress.fDay(day)}
                    />
                  )}

                  <Animated.View
                    style={{height: Helpers.fS(50), opacity: anim.opacity}}>
                    <TouchableOpacity
                      style={{
                        height: '100%',
                        width: '100%',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                      onPress={() => onPress.toDay()}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon
                          name={'calendar-alt'}
                          size={Helpers.fS(20)}
                          color={'black'}
                          type={'light'}
                        />
                        <CText
                          style={[styles.txt_fromto_title, {marginLeft: 10}]}
                          i18nKey={'txtAbsentTo'}
                        />
                      </View>
                      <Text style={styles.txt_fromto_title}>{mToDay}</Text>
                    </TouchableOpacity>
                  </Animated.View>

                  {isShowTCalendar && (
                    <CCalendar
                      theme={{
                        textDayFontFamily: DEVICE.fontRegular,
                        textMonthFontFamily: DEVICE.fontBold,
                        textDayHeaderFontFamily: DEVICE.fontMedium,
                      }}
                      minDate={currDay}
                      maxDate={'2030-01-01'}
                      monthFormat={'MMMM - yyyy'}
                      onPressArrowLeft={substractMonth => substractMonth()}
                      onPressArrowRight={addMonth => addMonth()}
                      onDayPress={day => onPress.tDay(day)}
                    />
                  )}
                </View>

                {/* SHOW COUNT DAY OFF */}
                <Animated.View
                  style={[
                    styles.con_info_day_off,
                    {
                      opacity: anim.opacity,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  ]}>
                  <CText
                    style={styles.txt_fromto_title}
                    i18nKey={'txtInfoDayOff'}
                  />
                  {invalidDay ? (
                    <CText
                      style={styles.txt_count_day_off}
                      i18nKey={'txtInvalidDateOff'}
                    />
                  ) : (
                    <Text style={styles.txt_count_day_off}>{mSumDayOff}</Text>
                  )}
                </Animated.View>

                {/* WRITE REASON */}
                <Animated.View
                  style={[
                    styles.con_message,
                    {
                      marginTop: anim.spring.interpolate({
                        inputRange: [0, 1],
                        outputRange: isMoreDay
                          ? [-DEVICE.s * (Helpers.isIphoneX() ? 130 : 160), 0]
                          : [
                              -DEVICE.s * (Helpers.isIphoneX() ? 130 : 160) +
                                30,
                              0,
                            ],
                      }),
                    },
                  ]}>
                  <CInput
                    ref={'reason'}
                    style={styles.txt_message}
                    placeholder={LANG[CONFIG.lang].txtAbsentMessage}
                    multiline
                    autoCorrect={false}
                    autoFocus={true}
                    isBorder={false}
                    isRemove={false}
                    cursorColor={COLOR.txtColor}
                  />
                </Animated.View>
              </View>
            </ScrollView>

            {/* SUBMIT BUTTON */}
            <View
              style={{paddingHorizontal: 10, paddingBottom: 10, width: '100%'}}>
              {state._txtError !== '' && (
                <CText style={styles.txt_error}>{state._txtError}</CText>
              )}
              <CButton
                style={styles.submit_group_submit}
                onPress={onPress.send}>
                {LANG[CONFIG.lang].txtAbsentSend}
              </CButton>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

ViewDayOffScreen.defaultProps = {
  isLoading: false,
  invalidDay: false,
  isMoreDay: true,
  isShowFCalendar: false,
  isShowTCalendar: false,
  data: {
    fromDay: moment().format('YYYY-MM-DD'),
    toDay: moment().format('YYYY-MM-DD'),
  },
  onPress: {
    send: () => {},
    done: () => {},
    exit: () => {},
    toggleDay: () => {},
    fromDay: () => {},
    toDay: () => {},
    fDay: () => {},
    tDay: () => {},
  },
  anim: {
    opacity: 1,
    spring: 1,
  },
};

export default ViewDayOffScreen;
