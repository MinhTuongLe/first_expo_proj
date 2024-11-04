/* eslint-disable prettier/prettier */
/**
 * @Description: Custom Swiper
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** LIBRARY */
import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-fontawesome-pro";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useNavigation } from "@react-navigation/native";
/** COMPONENTS */
import CImage from "../CImage";
import CText from "../CText";
/** STYLES */
import styles from "./style";
/** COMMON */
import { DEVICE, CONFIG, KEY, ASSETS, COLOR, LANG } from "../../config";
import NavigationService from "../../navigation/NavigationService";
import Helpers from "../../helpers";
import * as classActions from "../../redux/actions/activeClass";
import * as studentActions from "../../redux/actions/activeStudent";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const RenderLoader = (props) => (
  <ContentLoader
    height={Helpers.wS("18%")}
    width={Helpers.wS("95%")}
    speed={1}
    primaryColor="#bebdbf"
    secondaryColor="#fff"
    viewBox="0 0 380 70"
    {...props}
  >
    <Rect x="0" y="0" rx="100" ry="100" width="60" height="60" />
    <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
);

const CSwiper = (props) => {
  const {
    loading,
    data,
    dataChoose,
    onPressItem,
    onRefresh,
    classActions,
    studentActions,
  } = props;
  const listRef = useRef(null);
  const [activeIdx, setActiveIdx] = React.useState(0);

  /** FUNCTIONS */
  const _renderEmptyList = () => (
    <View style={styles.con}>
      <Text>No Item</Text>
    </View>
  );

  const _onPressItem = async (data, index) => {
    if (listRef.current) {
      listRef.current.scrollToIndex({ index: index, animated: true });
    }
    onPressItem(data);
    if (CONFIG.USER_TYPE === KEY.PARENT) {
      studentActions.changeStudent(data);
      await Helpers.setAsyStrClassChoosed(JSON.stringify(data.class));
    } else if (CONFIG.USER_TYPE === KEY.TEACHER) {
      classActions.changeClass(data);
      await Helpers.setAsyStrClassChoosed(JSON.stringify(data));
    }
  };

  /** LIFE CYCLE */
  useEffect(() => {
    if (listRef.current) {
      const findIndex = data.findIndex((f) => f.id === dataChoose.id);
      if (findIndex !== -1) {
        listRef.current.scrollToIndex({ index: findIndex, animated: true });
      }
    }
  }, [data, dataChoose]);

  /** RENDER */
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
        ref={listRef}
        data={data}
        renderItem={({ item, index }) => (
          <SwiperItem
            index={index}
            data={item}
            dataChoose={dataChoose}
            onPressItem={_onPressItem}
            navigation={props.navigation}
            onRefresh={onRefresh}
          />
        )}
        extraData={data}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        ListEmptyComponent={_renderEmptyList}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

/**
 * SIDE SWIPE ITEM
 */
const SwiperItem = (props) => {
  const { index, dataChoose, onPressItem, data, onRefresh } = props;
  const _data = data;

  /** FUNCTIONS */
  const _onPressItem = () => {
    if (onPressItem) {
      onPressItem(data, index);
    }
  };

  const _onPressDetailItem = () => {
    NavigationService.navigate("KidInfo", {
      avatar: _data.avatar,
      gender: _data.gender,
      dateOfBirth: _data.dateOfBirth,
      firstName: _data.firstName,
      lastName: _data.lastName,
      currentAddress: _data.currentAddress,
      dataStudent: _data,
      onRefresh: onRefresh,
    });
  };

  /** RENDER */
  let newFullName = "";
  let avatarClass = ASSETS.imgFailed;

  if (CONFIG.USER_TYPE === KEY.PARENT) {
    let gender = CONFIG.students.find((f) => f.id === _data.gender);
    if (gender) {
      gender = gender.path;
    } else {
      gender = CONFIG.students[0].path;
    }
    _data.newAvatar =
      _data.avatar !== "" && _data.avatar != null
        ? { uri: CONFIG.host + _data.avatar }
        : gender;
    newFullName = Helpers.capitalizeName(
      _data.firstName,
      _data.lastName,
      CONFIG.settingLocal.softName
    );
  } else {
    if (_data?.media) {
      avatarClass = CONFIG.host + _data?.media?.thumbnail?.path;
    }
  }

  return (
    <TouchableOpacity
      style={[styles.i_con_main, index === 0 && { paddingLeft: 10 }]}
      onPress={_onPressItem}
    >
      <CImage
        style={styles.con_img}
        src={
          CONFIG.USER_TYPE === KEY.PARENT
            ? _data.newAvatar
            : {
                uri: avatarClass,
              }
        }
        resizeMode={"contain"}
      />

      {dataChoose.id !== _data.id && (
        <View style={[styles.con_blur, index === 0 && { left: 10 }]} />
      )}

      {dataChoose.id === _data.id && (
        <Icon
          containerStyle={styles.con_icon_check}
          name={"check-circle"}
          size={20}
          color={COLOR.primaryApp}
          type={"solid"}
        />
      )}

      {CONFIG.USER_TYPE === KEY.PARENT && (
        <View style={[styles.con_info, { justifyContent: "space-around" }]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 5,
            }}
          >
            <Text
              style={[
                styles.con_info_title,
                dataChoose.id !== _data.id ? { color: COLOR.borderColor } : {},
              ]}
            >
              {newFullName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 5,
            }}
          >
            {_data.class && (
              <Text
                style={[
                  styles.con_info_des,
                  { marginTop: 0 },
                  dataChoose.id !== _data.id && {
                    color: COLOR.placeholderTextColor,
                  },
                ]}
              >
                {_data.class.title}
              </Text>
            )}
          </View>
          <Icon
            containerStyle={styles.con_icon_detail}
            name={"ellipsis-h"}
            color={
              dataChoose.id !== _data.id
                ? COLOR.placeholderTextColor
                : "#ffffff"
            }
            size={25}
            type={"regular"}
            onPress={_onPressDetailItem}
          />
        </View>
      )}

      {CONFIG.USER_TYPE === KEY.TEACHER && (
        <View style={[styles.con_info, { justifyContent: "center" }]}>
          <Text
            style={[
              styles.con_info_title,
              dataChoose.id !== _data.id && {
                color: COLOR.placeholderTextColor,
              },
            ]}
          >
            {_data.title}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={[
                styles.con_info_des,
                { fontFamily: DEVICE.fontMedium },
                dataChoose.id !== _data.id && {
                  color: COLOR.placeholderTextColor,
                },
              ]}
            >
              {_data.totalStudent === 0 ? "0 " : _data.totalStudent + " "}
            </Text>
            <CText
              style={[
                styles.con_info_des,
                dataChoose.id !== _data.id && {
                  color: COLOR.placeholderTextColor,
                },
              ]}
              i18nKey={"totalStudent"}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

// export default CSwiper;

const mapStateToProps = (state) => {
  return {
    activeClass: state.activeClass,
    activeStudent: state.activeStudent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    classActions: bindActionCreators(classActions, dispatch),
    studentActions: bindActionCreators(studentActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CSwiper);
