/**
 * @Description: Custom Text Input
 * @Created by ZiniTeam
 * @Date create: 17/01/2019
 */
/** LIBRARY */
import React from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
/** COMMON */
import {CONFIG, KEY} from '../../config';
import Helpers from '../../helpers';
/** STYLES */
import styles from './style';

class CRadioButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _radioSelected: 1,
    };
    this._animatedParentValue = new Animated.Value(1);
    this._animatedTeacherValue = new Animated.Value(0);
    this._animatedDriverValue = new Animated.Value(0);
  }

  /** FUNCTIONS */
  _radioClick = (id, value) => {
    this.setState({_radioSelected: id});
    this._onPressGetValue(id, value);
  };

  _onPressGetValue = (id, value) => {
    this.props.onPress(value);
    if (id === 1) {
      Helpers.animParallel(
        [
          Helpers.animTiming(this._animatedParentValue, 1, 300),
          Helpers.animTiming(this._animatedTeacherValue, 0, 300),
          Helpers.animTiming(this._animatedDriverValue, 0, 300),
        ],
        true,
      );
    } else if (id === 2) {
      Helpers.animParallel(
        [
          Helpers.animTiming(this._animatedParentValue, 0, 300),
          Helpers.animTiming(this._animatedTeacherValue, 1, 300),
          Helpers.animTiming(this._animatedDriverValue, 0, 300),
        ],
        true,
      );
    } else if (id === 3) {
      Helpers.animParallel(
        [
          Helpers.animTiming(this._animatedParentValue, 0, 300),
          Helpers.animTiming(this._animatedTeacherValue, 0, 300),
          Helpers.animTiming(this._animatedDriverValue, 1, 300),
        ],
        true,
      );
    }
  };

  /** RENDER */
  render() {
    let {arrRadioButtonItem, style} = this.props;
    let {_radioSelected} = this.state;

    return (
      <View style={[styles.con, style]}>
        {arrRadioButtonItem.map((val, index) => {
          let _isCheck = val.id === _radioSelected;
          let transform = [],
            transformTranslate = {};
          if (val.value === KEY.PARENT) {
            transformTranslate = [
              {
                translateY: this._animatedParentValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }),
              },
            ];
            transform = [
              {
                scaleX: this._animatedParentValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.2],
                }),
              },
              {
                scaleY: this._animatedParentValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.2],
                }),
              },
            ];
          } else if (val.value === KEY.TEACHER) {
            transformTranslate = [
              {
                translateY: this._animatedTeacherValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }),
              },
            ];
            transform = [
              {
                scaleX: this._animatedTeacherValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.2],
                }),
              },
              {
                scaleY: this._animatedTeacherValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.2],
                }),
              },
            ];
          } else if (val.value === KEY.DRIVER) {
            transformTranslate = [
              {
                translateY: this._animatedDriverValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }),
              },
            ];
            transform = [
              {
                scaleX: this._animatedDriverValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.2],
                }),
              },
              {
                scaleY: this._animatedDriverValue.interpolate({
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
                index === arrRadioButtonItem.length - 1 && {marginRight: 0},
              ]}
              onPress={() => this._radioClick(val.id, val.value)}
              activeOpacity={0.5}>
              <Animated.Text
                style={[
                  styles.txtName,
                  {transform: transformTranslate},
                  !_isCheck && styles.txt_non_choose,
                ]}>
                {val.name}
              </Animated.Text>

              <Animated.View
                style={[
                  styles.con_img_avatar,
                  {backgroundColor: val.bgColor, transform},
                ]}>
                <Animated.Image
                  style={[styles.img_avatar, {transform}]}
                  source={val.image}
                  resizeMode={'contain'}
                />
                {!_isCheck && <View style={styles.con_shadow_non_choose} />}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

CRadioButton.defaultProps = {
  arrRadioButtonItem: [],
  style: {},
  onPress: () => {},
};

export default CRadioButton;
