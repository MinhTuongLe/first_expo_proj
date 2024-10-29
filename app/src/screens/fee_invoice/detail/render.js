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
  ScrollView,
  ImageBackground,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-fontawesome-pro';
/* COMPONENTS */
import HeaderBar from '../../partials/header_bar';
import CImage from '../../../components/CImage';
import CButton from '../../../components/CButton';
import CText from '../../../components/CText';
/** COMMON */
import Helpers from '../../../helpers';
import {CONFIG, DEVICE, COLOR, KEY, LANG, ASSETS} from '../../../config';
/** STYLES */
import styles from './styles';
import moment from 'moment';
import {customFormatMoney} from '../../../utils/formatPrice';

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
    <View style={[styles.con_status, {backgroundColor: bgColorStatus}]}>
      <CText style={styles.txt_status} i18nKey={i18nKey} />
    </View>
  );
};

const ViewHeaderList = state => {
  let gender = CONFIG.students.find(
    f => f.id === state._selectedStudent.gender,
  );
  if (gender) {
    gender = gender.path;
  } else {
    gender = CONFIG.students[0].path;
  }
  let avatarChildren =
    state._selectedStudent.avatar &&
    state._selectedStudent.avatar != '' &&
    state._selectedStudent.avatar != null
      ? {uri: CONFIG.host + state._selectedStudent.avatar}
      : gender;
  let newFullName = Helpers.capitalizeName(
    state._selectedStudent.firstName,
    state._selectedStudent.lastName,
    CONFIG.settingLocal.softName,
  );

  return (
    <View style={styles.con_header}>
      <CImage
        style={styles.con_avatar}
        src={avatarChildren}
        resizeMode={'cover'}
      />
      <Text style={styles.txtNameStudent}>{newFullName}</Text>
    </View>
  );
};

const renderFooter = state => {
  return (
    <View
      style={[
        styles.rowItem,
        {
          paddingTop: 10,
          borderTopColor: COLOR.borderColorSec,
          borderTopWidth: 1,
          marginTop: state?._detailData?.length > 0 ? 0 : 10,
          borderBottomWidth: 0,
        },
      ]}>
      <CText style={styles.txt_total} i18nKey={'total'} />
      <Text style={[styles.txt_total, {fontWeight: 700}]}>
        {customFormatMoney(state._dataFeeInvoice.totalAmount || 0)}
      </Text>
    </View>
  );
};

const renderHeader = () => {
  return (
    <View
      style={{
        backgroundColor: COLOR.backgroundSec,
      }}>
      <Text
        style={[
          styles.txt_title_item,
          {
            textTransform: 'none',
          },
        ]}>
        {LANG[CONFIG.lang].txtListOfFeeInvoice}
      </Text>
    </View>
  );
};

const renderItem = (index, item) => {
  return (
    <View
      style={[
        styles.rowItem,
        index === 0 && {
          borderTopColor: COLOR.borderColorSec,
          borderTopWidth: 1,
          marginTop: 15,
        },
        {borderBottomWidth: 0},
      ]}>
      <View style={styles.con_title_left_item}>
        <CText style={styles.txt_title_left_item} numberOfLines={2}>
          {item.itemTitle.trim()}{' '}
          <CText style={styles.txt_title_left_item}>
            {item.numberOfItems > 1 && ' x ' + item.numberOfItems}
          </CText>
        </CText>
      </View>

      <View style={styles.con_title_right_item}>
        <Text style={styles.txt_res_right_item}>
          {customFormatMoney(item.totalPerItem || 0)}
        </Text>
      </View>
    </View>
  );
};

export const ViewFeeInvoiceDetail = ({
  state = null,
  dataBank = [],
  onFunction = {
    formatMoney: () => {},
    addPayment: () => {},
    onChangeText: () => {},
    onChangeMethod: () => {},
    onChangeBank: () => {},
    onScrollList: () => {},
    copyToClipboard: () => {},
  },
  onPressBack,
  settingTransfer = false,
  settingPaypal = false,
  settingCash = false,
}) => {
  return (
    <View style={styles.con}>
      {/* HEADER */}
      <HeaderBar title={'txtHomeFeeInvoice'} hasBack onBack={onPressBack} />

      {/* HEADER FeeInvoice */}
      {/* {ViewHeaderList(state)} */}
      {/* CONTENT */}
      <ScrollView style={DEVICE.gStyle.container}>
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
          <View
            style={{
              // borderBottomColor: COLOR.borderColorSec,
              // borderBottomWidth: 1,
              paddingBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 4,
              }}>
              <Text
                style={[
                  styles.txt_title_item,
                  {
                    textTransform: 'none',
                  },
                ]}>
                #{state._dataFeeInvoice.title}
              </Text>
              {checkStatus(state._dataFeeInvoice?.status)}
            </View>
            <Text style={styles.txt_content_item}>
              {LANG[CONFIG.lang].txtDeadline}:{' '}
              {moment(state._dataFeeInvoice.deadline, 'YYYY-MM-DD').format(
                'DD/MM',
              )}
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
                  {customFormatMoney(state?._dataFeeInvoice?.paidAmount || 0)}
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
                  {customFormatMoney(
                    state?._dataFeeInvoice?.totalAmount -
                      state?._dataFeeInvoice?.paidAmount || 0,
                  )}
                </Text>
                <Text style={styles.txt_content_item}>
                  {LANG[CONFIG.lang].txtTotalUnpaid}
                </Text>
              </View>
            </View>
          </View>

          <FlatList
            contentContainerStyle={styles.pt_10}
            data={state._detailData}
            renderItem={({item, index}) => renderItem(index, item)}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={renderFooter(state)}
            ListHeaderComponent={renderHeader()}
            stickyHeaderIndices={[0]}
            scrollEnabled={false}
            scrollIndicatorInsets={{right: 1}}
          />
        </View>

        {/*           
        <View style={styles.content}>
          <CText
            style={[styles.txt_title_item, {fontSize: Helpers.fS(18)}]}
            numberOfLines={3}
            upperCase>
            {state._dataFeeInvoice.title}
          </CText>

          <View style={[styles.rowItem, {borderBottomWidth: 0}]}>
            <CText
              style={[styles.txt_title_left_item, {paddingLeft: 0}]}
              i18nKey={'created'}
            />
            <Text style={styles.txt_res_right_time}>
              {moment(state._dataFeeInvoice.createdAt).format(
                CONFIG.formatDateSetting,
              )}
            </Text>
          </View>
          <View style={[styles.rowItem, {borderBottomWidth: 0}]}>
            <CText
              style={[styles.txt_title_left_item, {paddingLeft: 0}]}
              i18nKey={'status'}
            />
          </View>
        </View> */}
        <ViewModalList
          state={state}
          dataBank={dataBank}
          settingTransfer={settingTransfer}
          settingPaypal={settingPaypal}
          settingCash={settingCash}
          onFunction={{
            addPayment: onFunction.onPressAddPayment,
            onChangeText: onFunction.onChangeNote,
            onChangeMethod: onFunction.onChangeMethod,
            onChangeBank: onFunction.onChangeBank,
            onScrollList: onFunction.onScrollList,
            copyToClipboard: onFunction.copyToClipboard,
          }}
        />
      </ScrollView>

      {CONFIG.USER_TYPE == KEY.PARENT &&
        // state._dataFeeInvoice.status === CONFIG.FEE_INVOICE.UNPAID
        //  &&
        dataBank.length > 0 && (
          <View
            style={[
              styles.con_button_payment,
              {backgroundColor: COLOR.backgroundMain},
            ]}>
            <CButton
              style={styles.submit_group_submit}
              onPress={onFunction.addPayment}>
              <CText
                style={{
                  fontFamily: DEVICE.fontBold,
                  color: '#ffffff',
                }}
                i18nKey={
                  state._method === CONFIG.CASH
                    ? 'verifyPayment'
                    : 'choosePayment'
                }
              />
            </CButton>
          </View>
        )}
      {CONFIG.USER_TYPE == KEY.PARENT &&
        !settingCash &&
        (!settingTransfer || dataBank.length <= 0) &&
        !settingPaypal && (
          <CText style={styles.txt_error} i18nKey={'no_transfer_info'} />
        )}
    </View>
  );
};

export const ViewModalList = ({
  settingPaypal = false,
  settingTransfer = false,
  settingCash = false,
  dataBank = [],
  onFunction = {
    addPayment: () => {},
    onChangeText: () => {},
    onChangeMethod: () => {},
    onChangeBank: () => {},
    onScrollList: () => {},
    copyToClipboard: () => {},
  },
  state = null,
}) => {
  const renderItemBank = (
    item,
    index,
    bankSelected,
    method,
    onChangeBank,
    viewableBank,
  ) => {
    let colorTextBankTitle =
      state._method === CONFIG.BANK ? 'white' : COLOR.placeholderTextColor;

    return (
      <TouchableOpacity
        onPress={() => {
          onChangeBank(index);
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 180,
          }}>
          <ImageBackground
            style={[
              styles.card_info,
              {
                marginLeft: index !== 0 ? 20 : 0,
                width:
                  index === viewableBank
                    ? DEVICE.width - 24
                    : DEVICE.width - 36,
                height: index === viewableBank ? 180 : 164,
              },
            ]}
            source={ASSETS.card}>
            <View
              style={[
                styles.overlay,
                {
                  width:
                    index === viewableBank
                      ? DEVICE.width - 24
                      : DEVICE.width - 36,
                  height: index === viewableBank ? 180 : 164,
                },
              ]}>
              <View style={styles.con_card}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    onChangeBank(index);
                  }}
                  disabled={method !== CONFIG.BANK}>
                  <Icon
                    name={bankSelected === index ? 'check-circle' : 'circle'}
                    color={colorTextBankTitle}
                    size={18}
                    type={bankSelected === index ? 'solid' : 'light'}
                  />
                  <Text
                    style={[
                      {
                        fontFamily: DEVICE.fontRegular,
                        fontSize: Helpers.fS(16),
                        color: COLOR.text_1,
                        paddingHorizontal: 5,
                      },
                      {color: colorTextBankTitle},
                    ]}>
                    {item.bankCode}
                  </Text>
                </TouchableOpacity>
                <View>
                  <CText
                    style={[
                      {
                        fontSize: Helpers.fS(12),
                        fontFamily: DEVICE.fontRegular,
                      },
                      {color: colorTextBankDes},
                    ]}
                    i18nKey={'accountName'}
                  />
                  <CText
                    style={[
                      styles.txtCard,
                      {
                        fontSize: Helpers.fS(20),
                        color: colorTextBankTitle,
                        fontWeight: 'bold',
                        lineHeight: 24,
                      },
                    ]}
                    numberOfLines={2}>
                    {item.accountName}
                  </CText>
                </View>
                <View>
                  <CText
                    style={[
                      {
                        fontSize: Helpers.fS(12),
                        fontFamily: DEVICE.fontRegular,
                      },
                      {color: colorTextBankDes},
                    ]}
                    i18nKey={'accountNumber'}
                  />
                  <View style={styles.con_row_card}>
                    <View
                      style={{
                        borderStyle: 'dashed',
                        borderWidth: 1,
                        borderColor: 'white',
                        height: 42,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 21,
                        paddingHorizontal: 25,
                        marginTop: 4,
                      }}>
                      <CText
                        style={[
                          styles.txtCard,
                          {
                            fontSize: Helpers.fS(20),
                            color: colorTextBankTitle,
                            letterSpacing: 4,
                            fontWeight: 'bold',
                          },
                        ]}
                        numberOfLines={2}
                        // upperCase
                      >
                        {item.accountNumber}
                      </CText>
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'transparent',
                        marginLeft: 20,
                      }}
                      onPress={() =>
                        onFunction.copyToClipboard(item.accountNumber)
                      }>
                      <Icon
                        name={'copy'}
                        size={Helpers.fS(22)}
                        color={'white'}
                        type={'regular'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  const colorTextBankTitle =
    state._method === CONFIG.BANK ? COLOR.text_1 : COLOR.placeholderTextColor;
  const colorTextBankDes =
    state._method === CONFIG.BANK ? 'white' : COLOR.placeholderTextColor;

  const colorTextCashTitle =
    state._method === CONFIG.CASH ? 'white' : COLOR.placeholderTextColor;
  const colorTextCashDes =
    state._method === CONFIG.CASH ? 'white' : COLOR.placeholderTextColor;

  return (
    <View style={styles.con_modal}>
      {settingCash ||
        (settingTransfer && dataBank.length > 0) ||
        (settingPaypal && (
          <View style={{backgroundColor: COLOR.backgroundMain}}>
            <Text style={styles.modal_title}>
              {LANG[CONFIG.lang].txtSelectPaymentMethod}
            </Text>
          </View>
        ))}
      {settingCash && (
        <>
          <TouchableOpacity
            style={styles.modal_method}
            onPress={() => onFunction.onChangeMethod(CONFIG.CASH)}>
            <Icon
              name={state._method === CONFIG.CASH ? 'scrubber' : 'circle'}
              size={Helpers.fS(20)}
              color={COLOR.txt_3}
              type={state._method === CONFIG.CASH ? 'solid' : 'regular'}
            />
            <CText
              style={[styles.textMethod, {color: COLOR.txt_3}]}
              i18nKey={'cash'}
            />
          </TouchableOpacity>

          {state._method === CONFIG.CASH && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                style={[
                  styles.card_info,
                  {
                    width: DEVICE.width - 24,
                    height: 180,
                    marginVertical: 10,
                  },
                ]}
                source={ASSETS.card}>
                <View
                  style={[
                    styles.overlay,
                    {
                      width: DEVICE.width - 24,
                      height: 180,
                    },
                  ]}>
                  <View style={styles.con_card}>
                    <Text
                      style={[
                        {
                          fontFamily: DEVICE.fontRegular,
                          fontSize: Helpers.fS(16),
                          color: COLOR.text_1,
                          paddingHorizontal: 5,
                          lineHeight: 24,
                        },
                        {color: colorTextCashTitle},
                      ]}>
                      {CONFIG.CASH_MESSAGE}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
          )}
        </>
      )}

      {settingTransfer && dataBank.length > 0 && (
        <>
          <TouchableOpacity
            style={styles.modal_method}
            onPress={() => onFunction.onChangeMethod(CONFIG.BANK)}>
            <Icon
              name={state._method === CONFIG.BANK ? 'scrubber' : 'circle'}
              size={Helpers.fS(20)}
              color={COLOR.txt_3}
              type={state._method === CONFIG.BANK ? 'solid' : 'regular'}
            />
            <CText
              style={[styles.textMethod, {color: COLOR.txt_3}]}
              i18nKey={'bankTranfer'}
            />
          </TouchableOpacity>

          {state._method === CONFIG.BANK && (
            <View
              style={[
                styles.bankInfo,
                {backgroundColor: COLOR.backgroundMain},
              ]}>
              <FlatList
                data={dataBank}
                contentContainerStyle={{paddingVertical: 10}}
                renderItem={({item, index}) =>
                  renderItemBank(
                    item,
                    index,
                    state._bank,
                    state._method,
                    onFunction.onChangeBank,
                    state._viewableBank,
                  )
                }
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={true}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                viewabilityConfig={{
                  itemVisiblePercentThreshold: 70,
                }}
                onViewableItemsChanged={onFunction.onScrollList}
              />

              {/* <View style={styles.con_info_bank}>
              <View style={{justifyContent: 'flex-start'}}>
                <Text
                  style={[
                    {
                      fontSize: Helpers.fS(16),
                      fontFamily: DEVICE.fontRegular,
                      color: colorTextBankTitle,
                      paddingVertical: 5,
                    },
                  ]}
                  numberOfLines={2}>
                  {dataBank[state._bank].bankName}
                </Text>
              </View>
              <Text
                style={[
                  DEVICE.initFont.SMALL,
                  {
                    color: colorTextBankTitle,
                    fontFamily: DEVICE.fontMedium,
                  },
                ]}
                numberOfLines={2}>
                {dataBank[state._bank].accountName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 5,
                }}>
                <CText
                  style={[
                    {
                      fontSize: Helpers.fS(14),
                      fontFamily: DEVICE.fontRegular,
                    },
                    {color: colorTextBankDes},
                  ]}
                  i18nKey={'accountNumber'}
                />

                <Text
                  style={[
                    DEVICE.initFont.SMALL,
                    {
                      color: colorTextBankTitle,
                      fontFamily: DEVICE.fontMedium,
                    },
                  ]}>
                  {' '}
                  {dataBank[state._bank].accountNumber}{' '}
                </Text>
              </View>
            </View> */}
            </View>
          )}
        </>
      )}

      {settingPaypal && (
        <TouchableOpacity
          style={[styles.modal_method, {borderBottomWidth: 0}]}
          onPress={() => onFunction.onChangeMethod(CONFIG.PAYPAL)}>
          <Icon
            name={state._method === CONFIG.PAYPAL ? 'scrubber' : 'circle'}
            size={Helpers.fS(20)}
            color={COLOR.txt_3}
            type={state._method === CONFIG.PAYPAL ? 'solid' : 'regular'}
          />
          <CText
            style={[styles.textMethod, {color: COLOR.txt_3}]}
            i18nKey={'paypalPayment'}
          />
        </TouchableOpacity>
      )}

      {/* <View
        style={{
          backgroundColor: COLOR.backgroundMain,
          marginTop: 10,
          paddingHorizontal: 10,
        }}>
        <CButton
          style={styles.submit_group_submit}
          onPress={onFunction.addPayment}>
          <CText
            style={{
              fontFamily: DEVICE.fontBold,
              fontSize: Helpers.fS(20),
              color: '#ffffff',
            }}
            i18nKey={'nextStep'}
          />
        </CButton>
      </View> */}
    </View>
  );
};
