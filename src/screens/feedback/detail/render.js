/**
 * @Description:
 * @Created by ZiniTeam
 * @Date create:
 */
/** LIBRARY */
import React, {Component} from 'react';
import {FlatList, View, Text} from 'react-native';
import moment from 'moment';
/** COMPONENT */
import HeaderBar from '../../partials/header_bar';
import CImage from '../../../components/CImage';
import CText from '../../../components/CText';
/** COMMON */
import {COLOR, CONFIG, DEVICE, LANG} from '../../../config';
import Helpers from '../../../helpers';
/** STYLES */
import styles from './style';
import CLoading from '../../../components/CLoading';
import Icon from 'react-native-fontawesome-pro';

const renderItem = (item, index, data, props) => {
  let time = Helpers.getShortTimeWithNow(item.time);

  let uriAvatar =
    item.user.avatar != '' && item.user.avatar != null
      ? CONFIG.host + item.user.avatar
      : null;

  let gender = CONFIG.users.find(f => f.id === item.user.gender);
  if (gender) {
    gender = gender.path;
  } else {
    gender = CONFIG.students[0].path;
  }

  let newFullName = '';
  if (item.user.id === props.login.id) {
    newFullName = LANG[CONFIG.lang].me;
  } else {
    newFullName = Helpers.capitalizeName(
      item.user.firstName,
      item.user.lastName,
      CONFIG.settingLocal.softName,
    );
  }

  let objName = '';
  if (data.user.length > 2) {
    objName = ` ${data.user[0].lastName}, ${data.user[1].lastName} & ${
      data.user.length - 2
    } ${LANG[CONFIG.lang].more}`;
  } else {
    for (let std of data.user) {
      objName += ` ${std.lastName},`;
    }
    objName = objName.substr(0, objName.length - 1);
  }

  return (
    <View
      style={[
        styles.con_item,
        index === data.description.length - 1 && {borderBottomWidth: 0},
      ]}>
      {index === 0 ? (
        <View style={styles.con_item_header_latest}>
          <View style={styles.con_img}>
            <CImage
              style={styles.con_item_img}
              resizeMode={'cover'}
              src={uriAvatar ? {uri: uriAvatar} : gender}
              type={'avatar'}
            />
          </View>
          <View style={styles.con_info_latest}>
            <View style={styles.con_title_latest}>
              <CText style={styles.txt_name}>{newFullName}</CText>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CText style={styles.txtDate}>{time.time}</CText>
                {time.type === time.des ? (
                  <CText
                    style={[styles.txtDate, {marginLeft: 5}]}
                    i18nKey={time.type}
                  />
                ) : (
                  <Text style={styles.txtDate}>{time.des} </Text>
                )}
              </View>
            </View>
            <View style={styles.con_obj_latest}>
              <CText style={styles.txt_obj}>{LANG[CONFIG.lang].to}</CText>
              <CText style={[styles.txt_obj, {color: COLOR.primaryApp}]}>
                {objName}
              </CText>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.con_item_header}>
          <CText style={styles.txt_obj} i18nKey={'from'} />
          <CText style={[styles.txt_name, {paddingLeft: 10}]}>
            {newFullName}
          </CText>
          <CText style={styles.txt_time}>
            {moment(item.time).format(CONFIG.formatDateShow + ' HH:mm')}
          </CText>
        </View>
      )}
      <View style={styles.con_msg}>
        <Text style={styles.txt_des}>{item.message}</Text>
      </View>
    </View>
  );
};

const renderHeader = state => {
  if (state._data) {
    return <Text style={styles.txt_title}>{state._data.title}</Text>;
  }
};

const RenderEmpty = () => {
  return (
    <View style={DEVICE.gStyle.full_center}>
      <Icon
        name={'search'}
        size={Helpers.fS(50)}
        color={COLOR.placeholderTextColor}
        type={'solid'}
      />
      <CText style={styles.txt_no_data} i18nKey={'txtNoData'} />
    </View>
  );
};

export const ViewDetailFeedBack = ({
  state = null,
  props = null,
  onFunction = {
    onPressReply: () => {},
    onPressBack: () => {},
  },
}) => {
  return (
    <View style={styles.con}>
      <HeaderBar
        hasBack={true}
        iconRight={'arrow-right'}
        onPressNext={onFunction.onPressReply}
        onBack={onFunction.onPressBack}
      />
      {state._loading ? (
        <CLoading />
      ) : state._data ? (
        <FlatList
          contentContainerStyle={styles.con_list}
          data={state._data.description}
          renderItem={({item, index}) =>
            renderItem(item, index, state._data, props)
          }
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => renderHeader(state)}
          ListEmptyComponent={RenderEmpty()}
        />
      ) : null}
    </View>
  );
};
