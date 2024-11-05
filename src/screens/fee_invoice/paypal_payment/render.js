/**
 ** FileName:
 ** FileAuthor:
 ** FileCreateAt:
 ** FileDescription:
 **/
/* LIBRARY */
import React from "react";
import { View, Text, ScrollView, Modal, ActivityIndicator } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
/** COMPONENT */
import HeaderBar from "../../partials/header_bar";
import CButton from "../../../components/CButton";
import CText from "../../../components/CText";
/** COMMON */
import { COLOR, ASSETS } from "../../../config";
/** STYLES */
import styles from "./style";
import { customFormatMoney } from "../../../utils/formatPrice";

export const ViewPaypalPayment = ({
  state = null,
  onFunction = {
    onChangeInfoCard: () => {},
    onPressPayment: () => {},
    onPressGoToHomepage: () => {},
  },
}) => {
  // console.log("state paypal", state);
  return (
    <View style={styles.con}>
      <HeaderBar title={"paypalPayment"} hasBack />
      <ScrollView style={styles.content} keyboardShouldPersistTaps={"handled"}>
        <View style={styles.con_invoice}>
          <View style={styles.con_row_init}>
            <Text style={styles.txt_title}>{state._dataFeeInvoice.title}</Text>
          </View>

          <View style={[styles.con_row_init, { paddingTop: 0 }]}>
            <CText style={styles.txt_title_2} i18nKey={"total"} />
            <Text style={styles.txt_result}>
              {customFormatMoney(state._dataFeeInvoice.totalAmount || 0)}
            </Text>
          </View>
        </View>

        <CreditCardInput
          requiresName
          onChange={(cardData) => onFunction.onChangeInfoCard(cardData)}
          labelStyle={styles.txt_label_card}
          inputStyle={styles.txt_input_card}
          cardImageFront={ASSETS.imgCardFront}
          cardImageBack={ASSETS.imgCardBack}
          cardScale={1.15}
        />

        {state._error && (
          <View style={styles.con_error}>
            {/* <Icon name={"info-circle"} size={20} color={"red"} type={"solid"} /> */}
            <FontAwesome5 name={"info-circle"} size={20} color={"red"} solid />
            <CText style={styles.txt_error} i18nKey={"paymentServiceError"} />
          </View>
        )}
      </ScrollView>

      {!state._success && (
        <View style={styles.p_15}>
          <CButton
            style={styles.submit_group_submit}
            onPress={onFunction.onPressPayment}
            disabled={!state._cardData.valid}
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
        <View style={styles.con_bg_popup}>
          <View style={styles.con_content_popup}>
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
              i18nKey={"paymentServiceSuccess"}
              numberOfLines={2}
            />

            <CButton
              style={[styles.submit_group_submit, { marginTop: 20 }]}
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
