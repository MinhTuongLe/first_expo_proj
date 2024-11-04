import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Animated,
  Image as RNImage,
  Platform,
  StyleSheet,
  View,
} from "react-native";

import { nodeType } from "../helpers";
import { ViewPropTypes, withTheme } from "../config";

const Image = ({
  placeholderStyle,
  PlaceholderContent,
  containerStyle,
  style,
  ImageComponent = RNImage,
  ...attributes
}) => {
  const placeholderContainerOpacity = useRef(new Animated.Value(1)).current;

  const onLoadEnd = () => {
    const minimumWait = 100;
    const staggerNonce = 200 * Math.random();

    setTimeout(() => {
      Animated.timing(placeholderContainerOpacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start();
    }, minimumWait + staggerNonce);
  };

  useEffect(() => {
    // This effect ensures the animation runs on component mount when necessary.
    return () => {
      placeholderContainerOpacity.setValue(1);
    };
  }, [placeholderContainerOpacity]);

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {Platform.select({
        android: (
          <>
            <View style={styles.placeholderContainer}>
              <Animated.View
                testID="RNE__Image__placeholder"
                style={StyleSheet.flatten([
                  style,
                  styles.placeholder,
                  {
                    backgroundColor: placeholderContainerOpacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                        styles.placeholder.backgroundColor,
                        "transparent",
                      ],
                    }),
                  },
                  placeholderStyle,
                ])}
              >
                {PlaceholderContent}
              </Animated.View>
            </View>
            <ImageComponent {...attributes} style={style} />
          </>
        ),
        default: (
          <>
            <ImageComponent
              {...attributes}
              onLoadEnd={onLoadEnd}
              style={style}
            />
            <Animated.View
              style={StyleSheet.flatten([
                styles.placeholderContainer,
                { opacity: placeholderContainerOpacity },
              ])}
            >
              <View
                testID="RNE__Image__placeholder"
                style={StyleSheet.flatten([
                  style,
                  styles.placeholder,
                  placeholderStyle,
                ])}
              >
                {PlaceholderContent}
              </View>
            </Animated.View>
          </>
        ),
      })}
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: "transparent",
    position: "relative",
  },
  placeholderContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  placeholder: {
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
  },
};

Image.propTypes = {
  ...RNImage.propTypes,
  ImageComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  PlaceholderContent: nodeType,
  containerStyle: ViewPropTypes?.style,
  placeholderStyle: RNImage.propTypes?.style,
};

export { Image };
export default withTheme(Image, "Image");
