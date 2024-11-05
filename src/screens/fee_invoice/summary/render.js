/**
 ** FileName:
 ** FileAuthor:
 ** FileCreateAt:
 ** FileDescription:
 **/
/* LIBRARY */
import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Modal,
  ActivityIndicator,
  ImageBackground,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
/* COMPONENTS */
import HeaderBar from "../../partials/header_bar";
import CText from "../../../components/CText";
import CButton from "../../../components/CButton";
/** COMMON */
import { COLOR, LANG, CONFIG, DEVICE, ASSETS } from "../../../config";
import Helpers from "../../../helpers";
/** STYLE */
import styles from "./style";
import CImage from "../../../components/CImage";
import { customFormatMoney } from "../../../utils/formatPrice";

export const ViewFeeInvoiceSummary = ({
  state = null,
  onFunction = {
    onChangeText: () => {},
    onPressBack: () => {},
    addPayment: () => {},
    onPressGoToHomepage: () => {},
    copyToClipboard: () => {},
    openDeepLinkApp: () => {},
    handleConfirmPayment: () => {},
    onPressDownload: () => {},
    onPressShare: () => {},
    setSvgRef: (c) => {},
  },
}) => {
  // let transferNote =
  //   state._setting && state._setting.config.value.transferNote !== ''
  //     ? state._setting.config.value.transferNote
  //     : LANG[CONFIG.lang].notes_payment_bank;

  const columnWidth = (DEVICE.width - 20 - 10 * 2) / 3;

  let bankObj = state._banksData?.filter(
    (item) => item.appId.toLowerCase() === state._bank.bankCode.toLowerCase()
  )?.[0];

  let paymentInfos = [
    {
      name: "accountName",
      value: state._bank.accountName,
      copyable: false,
      isNumber: false,
    },
    {
      name: "accountNumber",
      value: state._bank.accountNumber,
      copyable: true,
      isNumber: false,
    },
    {
      name: "paidAmount",
      value: state._dataFeeInvoice.totalAmount,
      copyable: true,
      isNumber: true,
    },
    {
      name: "content",
      value: state._dataFeeInvoice.code,
      copyable: true,
      isNumber: false,
    },
  ];

  const renderItem = (item, index) => {
    return (
      <View
        style={{
          marginTop: 10,
          borderBottomColor: COLOR.borderColorSec,
          borderBottomWidth: index < paymentInfos.length - 1 ? 1 : 0,
          paddingBottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <CText
            style={[
              {
                fontSize: Helpers.fS(10),
                fontFamily: DEVICE.fontRegular,
              },
              { color: COLOR.text_2 },
            ]}
            i18nKey={item.name}
          />
          <View style={[styles.con_row_card, { marginTop: 2 }]}>
            <CText
              style={[
                styles.txtCard,
                {
                  fontSize: Helpers.fS(14),
                  color: COLOR.txtColor,
                  fontWeight: "bold",
                },
              ]}
              numberOfLines={1}
            >
              {item.isNumber ? customFormatMoney(item.value) : item.value}
            </CText>
          </View>
        </View>

        {item.copyable && (
          <TouchableOpacity
            style={{
              backgroundColor: "transparent",
              marginLeft: 20,
            }}
            onPress={() => onFunction.copyToClipboard(item.value.toString())}
          >
            {/* <Icon
              name={"copy"}
              size={Helpers.fS(16)}
              color={COLOR.text_2}
              type={"regular"}
            /> */}
            <FontAwesome5
              name={"copy"}
              size={Helpers.fS(16)}
              color={COLOR.text_2}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.con}>
      {/* HEADER */}
      <HeaderBar
        title={"bankTranfer"}
        hasBack
        onBack={() => onFunction.onPressBack(state._method)}
      />

      <View
        style={{
          backgroundColor: COLOR.backgroundSec,
          margin: 10,
          borderRadius: 10,
          padding: 10,
        }}
        keyboardShouldPersistTaps={"handled"}
      >
        {/* QR Code */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 30,
          }}
        >
          <TouchableOpacity onPress={onFunction.onPressDownload}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Icon
                name={"download"}
                size={20}
                color={COLOR.cor_xam}
                type={"light"}
              /> */}
              <FontAwesome5 name={"download"} size={20} color={COLOR.cor_xam} />
              <Text
                style={{
                  fontSize: Helpers.fS(10),
                  marginTop: 2,
                }}
              >
                {LANG[CONFIG.lang].download}
              </Text>
            </View>
          </TouchableOpacity>
          <QRCode
            value={state._bank.vietQR.qrCode}
            size={100}
            getRef={(c) => onFunction.setSvgRef(c)}
          />
          <TouchableOpacity onPress={onFunction.onPressShare}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Icon
                name={"share"}
                size={20}
                color={COLOR.cor_xam}
                type={"light"}
              /> */}
              <FontAwesome5 name={"share"} size={20} color={COLOR.cor_xam} />
              <Text
                style={{
                  fontSize: Helpers.fS(10),
                  marginTop: 2,
                }}
              >
                {LANG[CONFIG.lang].share}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bank info */}
        {bankObj && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginTop: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 5,
              }}
            >
              <CImage
                style={{
                  height: 40,
                  width: 100,
                }}
                src={{
                  uri: bankObj?.appLogo,
                }}
                resizeMode={"cover"}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  fontSize: Helpers.fS(14),
                  color: COLOR.txtColor,
                  fontWeight: "bold",
                }}
              >
                {state._bank.bankName}
              </Text>
            </View>
          </View>
        )}

        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={paymentInfos}
          renderItem={({ item, index }) => renderItem(item, index)}
          onEndReachedThreshold={0.05}
          stickyHeaderIndices={[0]}
          scrollIndicatorInsets={{ right: 1 }}
        />
        {/* 
        <CText style={styles.txt_title} numberOfLines={3} upperCase>
          {state._dataFeeInvoice.title}
        </CText>

        <View style={[styles.con_row_init, {paddingTop: 0}]}>
          <CText style={styles.txt_title_left_item} i18nKey={'total'} />
          <CText style={[styles.txt_res_right_item, {fontWeight: 'bold'}]}>
            {state._dataFeeInvoice.formattedTotalAmount}
          </CText>
        </View>

        {Platform.OS === 'ios' ? (
          <View style={styles.con_border_ios} />
        ) : (
          <Text style={styles.con_border_android} />
        )}

        <CText style={styles.txt_title} i18nKey={'txtMyInfoTitle'} />

        <ImageBackground style={styles.card_info} source={ASSETS.card}>
          <View style={styles.con_card}>
            <CText
              style={[
                styles.txtCard,
                {fontFamily: DEVICE.fontRegular, fontSize: Helpers.fS(18)},
              ]}>
              {state._bank.name}
            </CText>
            <View style={styles.con_row_card}>
              <CText
                style={[styles.txtCard, {fontSize: Helpers.fS(20)}]}
                numberOfLines={2}
                upperCase>
                {state._bank.accountName}
              </CText>
            </View>
            <CText
              style={[styles.txtCard, {fontFamily: DEVICE.fontRegular}]}
              i18nKey={'accountNumber'}
            />
            <View style={styles.con_row_card}>
              <CText style={[styles.txtCard, {fontSize: Helpers.fS(24)}]}>
                {state._bank.accountNumber}
              </CText>
              <TouchableOpacity
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 5,
                  padding: 5,
                }}
                onPress={() =>
                  onFunction.copyToClipboard(state._bank.accountNumber)
                }>
                <CText
                  style={[
                    styles.txtCard,
                    {color: COLOR.primaryButton, fontSize: Helpers.fS(14)},
                  ]}
                  i18nKey={'copy'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground> */}

        {/* <View style={[styles.ph_10, styles.pv_10]}>
          <TextInput
            style={styles.con_input_note}
            value={state._note}
            placeholder={transferNote}
            multiline
            autoCorrect={false}
            onChangeText={text => onFunction.onChangeText(text)}
          />
        </View> */}

        {/* {state._error && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 15,
            }}>
            <Icon name={'info-circle'} size={20} color={'red'} type={'solid'} />
            <CText style={styles.txt_error} i18nKey={'paymentServiceError'} />
          </View>
        )} */}
      </View>
      <ScrollView>
        <View style={{ padding: 10, paddingHorizontal: 5 }}>
          <CText
            style={{
              fontSize: Helpers.fS(10),
              fontFamily: DEVICE.fontRegular,
              color: COLOR.text_2,
              marginHorizontal: 5,
            }}
            i18nKey={"txtscanPrompt"}
            numberOfLines={2}
          />

          <FlatList
            contentContainerStyle={{ paddingBottom: 10, marginTop: 5 }}
            numColumns={3}
            data={state._banksData}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => onFunction.openDeepLinkApp(item.deeplink)}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      borderRadius: 5,
                      margin: 5,
                      width: columnWidth,
                    }}
                  >
                    <CImage
                      style={{
                        height: 48,
                      }}
                      src={{
                        uri: item?.appLogo,
                      }}
                      resizeMode={"contain"}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
            onEndReachedThreshold={0.5}
            getItemLayout={(data, index) => ({
              length: Helpers.wS("33.33%"),
              offset: Helpers.wS("33.33%") * index,
              index,
            })}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
      {!state._success && (
        <View
          style={[
            styles.ph_10,
            styles.pv_10,
            {
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
            },
          ]}
        >
          <CButton
            style={[
              styles.con_button,
              {
                flex: 0.5,
                backgroundColor: "white",
              },
            ]}
            onPress={() => onFunction.onPressBack(state._method)}
          >
            <CText i18nKey={"cancel"} style={{ color: COLOR.txtColor }} />
          </CButton>
          <CButton
            style={[
              styles.con_button,
              {
                flex: 0.5,
              },
            ]}
            onPress={() => onFunction.handleConfirmPayment(state._method)}
          >
            <CText i18nKey={"takePayment"} />
          </CButton>
        </View>
      )}

      {state._loading && (
        <View style={styles.loading}>
          <ActivityIndicator size={"small"} color={COLOR.backgroundMain} />
        </View>
      )}

      <Modal
        animationType={"fade"}
        visible={state._success}
        transparent
        onRequestClose={() => {}}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLOR.bgLoading,
          }}
        >
          <View
            style={{
              padding: 15,
              borderRadius: 5,
              width: Helpers.wS("70%"),
              backgroundColor: COLOR.backgroundMain,
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {/* <Icon
              containerStyle={{ paddingVertical: 10 }}
              name={"check-circle"}
              color={COLOR.primaryApp}
              size={80}
              type={"regular"}
            /> */}
            <FontAwesome5
              style={{ paddingVertical: 10 }}
              name={"check-circle"}
              color={COLOR.primaryApp}
              size={80}
            />
            <CText
              style={styles.txt_success}
              i18nKey={"sendPaymentServiceSuccess"}
              numberOfLines={2}
            />

            <CButton
              style={{ marginTop: 20 }}
              onPress={onFunction.onPressGoToHomepage}
            >
              <CText i18nKey={"goToHomePage"} />
            </CButton>
          </View>
        </View>
      </Modal>
    </View>
  );
};
