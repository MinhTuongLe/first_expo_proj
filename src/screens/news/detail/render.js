/**
 * @Description: News Details Screen Layout
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** LIBRARY */
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import HTML from 'react-native-render-html';
/** COMMON **/
import {LANG, CONFIG, DEVICE} from '../../../config';
/** COMPONENTS **/
import HeaderBar from '../../partials/header_bar';
import CImage from '../../../components/CImage';
import CText from '../../../components/CText';
/** STYLE **/
import styles from '../style';
import Helpers from '../../../helpers';

class ViewNewsDetail extends React.Component {
  /** RENDER */
  render() {
    let {data, onPressBack} = this.props;
    let description1 = data?.description?.replace(/<a/g, '<span');
    let description2 = description1?.replace(/a>/g, 'span>');
    let time = Helpers.getShortTimeWithNow(data.createdAt);

    return (
      <View style={styles.d_container}>
        {/* Header */}
        <HeaderBar title={'txtTab3'} hasBack onBack={onPressBack} data={data} />

        {/* Content */}
        <ScrollView contentContainerStyle={{paddingHorizontal: 10}}>
          <View style={styles.d_container_content}>
            <Text style={styles.d_text_title}>{data.title}</Text>
            <View style={DEVICE.gStyle.row_align_center}>
              {time.type !== time.des ? (
                <CText style={styles.d_text_time}>{time.des} </CText>
              ) : (
                <>
                  <CText style={styles.d_text_time}>{time.time} </CText>
                  <CText style={styles.d_text_time} i18nKey={time.type} />
                </>
              )}
            </View>
            <Text style={styles.d_text_motto}>{data.motto}</Text>
          </View>

          {data.media && (
            <CImage
              style={styles.con_img_detail}
              resizeMode={'cover'}
              src={{
                uri: CONFIG.host + data.media.thumbnail.sizes.medium_large.path,
              }}
            />
          )}

          <HTML
            ignoreDomNode={(node, parent) => node.name === 'font'}
            source={{html: description2}}
            contentWidth={DEVICE.width}
            imagesMaxWidth={DEVICE.width}
            tagsStyles={{p: styles.txt_html_content}}
          />
        </ScrollView>
      </View>
    );
  }
}

ViewNewsDetail.defaultProps = {
  data: {},
};

export default ViewNewsDetail;
