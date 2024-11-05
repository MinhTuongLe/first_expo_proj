/**
 * @Description: Custom Text Input
 * @Created by ZiniTeam
 * @Date create: 17/01/2019
 */
/** LIBRARY */
import React from "react";
import { View, TextInput, Platform, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLOR, DEVICE } from "../../config";
import styles from "../../screens/partials/header_bar/style";
import Helpers from "../../helpers";

class CInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.value ? this.props.value : "",
    };
  }

  render() {
    let {
      style,
      selectionColor,
      isBorder = true,
      isRemove = true,
      multiline = false,
      borderColor = undefined,
    } = this.props;
    let { text } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            {...this.props}
            ref={"_inputRef"}
            value={this.state.text}
            selectionColor={selectionColor ?? COLOR.placeholderTextColor}
            underlineColorAndroid={"transparent"}
            onChangeText={this._changeText}
            style={[
              {
                paddingRight: 10,
                paddingLeft: Platform.OS === "android" ? -5 : 0,
              },
              multiline && {
                textAlignVertical: "top",
              },
              style,
            ]}
            cursorColor={this.props?.cursorColor || "#ffffff"}
            autoComplete="off"
          />

          {text !== "" && isRemove && (
            <Pressable onPress={this._onRemoveText}>
              <FontAwesome5
                name="times"
                size={Helpers.fS(20)}
                color={COLOR.inactiveTintColor}
              />
            </Pressable>
          )}
        </View>

        {isBorder && (
          <View
            style={[
              {
                height: borderColor ? 2 : 1,
                marginTop: Platform.OS === "ios" ? 5 : 0,
                backgroundColor: borderColor ?? COLOR.borderColor,
              },
            ]}
          />
        )}
      </View>
    );
  }

  /**
   * Functions
   */
  get value() {
    return this.state.text;
  }
  set value(newValue) {
    this.setState({
      text: newValue,
    });
  }

  get focus() {
    return this.refs["_inputRef"].focus();
  }

  _changeText = (text) => {
    if (this.props.afterChangeText) {
      this.props.afterChangeText(text);
    }
    this.setState({ text });
  };

  _onRemoveText = () => {
    this.setState({ text: "" });
  };

  get clear() {
    this.setState({ text: "" });
    return this.state.text;
  }
}

export default CInput;
