/**
 * @Description: Schedule Screen Layout
 * @Created by ZiniTeam
 * @Date create: 22/01/2019
 */
/** LIBRARY */
import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import moment from 'moment';
/** COMPONENT */
import {LocaleConfig} from '../../components/CCalendar';
import HeaderBar from '../partials/header_bar';
import CCalendar from '../../components/CCalendar/agenda';
import CImage from '../../components/CImage';
import CText from '../../components/CText';
/** COMMON */
import {COLOR, CONFIG, LANG, DEVICE, ASSETS, KEY} from '../../config';
import Helpers from '../../helpers';
/** STYLES */
import styles from './style';
import {backgroundColor} from '../../components/CCalendar/style';

LocaleConfig.locales[CONFIG.lang] = LANG[CONFIG.lang].txtInfoCalendar;
LocaleConfig.defaultLocale = CONFIG.lang;

const TYPE_SCREEN = {
  schedule: 'schedule',
  menu: 'menu',
};

/**
 * RENDER MAIN SCHEDULE OR MENU SCREEN
 * @param {*} data: Data for Calendar
 * @param {*} calendar: Handler Calendar
 * @param {*} typeScreen: Result screen is focus
 */
class RenderScheduleMenuScreen extends React.Component {
  /** RENDER */
  render() {
    let {
      loading,
      loadForHeader,
      data,
      typeScreen,
      calendar,
      onPress,
      onPressBack,
    } = this.props;
    let titleScreen =
      typeScreen === TYPE_SCREEN.schedule
        ? 'txtDrawerSchedule'
        : 'txtDrawerMenu';

    return (
      <View style={styles.con}>
        {/* HEADER */}
        <HeaderBar
          title={titleScreen}
          hasBack
          hasCustomHeaderRight={true}
          loadCustomHeaderRight={loadForHeader}
          dataCustomHeaderRight={
            CONFIG.USER_TYPE === KEY.PARENT ? data.students : data.classes
          }
          dataChooseCustomHeaderRight={
            CONFIG.USER_TYPE === KEY.PARENT
              ? data.studentChoose
              : data.classChoose
          }
          onCustomHeaderRight={
            CONFIG.USER_TYPE === KEY.PARENT
              ? onPress.chooseStudent
              : onPress.chooseClass
          }
          onBack={onPressBack}
        />

        {/* CALENDAR */}
        {!loading && (
          <CCalendar
            showCalendar={true}
            theme={{
              textMonthFontWeight: 'bold',
              textDayFontFamily: DEVICE.fontMedium,
              textMonthFontFamily: DEVICE.fontBold,
              textDayHeaderFontFamily: DEVICE.fontBold,
              backgroundColor: COLOR.backgroundMain,
            }}
            minDate={'2018-01-01'}
            maxDate={'2030-01-01'}
            monthFormat={'MMMM - yyyy'}
            items={data.dataRender || null}
            loadItemsForMonth={day =>
              calendar.loadItems(day, data.currentDate === day.dateString)
            }
            renderItem={
              typeScreen === TYPE_SCREEN.schedule
                ? RenderItemSchedule
                : RenderItemMenu
            }
            renderDay={(day, item) => null}
            renderEmptyDate={
              typeScreen === TYPE_SCREEN.schedule
                ? RenderScheduleEmptyDate
                : RenderMenuEmptyDate
            }
            rowHasChanged={(r1, r2) => calendar.rowHasChanged(r1, r2)}
            renderKnobOpen={() => (
              <CText
                style={styles.txt_open_calendar}
                i18nKey={'openCalendar'}
              />
            )}
            renderKnobClose={() => (
              <CText
                style={styles.txt_open_calendar}
                i18nKey={'closeCalendar'}
              />
            )}
            renderFooterContent={() => null}
            renderHeaderContent={() => null}
          />
        )}
      </View>
    );
  }
}

/**
 * RENDER ITEM MENU
 * @param {*} item: Data of Day
 */
export const RenderItemMenu = (item = {}, firstItemInDay = false) => {
  return (
    <View style={styles.item_menu}>
      {/* Title | Time start - time end */}
      <View style={styles.con_title_group}>
        <CText style={styles.txt_title_group} upperCase>
          {item.name}
        </CText>
        <Text style={[styles.txt_title_group, {color: COLOR.primaryButton}]}>
          {item.timeStart + ' - ' + item.timeEnd}
        </Text>
      </View>

      {/* Foods */}
      <FlatList
        data={item.foods}
        renderItem={objFood => {
          return (
            <View style={styles.con_content_item_food}>
              <View style={styles.imageFood}>
                <Image
                  style={styles.img_item_group}
                  source={objFood.item.path}
                  resizeMode={'contain'}
                />
              </View>

              <View
                style={[
                  styles.foodName,
                  objFood.index === item.foods.length - 1 && {
                    borderBottomWidth: 0,
                  },
                ]}>
                <Text style={styles.txt_food_name} numberOfLines={2}>
                  {objFood.item.data.title}
                </Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={styles.con_no_data}>
            <CText
              style={[
                styles.txt_food_name,
                {color: COLOR.placeholderTextColor},
              ]}
              i18nKey={'txtMenuNoData'}
            />
          </View>
        )}
      />
    </View>
  );
};

/**
 * RENDER ITEM SCHEDULE
 * @param {*} item: Data of Day
 */
export const RenderItemSchedule = (item = {}, firstItemInDay = false) => {
  let isFlag = item.flag === 1,
    notFlag = item.flag === -1;

  return (
    <View style={[styles.item_schedule, isFlag && [DEVICE.gStyle.shadow]]}>
      {/* Time start - time end */}
      <View
        style={[
          styles.con_title_item_schedule,
          isFlag ? {backgroundColor: COLOR.primaryApp} : {},
        ]}>
        <Text
          style={[
            styles.txt_title_item_schedule,
            isFlag
              ? {fontFamily: DEVICE.fontBold, color: '#ffffff'}
              : notFlag
              ? {color: COLOR.inactiveTintColor}
              : {color: COLOR.txtColor},
            ,
          ]}>
          {item.timeStart + ' - ' + item.timeEnd}
        </Text>
      </View>

      {/* Subjects */}
      <View style={[styles.con_title_item_schedule_2]}>
        <Text
          style={[
            styles.txt_subject_name,
            isFlag
              ? {fontFamily: DEVICE.fontBold, color: COLOR.primaryApp}
              : notFlag
              ? {color: COLOR.inactiveTintColor}
              : {color: COLOR.txtColor},
            ,
          ]}>
          {item.subject.toUpperCase()}
        </Text>
        {item.topic !== '' && (
          <CText
            style={[
              styles.txt_topic,
              isFlag
                ? {color: COLOR.primaryApp}
                : notFlag
                ? {color: COLOR.inactiveTintColor}
                : {color: COLOR.text_2},
              ,
            ]}
            numberOfLines={100}>
            {item.topic}
          </CText>
        )}
      </View>
    </View>
  );
};

/**
 * RENDER ITEM SCHEDULE
 * @param {*} item: Data of Day
 */
export const RenderHeaderSchedule = () => {
  return (
    <View
      style={[
        styles.item_schedule,
        {
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          backgroundColor: COLOR.backgroundColorNote,
        },
      ]}>
      <View
        style={[
          styles.con_title_item_schedule,
          {borderRightColor: COLOR.borderColor},
        ]}>
        <CText
          style={[styles.txt_title_item_schedule, {textAlign: 'center'}]}
          i18nKey={'time'}
          numberOfLines={2}
        />
      </View>

      <View style={styles.con_title_item_schedule_2}>
        <CText
          style={[styles.txt_title_item_schedule, {textAlign: 'center'}]}
          i18nKey={'subject'}
          numberOfLines={2}
        />
      </View>
    </View>
  );
};

/**
 * RENDER NO ITEMS
 */
export const RenderScheduleEmptyDate = () => (
  <View style={styles.emptyDate}>
    <Icon
      name={'clipboard-list'}
      size={Helpers.fS(50)}
      color={COLOR.placeholderTextColor}
      type={'light'}
    />
    <CText style={styles.txt_no_data} i18nKey={'txtEmptyOfDay'} />
  </View>
);

/**
 * RENDER NO ITEMS
 */
export const RenderMenuEmptyDate = () => (
  <View style={styles.emptyDate}>
    <Icon
      name={'burger-soda'}
      size={Helpers.fS(50)}
      color={COLOR.placeholderTextColor}
      type={'light'}
    />
    <CText style={styles.txt_no_data} i18nKey={'txtEmptyOfDay'} />
  </View>
);

/**
 * RENDER HEADER SCHEDULE
 */
export const RenderHeaderContent = data => {
  let avatar = null,
    newFullName = '';
  if (CONFIG.USER_TYPE == KEY.TEACHER) {
    avatar = CONFIG.classes.find(f => f.id === data.thumbnail);
    if (avatar) {
      avatar = avatar.path;
    } else {
      avatar = ASSETS.imgFailed;
    }
  } else {
    let gender = CONFIG.students.find(f => f.id === data.gender);
    if (gender) {
      gender = gender.path;
    } else {
      gender = CONFIG.students[0].path;
    }
    avatar =
      data.avatar && data.avatar != '' && data.avatar != null
        ? {uri: CONFIG.host + data.avatar}
        : gender;
    newFullName = Helpers.capitalizeName(
      data.firstName,
      data.lastName,
      CONFIG.settingLocal.softName,
    );
  }

  return (
    <View style={styles.con_header_content}>
      <CImage
        style={styles.img_header_content}
        src={avatar}
        resizeMode={'cover'}
      />

      <Text style={styles.txt_header_content}>
        {CONFIG.USER_TYPE === KEY.PARENT ? newFullName : data.title}
      </Text>
    </View>
  );
};

RenderScheduleMenuScreen.defaultProps = {
  loading: true,
  data: {
    dataRender: [],
  },
  typeScreen: TYPE_SCREEN.schedule,
  calendar: {
    loadItems: () => {},
    rowHasChanged: () => {},
  },
};

export default RenderScheduleMenuScreen;
