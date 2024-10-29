/**
 * @Description: Custom Item Album
 * @Created by ZiniTeam
 * @Date create: 21/01/2019
 */
/** LIBRARY */
import React from 'react';
// import moment from 'moment';
// import 'moment/locale/vi';
// moment.locale('vi');
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-fontawesome-pro';
/** COMMON */
import {DEVICE, CONFIG, ASSETS, COLOR} from '../../config';
import Helpers from '../../helpers';
/** COMPONENT */
import CImage from '../CImage';
import CText from '../CText';
/** STYLES */
import styles from './style';

class CItem extends React.PureComponent {
  render() {
    let {
      navigation,
      containerStyle,
      conTitleStyle,
      imageStyle,
      styleImage,
      titleStyle,
      index,
      data,
      hasSocial,
      hasNews,
      hasOwner,
    } = this.props;
    let time = hasSocial
      ? Helpers.getShortTimeWithNow(data.createdAt)
      : Helpers.getShortTimeWithNow(
          hasNews ? data.createdAt : data.photos[0].createdAt,
        );
    let _src = null;

    //get src
    if (hasNews) {
      _src = data.media
        ? {
            uri:
              CONFIG.host +
              data.media.thumbnail.sizes.thumbnail.path.replace('assets', ''),
          }
        : ASSETS.imgFailed;
    } else {
      _src =
        data && data.photos && data.photos.length > 0
          ? {
              uri:
                CONFIG.host +
                data.photos[0].thumbnail.sizes.medium_large.path.replace(
                  'assets',
                  '',
                ),
            }
          : ASSETS.imgFailed;
    }
    let newFullNameOwner = '';
    if (hasSocial && typeof data.owner === 'object') {
      newFullNameOwner = Helpers.capitalizeName(
        data.owner.firstName,
        data.owner.lastName,
        CONFIG.settingLocal?.softName,
      );
    }

    return (
      <View
        style={
          hasNews
            ? [
                DEVICE.gStyle.flex_1,
                DEVICE.gStyle.row_align_start,
                containerStyle,
              ]
            : [styles.con_item, containerStyle]
        }>
        {/** THUMBNAIL */}
        {hasNews && (
          <View style={styles.con_image}>
            <CImage
              style={[styles.img_item, styleImage]}
              src={_src}
              resizeMode={'cover'}
            />
          </View>
        )}

        {hasNews && (
          <View
            style={[
              styles.con_infor,
              conTitleStyle,
              {
                padding: 10,
                height: '100%',
              },
            ]}>
            <CText
              style={[
                DEVICE.initFont.XX_SMALL,
                styles.txtTitleItem,
                titleStyle,
                {
                  fontWeight: 'normal',
                },
              ]}
              numberOfLines={2}>
              {data.title}
            </CText>
            {!hasNews && (
              <CText
                style={[DEVICE.initFont.XXX_SMALL, styles.txtMotto]}
                numberOfLines={2}>
                {data.motto}
              </CText>
            )}
            <View style={[DEVICE.gStyle.row_align_center, {marginTop: 5}]}>
              {time.type !== time.des ? (
                <CText style={[DEVICE.initFont.XXXX_SMALL, styles.txtTime]}>
                  {time.des}{' '}
                </CText>
              ) : (
                <>
                  <CText style={[DEVICE.initFont.XXXX_SMALL, styles.txtTime]}>
                    {time.time}{' '}
                  </CText>
                  <CText
                    style={[DEVICE.initFont.XXXX_SMALL, styles.txtTime]}
                    i18nKey={time.type}
                  />
                </>
              )}
            </View>

            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.txtDateTime}>{time.time}</Text>
              {time.type === time.des ?
                <CText style={[styles.txtDateTime, { marginLeft: 5 }]} i18nKey={time.type} /> :
                <Text style={styles.txtDateTime}>{time.des} </Text>}
            </View> */}
          </View>
        )}

        {hasSocial && (
          <CImage
            style={[styles.img_item, styleImage]}
            src={_src}
            resizeMode={'cover'}
          />
        )}

        {/** INFO SOCIAL */}
        {hasSocial && (
          <View style={[styles.ph_5, conTitleStyle]}>
            {/** TITLE */}
            <View style={styles.con_title}>
              <Text
                style={[styles.txt_title_item, titleStyle]}
                numberOfLines={1}>
                {data.title}
              </Text>
              <View
                style={[
                  DEVICE.gStyle.space_between,
                  DEVICE.gStyle.row_align_center,
                ]}>
                <View style={DEVICE.gStyle.row_align_center}>
                  {hasOwner && newFullNameOwner !== '' && (
                    <View style={DEVICE.gStyle.row_align_center}>
                      <CText style={styles.txt_info_item} i18nKey={'by'} />
                      <Text
                        style={[
                          styles.txt_info_result_item,
                          {
                            marginLeft: 5,
                          },
                        ]}>
                        {newFullNameOwner}
                      </Text>
                      <CText style={styles.d_txt_time}>{' - '}</CText>
                    </View>
                  )}
                  {time.type !== time.des ? (
                    <Text
                      style={[
                        styles.txt_info_result_item,
                        {color: COLOR.inactiveTintColor},
                      ]}>
                      {time.des}
                    </Text>
                  ) : (
                    <>
                      <Text
                        style={[
                          styles.txt_info_result_item,
                          {color: COLOR.inactiveTintColor},
                        ]}>
                        {time.time}{' '}
                      </Text>
                      <CText
                        style={[
                          styles.txt_info_result_item,
                          {color: COLOR.inactiveTintColor},
                        ]}
                        i18nKey={time.type}
                      />
                    </>
                  )}
                </View>

                {data.whoLike && data.whoLike.length > 0 && (
                  <View style={DEVICE.gStyle.row_align_center}>
                    <Text
                      style={[
                        styles.txt_info_result_item,
                        {color: COLOR.txt_3},
                      ]}>
                      {' '}
                      {data && data.whoLike.length}{' '}
                    </Text>
                    <Icon
                      name={'thumbs-up'}
                      color={COLOR.txt_3}
                      size={Helpers.fS(12)}
                      type={'light'}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

CItem.defaultProps = {
  containerStyle: {},
  imageStyle: {},
  styleImage: {},
  titleStyle: {},
  hasSocial: false,
  hasNews: false,
  hasOwner: false,
};

export default CItem;
