/**
 * @Description: Fee Invoice
 * @Created by ZiniTeam
 * @Date create: 15/01/2020
 */
/** LIBRARY */
import React from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
import { bindActionCreators } from "redux";
/** COMMON */
import { CONFIG, COLOR, DEVICE, LANG } from "../../../config";
import Services from "../../../services";
import Helpers from "../../../helpers";
/** COMPONENT */
import HeaderBar from "../../partials/header_bar";
import CImage from "../../../components/CImage";
import CLoading from "../../../components/CLoading";
import CText from "../../../components/CText";
/** STYLES */
import styles from "./style";
/** REDUX */
import * as loginActions from "../../../redux/actions/login";
import * as loadingActions from "../../../redux/actions/loading";
import { customFormatMoney } from "../../../utils/formatPrice";

class TeacherFeeInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _loadForList: true,
      _dataStudents: [],
      _dataClasses: props.login.data.classes,
      _classChoose: null,
    };
  }

  /** FUNCTION */
  _checkClasses = async () => {
    let _classChoose = await Helpers.getAsyStrClassChoosed();
    if (_classChoose) {
      _classChoose = JSON.parse(_classChoose);
    }
    this._getListStudentByClassID(_classChoose);
  };

  _getListStudentByClassID = async (classObj) => {
    let { _dataStudents } = this.state;
    let resultClassInfo = await Services.Class.fetchClassInfo(classObj.id);
    if (resultClassInfo) {
      _dataStudents = resultClassInfo.data.students;
    }

    this.setState({
      _dataStudents,
      _classChoose: classObj,
      _loading: false,
      _loadForList: false,
    });
  };

  _onPressChooseClass = async (classObj) => {
    if (classObj.id !== this.state._classChoose.id) {
      this.setState({ _loading: true });
      await Helpers.setAsyStrClassChoosed(JSON.stringify(classObj));
      this._getListStudentByClassID(classObj);
    }
  };

  _onPressItemStudent = (item) => {
    this.props.navigation.navigate("TeacherFeeInvoiceList", {
      selectedStudent: item,
      dataClass: this.state._classChoose,
      onRefresh: () => this._onRefresh(),
    });
  };

  _onRefresh = () => {
    this._checkClasses();
  };

  /** HANDLE FUNCTIONS */
  _onPressBack = () => {
    this.props.route.params?.onRefresh?.();
    this.props.navigation.goBack();
  };

  _viewNoItemStudent = () => {
    return (
      <View style={styles.con_not_info}>
        {/* <Icon
          name={"search"}
          size={Helpers.fS(50)}
          color={COLOR.placeholderTextColor}
          type={"light"}
        /> */}
        <FontAwesome5
          name={"search"}
          size={Helpers.fS(50)}
          color={COLOR.placeholderTextColor}
        />
        <CText
          style={styles.txt_empty_student}
          i18nKey={"txtEmptySearchStudent"}
        />
      </View>
    );
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._checkClasses();
  }

  /** RENDER */
  render() {
    const { _loading, _dataStudents } = this.state;
    // console.log('_dataStudents: ', _dataStudents);
    return (
      <View style={styles.con}>
        {/* HEADER */}
        <HeaderBar
          title={"txtHomeFeeInvoice"}
          hasBack
          onBack={this._onPressBack}
          hasCustomHeaderRight={true}
          loadCustomHeaderRight={this.state._loadForList}
          dataCustomHeaderRight={this.state._dataClasses}
          dataChooseCustomHeaderRight={this.state._classChoose}
          onCustomHeaderRight={this._onPressChooseClass}
        />

        {/* LIST STUDENTS */}
        {!_loading && (
          <FlatList
            style={styles.con}
            contentContainerStyle={[
              DEVICE.gStyle.grow,
              styles.listStudentContent,
            ]}
            data={_dataStudents}
            renderItem={({ item, index }) => {
              let gender = CONFIG.students.find((f) => f.id === item.gender);
              if (gender) {
                gender = gender.path;
              } else {
                gender = CONFIG.students[0].path;
              }
              let newFullName = Helpers.capitalizeName(
                item.firstName,
                item.lastName,
                CONFIG.settingLocal.softName
              );

              return (
                <TouchableOpacity
                  style={styles.rowItemStudent}
                  onPress={() => this._onPressItemStudent(item)}
                >
                  <View style={styles.con_left_row_student}>
                    <CImage
                      style={styles.con_avatar}
                      resizeMode={"contain"}
                      src={
                        item.avatar != "" && item.avatar != null
                          ? { uri: CONFIG.host + item.avatar }
                          : gender
                      }
                    />
                    <View
                      style={[
                        styles.nameArea,
                        index == _dataStudents.length - 1
                          ? { borderBottomWidth: 0 }
                          : {},
                        { marginLeft: 15 },
                      ]}
                    >
                      <View>
                        <Text style={styles.txtNameStudent}>{newFullName}</Text>
                        <Text style={styles.txtInfoStudent}>
                          {item?.totalUnpaid
                            ? `${
                                LANG[CONFIG.lang].txtHomeFeeInvoice
                              }:\u00A0${customFormatMoney(item.totalUnpaid)}`
                            : ""}
                        </Text>
                      </View>
                      {/* <Icon
                        name={"chevron-right"}
                        color={COLOR.txtColor}
                        size={20}
                        type={"light"}
                      /> */}
                      <FontAwesome5
                        name={"chevron-right"}
                        color={COLOR.txtColor}
                        size={20}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={this._viewNoItemStudent}
            keyExtractor={(item, index) => index.toString()}
            keyboardShouldPersistTaps={"handled"}
            scrollIndicatorInsets={{ right: 1 }}
          />
        )}

        {_loading && (
          <View style={DEVICE.gStyle.full_center}>
            <CLoading />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    language: state.language.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherFeeInvoice);
