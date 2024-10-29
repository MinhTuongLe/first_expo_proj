/**
 * @Description: Kid Info Screen UI
 * @Created by ZiniTeam
 * @Date create: 18/11/2019
 */
/** LIBRARY */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import moment from 'moment';
/** COMPONENT */
import HeaderBar from '../partials/header_bar';
import CButton from '../../components/CButton';
import CConfirm from '../../components/CConfirm';
import CInput from '../../components/CInput/CInput';
import CText from '../../components/CText';
/** COMMON */
import {CONFIG, COLOR, DEVICE} from '../../config';
import Helpers from '../../helpers';
/** STYLES */
import styles from './style';

const triggerStyles = {
  triggerOuterWrapper: {},
  triggerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    marginRight: 10,
  },
  triggerTouchable: {
    underlayColor: '#ffffff',
    activeOpacity: true,
  },
};

const optionsStyles = {
  optionsContainer: {
    backgroundColor: COLOR.backgroundSec,
    padding: 2,
    borderRadius: 5,
  },
};

export const ViewKidInfomation = ({
  state = {},
  props = {},
  data = {
    field: [],
  },
  onPress = {
    changeAvatar: () => {},
    chooseDate: () => {},
    toggleDateChange: () => {},
    submit: () => {},
  },
  onError = {
    avatar: () => {},
  },
  onFunction = {
    receiveImage: () => {},
    cloaseModal: () => {},
    back: () => {},
  },
}) => {
  let newFullName = state._dataStudent
    ? Helpers.capitalizeName(
        state._dataStudent.firstName,
        state._dataStudent.lastName,
        CONFIG.settingLocal.softName,
      )
    : 'No Name';

  return (
    <View style={styles.con}>
      {/* Header */}
      <HeaderBar
        title={'kidInformation'}
        hasBack
        onBack={onFunction.back}
        titleCenter={false}
      />

      {/* Content */}
      <CConfirm
        receive={onFunction.receiveImage}
        closeModal={onFunction.cloaseModal}
        type={'upload'}
        navigation={props.navigation}
        dataUser={state._dataStudent}
        loginActions={props.loginActions}
        show={state._showUploadImage}
      />

      {/* AVATAR CONTENT */}
      <View style={styles.con_avatar_box}>
        <TouchableOpacity
          style={styles.con_avatar}
          onPress={onPress.changeAvatar}>
          <Image
            style={[styles.img_avatar, {zIndex: 9}]}
            resizeMode={'cover'}
            source={state._avatar}
            onError={onError.avatar}
          />
          <View style={styles.con_icon_edit}>
            <Icon name={'camera'} size={12} color={'#ffffff'} type={'solid'} />
          </View>
        </TouchableOpacity>
        <Text style={styles.txt_name_account}>{newFullName}</Text>
      </View>

      {/* CONTENT */}
      <ScrollView
        contentContainerStyle={[DEVICE.gStyle.grow, {paddingHorizontal: 10}]}
        keyboardShouldPersistTaps={'handled'}>
        {data.field.map((item, index) => {
          if (item.fieldType === 'TextInput') {
            if (item.isEditName) {
              return (
                <View key={index} style={styles.con_content_item}>
                  <View style={styles.con_info_item_1}>
                    <Icon
                      name={item.icon}
                      size={20}
                      color="black"
                      type={'regular'}
                    />
                  </View>
                  <CInput
                    ref={ref => (item.ref1 = ref)}
                    style={styles.input_group_text}
                    value={item.value1}
                    placeholder={item.placeholder1}
                    placeholderTextColor={COLOR.placeholderTextColor}
                    onSubmitEditing={() => item.onSubmitEditing1(item.ref2)}
                    afterChangeText={item.afterChangeText1}
                    returnKeyType={item.returnKeyType1}
                    keyboardType={item.keyboardType}
                    isBorder={true}
                    isRemove={false}
                    cursorColor={COLOR.txtColor}
                    borderColor={COLOR.borderColorSec}
                  />

                  <View style={{paddingHorizontal: 10}} />

                  <CInput
                    ref={ref => (item.ref2 = ref)}
                    style={styles.input_group_text}
                    value={item.value2}
                    placeholder={item.placeholder2}
                    placeholderTextColor={COLOR.placeholderTextColor}
                    onSubmitEditing={() =>
                      item.onSubmitEditing2(item.addressRef)
                    }
                    afterChangeText={item.afterChangeText2}
                    returnKeyType={item.returnKeyType2}
                    keyboardType={item.keyboardType}
                    isBorder={true}
                    isRemove={false}
                    cursorColor={COLOR.txtColor}
                    borderColor={COLOR.borderColorSec}
                  />
                </View>
              );
            } else {
              return (
                <View key={index} style={styles.con_content_item}>
                  <View style={styles.con_info_item_1}>
                    <Icon
                      name={item.icon}
                      size={20}
                      color="black"
                      type={'regular'}
                    />
                  </View>
                  <CInput
                    ref={ref => (item.addressRef = ref)}
                    style={styles.input_group_text}
                    value={item.value}
                    placeholder={item.placeholder}
                    placeholderTextColor={COLOR.placeholderTextColor}
                    onSubmitEditing={item.onSubmitEditing}
                    afterChangeText={item.afterChangeText}
                    returnKeyType={item.returnKeyType}
                    keyboardType={item.keyboardType}
                    isBorder={true}
                    isRemove={false}
                    cursorColor={COLOR.txtColor}
                    borderColor={COLOR.borderColorSec}
                  />
                </View>
              );
            }
          } else if (item.fieldType === 'DropDown') {
            let tmpGender = state._gender == 0 ? 'female' : 'male';
            return (
              <View key={index} style={styles.con_content_item}>
                <View style={styles.con_info_item_1}>
                  <Icon
                    name={item.icon}
                    size={20}
                    color="black"
                    type={'regular'}
                  />
                </View>

                <View style={{width: '100%', alignItems: 'flex-start'}}>
                  <Menu>
                    <MenuTrigger customStyles={triggerStyles}>
                      <View
                        style={{
                          width: Helpers.wS('85%'),
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <CText
                          style={{
                            fontFamily: DEVICE.fontRegular,
                            fontSize: Helpers.fS(16),
                            color: 'black',
                          }}
                          i18nKey={tmpGender}
                        />
                        <Icon
                          name={'sort-down'}
                          size={18}
                          color={'black'}
                          type={'regular'}
                        />
                      </View>
                    </MenuTrigger>

                    <MenuOptions customStyles={optionsStyles}>
                      <FlatList
                        data={item.data}
                        renderItem={props => {
                          return (
                            <MenuOption
                              onSelect={() => item.onItem(props.item)}>
                              <CText
                                style={{
                                  fontFamily: DEVICE.fontRegular,
                                  fontSize: Helpers.fS(16),
                                  color: 'black',
                                  paddingLeft: 10,
                                }}
                                i18nKey={props.item.toLowerCase()}
                              />
                            </MenuOption>
                          );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </MenuOptions>
                  </Menu>
                  <View
                    style={{
                      height: 2,
                      width: '90.5%',
                      marginTop: Platform.OS === 'ios' ? 5 : 10,
                      backgroundColor: COLOR.borderColorSec,
                    }}
                  />
                </View>
              </View>
            );
          } else if (item.fieldType === 'Date') {
            return (
              <View key={index} style={[styles.con_content_item]}>
                <View style={styles.con_info_item_1}>
                  <Icon
                    name={item.icon}
                    size={20}
                    color="black"
                    type={'regular'}
                  />
                </View>

                <TouchableOpacity
                  style={{width: '100%', alignItems: 'flex-start'}}
                  activeOpacity={1}
                  onPress={onPress.toggleDateChange}>
                  <Text
                    style={{
                      fontFamily: DEVICE.fontRegular,
                      fontSize: Helpers.fS(16),
                      color: 'black',
                    }}>
                    {moment(state._dateOfBirth).format('DD/MM/YYYY')}
                  </Text>
                  <View
                    style={{
                      height: 2,
                      width: '90.5%',
                      marginTop: Platform.OS === 'ios' ? 5 : 10,
                      backgroundColor: COLOR.borderColorSec,
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          }
          return null;
        })}

        {(state._error || state._success) && (
          <View
            style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.con_info_item_1}>
              <Icon
                name={state._error ? 'times-circle' : 'check-circle'}
                size={20}
                type={'regular'}
                color={state._error ? 'red' : COLOR.primaryApp}
              />
            </View>
            <CText
              style={{
                marginLeft: 10,
                fontFamily: DEVICE.fontRegular,
                fontSize: Helpers.fS(16),
                color: state._error ? 'red' : COLOR.primaryApp,
              }}
              i18nKey={state._error ? state._errorText : state._successText}
            />
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <CButton
        style={styles.submit_group_submit}
        onPress={onPress.submit}
        loading={state._loadingSubmit}>
        {props.language === 'vi' ? 'Lưu' : 'Save'}
      </CButton>

      {Platform.OS === 'ios' && (
        <Modal
          visible={state._showChooseDate}
          animationType={'fade'}
          onRequestClose={() => {}}
          transparent>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,.5)',
            }}
            activeOpacity={1}
            onPress={onPress.toggleDateChange}>
            <View
              style={{
                height: Helpers.hS('45%'),
                width: Helpers.wS('80%'),
                backgroundColor: '#ffffff',
                borderRadius: 8,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  height: '15%',
                  width: '100%',
                  backgroundColor: COLOR.primaryApp,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}>
                <CText
                  style={{
                    fontFamily: DEVICE.fontMedium,
                    fontSize: Helpers.fS(16),
                    color: '#ffffff',
                  }}
                  i18nKey={'cancel'}
                  onPress={onPress.toggleDateChange}
                />
                <CText
                  style={{
                    fontFamily: DEVICE.fontBold,
                    fontSize: Helpers.fS(16),
                    color: '#ffffff',
                  }}
                  i18nKey={'ok'}
                  onPress={onPress.toggleDateChange}
                />
              </View>

              <DateTimePicker
                value={new Date(state._dateOfBirth)}
                mode={'date'}
                onChange={onPress.chooseDate}
                maximumDate={new Date()}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      {Platform.OS === 'android' && state._showChooseDate && (
        <DateTimePicker
          value={new Date(state._dateOfBirth)}
          mode={'date'}
          display={'calendar'}
          onChange={onPress.chooseDate}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};
