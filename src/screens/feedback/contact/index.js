/**
 * @Description:
 * @Created by ZiniTeam
 * @Date create:
 */
/** LIBRARY */
import React, { Component } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
/** COMPONENT */
import HeaderBar from "../../partials/header_bar";
import CImage from "../../../components/CImage";
import CText from "../../../components/CText";
import CButton from "../../../components/CButton";
/** COMMON */
import { COLOR, CONFIG, DEVICE, LANG } from "../../../config";
import Helpers from "../../../helpers";
/** STYLES */
import styles from "./style";
import CLoading from "../../../components/CLoading";

class ContactFeedbackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: false,
      _teachers: props.teachers,
      _teachersSelected: props.route.params.teachersSelected,
    };
  }

  /** FUNCTION */
  _renderTeacher = (item, index) => {
    let uriAvatar =
      item.avatar != "" && item.avatar != null
        ? CONFIG.host + item.avatar
        : null;
    let gender = CONFIG.users.find((f) => f.id === item.gender);
    if (gender) {
      gender = gender.path;
    } else {
      gender = CONFIG.students[0].path;
    }
    let newTeacherFullName = Helpers.capitalizeName(
      item.firstName,
      item.lastName,
      CONFIG.settingLocal.softName
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.rowItemStudent}
        onPress={() => this._onSelectedTeacher(item)}
      >
        <View style={styles.avatarArea}>
          <CImage
            style={styles.avatarStudent}
            resizeMode={"cover"}
            src={uriAvatar ? { uri: uriAvatar } : gender}
            type={"avatar"}
          />
        </View>
        <View style={styles.nameArea}>
          <View style={{ paddingVertical: 10 }}>
            <Text
              style={[styles.txtNameStudent, { fontFamily: DEVICE.fontMedium }]}
            >
              {newTeacherFullName}
            </Text>
            {/* <Text style={[styles.txtNameStudent, {fontSize: DEVICE.fS(12)}]}>
              {`${
                item.gender === 0
                  ? LANG[CONFIG.lang].momOf
                  : LANG[CONFIG.lang].dadOf
              } ${newStudentFullName}`}
            </Text> */}
          </View>
          {this.state._teachersSelected.includes(item.id) && (
            // <Icon
            //   name={"check-circle"}
            //   size={Helpers.fS(25)}
            //   color={"black"}
            //   type={"light"}
            // />
            <FontAwesome5
              name={"check-circle"}
              size={Helpers.fS(25)}
              color={"black"}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  _onSelectedTeacher = (item) => {
    let { _teachersSelected } = this.state;
    let findIndex = _teachersSelected.findIndex((f) => f === item.id);
    if (findIndex !== -1) {
      _teachersSelected.splice(findIndex, 1);
    } else {
      _teachersSelected.push(item.id);
    }
    this.setState({ _teachersSelected });
  };

  _onPressBack = () => {
    this.props.navigation.goBack();
    this.props.route.params.onSelectedTeacher(this.state._teachersSelected);
  };

  _prepareData = () => {
    let { _teachers } = this.state;
    let findIndex = _teachers.findIndex((f) => f.id === this.props.login.id);
    if (findIndex !== -1) {
      _teachers.splice(findIndex, 1);
    }
    this.setState({
      _teachers,
      _loading: false,
    });
  };
  /** LIFE CYCLE */
  componentDidMount() {
    this._prepareData();
  }
  /** RENDER */
  render() {
    return (
      <View style={styles.con}>
        <HeaderBar
          onBack={this._onPressBack}
          title={"txtDrawerContact"}
          hasBack={true}
        />
        {this.state._loading ? (
          <CLoading />
        ) : (
          <>
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 10 }}
              data={this.state._teachers}
              renderItem={({ item, index }) => this._renderTeacher(item, index)}
              keyExtractor={(item, index) => index}
            />
            <View style={styles.con_footer}>
              <CButton
                style={[styles.submit_group_submit]}
                onPress={this._onPressBack}
              >
                <CText i18nKey={"done"} />
              </CButton>
            </View>
          </>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teachers: state.teachers.data,
    school: state.school.data,
    login: state.login.data,
    language: state.language.language,
  };
};

export default connect(mapStateToProps, null)(ContactFeedbackScreen);
