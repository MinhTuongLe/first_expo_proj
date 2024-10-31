/**
 ** FileName:
 ** FileAuthor:
 ** FileCreateAt:
 ** FileDescription:
 **/
/* LIBRARY */
import React from "react";
import { Linking, Platform } from "react-native";
// import Share from "react-native-share";
// import Clipboard from "@react-native-clipboard/clipboard";
import { connect } from "react-redux";
import * as FileSystem from "expo-file-system";

/** COMPONENT */
import { ViewFeeInvoiceSummary } from "./render";
/** COMMON */
import Services from "../../../services";
import Helpers from "../../../helpers";
import { CONFIG, dataBanks, LANG } from "../../../config";

class FeeInvoiceSummaryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: false,
      _success: false,
      _error: false,
      _selectedStudent: props.route.params.selectedStudent,
      _dataFeeInvoice: props.route.params.dataFeeInvoice,
      _method: props.route.params.method,
      _bank: props.route.params.bank,
      _parentId: props.route.params.parentId,
      // _setting: props.route.params.setting,
      _note: "",
      _errText: "",
      _banksData: [],
      svg: null,
    };
  }

  /** FUNCTIONS */
  _onChangeNote = (text) => {
    this.setState({ _note: text, _errText: "" });
  };

  _onSubmitPayment = () => {
    if (this.state._note === "") return this._error("txtFillNote");
    this.setState({
      _loading: true,
      _success: false,
      _error: false,
      _errText: "",
    });
    this._submitPayment();
  };

  _submitPayment = async () => {
    let { _note, _bank, _parentId, _method, _dataFeeInvoice } = this.state;
    let params = {
      feeInvoiceId: _dataFeeInvoice.id,
      method: _method,
      parentId: _parentId,
      note: _bank.code + "_" + _note,
      school: this.props.login.data.school,
    };
    // console.log("params", params)
    let res = await Services.Payment.add(params);
    if (res) {
      if (res.chargeStatus === "fail")
        return this._error("paymentServiceError");
      // console.log('---> RESPONSE BANK: ', res.payment);
      this.setState({ _success: true, _loading: false });
    } else this._error("serverError");
  };

  _error = (slug) => {
    this.setState({ _loading: false, _error: true, _errText: slug });
  };

  _onPressGoToHomepage = () => {
    Helpers.resetNavigation(this.props.navigation, "RootDrawer");
  };

  /** HANDLE FUNCTIONS */
  _onPressBack = (_method) => {
    this.props.route.params?.onRefresh?.();
    // this.props.navigation.goBack();

    this.props.navigation.navigate("FeeInvoiceDetail", {
      lastMethod: _method,
    });
    this.props.route.params;
  };

  _copyToClipboard = (string) => {
    // Clipboard.setString(string);
    // Helpers.toast("Copied");
  };

  _openDeepLinkApp = (deeplink) => {
    Linking.openURL(deeplink).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  _handleConfirmPayment = async (_method) => {
    // let {_dataFeeInvoice, _detailData, _errText, _error} = this.state;
    let res = await Services.FeeInvoice.updatePaymentStatus(
      this.state._dataFeeInvoice
    );

    if (res) {
      this.props.navigation.navigate("FeeInvoiceDetail", {
        lastMethod: _method,
      });
      this.props.route.params;
    }
  };

  _onGetBanksData = async () => {
    try {
      const response = await fetch(
        `https://api.vietqr.io/v2/${Platform.OS}-app-deeplinks`
      );
      const json = await response.json();
      const _banksData = json?.apps?.map((bank) => {
        const mappedBank = dataBanks.filter(
          (item) => item.name.toLowerCase() === bank.bankName.toLowerCase()
        );

        return {
          ...bank,
          appLogo: mappedBank?.[0]?.logo,
        };
      });

      this.setState({
        _banksData,
      });
    } catch (error) {
      console.error(error);
    }
  };

  _onPressDownload = async () => {
    if (this.state.svg) {
      this.state.svg.toDataURL(async (dataURL) => {
        const fileUrl = `data:image/png;base64,${dataURL}`;
        const fileName = "QR_Code.png"; // Đặt tên tệp với đuôi .png

        await this.callback2(fileUrl, fileName);
      });
    }
  };

  setSvgRef = (svg) => {
    if (!this.state.svgSet) {
      this.setState({ svg, svgSet: true });
    }
  };

  _onPressShare = () => {
    this.state.svg.toDataURL(this.callback);
  };

  callback = (dataURL) => {
    console.log("do action share!");
    let shareImageBase64 = {
      title: "QR Code",
      url: `data:image/png;base64,${dataURL}`,
      subject: "Share QR Code",
    };
    console.log("shareImageBase64: ", shareImageBase64);
    // Share.open({
    //   title: shareImageBase64.title,
    //   url: shareImageBase64.url,
    //   subject: shareImageBase64.subject,
    // }).catch((error) => console.log(error));
  };

  // callback2 = async (fileUrl, fileName) => {
  //   const basePath =
  //     Platform.OS === 'android'
  //       ? RNFS.DownloadDirectoryPath + '/Kindie'
  //       : RNFS.LibraryDirectoryPath;
  //   const filePath = basePath + '/' + fileName;

  //   try {
  //     const exists = await RNFS.exists(basePath);
  //     if (!exists) {
  //       await RNFS.mkdir(basePath);
  //     }

  //     // Convert base64 data to a file
  //     const base64Data = fileUrl.replace(/^data:image\/png;base64,/, '');
  //     await RNFS.writeFile(filePath, base64Data, 'base64');

  //     Helpers.toast(LANG[CONFIG.lang].txtDownloadSuccessfully);
  //     console.log('File downloaded!', filePath);
  //   } catch (err) {
  //     Helpers.toast(LANG[CONFIG.lang].txtDownloadFailed);
  //     console.log('Download error:', err);
  //   }
  // };

  callback2 = async (fileUrl, fileName) => {
    const basePath =
      Platform.OS === "android"
        ? FileSystem.documentDirectory + "Kindie/"
        : FileSystem.documentDirectory + "Kindie/"; // Sử dụng documentDirectory cho cả Android và iOS
    const filePath = basePath + fileName;

    try {
      // Kiểm tra xem thư mục đã tồn tại chưa
      const dirInfo = await FileSystem.getInfoAsync(basePath);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(basePath, { intermediates: true });
      }

      // Chuyển đổi dữ liệu base64 thành tệp
      const base64Data = fileUrl.replace(/^data:image\/png;base64,/, "");
      await FileSystem.writeAsStringAsync(filePath, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      Helpers.toast(LANG[CONFIG.lang].txtDownloadSuccessfully);
      console.log("File downloaded!", filePath);
    } catch (err) {
      Helpers.toast(LANG[CONFIG.lang].txtDownloadFailed);
      console.log("Download error:", err);
    }
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._onGetBanksData();
  }

  /** RENDER */
  render() {
    return (
      <ViewFeeInvoiceSummary
        state={this.state}
        onFunction={{
          onChangeText: this._onChangeNote,
          onPressBack: this._onPressBack,
          addPayment: this._onSubmitPayment,
          onPressGoToHomepage: this._onPressGoToHomepage,
          copyToClipboard: this._copyToClipboard,
          openDeepLinkApp: this._openDeepLinkApp,
          handleConfirmPayment: this._handleConfirmPayment,
          onPressDownload: this._onPressDownload,
          onPressShare: this._onPressShare,
          setSvgRef: this.setSvgRef,
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    language: state.language.language,
    setting: state.setting,
  };
};

export default connect(mapStateToProps, null)(FeeInvoiceSummaryScreen);
