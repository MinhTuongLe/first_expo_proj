/* eslint-disable prettier/prettier */
/**
 ** FileName:
 ** FileAuthor:
 ** FileCreateAt:
 ** FileDescription:
 **/
/* LIBRARY */
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import moment from 'moment';
/* COMPONENTS */
import HeaderBar from '../../partials/header_bar';
import HeaderInfoChildren from '../../partials/header_info_children';
import CImage from '../../../components/CImage';
import CButton from '../../../components/CButton';
import CText from '../../../components/CText';
/** COMMON */
import Helpers from '../../../helpers';
import {
  LANG,
  CONFIG,
  DEVICE,
  COLOR,
  ASSETS,
  activeSteps,
} from '../../../config';
/** STYLES */
import styles from './style';

const ViewEmptyList = () => {
  return (
    <View style={DEVICE.gStyle.full_center}>
      <Icon
        name={'search'}
        size={Helpers.fS(50)}
        color={COLOR.placeholderTextColor}
        type={'light'}
      />
      <CText style={styles.txt_no_data} i18nKey={'noDataParents'} />
    </View>
  );
};

const ViewFooterList = (onUpdate, state, onBack) => {
  return (
    <View style={styles.buttonArea}>
      {state._error && state._errorText !== '' && (
        <CText style={styles.txtError} i18nKey={state._errorText} />
      )}
      {!state._error && state._errorText !== '' && (
        <CText style={styles.txtSuccess} i18nKey={state._errorText} />
      )}
      {state._isPickUp ? (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <CButton
            style={styles.submit_group_back}
            onPress={() => onBack()}
            disabled={state._loadingBtn}>
            {LANG[CONFIG.lang].txtGoBackForget}
          </CButton>
          <CButton
            style={styles.submit_group_update}
            onPress={() => onUpdate()}
            loading={state._loadingBtn}>
            {LANG[CONFIG.lang].txtUpdate}
          </CButton>
        </View>
      ) : (
        <CButton
          style={styles.submit_group_submit}
          onPress={() => onUpdate()}
          loading={state._loadingBtn}>
          {LANG[CONFIG.lang].txtUpdate}
        </CButton>
      )}
    </View>
  );
};

export const ViewPickUpDetail = ({
  state = null,
  noteRef = '',
  onFunction = {
    rowHasChanged: () => {},
    loadStudents: () => {},
    onUpdate: () => {},
    onBack: () => {},
    onGetNote: () => {},
  },
  onToggleValue = () => {},
}) => {
  if (state._loading) {
    return (
      <View style={DEVICE.gStyle.full_center}>
        <ActivityIndicator color={COLOR.primaryApp} size={'small'} />
      </View>
    );
  }

  return (
    <View style={styles.con}>
      {/* HEADER */}
      <HeaderBar
        title={'txtHomeAttendance'}
        hasBack
        onBack={onFunction.onBack}
      />

      <KeyboardAvoidingView
        style={styles.con}
        behavior={'padding'}
        enabled
        keyboardVerticalOffset={Platform.select({
          ios: Helpers.isIphoneX() ? 15 : 0,
          android: -80,
        })}>
        <HeaderInfoChildren
          selectedStudent={state._selectedStudent}
          dataClass={state._dataClass}
        />

        <FlatList
          contentContainerStyle={
            (DEVICE.gStyle.grow, {backgroundColor: COLOR.backgroundMain})
          }
          data={state._dataRender}
          renderItem={({item}) => {
            return (
              <ViewParentItem
                item={item}
                dataLength={state._dataRender.length}
                parentId={state._parentId}
                onToggleValue={onToggleValue}
                date={state._currentDay}
                onGetNote={onFunction.onGetNote}
                noteRef={noteRef}
                checkExistAttendance={state._checkExistAttendance}
              />
            );
          }}
          ListEmptyComponent={ViewEmptyList}
          ListHeaderComponent={() => (
            <View style={styles.con_header_list_parent}>
              <CText
                style={styles.txtListStudent}
                i18nKey={
                  state._pickupType === activeSteps.CHECK_IN
                    ? 'attendance_person'
                    : 'pickup_person'
                }
                upperCase
              />
            </View>
          )}
        />
        {ViewFooterList(onFunction.onUpdate, state, onFunction.onBack)}
      </KeyboardAvoidingView>
    </View>
  );
};

export class ViewParentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _avatar: props.item.avatar,
      _noteRef: props.noteRef,
    };
  }

  /** FUNCTIONS */
  _onValueChange = parentId => {
    this.props.onToggleValue(parentId);
    this.setState({_noteRef: ''});
  };

  _onChangeText = text => {
    this.setState({_noteRef: text});
    this.props.onGetNote(text);
  };

  /** RENDER */
  render() {
    let {item, parentId, date, checkExistAttendance} = this.props;
    let {_avatar} = this.state;
    let family = '';
    let gender = CONFIG.users.find(f => f.id === item.gender);
    if (gender) {
      family = gender.family;
      gender = gender.path;
    } else {
      family = CONFIG.users[0].family;
      gender = CONFIG.users[0].path;
    }
    let newFullName = Helpers.capitalizeName(
      item.firstName,
      item.lastName,
      CONFIG.settingLocal.softName,
    );

    return (
      <>
        <TouchableOpacity
          style={styles.rowItemStudent}
          onPress={() => this._onValueChange(item.id)}
          disabled={
            moment().format('YYYY-MM-DD') !== date || checkExistAttendance
          }
          activeOpacity={checkExistAttendance ? 1 : 0}>
          <CImage
            style={styles.con_avatar}
            resizeMode={'contain'}
            src={
              item.id === ''
                ? ASSETS.schoolBus
                : _avatar != '' && _avatar != null
                ? {uri: CONFIG.host + _avatar}
                : gender
            }
          />

          <View style={[styles.nameIconArea, {marginLeft: 15}]}>
            <View style={styles.nameArea}>
              {item.id !== '' ? (
                <CText style={styles.txtNameStudent}>{newFullName}</CText>
              ) : (
                <CText style={styles.txtNameStudent} i18nKey={item.firstName} />
              )}
              {item.id !== '' && (
                <Text style={styles.txtNamePickup}>{family}</Text>
              )}
            </View>
            {parentId === item.id ? (
              <Icon
                name={'check-circle'}
                color={COLOR.txtColor}
                size={25}
                type={'light'}
              />
            ) : (
              <Icon
                name={'circle'}
                color={COLOR.borderColor}
                size={25}
                type={'light'}
              />
            )}
          </View>
        </TouchableOpacity>
        {item.id === '' && !checkExistAttendance && (
          <TextInput
            value={this.state._noteRef}
            onChangeText={text => {
              this._onChangeText(text);
            }}
            style={styles.note_ref}
            placeholder={'Note'}
            placeholderTextColor={COLOR.placeholderTextColor}
            returnKeyType={'done'}
            blurOnSubmit={true}
            keyboardShouldPersistTaps={'handle'}
            isBorder={false}
            isRemove={false}
            multiline
            cursorColor={COLOR.txtColor}
            // editable={parentId ? false : true}
          />
        )}
      </>
    );
  }
}
