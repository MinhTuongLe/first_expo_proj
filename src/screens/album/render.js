/* eslint-disable prettier/prettier */
/**
 * @Description: Album Screen Layout
 * @Created by ZiniTeam
 * @Date create: 21/01/2019
 */
/** LIBRARY */
import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
/** COMPONENT */
import HeaderBar from "../partials/header_bar";
import CItem from "../../components/CItem";
import CText from "../../components/CText";
import CLoading from "../../components/CLoading";
/** COMMON */
import { CONFIG, DEVICE, KEY, COLOR } from "../../config";
/** STYLES */
import styles from "./style";
import Helpers from "../../helpers";

class ViewAlbumScreen extends React.PureComponent {
  /** FUNCTIONS */
  _viewEmptyList = () => {
    return (
      <View style={styles.emptyDate}>
        {/* <Icon
          name={"clipboard-list"}
          size={Helpers.fS(50)}
          color={COLOR.placeholderTextColor}
          type={"light"}
        /> */}
        <FontAwesome5
          name={"clipboard-list"}
          size={Helpers.fS(50)}
          color={COLOR.placeholderTextColor}
        />
        <CText style={styles.txt_no_data} i18nKey={"txtDataEmpty"} />
      </View>
    );
  };

  /** RENDER */
  render() {
    let { isRefresh, isLoading, loadForHeader, lazy, data, onPress } =
      this.props;

    return (
      <View
        style={[
          DEVICE.gStyle.container,
          { backgroundColor: COLOR.backgroundMain },
        ]}
      >
        {/* HEADER */}
        <HeaderBar
          // iconRight={CONFIG.USER_TYPE === KEY.TEACHER ? 'plus' : ''}
          title={"txtDrawerAlbum"}
          hasBack
          onBack={onPress.goBack}
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
        />

        {/* CONTENT */}
        {!isLoading && (
          <FlatList
            contentContainerStyle={[DEVICE.gStyle.grow, styles.pv_10]}
            data={data.dataAlbum}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => onPress.albumItem(item)}>
                <CItem
                  hasSocial
                  hasOwner
                  index={index}
                  data={item}
                  containerStyle={styles.con_album_item}
                  styleImage={styles.img_album}
                  titleStyle={styles.txt_title}
                  conTitleStyle={styles.con_album_title}
                />
              </TouchableOpacity>
            )}
            refreshing={isRefresh}
            onRefresh={lazy.onRefresh}
            onEndReached={lazy.onLoadMore}
            onEndReachedThreshold={0.1}
            ListEmptyComponent={this._viewEmptyList()}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}

        {CONFIG.USER_TYPE === KEY.TEACHER && (
          <View style={styles.con_action_btn}>
            <TouchableOpacity activeOpacity={0.5} onPress={onPress.add}>
              {/* <Icon
                containerStyle={styles.con_icon_add}
                name={"plus"}
                color={COLOR.primaryButton}
                size={Helpers.fS(25)}
                type={"light"}
              /> */}
              <FontAwesome5
                style={styles.con_icon_add}
                name={"plus"}
                color={COLOR.primaryButton}
                size={Helpers.fS(25)}
              />
            </TouchableOpacity>
          </View>
        )}

        {isLoading && (
          <View style={DEVICE.gStyle.full_center}>
            <CLoading />
          </View>
        )}
      </View>
    );
  }
}

ViewAlbumScreen.defaultProps = {
  isLoading: false,
  isRefresh: false,
  lazy: {
    onRefresh: () => {},
    onLoadMore: () => {},
  },
  data: [],
  onPress: {
    add: () => {},
  },
};

export default ViewAlbumScreen;
