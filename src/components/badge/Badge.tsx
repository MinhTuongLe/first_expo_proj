import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ViewStyle,
  TextStyle,
} from "react-native";
import { withTheme } from "../config";
import { renderNode } from "../helpers";

const size = 16;
const miniSize = 9;

interface BadgeProps {
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  badgeStyle?: ViewStyle;
  onPress?: () => void;
  Component?: React.ComponentType<any>;
  value?: React.ReactNode;
  theme: {
    colors: Record<string, string>;
  };
  status?: "primary" | "success" | "warning" | "error" | "grey1" | "grey2";
}

const Badge: React.FC<BadgeProps> = (props) => {
  const {
    containerStyle,
    textStyle,
    badgeStyle,
    onPress,
    Component = onPress ? TouchableOpacity : View,
    value,
    theme,
    status = "primary",
    ...attributes
  } = props;

  const element = renderNode(Text, value, {
    style: StyleSheet.flatten([styles.text, textStyle]),
  });

  return (
    <View style={StyleSheet.flatten([containerStyle])}>
      <Component
        {...attributes}
        style={StyleSheet.flatten([
          styles.badge(theme, status),
          !element && styles.miniBadge,
          badgeStyle,
        ])}
        onPress={onPress}
      >
        {element}
      </Component>
    </View>
  );
};

const styles = {
  badge: (
    theme: BadgeProps["theme"],
    status: BadgeProps["status"]
  ): ViewStyle => ({
    minWidth: 30,
    height: size,
    borderRadius: 10, // Adjusted to match `spacing.borderRadius.small` in TypeScript
    backgroundColor: theme.colors[status || "primary"],
    alignItems: "center",
  }),
  miniBadge: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    minWidth: miniSize,
    height: miniSize,
    borderRadius: miniSize / 2,
  } as ViewStyle,
  text: {
    overflow: "hidden",
    fontSize: 12, // Adjusted to match `sizes.base - 4` in TypeScript
    lineHeight: size,
    color: "#ffffff",
    paddingHorizontal: 5,
    fontWeight: "500",
    ...Platform.select({
      android: {
        paddingTop: 0.5,
      },
      ios: {},
    }),
  } as TextStyle,
};

export { Badge };
export default withTheme(Badge, "Badge");
