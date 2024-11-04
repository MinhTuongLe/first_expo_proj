import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import Icon from "react-native-fontawesome-pro";
import { withTheme } from "../config";
import { padding, borderRadius } from "../config/spacing";

const { height: heightWindow } = Dimensions.get("window");

const getHeightView = (heightFull = heightWindow, ratio = 0.5) => {
  const getRatio = ratio < 0.5 || ratio > 1 ? 0.5 : ratio;
  return heightFull * getRatio;
};

const ModalSelect = ({
  theme,
  visible,
  setModalVisible,
  topLeftElement,
  topRightElement,
  underTopElement,
  ratioHeight,
  children,
  backgroundColor,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [opacity] = useState(new Animated.Value(0));
  const [height, setHeight] = useState(
    getHeightView(heightWindow, ratioHeight)
  );

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      animation("open");
    } else {
      animation("close", () => setIsVisible(false));
    }
  }, [visible]);

  const animation = (type = "open", cb = () => {}) => {
    const toValue = type === "open" ? 0.5 : 0;
    const duration = 350;
    Animated.timing(opacity, {
      toValue,
      duration,
      useNativeDriver: false,
    }).start(cb);
  };

  const topLeft = topLeftElement ? (
    topLeftElement
  ) : (
    <TouchableOpacity
      onPress={() => setModalVisible(false)}
      style={styles.iconClose}
    >
      <Icon name="x" type="feather" size={18} />
    </TouchableOpacity>
  );

  const topRight = topRightElement || null;

  const bottom = opacity.interpolate({
    inputRange: [0, 0.5],
    outputRange: [-height, 0],
  });

  return (
    <Modal transparent visible={isVisible} onShow={() => animation("open")}>
      <View
        style={styles.flex}
        onLayout={(event) => {
          const { height: heightFull } = event.nativeEvent.layout;
          setHeight(getHeightView(heightFull, ratioHeight));
        }}
      >
        <Animated.View
          style={[
            styles.flex,
            {
              backgroundColor: theme.colors.black,
              opacity: opacity,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.flex}
            onPress={() => setModalVisible(false)}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.modal,
            {
              height: height,
              backgroundColor: backgroundColor,
              bottom: bottom,
            },
          ]}
        >
          <View style={styles.header}>
            {topLeft}
            {topRight}
          </View>
          {underTopElement}
          <View style={styles.flex}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  modal: {
    borderTopLeftRadius: borderRadius.big,
    borderTopRightRadius: borderRadius.big,
    overflow: "hidden",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    padding: padding.big - 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconClose: {
    padding: 2,
  },
});

ModalSelect.propTypes = {
  visible: PropTypes.bool,
  setModalVisible: PropTypes.func.isRequired,
  ratioHeight: PropTypes.number,
  topLeftElement: PropTypes.node,
  topRightElement: PropTypes.node,
  underTopElement: PropTypes.node,
  backgroundColor: PropTypes.string,
};

ModalSelect.defaultProps = {
  visible: false,
  ratioHeight: 0.5,
};

export default withTheme(ModalSelect, "Modal");
