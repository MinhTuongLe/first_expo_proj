/**
 ** FileName:
 ** FileAuthor:
 ** FileCreateAt:
 ** FileDescription:
 **/
/* LIBRARY */
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
/* COMPONENTS */
import HeaderBar from '../../../partials/header_bar';
import CImage from '../../../../components/CImage';
import CText from '../../../../components/CText';
/** COMMON */
import Helpers from '../../../../helpers';
import {CONFIG, DEVICE, COLOR, ASSETS, LANG} from '../../../../config';
/** STYLES */
import styles from './styles';
import moment from 'moment';
import {customFormatMoney} from '../../../../utils/formatPrice';

const ViewListEmpty = () => {
  return (
    <View style={[DEVICE.gStyle.full_center, {paddingBottom: 10}]}>
      <Icon
        name={'file-invoice-dollar'}
        size={Helpers.fS(50)}
        color={COLOR.placeholderTextColor}
        type={'light'}
      />
      <CText style={styles.txt_empty_student} i18nKey={'txtEmptyFeeInvoice'} />
    </View>
  );
};

const ViewHeaderList = state => {
  return (
    <View
      style={{
        backgroundColor: COLOR.backgroundSec,
        padding: 10,
      }}>
      <Text style={styles.txt_title_item}>
        {LANG[CONFIG.lang].txtListOfFeeInvoice}
      </Text>
    </View>
  );
};

export const ViewFeeInvoiceList = ({
  state = null,
  onFunction = {
    onRefresh: () => {},
    onLoadMore: () => {},
    onPressBack: () => {},
    detailFeeInvoice: () => {},
  },
}) => {
  const renderItem = (item, index, length) => {
    const checkStatus = status => {
      let i18nKey = 'unpaid';
      let bgColorStatus = COLOR.primaryTextNote;
      switch (status) {
        case CONFIG.FEE_INVOICE.PAID:
          i18nKey = 'paid';
          bgColorStatus = COLOR.chartStandard;
          break;
        case CONFIG.FEE_INVOICE.PENDING:
          i18nKey = 'pending';
          bgColorStatus = COLOR.inactiveTintColor;
          break;
        case CONFIG.FEE_INVOICE.INVOICE_DRAFT:
          i18nKey = 'invoceDraft';
          bgColorStatus = COLOR.placeholderTextColor;
          break;
        case CONFIG.FEE_INVOICE.IN_PROCESS:
          i18nKey = 'inProcess';
          bgColorStatus = COLOR.primaryButton;
          break;
        default:
          i18nKey = 'unpaid';
          bgColorStatus = COLOR.primaryTextNote;
      }

      return (
        <View
          style={[
            styles.con_status,
            {
              backgroundColor: bgColorStatus,
              paddingVertical: i18nKey === 'unpaid' ? 2 : 3,
            },
          ]}>
          <CText style={styles.txt_status} i18nKey={i18nKey} />
        </View>
      );
    };

    return (
      <TouchableOpacity onPress={() => onFunction.detailFeeInvoice(item)}>
        <View style={{marginHorizontal: 10, marginTop: index > 0 ? 10 : 0}}>
          <View style={{flexDirection: 'row'}}>
            <CImage
              style={{
                height: 50,
                width: 50,
              }}
              src={ASSETS.icCoin}
              resizeMode={'cover'}
            />
            <View
              style={{
                marginLeft: 10,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomColor: COLOR.borderColorSec,
                borderBottomWidth: index < length - 1 ? 1 : 0,
                paddingBottom: 10,
              }}>
              <View style={{gap: 6}}>
                <Text style={styles.txt_content_item}>{item.title}</Text>
                <Text style={styles.txt_content_item}>
                  {LANG[CONFIG.lang].txtDeadline}:{' '}
                  {moment(item.deadline, 'YYYY-MM-DD').format('DD/MM')}
                </Text>
              </View>
              <View style={{gap: 6}}>
                <Text
                  style={[
                    styles.txt_content_item,
                    {
                      fontWeight: 'bold',
                      alignSelf: 'flex-end',
                    },
                  ]}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {customFormatMoney(item.totalAmount || 0)}
                </Text>
                {checkStatus(item.status)}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.con}>
      {/* HEADER */}
      <HeaderBar
        title={'txtHomeFeeInvoice'}
        hasBack
        onBack={onFunction.onPressBack}
        titleCenter={false}
      />

      {/* STATISTICS */}
      <View
        style={[
          {
            margin: 10,
            padding: 10,
            backgroundColor: COLOR.backgroundSec,
            borderRadius: 10,
          },
        ]}>
        <Text style={styles.txt_title_item}>
          {LANG[CONFIG.lang].txtTotalPayment}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}>
            <Text
              style={[styles.txt_price_item, {fontWeight: 'bold'}]}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {customFormatMoney(state?._amountFeeInvoice?.totalPaid || 0)}
            </Text>
            <Text style={styles.txt_content_item}>
              {LANG[CONFIG.lang].txtTotalPaid}
            </Text>
          </View>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}>
            <Text
              style={[styles.txt_price_item, {fontWeight: 'bold'}]}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {customFormatMoney(state?._amountFeeInvoice?.totalUnpaid || 0)}
            </Text>
            <Text style={styles.txt_content_item}>
              {LANG[CONFIG.lang].txtTotalUnpaid}
            </Text>
          </View>
        </View>
      </View>

      {/* LIST FeeInvoice */}
      {!state._loading && (
        <View
          style={{
            margin: 10,
            marginTop: 0,
            borderRadius: 10,
            backgroundColor: COLOR.backgroundSec,
            overflow: 'hidden',
          }}>
          <FlatList
            contentContainerStyle={{flexGrow: 1}}
            data={state._dataFeeInvoice}
            renderItem={({item, index}) =>
              renderItem(item, index, state._dataFeeInvoice?.length)
            }
            keyExtractor={(item, index) => index.toString()}
            refreshing={state._refreshing}
            onEndReachedThreshold={0.05}
            onRefresh={onFunction.onRefresh}
            onEndReached={onFunction.onLoadMore}
            ListHeaderComponent={ViewHeaderList(state, onFunction)}
            ListEmptyComponent={ViewListEmpty}
            stickyHeaderIndices={[0]}
            scrollIndicatorInsets={{right: 1}}
          />
        </View>
      )}

      {state._loading && (
        <View style={styles.loading}>
          <ActivityIndicator size={'small'} color={COLOR.backgroundMain} />
        </View>
      )}
    </View>
  );
};
