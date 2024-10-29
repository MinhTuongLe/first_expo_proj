/* eslint-disable prettier/prettier */
/**
 * @Description: Header Bar Layout
 * @Created by ZiniTeam
 * @Date create: 18/01/2019
 */
/** LIBRARY */
import React from 'react';
import {View, Text, TouchableOpacity, StatusBar, FlatList} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
/** COMPONENT */
import CImage from '../../../components/CImage';
import CText from '../../../components/CText';
/** COMMON */
import {DEVICE, CONFIG, KEY, ASSETS, COLOR} from '../../../config';
import Helpers from '../../../helpers';
/** STYLES */
import styles from './style';

const optionsStyles = {
  optionsContainer: {
    backgroundColor: '#ffffff',
    padding: 2,
    borderRadius: 5,
  },
};

const triggerStyles = {
  triggerOuterWrapper: {
    activeOpacity: 1,
    // width: DEVICE.wS('50%'),
  },
  triggerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    marginRight: 10,
    activeOpacity: 1,
  },
  triggerTouchable: {
    activeOpacity: 70,
  },
};

class ViewHeaderBar extends React.PureComponent {
  /** FUNCTIONS */
  _onPressHeaderRight = obj => {
    this.props.onCustomHeaderRight(obj);
  };

  /** RENDER */
  render() {
    let {
      title,
      iconRight,
      hasBack,
      hasCustomHeaderRight = false,
      titleUpperCase,
      textRight,
      textRightValue,
      isAtRoute,
      onBack,
      onMenu,
      onPressShare,
      onPressNext,
      onPressPost,
      dataCustomHeaderRight,
      loadCustomHeaderRight,
      dataChooseCustomHeaderRight,
      shadow,
      hasMultiLang,
      titleCenter,
    } = this.props;
    let newFullName = '';

    if (!loadCustomHeaderRight && hasCustomHeaderRight) {
      if (CONFIG.USER_TYPE === KEY.PARENT) {
        let gender = CONFIG.students.find(
          f => f.id === dataChooseCustomHeaderRight.gender,
        );
        if (gender) {
          gender = gender.path;
        } else {
          gender = CONFIG.students[0].path;
        }
        dataChooseCustomHeaderRight.newAvatar =
          dataChooseCustomHeaderRight.avatar != '' &&
          dataChooseCustomHeaderRight.avatar != null
            ? {uri: CONFIG.host + dataChooseCustomHeaderRight.avatar}
            : gender;

        newFullName = Helpers.capitalizeName(
          dataChooseCustomHeaderRight.firstName,
          dataChooseCustomHeaderRight.lastName,
          CONFIG.settingLocal.softName,
        );
      } else {
        let icClass = CONFIG.classes.find(
          f => f.id === dataChooseCustomHeaderRight.thumbnail,
        );
        if (icClass) {
          dataChooseCustomHeaderRight.newAvatar = icClass.path;
        } else {
          dataChooseCustomHeaderRight.newAvatar = ASSETS.imgFailed;
        }
      }
    }

    return (
      <View
        style={[
          styles.con,
          shadow && {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            zIndex: 100,
          },
        ]}>
        <StatusBar barStyle="light-content" />
        <View style={styles.status_bar} />
        <View style={styles.con_header_bar}>
          <TouchableOpacity
            style={styles.con_header_left}
            onPress={hasBack ? onBack : onMenu}>
            <Icon
              name={hasBack ? 'chevron-left' : 'bars'}
              size={DEVICE.s * 30}
              color="white"
              type="light"
            />
          </TouchableOpacity>

          <View
            style={[
              styles.con_header_center,
              titleCenter && {alignItems: 'center', paddingLeft: 0},
              // !hasCustomHeaderRight && {alignItems: 'center', paddingLeft: 0},
            ]}>
            {hasMultiLang ? (
              <CText
                style={styles.text_header_center}
                i18nKey={title}
                upperCase={titleUpperCase ? true : false}
              />
            ) : (
              <Text style={styles.text_header_center}>
                {titleUpperCase ? title.toUpperCase() : title}
              </Text>
            )}
          </View>

          {isAtRoute === 'NewsCMSDetail' && (
            <TouchableOpacity
              style={styles.con_header_right}
              onPress={onPressShare}>
              <Icon
                name={'share-alt'}
                size={DEVICE.s * 30}
                color="white"
                type="light"
              />
            </TouchableOpacity>
          )}
          {iconRight !== '' && !hasCustomHeaderRight && (
            <TouchableOpacity
              style={styles.con_header_right}
              onPress={onPressNext}>
              <Icon
                name={iconRight}
                size={DEVICE.s * 30}
                color="white"
                type="light"
              />
            </TouchableOpacity>
          )}
          {textRight && (
            <TouchableOpacity
              style={styles.con_header_right}
              onPress={onPressPost}
              activeOpacity={0.5}>
              <Text style={styles.txt_header_right} numberOfLines={1}>
                {textRightValue}
              </Text>
            </TouchableOpacity>
          )}
          {hasCustomHeaderRight && !loadCustomHeaderRight ? (
            <View style={[DEVICE.gStyle.flex_1, {alignItems: 'flex-end'}]}>
              {dataCustomHeaderRight.length > 1 ? (
                <View>
                  <Menu
                    style={{
                      right: iconRight !== '' ? 50 : 0,
                      zIndex: iconRight !== '' ? 20 : 0,
                    }}>
                    <MenuTrigger customStyles={triggerStyles}>
                      <CImage
                        style={styles.con_avatar}
                        src={dataChooseCustomHeaderRight.newAvatar}
                        resizeMode={'contain'}
                      />

                      {CONFIG.USER_TYPE === KEY.PARENT ? (
                        <CText
                          style={[styles.txt_name, {width: Helpers.wS('25%')}]}>
                          {dataChooseCustomHeaderRight.firstName}
                        </CText>
                      ) : null}
                      <Icon
                        name={'caret-down'}
                        color={'#ffffff'}
                        size={20}
                        type={'solid'}
                      />
                    </MenuTrigger>
                    <MenuOptions customStyles={optionsStyles}>
                      <FlatList
                        data={dataCustomHeaderRight}
                        renderItem={({item, index}) => {
                          let avatar = null,
                            newFullName = '';
                          if (CONFIG.USER_TYPE === KEY.PARENT) {
                            let gender = CONFIG.students.find(
                              f => f.id === item.gender,
                            );
                            if (gender) {
                              gender = gender.path;
                            } else {
                              gender = CONFIG.students[0].path;
                            }
                            avatar =
                              item.avatar != '' && item.avatar != null
                                ? {uri: CONFIG.host + item.avatar}
                                : gender;

                            newFullName = Helpers.capitalizeName(
                              item.firstName,
                              item.lastName,
                              CONFIG.settingLocal.softName,
                            );
                          } else {
                            avatar = CONFIG.classes.find(
                              f => f.id === item.thumbnail,
                            );
                            if (avatar) {
                              avatar = avatar.path;
                            } else {
                              avatar = ASSETS.imgFailed;
                            }
                          }
                          return (
                            <MenuOption
                              style={{
                                backgroundColor:
                                  dataChooseCustomHeaderRight.id === item.id
                                    ? COLOR.bgNoti
                                    : '#ffffff',
                              }}
                              onSelect={() => this._onPressHeaderRight(item)}>
                              <View
                                style={[
                                  styles.con_custom_header_right,
                                  styles.ph_5,
                                ]}>
                                <CImage
                                  style={styles.con_avatar}
                                  src={avatar}
                                  resizeMode={'contain'}
                                />

                                <Text
                                  style={[
                                    styles.txt_name,
                                    {
                                      color: 'black',
                                      width: Helpers.wS('35%'),
                                    },
                                  ]}>
                                  {CONFIG.USER_TYPE === KEY.PARENT
                                    ? newFullName
                                    : item.title}
                                </Text>
                              </View>
                            </MenuOption>
                          );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </MenuOptions>
                  </Menu>
                  {iconRight !== '' && (
                    <TouchableOpacity
                      style={[
                        styles.con_header_right,
                        {
                          zIndex: 0,
                        },
                      ]}
                      onPress={onPressNext}>
                      <Icon
                        name={iconRight}
                        size={DEVICE.s * 30}
                        color="white"
                        type="light"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <View style={[styles.con_custom_header_right]}>
                  <CImage
                    style={styles.con_avatar}
                    src={dataChooseCustomHeaderRight.newAvatar}
                    resizeMode={'contain'}
                  />
                </View>
              )}
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

ViewHeaderBar.defaultProps = {
  hasBack: false,
  shadow: true,
  hasCustomHeaderRight: false,
  loadCustomHeaderRight: false,
  textRight: false,
  titleCenter: false,
  titleUpperCase: false,
  title: '',
  textRightValue: '',
  isAtRoute: '',
  iconRight: '',
  dataLogin: {},
  dataChooseCustomHeaderRight: null,
  dataCustomHeaderRight: [],
  onBack: () => {},
  onMenu: () => {},
  onPressShare: () => {},
  onPressNext: () => {},
  onPressPost: () => {},
  onCustomHeaderRight: () => {},
};

export default ViewHeaderBar;
