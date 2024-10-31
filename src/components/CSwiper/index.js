/* eslint-disable prettier/prettier */
/**
 * @Description: Custom Swiper
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** LIBRARY */
import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {useNavigation} from '@react-navigation/native';
/** COMPONENTS */
import CImage from '../../components/CImage';
import CText from '../../components/CText';
/** STYLES */
import styles from './style';
/** COMMON */
import {DEVICE, CONFIG, KEY, ASSETS, COLOR, LANG} from '../../config';
import NavigationService from '../../navigation/NavigationService';
import Helpers from '../../helpers';
import * as classActions from '../../redux/actions/activeClass';
import * as studentActions from '../../redux/actions/activeStudent';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const RenderLoader = props => (
  <ContentLoader
    height={Helpers.wS('18%')}
    width={Helpers.wS('95%')}
    speed={1}
    primaryColor="#bebdbf"
    secondaryColor="#fff"
    viewBox="0 0 380 70"
    {...props}>
    <Rect x="0" y="0" rx="100" ry="100" width="60" height="60" />
    <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
);

class CSwiper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _activeIdx: 0,
    };
  }

  /** FUNCTIONS */
  _renderEmptyList = () => (
    <View style={styles.con}>
      <Text>No Item</Text>
    </View>
  );
  _onPressItem = async (data, index) => {
    // console.log('index', index);
    this.listRef.scrollToIndex({index: index, animated: true});
    this.props.onPressItem(data);
    if (CONFIG.USER_TYPE === KEY.PARENT) {
      this.props.studentActions.changeStudent(data);
      await Helpers.setAsyStrClassChoosed(JSON.stringify(data.class));
    } else if (CONFIG.USER_TYPE === KEY.TEACHER) {
      this.props.classActions.changeClass(data);
      await Helpers.setAsyStrClassChoosed(JSON.stringify(data));
    }
  };

  /** LIFE CYCLE */
  componentDidMount() {
    let {data, dataChoose} = this.props;
    if (this.listRef) {
      let findIndex = data.findIndex(f => f.id === dataChoose.id);
      if (findIndex !== -1) {
        this.listRef.scrollToIndex({index: findIndex, animated: true});
      }
    }
  }
  componentDidUpdate(prevProps, PrevState) {
    if (
      prevProps.dataChoose &&
      prevProps.dataChoose.id !== this.props.dataChoose.id
    ) {
      if (this.listRef) {
        let findIndex = this.props.data.findIndex(
          f => f.id === this.props.dataChoose.id,
        );
        if (findIndex !== -1) {
          this.listRef.scrollToIndex({index: findIndex, animated: true});
        }
      }
    }
  }
  /** RENDER */
  render() {
    let {loading, data, dataChoose, onPressItem, onRefresh} = this.props;
    if (loading) {
      return (
        <View style={styles.con_no_item}>
          <RenderLoader />
        </View>
      );
    }

    return (
      <View style={styles.con_no_item}>
        <FlatList
          ref={ref => (this.listRef = ref)}
          data={data}
          renderItem={({item, index}) => (
            <SwiperItem
              index={index}
              data={item}
              dataChoose={dataChoose}
              onPressItem={this._onPressItem}
              navigation={this.props.navigation}
              onRefresh={onRefresh}
            />
          )}
          // getItemLayout={(item, index) => (
          //   { length: DEVICE.width, offset: (DEVICE.wS("40%")) * index, index }
          // )}
          extraData={data}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          ListEmptyComponent={this._renderEmptyList}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

/**
 * SIDE SWIPE ITEM
 */
class SwiperItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this._data = props.data;
  }

  /** FUNCTIONS */
  _onPressItem = index => {
    let {onPressItem, data} = this.props;
    if (onPressItem) {
      onPressItem(data, index);
    }
  };

  _onPressDetailItem = () => {
    NavigationService.navigate('KidInfo', {
      avatar: this._data.avatar,
      gender: this._data.gender,
      dateOfBirth: this._data.dateOfBirth,
      firstName: this._data.firstName,
      lastName: this._data.lastName,
      currentAddress: this._data.currentAddress,
      dataStudent: this._data,
      onRefresh: this.props.onRefresh,
    });
  };

  /** RENDER */
  render() {
    let {index, dataChoose} = this.props;
    let newFullName = '';
    let avatarClass = ASSETS.imgFailed;

    if (CONFIG.USER_TYPE === KEY.PARENT) {
      let gender = CONFIG.students.find(f => f.id === this._data.gender);
      if (gender) {
        gender = gender.path;
      } else {
        gender = CONFIG.students[0].path;
      }
      this._data.newAvatar =
        this._data.avatar != '' && this._data.avatar != null
          ? {uri: CONFIG.host + this._data.avatar}
          : gender;
      newFullName = Helpers.capitalizeName(
        this._data.firstName,
        this._data.lastName,
        CONFIG.settingLocal.softName,
      );
    } else {
      if (this._data?.media) {
        avatarClass = CONFIG.host + this._data?.media?.thumbnail?.path;
      }
    }

    return (
      <TouchableOpacity
        style={[styles.i_con_main, index === 0 && {paddingLeft: 10}]}
        onPress={() => this._onPressItem(index)}>
        <CImage
          style={styles.con_img}
          src={
            CONFIG.USER_TYPE === KEY.PARENT
              ? this._data.newAvatar
              : {
                  uri: avatarClass,
                }
          }
          resizeMode={'contain'}
        />

        {dataChoose.id !== this._data.id && (
          <View style={[styles.con_blur, index === 0 && {left: 10}]} />
        )}

        {dataChoose.id === this._data.id && (
          <Icon
            containerStyle={styles.con_icon_check}
            name={'check-circle'}
            size={20}
            color={COLOR.primaryApp}
            type={'solid'}
          />
        )}

        {CONFIG.USER_TYPE === KEY.PARENT && (
          <View style={[styles.con_info, {justifyContent: 'space-around'}]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Text
                style={[
                  styles.con_info_title,
                  dataChoose.id !== this._data.id
                    ? {color: COLOR.borderColor}
                    : {},
                ]}>
                {newFullName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              {this._data.class && (
                <Text
                  style={[
                    styles.con_info_des,
                    {marginTop: 0},
                    dataChoose.id !== this._data.id && {
                      color: COLOR.placeholderTextColor,
                    },
                  ]}>
                  {this._data.class.title}
                </Text>
              )}
            </View>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
              <Icon containerStyle={styles.con_icon_info}
                name={'map-marker-alt'}
                color={dataChoose.id !== this._data.id ? COLOR.placeholderTextColor : '#ffffff'}
                size={15}
                type={'regular'}
                onPress={this._onPressDetailItem} />
              <CText style={[styles.con_info_des, { marginTop: 0 }, dataChoose.id !== this._data.id && { color: COLOR.placeholderTextColor }]} i18nKey={'txtInClass'} />
            </View> */}
            <Icon
              containerStyle={styles.con_icon_detail}
              name={'ellipsis-h'}
              color={
                dataChoose.id !== this._data.id
                  ? COLOR.placeholderTextColor
                  : '#ffffff'
              }
              size={25}
              type={'regular'}
              onPress={this._onPressDetailItem}
            />
          </View>
        )}

        {CONFIG.USER_TYPE === KEY.TEACHER && (
          <View style={[styles.con_info, {justifyContent: 'center'}]}>
            <Text
              style={[
                styles.con_info_title,
                dataChoose.id !== this._data.id && {
                  color: COLOR.placeholderTextColor,
                },
              ]}>
              {this._data.title}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  styles.con_info_des,
                  {fontFamily: DEVICE.fontMedium},
                  dataChoose.id !== this._data.id && {
                    color: COLOR.placeholderTextColor,
                  },
                ]}>
                {this._data.totalStudent === 0
                  ? '0 '
                  : this._data.totalStudent + ' '}
              </Text>
              <CText
                style={[
                  styles.con_info_des,
                  dataChoose.id !== this._data.id && {
                    color: COLOR.placeholderTextColor,
                  },
                ]}
                i18nKey={'totalStudent'}
              />
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

// export default CSwiper;

const mapStateToProps = state => {
  return {
    activeClass: state.activeClass,
    activeStudent: state.activeStudent,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    classActions: bindActionCreators(classActions, dispatch),
    studentActions: bindActionCreators(studentActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CSwiper);
