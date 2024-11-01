import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Image as RNImage,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
} from "react-native";

import { withTheme } from "../config";
import { renderNode } from "../helpers";

import Icon from "react-native-fontawesome-pro";
import Image from "../image/Image";

type AvatarProps = {
  onPress?: () => void;
  onLongPress?: () => void;
  Component?: React.ComponentType<any>;
  containerStyle?: ViewStyle;
  icon?: {
    name?: string;
    type?: string;
    color?: string;
    size?: number;
  };
  iconStyle?: TextStyle;
  source?: ImageSourcePropType;
  size?: "small" | "medium" | "large" | "xlarge" | number;
  avatarStyle?: ViewStyle;
  rounded?: boolean;
  title?: string;
  titleStyle?: TextStyle;
  overlayContainerStyle?: ViewStyle;
  showEditButton?: boolean;
  editButton?: {
    size?: number;
    name?: string;
    type?: string;
    color?: string;
    underlayColor?: string;
    style?: ViewStyle;
  };
  onEditPress?: () => void;
  imageProps?: any;
  placeholderStyle?: ViewStyle;
  renderPlaceholderContent?: React.ReactNode;
  ImageComponent?: React.ComponentType<any>;
};

const avatarSizes = {
  small: 34,
  medium: 50,
  large: 75,
  xlarge: 150,
};

const defaultEditButton = {
  name: "mode-edit",
  type: "material",
  color: "#fff",
  underlayColor: "#000",
};

const Avatar: React.FC<AvatarProps> = ({
  onPress,
  onLongPress,
  Component = onPress || onLongPress ? TouchableOpacity : View,
  containerStyle,
  icon,
  iconStyle,
  source,
  size = "small",
  avatarStyle,
  rounded,
  title,
  titleStyle,
  overlayContainerStyle,
  showEditButton = false,
  editButton: passedEditButton = defaultEditButton,
  onEditPress,
  imageProps,
  placeholderStyle,
  renderPlaceholderContent,
  ImageComponent = RNImage,
  ...attributes
}) => {
  const width =
    typeof size === "number" ? size : avatarSizes[size] || avatarSizes.small;
  const height = width;
  const titleSize = width / 2;
  const iconSize = width / 2;

  const editButton = {
    ...defaultEditButton,
    ...passedEditButton,
  };
  const editButtonSize = editButton.size || (width + height) / 2 / 3;

  const Utils = showEditButton && (
    <TouchableHighlight
      style={StyleSheet.flatten([
        styles.editButton,
        {
          width: editButtonSize,
          height: editButtonSize,
          borderRadius: editButtonSize / 2,
        },
        editButton.style,
      ])}
      underlayColor={editButton.underlayColor}
      onPress={onEditPress}
    >
      <View>
        <Icon size={editButtonSize * 0.8} {...editButton} />
      </View>
    </TouchableHighlight>
  );

  const PlaceholderContent =
    (renderPlaceholderContent &&
      renderNode(undefined, renderPlaceholderContent)) ||
    (title && (
      <Text
        style={StyleSheet.flatten([
          styles.title,
          { fontSize: titleSize },
          titleStyle,
        ])}
      >
        {title}
      </Text>
    )) ||
    (icon && (
      <Icon
        {...icon}
        style={iconStyle}
        color={icon.color || "#ffffff"}
        name={icon.name || "user"}
        size={icon.size || iconSize}
        type={icon.type}
      />
    ));

  const hidePlaceholder = !source;

  return (
    <Component
      onPress={onPress}
      onLongPress={onLongPress}
      style={StyleSheet.flatten([
        styles.container,
        { height, width },
        rounded && { borderRadius: width / 2 },
        containerStyle,
      ])}
      {...attributes}
    >
      <Image
        placeholderStyle={StyleSheet.flatten([
          placeholderStyle,
          hidePlaceholder && { backgroundColor: "transparent" },
        ])}
        PlaceholderContent={PlaceholderContent}
        containerStyle={StyleSheet.flatten([
          styles.overlayContainer,
          overlayContainerStyle,
          rounded && { borderRadius: width / 2, overflow: "hidden" },
        ])}
        source={source}
        {...imageProps}
        style={StyleSheet.flatten([
          styles.avatar,
          imageProps && imageProps.style,
          avatarStyle,
        ])}
        ImageComponent={ImageComponent}
      />
      {Utils}
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
  avatar: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: "#bdbdbd",
  },
  title: {
    color: "#ffffff",
    backgroundColor: "transparent",
    textAlign: "center",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#aaa",
    ...Platform.select({
      android: {
        elevation: 1,
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.5,
      },
    }),
  },
});

export default withTheme(Avatar, "Avatar");
