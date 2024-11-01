import React, { useEffect } from "react";
import {
  View,
  Text as TextRN,
  TouchableNativeFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from "react-native";
import { withTheme, ViewPropTypes } from "../config";
import { renderNode, nodeType, conditionalStyle, color } from "../helpers";
import Icon from "react-native-fontawesome-pro";
import Text from "../text/Text";

interface ButtonProps {
  title?: string;
  titleStyle?: object;
  titleProps?: object;
  buttonStyle?: object;
  type?: "solid" | "clear" | "outline";
  size?: "big" | "small";
  loading?: boolean;
  loadingStyle?: object;
  loadingProps?: object;
  onPress?: () => void;
  containerStyle?: object;
  icon?: any; // You can specify a more detailed type if needed
  iconContainerStyle?: object;
  iconRight?: boolean;
  linearGradientProps?: object;
  TouchableComponent?: React.ElementType;
  ViewComponent?: React.ElementType;
  disabled?: boolean;
  disabledStyle?: object;
  disabledTitleStyle?: object;
  raised?: boolean;
  theme: any; // Specify a more detailed type if available
}

const defaultLoadingProps = (type: string, theme: any) => ({
  color: type === "solid" ? theme.colors.bgColor : theme.colors.primary,
  size: "small",
});

const Button: React.FC<ButtonProps> = ({
  TouchableComponent = Platform.select({
    android: TouchableNativeFeedback,
    default: TouchableOpacity,
  }),
  containerStyle,
  onPress,
  buttonStyle,
  type = "solid",
  size = "big",
  loading = false,
  loadingStyle,
  loadingProps: passedLoadingProps,
  title = "",
  titleProps,
  titleStyle,
  icon,
  iconContainerStyle,
  iconRight = false,
  disabled = false,
  disabledStyle,
  disabledTitleStyle,
  raised = false,
  linearGradientProps,
  ViewComponent = !disabled && linearGradientProps && global.Expo
    ? global.Expo.LinearGradient
    : View,
  theme,
  ...attributes
}) => {
  useEffect(() => {
    if (linearGradientProps && !global.Expo && !ViewComponent) {
      console.error(
        "You need to pass a ViewComponent to use linearGradientProps !\nExample: ViewComponent={require('react-native-linear-gradient')}"
      );
    }
  }, [linearGradientProps, ViewComponent]);

  if (
    Platform.OS === "android" &&
    buttonStyle?.borderRadius &&
    !attributes.background
  ) {
    attributes.background =
      Platform.Version >= 21
        ? TouchableNativeFeedback.Ripple("ThemeAttrAndroid", false)
        : TouchableNativeFeedback.SelectableBackground();
  }

  const loadingProps = {
    ...defaultLoadingProps(type, theme),
    ...passedLoadingProps,
  };

  const textProps =
    size === "small"
      ? {
          h6: true,
          medium: false,
          ...titleProps,
        }
      : titleProps;

  const buttonClick =
    onPress && !loading ? onPress : () => console.log("Loading...");

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        {
          borderRadius:
            buttonStyle?.borderRadius || styles.container.borderRadius,
        },
        containerStyle,
        raised && !disabled && styles.raised(type),
      ])}
    >
      <TouchableComponent
        onPress={buttonClick}
        activeOpacity={0.3}
        disabled={disabled}
        {...attributes}
      >
        <ViewComponent
          {...linearGradientProps}
          style={StyleSheet.flatten([
            styles.button(type, size, theme),
            buttonStyle,
            disabled && styles.disabled(type, theme),
            disabled && disabledStyle,
          ])}
        >
          {loading && (
            <ActivityIndicator
              style={StyleSheet.flatten([styles.loading, loadingStyle])}
              color={loadingProps.color}
              size={loadingProps.size}
              {...loadingProps}
            />
          )}

          {!loading &&
            icon &&
            !iconRight &&
            renderNode(Icon, icon, {
              containerStyle: StyleSheet.flatten([
                styles.iconContainer,
                iconContainerStyle,
              ]),
            })}

          {!loading && !!title && (
            <Text
              style={StyleSheet.flatten([
                styles.title(type, theme),
                titleStyle,
                disabled && styles.disabledTitle(theme),
                disabled && disabledTitleStyle,
              ])}
              medium
              {...textProps}
            >
              {title}
            </Text>
          )}

          {!loading &&
            icon &&
            iconRight &&
            renderNode(Icon, icon, {
              containerStyle: StyleSheet.flatten([
                styles.iconContainer,
                iconContainerStyle,
              ]),
            })}
        </ViewComponent>
      </TouchableComponent>
    </View>
  );
};

const styles = {
  button: (type: string, size: string, theme: any) => ({
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    backgroundColor:
      type === "solid" ? theme.Button.backgroundColor : "transparent",
    minHeight: size === "small" ? 34 : 46,
    paddingHorizontal: 12,
    borderWidth: type !== "clear" ? 1 : 0,
    borderColor:
      type === "outline"
        ? theme.Button.outlineBorderColor
        : theme.Button.borderColor,
  }),
  container: {
    // borderRadius: 3,
  },
  disabled: (type: string, theme: any) => ({
    ...conditionalStyle(type === "solid", {
      backgroundColor: theme.colors.disabled,
    }),
    ...conditionalStyle(type !== "clear", {
      borderColor: theme.colors.disabled,
    }),
  }),
  disabledTitle: (theme: any) => ({
    color: color(theme.colors.disabled).darken(0.3),
  }),
  title: (type: string, theme: any) => ({
    color: type === "solid" ? theme.Button.color : theme.Button.outlineColor,
    textAlign: "center",
  }),
  iconContainer: {
    marginHorizontal: 5,
  },
  raised: (type: string) =>
    type !== "clear" && {
      backgroundColor: "#fff",
      ...Platform.select({
        android: {
          elevation: 4,
        },
        default: {
          shadowColor: "rgba(0,0,0, .4)",
          shadowOffset: { height: 1, width: 1 },
          shadowOpacity: 1,
          shadowRadius: 1,
        },
      }),
    },
  loading: {
    marginVertical: 2,
  },
};

export { Button };
export default withTheme(Button, "Button");
