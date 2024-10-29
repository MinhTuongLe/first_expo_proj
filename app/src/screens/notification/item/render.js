/**
 * @Description: Notification Item Layout
 * @Created by ZiniTeam
 * @Date create: 21/01/2019
 */
/** LIBRARY */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
/** COMMON **/
import {DEVICE, COLOR, CONFIG} from '../../../config';
import Helpers from '../../../helpers';
import CText from '../../../components/CText';
/** STYLES **/
import styles from '../style';

class ViewNotificationItem extends React.Component {
  /** RENDER */
  render() {
    let {data, isRead, onPress} = this.props;
    let time = Helpers.getShortTimeWithNow(data.createdAt);
    let notiType = CONFIG.NOTIFICATION[data.type];

    return (
      <TouchableOpacity
        onPress={() => onPress.item()}
        style={[
          styles.container_item,
          isRead
            ? {backgroundColor: COLOR.backgroundMain}
            : {backgroundColor: COLOR.backgroundSec},
        ]}>
        <View
          style={[
            styles.container_item_inside,
            isRead
              ? {backgroundColor: COLOR.backgroundMain}
              : {backgroundColor: COLOR.backgroundSec},
          ]}>
          <View style={styles.container_item_icon}>
            <Icon
              name={'circle'}
              size={12}
              color={COLOR.primaryApp}
              type={!isRead ? 'solid' : 'regular'}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.txtDateTime}>{time.time}</Text>
              {time.type === time.des ? (
                <CText
                  style={[styles.txtDateTime, {marginLeft: 5}]}
                  i18nKey={time.type}
                />
              ) : (
                <Text style={styles.txtDateTime}>{time.des} </Text>
              )}
            </View>
          </View>

          <View style={styles.container_item_content}>
            <Text
              style={
                isRead ? styles.text_item_readed : styles.text_item_notread
              }
              numberOfLines={2}>
              {/* {Helpers.capitalizeFirstLetter(notiType)}:  */}
              {/* <CText i18nKey={notiType} />:{' '} */}
              {Helpers.capitalizeFirstLetter(data.title)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

ViewNotificationItem.defaultProps = {
  data: {},
  isRead: false,
  onPress: {
    item: () => {},
  },
};

export default ViewNotificationItem;
