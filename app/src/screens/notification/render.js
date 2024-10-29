/* eslint-disable prettier/prettier */
/**
 * @Description: Notification Screen Layout
 * @Created by ZiniTeam
 * @Date create: 21/01/2019
 */
/** LIBRARY */
import React from 'react';
import {View, FlatList} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import ContentLoader, {Rect} from 'react-content-loader/native';
/** COMMON **/
import {DEVICE, COLOR} from '../../config';
import Helpers from '../../helpers';
/** COMPONENTS **/
import HeaderBar from '../partials/header_bar';
import NotificationItem from './item';
import CText from '../../components/CText';
import CLoading from '../../components/CLoading';
/** STYLES **/
import styles from './style';

// const RenderLoader = (props) => (
//   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
//     <ContentLoader height={'100%'}
//       width={DEVICE.wS('95%')}
//       speed={1}
//       primaryColor="#bebdbf"
//       secondaryColor="#fff"
//       {...props}
//     >
//       <Rect y="10" rx="5" ry="5" width={DEVICE.wS('33%').toString()} height={DEVICE.wS('27%').toString()} />
//       <Rect x={(DEVICE.wS('33%') + 10).toString()} y={"10"} rx="3" ry="3" width={DEVICE.wS('56%').toString()} height="20" />
//       <Rect x={(DEVICE.wS('33%') + 10).toString()} y={"40"} rx="3" ry="3" width={DEVICE.wS('40%').toString()} height="15" />
//       <Rect x={(DEVICE.wS('33%') + 10).toString()} y={"65"} rx="3" ry="3" width={DEVICE.wS('56%').toString()} height="15" />

//       <Rect y="120" rx="5" ry="5" width={DEVICE.wS('33%').toString()} height={DEVICE.wS('27%').toString()} />
//       <Rect x={(DEVICE.wS('33%') + 10).toString()} y={"120"} rx="3" ry="3" width={DEVICE.wS('56%').toString()} height="20" />
//       <Rect x={(DEVICE.wS('33%') + 10).toString()} y={"150"} rx="3" ry="3" width={DEVICE.wS('40%').toString()} height="15" />
//       <Rect x={(DEVICE.wS('33%') + 10).toString()} y={"175"} rx="3" ry="3" width={DEVICE.wS('56%').toString()} height="15" />

//       <Rect y="230" rx="5" ry="5" width={DEVICE.wS('33%').toString()} height={DEVICE.wS('27%').toString()} />
//       <Rect x={(DEVICE.wS('33%') + 10).toString()} y={"230"} rx="3" ry="3" width={DEVICE.wS('56%').toString()} height="20" />
//       <Rect x={(DEVICE.wS('33%') + 10).toString()} y={"260"} rx="3" ry="3" width={DEVICE.wS('40%').toString()} height="15" />
//       <Rect x={(DEVICE.wS('33%') + 10).toString()} y={"285"} rx="3" ry="3" width={DEVICE.wS('56%').toString()} height="15" />

//       <Rect y="340" rx="5" ry="5" width={DEVICE.wS('33%').toString()} height={DEVICE.wS('27%').toString()} />
//       <Rect x={(DEVICE.wS('33%') + 10).toString()} y={"340"} rx="3" ry="3" width={DEVICE.wS('56%').toString()} height="20" />
//       <Rect x={(DEVICE.wS('33%') + 10).toString()} y={"370"} rx="3" ry="3" width={DEVICE.wS('40%').toString()} height="15" />
//       <Rect x={(DEVICE.wS('33%') + 10).toString()} y={"395"} rx="3" ry="3" width={DEVICE.wS('56%').toString()} height="15" />

//       <Rect y="450" rx="5" ry="5" width={DEVICE.wS('33%').toString()} height={DEVICE.wS('27%').toString()} />
//       <Rect x={(DEVICE.wS('33%') + 10).toString()} y={"450"} rx="3" ry="3" width={DEVICE.wS('56%').toString()} height="20" />
//       <Rect x={(DEVICE.wS('33%') + 10).toString()} y={"480"} rx="3" ry="3" width={DEVICE.wS('40%').toString()} height="15" />
//       <Rect x={(DEVICE.wS('33%') + 10).toString()} y={"505"} rx="3" ry="3" width={DEVICE.wS('56%').toString()} height="15" />

//       <Rect y="560" rx="5" ry="5" width={DEVICE.wS('33%').toString()} height={DEVICE.wS('27%').toString()} />
//       <Rect x={(DEVICE.wS('33%') + 10).toString()} y={"560"} rx="3" ry="3" width={DEVICE.wS('56%').toString()} height="20" />
//       <Rect x={(DEVICE.wS('33%') + 10).toString()} y={"590"} rx="3" ry="3" width={DEVICE.wS('40%').toString()} height="15" />
//       <Rect x={(DEVICE.wS('33%') + 10).toString()} y={"615"} rx="3" ry="3" width={DEVICE.wS('56%').toString()} height="15" />
//     </ContentLoader>
//   </View>
// )

class ViewNotificationScreen extends React.PureComponent {
  /** FUNCTIONS */
  _renderEmptyList = () => {
    return (
      <View style={DEVICE.gStyle.full_center}>
        <Icon
          name={'bell-exclamation'}
          size={Helpers.fS(50)}
          color={COLOR.placeholderTextColor}
          type={'light'}
        />
        <CText style={styles.txt_no_data} i18nKey={'txtNoDataNotification'} />
      </View>
    );
  };

  /** RENDER */
  render() {
    let {onRefresh, onLoadMore, onPress, state} = this.props;
    // console.log('NOTI DATA: ', state._dataNotifycation);
    return (
      <View style={styles.container}>
        {/* Header */}
        <HeaderBar title={'txtTab4'} titleCenter={false} />

        {/* Content */}
        {!state._loading && (
          <FlatList
            style={DEVICE.gStyle.container}
            contentContainerStyle={DEVICE.gStyle.grow}
            data={state._dataNotifycation}
            renderItem={({item, index}) => {
              if (item.notification) {
                return (
                  <NotificationItem
                    dataRel={item}
                    data={item.notification}
                    isRead={item.isRead}
                    onPress={() => onPress.item(item)}
                  />
                );
              }
              return null;
            }}
            extraData={state}
            ListEmptyComponent={this._renderEmptyList()}
            refreshing={state._refreshing}
            onRefresh={onRefresh}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.01}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        {state._loading && (
          <View style={DEVICE.gStyle.full_center}>
            <CLoading />
          </View>
        )}
      </View>
    );
  }
}

ViewNotificationScreen.defaultProps = {
  data: {},
  onRefresh: () => {},
  onLoadMore: () => {},
  onPress: {
    item: () => {},
  },
};

export default ViewNotificationScreen;
