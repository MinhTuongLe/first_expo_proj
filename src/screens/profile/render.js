/**
 * @Description: Post screen
 * @Created by ZiniTeam
 * @Date create: 21/01/2019
 */
/** LIBRARY */
import React from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
/** COMMON **/
import {COLOR, CONFIG, DEVICE} from '../../config';
import Helpers from '../../helpers';
/** COMPONENTS **/
import HeaderBar from '../partials/header_bar';
import CConfirm from '../../components/CConfirm';
import CInput from '../../components/CInput/CInput';
import CButton from '../../components/CButton';
import CText from '../../components/CText';
/** STYLES **/
import styles from './style';

class ViewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: {uri: CONFIG.host + props.avatar},
    };
  }

  /** FUNCTIONS */
  _onImageError = () => {
    let gender = CONFIG.users[0].path;
    if (this.props.dataUser.hasOwnProperty('gender')) {
      gender = CONFIG.users.find(f => f.id === this.props.dataUser.gender);
      if (gender) {
        gender = gender.path;
      }
    }
    this.setState({avatar: gender});
  };

  /** LIFE CYCLE */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.avatar !== this.props.avatar) {
      this.setState({
        avatar: {uri: CONFIG.host + this.props.avatar},
      });
    }
  }

  /** RENDER */
  render() {
    let {
      isActive,
      isAllowNotification,
      showUploadImage,
      showLogOut,
      navigation,
      dataUser,
      padding,
      onPressHeaderRight,
      infoProfile,
      infoPassword,
      error,
      errorText,
      success,
      successText,
      onPressBack,
      onToggleGetNoti,
      loginActions,
      changeAvatar,
      receiveImage,
      closeModal,
      onPressItemTab,
      handlerLogout,
      handlerChangeInfo,
      handlerChangePass,
      notificationActions,
    } = this.props;
    let {avatar} = this.state;
    let newFullName = Helpers.capitalizeName(
      dataUser.firstName,
      dataUser.lastName,
      CONFIG.settingLocal?.softName,
    );

    return (
      <View style={styles.container}>
        {/* Content */}
        <CConfirm
          receive={receiveImage}
          closeModal={closeModal}
          type={showLogOut ? 'logout' : 'upload'}
          navigation={navigation}
          dataUser={dataUser}
          loginActions={loginActions}
          notificationActions={notificationActions}
          show={showLogOut || showUploadImage}
        />

        {/* Header */}
        <HeaderBar
          title={'txtProfileTitle'}
          hasBack
          hasCustomHeaderRight={false}
          onBack={onPressBack}
          titleCenter={false}
          // iconRight={'cog'}
          // onPressNext={onPressHeaderRight}
        />

        <View style={styles.container_content}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container_content_avatar}>
              {/* Avatar content */}
              <View style={styles.avatarBox}>
                {/* Avatar */}
                <View style={styles.avatarBox_left}>
                  <TouchableOpacity
                    style={styles.container_avatar}
                    onPress={changeAvatar}>
                    <Image
                      style={styles.image_avatar}
                      resizeMode={'cover'}
                      source={avatar}
                      onError={this._onImageError}
                    />
                    <View style={styles.container_icon_edit}>
                      <Icon
                        name={'camera'}
                        size={12}
                        color={'#ffffff'}
                        type={'solid'}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.text_name_account}>
                    {dataUser ? newFullName : '' + ''}
                  </Text>
                </View>

                {/* Logout button */}
                <TouchableOpacity activeOpacity={0.5} onPress={handlerLogout}>
                  <View style={styles.con_btn_logout}>
                    <Icon
                      name={'sign-out'}
                      size={Helpers.fS(28)}
                      color={COLOR.primaryButton}
                      type={'solid'}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              {/* TAB BAR CONTENT */}
              <View
                style={{
                  backgroundColor: COLOR.backgroundSec,
                  marginHorizontal: 10,
                  borderRadius: 10,
                }}>
                <View style={styles.tabContent}>
                  <TouchableOpacity
                    style={[
                      styles.tabItem,
                      isActive === 'info' && {
                        backgroundColor: COLOR.primaryApp,
                      },
                    ]}
                    onPress={() => onPressItemTab('info')}>
                    <CText
                      style={[
                        styles.txtTabItem,
                        isActive === 'info' && {color: '#ffffff'},
                      ]}
                      i18nKey={'txtMyInfoTitle'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tabItem,
                      isActive === 'changePassword' && {
                        backgroundColor: COLOR.primaryApp,
                      },
                    ]}
                    onPress={() => onPressItemTab('changePassword')}>
                    <CText
                      style={[
                        styles.txtTabItem,
                        isActive === 'changePassword' && {
                          color: '#ffffff',
                        },
                      ]}
                      i18nKey={'txtChangePassTitle'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <KeyboardAvoidingView style={styles.con_content} behavior={'padding'}>
            <ScrollView
              style={styles.con_content}
              contentContainerStyle={{alignContent: 'space-between'}}
              keyboardShouldPersistTaps={'handled'}>
              <View>
                {isActive === 'info' && (
                  <View style={styles.container_content_info}>
                    {/* <View style={styles.container_content_item}>
                      <View style={styles.container_info_item_1}>
                        <Icon
                          name={'bell'}
                          size={Helpers.fS(23)}
                          color={COLOR.text_2}
                          type={'regular'}
                        />
                      </View>
                      <View
                        style={[
                          styles.container_info_item_2,
                          DEVICE.gStyle.space_between,
                        ]}>
                        <CText
                          style={styles.txt_allow_noti}
                          i18nKey={'txtAllowNotification'}
                        />
                        <Switch
                          ios_backgroundColor={COLOR.backgroundColorNote}
                          thumbColor={'#ffffff'}
                          trackColor={{
                            false: COLOR.borderColor,
                            true: COLOR.primaryApp,
                          }}
                          value={isAllowNotification}
                          onValueChange={onToggleGetNoti}
                        />
                      </View>
                    </View> */}

                    {infoProfile.map((item, index) => {
                      return (
                        <View key={index} style={styles.container_content_item}>
                          <View style={styles.container_info_item_1}>
                            <Icon
                              name={item.length > 0 ? item[0].icon : item.icon}
                              size={Helpers.fS(23)}
                              color={COLOR.text_2}
                              type={'regular'}
                            />
                          </View>

                          {item.length > 0 ? (
                            <View style={styles.con_content_input}>
                              <CInput
                                ref={item[0].ref}
                                style={[styles.input_group_text, styles.mr_5]}
                                placeholder={item[0].placeholder}
                                placeholderTextColor={
                                  COLOR.placeholderTextColor
                                }
                                afterChangeText={item[0].afterChangeText}
                                onSubmitEditing={item[0].onSubmitEditing}
                                value={item[0].value}
                                returnKeyType={item[0].returnKeyType}
                                autoCorrect={item[0].autoCorrect}
                                keyboardType={item[0].keyboardType}
                                isBorder={true}
                                isRemove={false}
                                cursorColor={COLOR.txtColor}
                                borderColor={COLOR.borderColorSec}
                              />

                              <View style={styles.ph_10} />

                              <CInput
                                ref={item[1].ref}
                                style={[styles.input_group_text, styles.ml_5]}
                                placeholder={item[1].placeholder}
                                placeholderTextColor={
                                  COLOR.placeholderTextColor
                                }
                                afterChangeText={item[1].afterChangeText}
                                onSubmitEditing={item[1].onSubmitEditing}
                                value={item[1].value}
                                returnKeyType={item[1].returnKeyType}
                                autoCorrect={item[1].autoCorrect}
                                keyboardType={item[1].keyboardType}
                                isBorder={true}
                                isRemove={false}
                                cursorColor={COLOR.txtColor}
                                borderColor={COLOR.borderColorSec}
                              />
                            </View>
                          ) : (
                            <View style={styles.con_content_input}>
                              <CInput
                                ref={item.ref}
                                style={styles.input_group_text}
                                placeholder={item.placeholder}
                                placeholderTextColor={
                                  COLOR.placeholderTextColor
                                }
                                afterChangeText={item.afterChangeText}
                                onSubmitEditing={item.onSubmitEditing}
                                value={item.value}
                                returnKeyType={item.returnKeyType}
                                autoCorrect={item.autoCorrect}
                                keyboardType={item.keyboardType}
                                isBorder={true}
                                isRemove={false}
                                cursorColor={COLOR.txtColor}
                                borderColor={COLOR.borderColorSec}
                              />
                            </View>
                          )}
                        </View>
                      );
                    })}

                    {error && (
                      <View style={styles.container_info_item_note}>
                        <Icon
                          name={'times-circle'}
                          color={COLOR.primaryTextNote}
                          size={20}
                          type={'light'}
                        />
                        <CText
                          style={[
                            styles.message_group_label,
                            {color: COLOR.txtError},
                          ]}
                          i18nKey={errorText}
                        />
                      </View>
                    )}

                    {success && (
                      <View style={styles.container_info_item_note}>
                        <Icon
                          name={'check-circle'}
                          color={COLOR.primaryApp}
                          size={20}
                          type={'light'}
                        />
                        <CText
                          style={[
                            styles.message_group_label,
                            {color: COLOR.primaryApp},
                          ]}
                          i18nKey={successText}
                        />
                      </View>
                    )}
                  </View>
                )}

                {isActive === 'changePassword' && (
                  <View style={styles.container_content_info}>
                    {infoPassword.map((item, index) => {
                      return (
                        <View key={index} style={styles.container_content_item}>
                          <CInput
                            ref={item.ref}
                            style={[
                              styles.input_group_text,
                              item.invalid ? {color: COLOR.txtError} : {},
                            ]}
                            placeholder={item.placeholder}
                            placeholderTextColor={COLOR.placeholderTextColor}
                            afterChangeText={item.afterChangeText}
                            onSubmitEditing={item.onSubmitEditing}
                            value={item.value}
                            returnKeyType={item.returnKeyType}
                            secureTextEntry={item.secureTextEntry}
                            isBorder={true}
                            isRemove={false}
                            cursorColor={COLOR.txtColor}
                            borderColor={COLOR.borderColorSec}
                          />
                        </View>
                      );
                    })}
                    <View>
                      {error && (
                        <View style={styles.container_info_item_note}>
                          <Icon
                            name={'times-circle'}
                            color={COLOR.primaryTextNote}
                            size={20}
                            type={'light'}
                          />
                          <CText
                            style={[
                              styles.message_group_label,
                              {color: COLOR.txtError},
                            ]}
                            i18nKey={errorText}
                          />
                        </View>
                      )}
                      {success && (
                        <View style={styles.container_info_item_note}>
                          <Icon
                            name={'check-circle'}
                            color={COLOR.primaryApp}
                            size={20}
                            type={'light'}
                          />
                          <CText
                            style={[
                              styles.message_group_label,
                              {color: COLOR.primaryApp},
                            ]}
                            i18nKey={successText}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>

            <View
              style={[
                styles.ph_10,
                Helpers.isIphoneX() && {paddingBottom: 20},
              ]}>
              <CButton
                style={styles.submit_group_submit}
                onPress={
                  isActive === 'info' ? handlerChangeInfo : handlerChangePass
                }>
                <CText i18nKey={'txtAppect'} />
              </CButton>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

ViewProfile.defaultProps = {
  isActive: 'info',
  isAllowNotification: false,
  error: false,
  errorText: '',
  success: false,
  successText: '',
  showUploadImage: false,
  showLogOut: false,
  navigation: {},
  dataUser: null,
  dataFamily: [],
  dataClass: [],
  infoProfile: [],
  infoPassword: [],
  onPressBack: () => {},
  onPressItemTab: () => {},
  onToggleGetNoti: () => {},
  handlerLogout: () => {},
  changeAvatar: () => {},
  receiveImage: () => {},
  handlerChangeInfo: () => {},
  handlerChangePass: () => {},
  closeModal: () => {},
  onPressWithoutFeedback: () => {},
};

export default ViewProfile;
