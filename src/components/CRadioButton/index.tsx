/**
 * @Description: Custom Text Input
 * @Created by ZiniTeam
 * @Date create: 17/01/2019
 */
/** LIBRARY */
import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
/** COMMON */
import { CONFIG, KEY } from "../../config";
import Helpers from "../../helpers";
/** STYLES */
import styles from "./style";

const CRadioButton = ({ arrRadioButtonItem, style, onPress }) => {
  const [radioSelected, setRadioSelected] = useState(1);
  const animatedParentValue = useRef(new Animated.Value(1)).current;
  const animatedTeacherValue = useRef(new Animated.Value(0)).current;
  const animatedDriverValue = useRef(new Animated.Value(0)).current;

  /** FUNCTIONS */
  const radioClick = (id, value) => {
    setRadioSelected(id);
    onPress(value);

    if (id === 1) {
      Helpers.animParallel(
        [
          Helpers.animTiming(animatedParentValue, 1, 300),
          Helpers.animTiming(animatedTeacherValue, 0, 300),
          Helpers.animTiming(animatedDriverValue, 0, 300),
        ],
        true
      );
    } else if (id === 2) {
      Helpers.animParallel(
        [
          Helpers.animTiming(animatedParentValue, 0, 300),
          Helpers.animTiming(animatedTeacherValue, 1, 300),
          Helpers.animTiming(animatedDriverValue, 0, 300),
        ],
        true
      );
    } else if (id === 3) {
      Helpers.animParallel(
        [
          Helpers.animTiming(animatedParentValue, 0, 300),
          Helpers.animTiming(animatedTeacherValue, 0, 300),
          Helpers.animTiming(animatedDriverValue, 1, 300),
        ],
        true
      );
    }
  };

  /** RENDER */
  return (
    <View style={[styles.con, style]}>
      {arrRadioButtonItem.map((val, index) => {
        const isCheck = val.id === radioSelected;
        let transform = [],
          transformTranslate = {};

        if (val.value === KEY.PARENT) {
          transformTranslate = [
            {
              translateY: animatedParentValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -10],
              }),
            },
          ];
          transform = [
            {
              scaleX: animatedParentValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2],
              }),
            },
            {
              scaleY: animatedParentValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2],
              }),
            },
          ];
        } else if (val.value === KEY.TEACHER) {
          transformTranslate = [
            {
              translateY: animatedTeacherValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -10],
              }),
            },
          ];
          transform = [
            {
              scaleX: animatedTeacherValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2],
              }),
            },
            {
              scaleY: animatedTeacherValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2],
              }),
            },
          ];
        } else if (val.value === KEY.DRIVER) {
          transformTranslate = [
            {
              translateY: animatedDriverValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -10],
              }),
            },
          ];
          transform = [
            {
              scaleX: animatedDriverValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2],
              }),
            },
            {
              scaleY: animatedDriverValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2],
              }),
            },
          ];
        }

        return (
          <TouchableOpacity
            key={val.id}
            style={[
              styles.con_btn,
              index === arrRadioButtonItem.length - 1 && { marginRight: 0 },
            ]}
            onPress={() => radioClick(val.id, val.value)}
            activeOpacity={0.5}
          >
            <Animated.Text
              style={[
                styles.txtName,
                { transform: transformTranslate },
                !isCheck && styles.txt_non_choose,
              ]}
            >
              {val.name}
            </Animated.Text>

            <Animated.View
              style={[
                styles.con_img_avatar,
                { backgroundColor: val.bgColor, transform },
              ]}
            >
              <Animated.Image
                style={[styles.img_avatar, { transform }]}
                source={val.image}
                resizeMode={"contain"}
              />
              {!isCheck && <View style={styles.con_shadow_non_choose} />}
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

CRadioButton.defaultProps = {
  arrRadioButtonItem: [],
  style: {},
  onPress: () => {},
};

export default CRadioButton;
