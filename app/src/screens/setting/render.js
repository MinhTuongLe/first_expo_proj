/**
 * @Description: Settings
 * @Created by ZiniTeam
 * @Date create: 14/11/2019
 */
/** LIBRARY */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Platform,
  Animated,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
/** COMPONENTS */
import CText from '../../components/CText';
import HeaderBar from '../partials/header_bar';
/** STYLE */
import styles from './style';

/** OTHER RENDER */
const RenderItem = (
  index = 0,
  data = {
    id: '',
    name: '',
    values: [],
  },
  idChoosed = '',
  onChange = () => {},
  onToggle = () => {},
) => {
  let valueChoosed = data.values.find(f => f.id === idChoosed);

  if (data.typeTouch === 'picker') {
    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity style={styles.con_item} onPress={onToggle}>
          <CText style={styles.txt_item_title} i18nKey={data.name} />
          <Text style={styles.txt_item_result}>{valueChoosed.name}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={[styles.con_item, {paddingRight: 0}]}>
          <CText style={styles.txt_item_title} i18nKey={data.name} />
          <Picker
            selectedValue={idChoosed}
            style={styles.con_picker_android}
            itemStyle={styles.txt_item_picker}
            onValueChange={(itemValue, itemIndex) => onChange(itemValue)}>
            {data.values.map((item, index) => (
              <Picker.Item key={index} label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>
      );
    }
  }

  return (
    <View style={styles.con_item}>
      <CText style={styles.txt_item_title} i18nKey={data.name} />
      <Text style={styles.txt_item_result}>{valueChoosed.name}</Text>
    </View>
  );
};

/** RENDER */
export const ViewSetting = ({
  state = {},
  onToggle = {
    softName: () => {},
  },
  onChange = {
    softName: () => {},
    back: () => {},
  },
}) => {
  return (
    <View style={styles.con}>
      <HeaderBar
        title={'txtSettingsTitle'}
        hasBack
        onBack={onChange.back}
        titleCenter={false}
      />

      <FlatList
        style={styles.con_list}
        contentContainerStyle={styles.con_content_list}
        data={state._settings}
        renderItem={({item, index}) => {
          return RenderItem(
            index,
            item,
            state._softNameId,
            onChange.softName,
            onToggle.softName,
          );
        }}
        extraData={state}
        keyExtractor={(item, index) => index.toString()}
      />

      {state._showSoftname && (
        <Animated.View
          style={[styles.con_bg_grey, {opacity: state._animateBg}]}
        />
      )}

      {Platform.OS === 'ios' && (
        <Modal
          visible={state._showSoftname}
          animationType={'slide'}
          onRequestClose={onToggle.softName}
          transparent>
          <View style={styles.con_bg_picker_ios}>
            <View style={styles.con_content_picker_ios}>
              <View style={styles.con_header_picker_ios}>
                <CText
                  style={styles.txt_header_picker_ios_left}
                  i18nKey={'cancel'}
                  onPress={onToggle.softName}
                />
                <CText
                  style={styles.txt_header_picker_ios_right}
                  i18nKey={'ok'}
                  onPress={onToggle.softName}
                />
              </View>
              <Picker
                selectedValue={state._softNameId}
                style={styles.con_picker_ios}
                itemStyle={styles.txt_item_picker}
                onValueChange={(itemValue, itemIndex) =>
                  onChange.softName(itemValue)
                }>
                {state._settings[0].values.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={item.id} />
                ))}
              </Picker>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};
