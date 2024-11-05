/**
 * @Description: News Screen Layout
 * @Created by ZiniTeam
 * @Date create: 23/01/2019
 */
/** LIBRARY */
import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
/** COMMON **/
import { DEVICE, COLOR } from "../../config";
/** COMPONENTS **/
import CItem from "../../components/CItem";
import CText from "../../components/CText";
/** STYLES **/
import styles from "./style";
import CLoading from "../../components/CLoading";
import Helpers from "../../helpers";

const RenderEmptyList = () => {
  return (
    <View style={DEVICE.gStyle.full_center}>
      <FontAwesome5
        name={"newspaper"}
        size={Helpers.fS(50)}
        color={COLOR.placeholderTextColor}
      />
      <CText style={styles.txt_no_item} i18nKey={"txtNoDataNews"} />
    </View>
  );
};

export const ViewNewsScreen = ({
  state = {},
  data = [],
  onRefresh = () => {},
  onLoadMore = () => {},
  onPress = {
    post: () => {},
  },
}) => {
  return (
    <>
      {state._loading && (
        <View style={DEVICE.gStyle.full_center}>
          <CLoading />
        </View>
      )}
      {!state._loading && (
        <FlatList
          style={[
            DEVICE.gStyle.container,
            { backgroundColor: COLOR.backgroundMain, paddingHorizontal: 10 },
          ]}
          contentContainerStyle={[DEVICE.gStyle.grow]}
          refreshing={state._refreshing}
          data={data}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => onPress.post(item)}>
              <CItem
                containerStyle={[
                  {
                    backgroundColor: COLOR.backgroundSec,
                    marginTop: 10,
                    borderRadius: 10,
                    overflow: "hidden",
                  },
                ]}
                styleImage={styles.image_news}
                index={index}
                data={item}
                conTitleStyle={{
                  paddingLeft: 15,
                }}
                hasNews
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={onRefresh}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={RenderEmptyList}
        />
      )}
    </>
  );
};
