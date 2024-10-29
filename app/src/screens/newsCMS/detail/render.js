/**
 * @Description: News Details Screen Layout
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** LIBRARY */
import React from 'react';
import { View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import HTML from 'react-native-render-html';
import {decode} from 'html-entities';
/** COMMON **/
import { COLOR, CONFIG, DEVICE } from '../../../config';
import CommonStyle from '../../../helpers/common-style';
/** COMPONENTS **/
import HeaderBar from '../../partials/header_bar';
import CLoading from '../../../components/CLoading';
import CImage from '../../../components/CImage';
import CText from '../../../components/CText';
import CItemNews from "../../../components/CItemNews";
import style from '../../../components/CLoading/style';
import Helpers from '../../../helpers';

const regex = /(<([^>]+)>)/ig;
const postFormat = [
  {
    name: "standard",
    icon: ""
  },
  {
    name: "video",
    icon: "video"
  },
  {
    name: "audio",
    icon: "headphones-alt"
  },
  {
    name: "gallery",
    icon: "images"
  },
]

const styles = Object.assign({}, CommonStyle, {
  con_top_content: { paddingHorizontal: 10, paddingTop: 10 },
  con_content: { paddingHorizontal: 10, paddingBottom: 10 },
  con_tag: [DEVICE.gStyle.center, { borderRadius: 5, backgroundColor: COLOR.primaryButton }],

  txt_title: { color: COLOR.cor_xam, fontWeight: "bold" },
  txt_author: { color: COLOR.cor_xam },
  txt_time: { color: COLOR.text_2 },
  txt_category: { color: COLOR.primaryButton, fontWeight: "bold" },
  txt_tag: { color: "white", fontWeight: "bold" },

  image: { width: "100%", height: Helpers.wS("75%") },
})

const RenderHeaderReleated = () => {
  return (
    <View style={[styles.pv_10]}>
      <CText style={[DEVICE.initFont.XX_SMALL, { fontFamily: DEVICE.fontBold }]} i18nKey={"post_releated"} upperCase />
    </View>
  )
}

export const ViewNewsCMSDetail = ({
  state = {},
  onPress = {
    post: () => { },
    category: () => { },
    author: () => { },
    tag: () => { }
  }
}) => {
  let _title = "", _excerpt = "", _time = null, _featuredMedia = null, _categories = null,
    _postFormat = "standard", _author = null, _tags = null;
  if (state._data) {
    /** Prepare Title */
    _title = decode(state._data.title.rendered.replace(regex, ''));
    /** Prepare Excerpt */
    _excerpt =  decode(state._data.excerpt.rendered.replace(regex, ''));
    /** Prepare Time create */
    _time = Helpers.parseTimeNews(state._data.date);
    /** Prepare Featured media */
    if (typeof state._data.featured_media === "object" && state._data.featured_media.sizes) {
      _featuredMedia = state._data.featured_media.sizes.large;
    }
    /** Prepare Categories */
    if (state._data.categories && state._data.categories.length > 0) {
      _categories = state._data.categories;
    }
    /** Prepare Author */
    if (state._data.author && typeof state._data.author === "object") {
      _author = state._data.author;
    }
    /** Prepare Tag */
    if (state._data.tags.length > 0) {
      _tags = state._data.tags;
    }
    /** Prepare Format post */
    _postFormat = postFormat.find(f => f.name === state._data.format);
  }

  return (
    <View style={DEVICE.gStyle.container}>
      {/* Header */}
      <HeaderBar title={'txtTab3'} hasBack data={state._data} />

      {/* Content */}
      {!state._loading && state._data &&
        <ScrollView style={DEVICE.gStyle.container}>
          {_featuredMedia && (
            <CImage
              style={styles.image}
              resizeMode={'cover'}
              src={{ uri: _featuredMedia }}
            />
          )}

          <View style={styles.con_top_content}>
            <CText style={[DEVICE.initFont.SMALL, styles.txt_title]} numberOfLines={10}>{_title}</CText>
            <View style={[DEVICE.gStyle.row_align_center, { paddingTop: 5 }]}>
              {_categories && _categories.length > 0 &&
                <View style={DEVICE.gStyle.row_align_center}>
                  {_categories.map((item, index) => {
                    return (
                      <TouchableOpacity key={index.toString()} onPress={() => onPress.category(item)}>
                        <View style={DEVICE.gStyle.row_align_center}>
                          <CText style={[DEVICE.initFont.XX_SMALL, styles.txt_category]}>{item.name}</CText>
                          {index !== _categories.length - 1 &&
                            <CText style={[DEVICE.initFont.XX_SMALL, styles.txt_category]}>{" | "}</CText>
                          }
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              }
            </View>
            <View style={[DEVICE.gStyle.row_align_center, { paddingTop: 5 }]}>
              <CText style={[DEVICE.initFont.XX_SMALL, styles.txt_time]}>{_time.data + " "}</CText>
              <CText style={[DEVICE.initFont.XX_SMALL, styles.txt_time]} i18nKey={_time.des} />
            </View>
          </View>

          <View style={{ padding: 10 }}>
            <HTML
              html={state._data.content.rendered}
              decodeEntities={true}
              enableExperimentalPercentWidth={true}
              imagesInitialDimensions={styles.image}
              imagesMaxWidth={DEVICE.width}
              tagsStyles={{
                p: {
                  color: COLOR.txtColor,
                  fontSize: Helpers.fS(16),
                  fontFamily: DEVICE.fontRegular
                }
              }}
            />

            {/* APIs wordpress list posts by author not work -> Will hide click func */}
            {_author &&
              // <TouchableOpacity onPress={() => onPress.author(_author)}>
              <View style={DEVICE.gStyle.column_align_end}>
                <CText style={[DEVICE.initFont.SMALL, styles.txt_author]}>{_author.author_name}</CText>
              </View>
              // </TouchableOpacity>
            }

            {_tags && _tags.length > 0 &&
              <View style={DEVICE.gStyle.column_align_start}>
                <FlatList
                  contentContainerStyle={[DEVICE.gStyle.wrap, { width: DEVICE.width }]}
                  data={_tags}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => onPress.tag(item)}>
                      <View style={[styles.con_tag, styles.ph_5, styles.pv_5, styles.mr_10, styles.mt_10]}>
                        <CText style={styles.txt_tag}>{"#" + item.name}</CText>
                      </View>
                    </TouchableOpacity>
                  )}
                  horizontal
                  scrollEnabled={false}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            }
          </View>

          {/** RELATED POST */}
          {state._dataRelated.length > 0 &&
            <View>
              <FlatList
                contentContainerStyle={[DEVICE.gStyle.grow, styles.ph_10]}
                refreshing={state._refreshingCMS}
                data={state._dataRelated}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => onPress.post(item)}>
                    <CItemNews
                      index={index}
                      data={item}
                      typeShow={"image_left"}
                      onPressCategory={onPress.category}
                    />
                  </TouchableOpacity>
                )}
                scrollEnabled={false}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={5}
                removeClippedSubviews={Platform.OS === "android"}
                ListHeaderComponent={RenderHeaderReleated}
                ItemSeparatorComponent={() => <View style={{ borderTopColor: COLOR.borderColor, borderTopWidth: .5 }} />}
              />
            </View>
          }
        </ScrollView>
      }

      {state._loading &&
        <CLoading />
      }
    </View>
  )
}