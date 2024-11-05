/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
/**
 * @Description: Health Screen Logic
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** LIBRARY */
import React from "react";
import { View, TouchableOpacity, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
/** COMPONENT */
import HeaderBar from "../../partials/header_bar";
import CImage from "../../../components/CImage";
import CLoading from "../../../components/CLoading";
import CText from "../../../components/CText";
/** COMMON */
import * as loginActions from "../../../redux/actions/login";
import * as loadingActions from "../../../redux/actions/loading";
import Helpers from "../../../helpers";
import { CONFIG, DEVICE, COLOR, LANG } from "../../../config";
import Services from "../../../services";
/** STYLES */
import styles from "./style";
import { getMonthsDifference } from "../../../utils/dateTime";

class TeacherHealthScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _loadForList: true,
      _dataStudents: [],
      _dataClasses: props.login.data.classes,
      _classChoose: null,
    };
    this._arrayholder = [];
    this.inputRef = {
      value: "",
    };
  }

  /** FUNCTIONS */
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
      this._arrayholder = resultClassInfo.data.students;
    }

    this.setState({
      _dataStudents,
      _classChoose: classObj,
      _loading: false,
      _loadForList: false,
    });
  };

  _onPressItemStudent = (item) => {
    this.props.navigation.navigate("InfoHealthStudent", {
      dataStudent: item,
      dataClass: this.state._classChoose,
    });
  };

  _onPressRemoveSearch = () => {
    this.inputRef.clear;
    this.setState({ _dataStudents: this._arrayholder });
  };

  _onChangeSearch = (text) => {
    const newData = this._arrayholder.filter((item) => {
      const firstNameData = `${item.firstName.toUpperCase()}`;
      const lastNameData = `${item.lastName.toUpperCase()}`;
      const textData = text.toUpperCase();
      if (firstNameData.indexOf(textData) > -1) {
        return true;
      } else if (lastNameData.indexOf(textData) > -1) {
        return true;
      }
      return false;
    });
    this.setState({ _dataStudents: newData });
  };

  _viewNoItemStudent = () => {
    return (
      <View style={styles.con_not_info}>
        {/* <Icon
          containerStyle={{ marginTop: 100 }}
          name={"search"}
          size={50}
          color={COLOR.placeholderTextColor}
          type={"solid"}
        /> */}
        <FontAwesome5
          style={{ marginTop: 100 }}
          name={"search"}
          size={50}
          color={COLOR.placeholderTextColor}
          solid
        />
        <CText
          style={styles.txt_empty_student}
          i18nKey={"txtEmptySearchStudent"}
        />
      </View>
    );
  };

  _onPressChooseClass = async (classObj) => {
    if (classObj.id !== this.state._classChoose.id) {
      this.setState({ _loading: true });
      await Helpers.setAsyStrClassChoosed(JSON.stringify(classObj));
      this.setState({ _classChoose: classObj });
      this._getListStudentByClassID(classObj);
    }
  };

  /** HANDLE FUNCTIONS */
  _onPressBack = () => {
    this.props.route.params?.onRefresh?.();
    this.props.navigation.goBack();
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._checkClasses();
  }

  /** RENDER */
  render() {
    let { _loading, _loadForList, _dataStudents, _dataClasses, _classChoose } =
      this.state;

    return (
      <View style={styles.con}>
        {/* HEADER */}
        <HeaderBar
          title={"txtHealth"}
          hasBack
          hasCustomHeaderRight={true}
          loadCustomHeaderRight={_loadForList}
          dataCustomHeaderRight={_dataClasses}
          dataChooseCustomHeaderRight={_classChoose}
          onCustomHeaderRight={this._onPressChooseClass}
          onBack={this._onPressBack}
        />

        {/* CONTENT */}
        {!_loading && (
          <View style={DEVICE.gStyle.flex_1}>
            {this._arrayholder.length > 0 ? (
              <FlatList
                style={{ flex: 1, backgroundColor: COLOR.backgroundMain }}
                contentContainerStyle={styles.listStudentContent}
                data={_dataStudents}
                renderItem={({ item, index }) => {
                  let gender = CONFIG.students.find(
                    (f) => f.id === item.gender
                  );
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
                          <Text style={styles.txtNameStudent}>
                            {newFullName}
                          </Text>
                          <Text style={styles.txtInfoStudent}>
                            {item?.dateOfBirth
                              ? getMonthsDifference(item.dateOfBirth) +
                                "\u00A0tháng"
                              : ""}
                            {item?.height
                              ? `, ${LANG[CONFIG.lang].txtHeight2}:\u00A0${
                                  item.height
                                }\u00A0cm`
                              : ""}
                            {item?.weight
                              ? `, ${LANG[CONFIG.lang].txtWeight2}:\u00A0${
                                  item.weight
                                }\u00A0kg`
                              : ""}
                          </Text>
                        </View>
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
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={this._viewNoItemStudent}
                keyExtractor={(item, index) => index.toString()}
                keyboardShouldPersistTaps={"handled"}
                scrollIndicatorInsets={{ right: 1 }}
              />
            ) : (
              <View style={styles.con_not_info}>
                {/* <Icon
                  name={"search"}
                  size={50}
                  color={COLOR.placeholderTextColor}
                  type={"solid"}
                /> */}
                <FontAwesome5
                  name={"search"}
                  size={50}
                  color={COLOR.placeholderTextColor}
                  solid
                />
                <CText
                  style={styles.txt_empty_data}
                  i18nKey={"txtEmptyStudent"}
                />
              </View>
            )}
          </View>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherHealthScreen);
