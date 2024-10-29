/**
 * @Description: New Album Screen Layout
 * @Created by ZiniTeam
 * @Date create: 26/02/2019
 */
/** LIBRARY */
import React from 'react';
import { View, Text, FlatList } from 'react-native';
/** COMMON */
import { DEVICE } from '../../../config';
import Helpers from '../../../helpers';
/** COMPONENT */
import HeaderBar from '../../partials/header_bar';
import CItemPhoto from '../CItemPhoto';
import CText from '../../../components/CText';
/** STYLE */
import styles from './style';

class ViewNewAlbumScreen extends React.Component {
  render() {
    let {
      showModalListClass,
      data,
      onPressNext,
      onPressImageItem,
      onPress,
      onPressBack,
      onLoadMore,
      onEndReachedCalledDuringMomentum,
    } = this.props;
    // console.log("log nhe cai data", data);
    return (
      <View style={styles.con}>
        {/* HEADER */}
        <HeaderBar
          title={'cameraRoll'}
          hasBack
          iconRight={showModalListClass ? 'list-alt' : 'arrow-right'}
          onPressNext={
            showModalListClass ? onPress.onPressShowPopUp : onPressNext
          }
          onBack={onPressBack}
        />

        {/* SELECTED BAR  */}
        <View style={DEVICE.gStyle.flex_1}>
          <FlatList
            style={[DEVICE.gStyle.flex_1, { height: Helpers.hS('100%') }]}
            contentContainerStyle={{ paddingBottom: Helpers.wS('10.66%') }}
            numColumns={3}
            data={data.photo}
            renderItem={({ item, index }) => {
              let isCheck = false;
              if (!item.hasOwnProperty('id')) {
                isCheck = data.arrSelectedPhoto.find(
                  f => f.node.image.filename === item.node.image.filename,
                );
                if (isCheck) {
                  isCheck = true;
                }
              }

              return (
                <CItemPhoto
                  data={item}
                  isRemove={false}
                  isCheck={isCheck}
                  onPress={() => onPressImageItem(item)}
                />
              );
            }}
            onMomentumScrollBegin={onEndReachedCalledDuringMomentum}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.5}
            extraData={data.arrSelectedPhoto}
            getItemLayout={(data, index) => ({
              length: Helpers.wS('33.33%'),
              offset: Helpers.wS('33.33%') * index,
              index,
            })}
            keyExtractor={(item, index) => index.toString()}
          />

          <View style={styles.selectedBar}>
            <CText style={styles.txtSelected} i18nKey={'txtChoosed'} />
            <Text style={styles.txtSelected}>
              {' '}
              {data.arrSelectedPhoto.length}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

ViewNewAlbumScreen.defaultProps = {
  data: {
    photo: [],
    arrSelectedPhoto: [],
    classChoose: null,
  },
  onPressNext: () => { },
  onPressImageItem: () => { },
};

export default ViewNewAlbumScreen;
