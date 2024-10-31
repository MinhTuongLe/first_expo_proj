/**
 * @Description: New Album Screen Layout
 * @Created by ZiniTeam
 * @Date create: 26/02/2019
 */
/** LIBRARY */
import React from 'react';
import { View, FlatList, TextInput } from 'react-native';
/** COMMON */
import { LANG, CONFIG, DEVICE } from '../../../../config';
import Helpers from '../../../../helpers';
/** COMPONENT */
import HeaderBar from '../../../partials/header_bar';
import CItemPhoto from '../../CItemPhoto'
/** STYLE */
import styles from './style'

class ViewUploadAlbum extends React.Component {

  render() {
    let {
      albumName, arrSelectedPhoto, onPressPost, onPressRemove, getValAlbumName,
      onBack, language
    } = this.props;

    return (
      <View style={styles.con}>
        {/* HEADER */}
        <HeaderBar title={'txtNewAlbum'} hasBack textRight textRightValue={LANG[CONFIG.lang].txtPost} onPressPost={onPressPost} onBack={onBack} />

        <TextInput
          style={{ width: DEVICE.width, height: Helpers.wS('10.66%'), paddingHorizontal: 10, alignItems: 'center', color: 'black' }}
          placeholder={language === 'vi' ? 'Tên thư viện ảnh...' : 'Name of album...'}
          onChangeText={getValAlbumName}
          value={albumName}
          autoFocus={true}
        />

        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: 'flex-start' }}
          numColumns={3}
          data={arrSelectedPhoto}
          renderItem={({ item, index }) => {
            return (
              <CItemPhoto
                data={item}
                isRemove={true}
                onPressRemove={onPressRemove}
                onPress={() => onPressImageItem(item.id)}
              />
            )
          }}
          getItemLayout={(data, index) => (
            { length: Helpers.wS('33.33%'), offset: Helpers.wS('33.33%') * index, index }
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

ViewUploadAlbum.defaultProps = {
  isLoading: true,
  albumName: '',
  arrSelectedPhoto: [],
  onPressPost: () => { },
  onPressRemove: () => { },
  getValAlbumName: () => { },
}

export default ViewUploadAlbum;
