/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/**
 * @Description: Header Bar Layout
 * @Created by ZiniTeam
 * @Date create: 18/01/2019
 */
/** LIBRARY */
import React from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
import ContentLoader, { Rect } from "react-content-loader/native";
/** COMMON */
import { DEVICE, CONFIG, KEY, COLOR } from "../../config";
/** COMPONENT */
import HeaderBar from "../partials/header_bar";
import CSwiper from "../../components/CSwiper";
import CItem from "../../components/CItem";
import CRate from "../../components/CRate";
import CText from "../../components/CText";
/** STYLES */
import styles from "./style";
import Helpers from "../../helpers";

const ListAlbumEmpty = () => {
  return (
    <View style={styles.con_empty}>
      <FontAwesome5
        name={"images"}
        color={COLOR.placeholderTextColor}
        size={Helpers.fS(50)}
      />
      <CText style={styles.txt_empty} i18nKey={"txtDataEmpty"} />
    </View>
  );
};

const RenderLoader = (props) => (
  <ContentLoader
    height={Helpers.wS("50%")}
    width={Helpers.wS("100%") - 20}
    speed={1}
    primaryColor="#bebdbf"
    secondaryColor="#fff"
    {...props}
  >
    <Rect
      x="10"
      y="10"
      rx="5"
      ry="4"
      width={Helpers.wS("46%").toString()}
      height={Helpers.wS("26%").toString()}
    />
    <Rect
      x="10"
      y={(Helpers.wS("26%") + 20).toString()}
      rx="3"
      ry="3"
      width={Helpers.wS("26%").toString()}
      height="10"
    />
    <Rect
      x="10"
      y={(Helpers.wS("26%") + 40).toString()}
      rx="3"
      ry="3"
      width={Helpers.wS("20%").toString()}
      height="10"
    />

    <Rect
      x={(Helpers.wS("46%") + 20).toString()}
      y="10"
      rx="5"
      ry="4"
      width={Helpers.wS("46%").toString()}
      height={Helpers.wS("26%").toString()}
    />
    <Rect
      x={(Helpers.wS("46%") + 20).toString()}
      y={(Helpers.wS("26%") + 20).toString()}
      rx="3"
      ry="3"
      width={Helpers.wS("26%").toString()}
      height="10"
    />
    <Rect
      x={(Helpers.wS("46%") + 20).toString()}
      y={(Helpers.wS("26%") + 40).toString()}
      rx="3"
      ry="3"
      width={Helpers.wS("20%").toString()}
      height="10"
    />
  </ContentLoader>
);

class ViewHomeScreen extends React.PureComponent {
  render() {
    let {
      isRefreshing,
      isRating,
      isLoadForList,
      isLoadForAlbum,
      data,
      onPress,
      onToggle,
      onRefresh,
      onRefreshStudent,
      navigation,
    } = this.props;

    return (
      <View style={styles.con}>
        {/* HEADER BAR */}
        <HeaderBar
          title={"txtHomeTab"}
          hasBack={false}
          shadow={false}
          titleCenter={false}
          navigation={navigation}
        />
        {/* CHOOSE KID | CLASS */}
        <View key="kid-group" style={styles.con_kid}>
          <CSwiper
            loading={isLoadForList}
            data={
              CONFIG.USER_TYPE === KEY.PARENT ? data.students : data.classes
            }
            dataChoose={
              CONFIG.USER_TYPE === KEY.PARENT
                ? data.studentChoose
                : data.classChoose
            }
            onPressItem={
              CONFIG.USER_TYPE === KEY.PARENT
                ? onPress.chooseStudent
                : onPress.chooseClass
            }
            onRefresh={onRefreshStudent}
          />
        </View>

        {/* CONTENT */}
        <ScrollView
          style={DEVICE.gStyle.flex_1}
          keyboardShouldPersistTaps={"handled"}
          scrollIndicatorInsets={{ right: 1 }}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          {/* QUICK ACTIONS */}
          <View style={styles.quickActionBox}>
            {data.quickAction.map((item, index) => {
              if (CONFIG.USER_TYPE === item.forUser || item.forUser == "all") {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.quickActionItem, DEVICE.gStyle.shadow_2]}
                    activeOpacity={0.5}
                    onPress={() =>
                      !item.comingsoon
                        ? onPress.quickAction(item.id, item.slug)
                        : null
                    }
                  >
                    <View style={styles.quickActionItemTop}>
                      <Image
                        style={styles.quickActionIcon}
                        source={item.icon}
                        resizeMode={"cover"}
                      />
                    </View>

                    <View style={styles.quickActionItemBot}>
                      <CText
                        style={styles.txtQuickActionItem}
                        i18nKey={item.strText}
                      />
                    </View>

                    {item.comingsoon && (
                      <View
                        style={[
                          DEVICE.gStyle.center,
                          {
                            ...StyleSheet.absoluteFill,
                            // backgroundColor: 'rgba(255,255,255,.7)',
                            borderRadius: 5,
                          },
                        ]}
                      >
                        <FontAwesome5
                          name={"key"}
                          size={Helpers.fS(25)}
                          color={COLOR.text_1}
                          solid
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }
              return null;
            })}
          </View>

          {/* ALBUM */}
          <View key="album-group" style={styles.con_album}>
            <View style={styles.headerAlbum}>
              <CText
                style={styles.txtTitleBoxHome}
                i18nKey={"txtAlbumHeader"}
              />
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={onPress.seeAllAlbum}
              >
                <CText style={styles.txt_see_all} i18nKey={"all"} />
              </TouchableOpacity>
            </View>

            {isLoadForAlbum ? (
              <View
                style={{
                  height: 200,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator
                  color={COLOR.placeholderTextColor}
                  size={"small"}
                />
              </View>
            ) : (
              <View style={[styles.con_album]}>
                <FlatList
                  contentContainerStyle={[
                    DEVICE.gStyle.grow,
                    styles.ph_5,
                    styles.pb_10,
                  ]}
                  data={data.album}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={[
                        DEVICE.gStyle.shadow_2,
                        {
                          width: Helpers.wS("60%") + 10,
                          marginHorizontal: 5,
                          backgroundColor: COLOR.backgroundSec,
                          borderRadius: 5,
                        },
                      ]}
                      onPress={() => onPress.iAlbum(item.id)}
                    >
                      <CItem
                        index={index}
                        data={item}
                        styleImage={styles.img_album_item}
                        containerStyle={{
                          width: "100%",
                          paddingHorizontal: 0,
                        }}
                        hasSocial
                        titleStyle={styles.txt_title}
                        conTitleStyle={{
                          paddingHorizontal: 10,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  ListEmptyComponent={ListAlbumEmpty}
                />
              </View>
            )}
          </View>
        </ScrollView>

        <CRate
          visible={isRating}
          onRequestClose={onToggle.modalRating}
          onOK={onPress.startRating}
        />
      </View>
    );
  }
}

ViewHomeScreen.defaultProps = {
  isRating: false,
  isRefreshing: false,
  data: {
    quickAction: [],
    notification: [],
    album: [],
  },
  onPress: {
    iAlbum: () => {},
    iNotification: () => {},
    quickAction: () => {},
    startRating: () => {},
  },
  onToggle: {
    modalRating: () => {},
  },
};

export default ViewHomeScreen;
