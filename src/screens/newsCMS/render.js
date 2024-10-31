/**
 * @Description: News Screen Layout
 * @Created by ZiniTeam
 * @Date create: 23/01/2019
 */
/** LIBRARY */
import React from 'react';
import {View, FlatList, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
/** COMMON **/
import {DEVICE, COLOR} from '../../config';
/** COMPONENTS **/
import CItemNews from '../../components/CItemNews';
import CText from '../../components/CText';
/** STYLES **/
import styles from './style';
import Helpers from '../../helpers';

const RenderEmptyList = () => {
  return (
    <View style={DEVICE.gStyle.full_center}>
      <Icon
        name={'newspaper'}
        size={Helpers.fS(50)}
        color={COLOR.placeholderTextColor}
        type={'light'}
      />
      <CText style={styles.txt_no_item} i18nKey={'txtNoDataNews'} />
    </View>
  );
};

export const ViewNewsCMSScreen = ({
  state = {},
  data = [],
  onRefresh = () => {},
  onLoadMore = () => {},
  onPress = {
    post: () => {},
    category: () => {},
  },
}) => {
  return (
    <FlatList
      style={[DEVICE.gStyle.container, {backgroundColor: 'white'}]}
      contentContainerStyle={[DEVICE.gStyle.grow, styles.ph_10, styles.pt_10]}
      refreshing={state._refreshingCMS}
      data={data}
      renderItem={({item, index}) => (
        <TouchableOpacity onPress={() => onPress.post(item)}>
          <CItemNews
            index={index}
            data={item}
            typeShow={'image_left'}
            onPressCategory={onPress.category}
          />
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      removeClippedSubviews={Platform.OS === 'android'}
      ListEmptyComponent={RenderEmptyList}
      ItemSeparatorComponent={() => (
        <View
          style={{borderTopColor: COLOR.borderColor, borderTopWidth: 0.5}}
        />
      )}
      onRefresh={onRefresh}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

//   {/* {!state._loading && (
//       <FlatList
//         style={DEVICE.gStyle.container}
//         contentContainerStyle={[DEVICE.gStyle.grow, styles.pt_5, styles.ph_5]}
//         refreshing={state._refreshingCMS}
//         data={data}
//         renderItem={({ item, index }) => (
//           <CItemNews
//             index={index}
//             data={item}
//             typeShow={"column"}
//             onPress={() => onPress.item(item)}
//           />
//         )}
//         numColumns={2}
//         keyExtractor={(item, index) => index.toString()}
// removeClippedSubviews = { Platform.OS === "android" }
//         ListEmptyComponent={this._renderEmptyList()}
//         onRefresh={onRefresh}
//         onEndReached={onLoadMore}
//         onEndReachedThreshold={0.5}
//       />
//     )} */}

// {/* {!state._loading && (
//       <FlatList
//         style={[DEVICE.gStyle.container, { backgroundColor: COLOR.backgroundMain }]}
//         contentContainerStyle={[DEVICE.gStyle.column_align_center, styles.pt_10]}
//         refreshing={state._refreshingCMS}
//         data={data}
//         renderItem={({ item, index }) => (
//           <CItemNews
//             index={index}
//             data={item}
//             typeShow={"card"}
//             onPress={() => onPress.item(item)}
//           />
//         )}
//         keyExtractor={(item, index) => index.toString()}
// removeClippedSubviews = { Platform.OS === "android" }
//         ListEmptyComponent={this._renderEmptyList()}
//         onRefresh={onRefresh}
//         onEndReached={onLoadMore}
//         onEndReachedThreshold={0.5}
//       />
//     )} */}
