/**
 * @Description: ./src/components/CMenuDropdown
 * @CreatedAt: 13/11/2019
 * @Author: ZiniSoft
 */
/** LIBRARY */
import React from "react";
import PropTypes from "prop-types";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ViewPropTypes,
} from "react-native";

const Touchable = Platform.select({
  android: TouchableNativeFeedback,
  default: ViewPropTypes,
});

function MenuItem({
  children,
  disabled,
  disabledTextColor,
  ellipsizeMode,
  onPress,
  style,
  textStyle,
  ...props
}) {
  const touchableProps =
    Platform.OS === "android"
      ? { background: TouchableNativeFeedback.SelectableBackground() }
      : {};

  return (
    <Touchable
      disabled={disabled}
      onPress={onPress}
      {...touchableProps}
      {...props}
    >
      <View style={[styles.container, style]}>{children}</View>
    </Touchable>
  );
}

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  disabledTextColor: PropTypes.string,
  ellipsizeMode: PropTypes.string,
  onPress: PropTypes.func,
  style: ViewPropTypes?.style,
  textStyle: Text.propTypes?.style,
  // underlayColor: ViewPropTypes.underlayColor,
};

MenuItem.defaultProps = {
  disabled: false,
  disabledTextColor: "#bdbdbd",
  ellipsizeMode: Platform.OS === "ios" ? "clip" : "tail",
  underlayColor: "#e0e0e0",
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: "center",
    maxWidth: 248,
    minWidth: 124,
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
    paddingHorizontal: 16,
    textAlign: "left",
  },
});

export default MenuItem;
