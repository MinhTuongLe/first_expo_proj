// @flow
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text as TextRN,
  LayoutAnimation,
  UIManager,
  ActivityIndicator,
} from "react-native";
import Text from "../text/Text";
import Input from "../input/Input";
import Icon from "react-native-fontawesome-pro";
import ViewPropTypes from "../config/ViewPropTypes";

import { withTheme } from "../config";
import { renderNode, nodeType } from "../helpers";
import { grey5, grey4 } from "../config/colors";
import { sizes } from "../config/fonts";
import { margin, padding, borderRadius } from "../config/spacing";

const defaultSearchIcon = {
  type: "feather",
  size: 20,
  name: "search",
};
const defaultClearIcon = {
  type: "feather",
  name: "x",
  size: 20,
  color: grey4,
};

const Search = (props) => {
  const {
    theme,
    cancelButton,
    cancelButtonProps,
    cancelButtonTitle,
    clearIcon,
    containerStyle,
    leftIconContainerStyle,
    rightIconContainerStyle,
    inputContainerStyle,
    inputStyle,
    placeholderTextColor,
    showLoading,
    loadingProps,
    searchIcon,
    value,
    onClear,
    onCancel,
    onFocus,
    onBlur,
    onChangeText,
    ...attributes
  } = props;

  const inputRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(!value || value.length < 1);

  const handleFocus = () => {
    onFocus();
    UIManager.configureNextLayoutAnimation && LayoutAnimation.easeInEaseOut();
  };

  const handleBlur = () => {
    onBlur();
    UIManager.configureNextLayoutAnimation && LayoutAnimation.easeInEaseOut();
  };

  const handleClear = () => {
    inputRef.current.clear();
    handleTextChange("");
    onClear();
  };

  const handleCancel = () => {
    inputRef.current.blur();
    onCancel();
  };

  const handleTextChange = (text) => {
    onChangeText(text);
    setIsEmpty(!text || text.length < 1);
  };

  const { style: loadingStyle, ...otherLoadingProps } = loadingProps;
  const colors = theme.SearchBar;
  const {
    buttonStyle,
    buttonTextStyle,
    color: buttonColor,
    disabled: buttonDisabled,
    buttonDisabledStyle,
    buttonDisabledTextStyle,
    ...otherCancelButtonProps
  } = cancelButtonProps;

  return (
    <View style={[styles.container, containerStyle]}>
      <Input
        {...attributes}
        testID="searchInput"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleTextChange}
        ref={inputRef}
        inputStyle={StyleSheet.flatten([styles.input(theme), inputStyle])}
        containerStyle={[
          styles.viewInput,
          cancelButton && { marginRight: padding.large - 3 },
        ]}
        inputContainerStyle={StyleSheet.flatten([
          styles.inputContainer(colors.bgColor),
          inputContainerStyle,
        ])}
        leftIcon={renderNode(Icon, searchIcon, defaultSearchIcon)}
        leftIconContainerStyle={StyleSheet.flatten([
          styles.leftIconContainerStyle,
          leftIconContainerStyle,
        ])}
        placeholderTextColor={placeholderTextColor}
        rightIcon={
          <View style={styles.viewRightInput}>
            {showLoading && (
              <ActivityIndicator
                key="loading"
                style={StyleSheet.flatten([{ marginRight: 5 }, loadingStyle])}
                {...otherLoadingProps}
              />
            )}
            {!isEmpty &&
              renderNode(Icon, clearIcon, {
                ...defaultClearIcon,
                color: theme.colors.secondary,
                key: "cancel",
                onPress: handleClear,
              })}
          </View>
        }
        rightIconContainerStyle={StyleSheet.flatten([
          styles.rightIconContainerStyle,
          rightIconContainerStyle,
        ])}
      />
      {cancelButton && (
        <TouchableOpacity
          accessibilityRole="button"
          onPress={handleCancel}
          disabled={buttonDisabled}
          {...otherCancelButtonProps}
        >
          <View style={[buttonStyle, buttonDisabled && buttonDisabledStyle]}>
            <Text
              style={[
                styles.buttonTextStyle,
                buttonColor && { color: buttonColor },
                buttonTextStyle,
                buttonDisabled &&
                  (buttonDisabledTextStyle || styles.buttonTextDisabled(theme)),
              ]}
              h6
            >
              {cancelButtonTitle}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: padding.large,
  },
  input: (theme) => ({
    marginLeft: margin.small,
    fontSize: sizes.base,
    color: theme.colors.primary,
  }),
  inputContainer: (bgColor) => ({
    borderBottomWidth: 0,
    backgroundColor: bgColor,
    borderRadius: borderRadius.base,
    height: 46,
  }),
  viewInput: {
    paddingHorizontal: 0,
    flex: 1,
  },
  viewRightInput: {
    flexDirection: "row",
  },
  rightIconContainerStyle: {
    marginRight: margin.large,
  },
  leftIconContainerStyle: {
    marginLeft: margin.large,
  },
  buttonTextStyle: {
    paddingHorizontal: 3,
    paddingVertical: padding.small,
  },
  buttonTextDisabled: (theme) => ({
    color: theme.colors.disabled,
  }),
});

Search.propTypes = {
  value: PropTypes.string,
  cancelButton: PropTypes.bool,
  cancelButtonProps: PropTypes.object,
  cancelButtonTitle: PropTypes.string,
  clearIcon: nodeType,
  searchIcon: nodeType,
  loadingProps: PropTypes.object,
  showLoading: PropTypes.bool,
  onClear: PropTypes.func,
  onCancel: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  containerStyle: ViewPropTypes?.style,
  leftIconContainerStyle: ViewPropTypes?.style,
  rightIconContainerStyle: ViewPropTypes?.style,
  inputContainerStyle: ViewPropTypes?.style,
  inputStyle: TextRN.propTypes?.style,
  placeholderTextColor: PropTypes.string,
};

Search.defaultProps = {
  value: "",
  cancelButton: true,
  cancelButtonTitle: "Cancel",
  loadingProps: {},
  cancelButtonProps: {},
  showLoading: false,
  onClear: () => null,
  onCancel: () => null,
  onFocus: () => null,
  onBlur: () => null,
  onChangeText: () => null,
  placeholderTextColor: grey5,
  searchIcon: defaultSearchIcon,
  clearIcon: defaultClearIcon,
};

export default withTheme(Search);
