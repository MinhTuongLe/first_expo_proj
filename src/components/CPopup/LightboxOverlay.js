import React, { Component } from "react";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
import PropTypes from "prop-types";
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { DEVICE } from "../../config";
import Helpers from "../../helpers";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const DRAG_DISMISS_THRESHOLD = 150;
const STATUS_BAR_OFFSET = Platform.OS === "android" ? -25 : 0;
const isIOS = Platform.OS === "ios";

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  open: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    // Android pan handlers crash without this declaration:
    backgroundColor: "transparent",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    width: WINDOW_WIDTH * 0.0933,
    height: WINDOW_HEIGHT * 0.07,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default class LightboxOverlay extends Component {
  static propTypes = {
    origin: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    springConfig: PropTypes.shape({
      tension: PropTypes.number,
      friction: PropTypes.number,
    }),
    backgroundColor: PropTypes.string,
    isOpen: PropTypes.bool,
    renderHeader: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    willClose: PropTypes.func,
    swipeToDismiss: PropTypes.bool,
  };

  static defaultProps = {
    springConfig: { tension: 30, friction: 7 },
    backgroundColor: "black",
  };

  state = {
    isAnimating: false,
    isPanning: false,
    target: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    pan: new Animated.Value(0),
    openVal: new Animated.Value(0),
  };

  UNSAFE_componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) =>
        !this.state.isAnimating,
      onStartShouldSetPanResponderCapture: (evt, gestureState) =>
        !this.state.isAnimating,
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        !this.state.isAnimating,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
        !this.state.isAnimating,

      onPanResponderGrant: (evt, gestureState) => {
        this.state.pan.setValue(0);
        this.setState({ isPanning: true });
      },
      onPanResponderMove: Animated.event([null, { dy: this.state.pan }], {
        useNativeDriver: false,
      }),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dy) > DRAG_DISMISS_THRESHOLD) {
          this.setState({
            isPanning: false,
            target: {
              y: gestureState.dy,
              x: gestureState.dx,
              opacity: 1 - Math.abs(gestureState.dy / WINDOW_HEIGHT),
            },
          });
          this.close();
        } else {
          Animated.spring(this.state.pan, {
            toValue: 0,
            ...this.props.springConfig,
          }).start(() => {
            this.setState({ isPanning: false });
          });
        }
      },
    });
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.open();
    }
  }

  open = () => {
    if (isIOS) {
      StatusBar.setHidden(true, "fade");
    }
    this.state.pan.setValue(0);
    this.setState({
      isAnimating: true,
      target: {
        x: 0,
        y: 0,
        opacity: 1,
      },
    });

    Animated.spring(this.state.openVal, {
      toValue: 1,
      useNativeDriver: false,
      ...this.props.springConfig,
    }).start(() => {
      this.setState({ isAnimating: false });
      this.props.didOpen();
    });
  };

  close = () => {
    this.props.willClose();
    if (isIOS) {
      StatusBar.setHidden(false, "fade");
    }
    this.setState({
      isAnimating: true,
    });
    Animated.spring(this.state.openVal, {
      toValue: 0,
      useNativeDriver: false,
      ...this.props.springConfig,
    }).start(() => {
      this.setState({
        isAnimating: false,
      });
      this.props.onClose();
    });
  };

  UNSAFE_componentWillReceiveProps(props) {
    if (this.props.isOpen != props.isOpen && props.isOpen) {
      this.open();
    }
  }

  render() {
    const { isOpen, renderHeader, swipeToDismiss, origin, backgroundColor } =
      this.props;

    const { isPanning, isAnimating, openVal, target } = this.state;

    const lightboxOpacityStyle = {
      opacity: openVal.interpolate({
        inputRange: [0, 1],
        outputRange: [0, target.opacity],
      }),
    };

    let handlers;
    if (swipeToDismiss) {
      handlers = this._panResponder.panHandlers;
    }

    let dragStyle;
    if (isPanning) {
      dragStyle = {
        top: this.state.pan,
      };
      lightboxOpacityStyle.opacity = this.state.pan.interpolate({
        inputRange: [-WINDOW_HEIGHT, 0, WINDOW_HEIGHT],
        outputRange: [0, 1, 0],
      });
    }

    const openStyle = [
      styles.open,
      {
        left: openVal.interpolate({
          inputRange: [0, 1],
          outputRange: [origin.x, target.x],
        }),
        top: openVal.interpolate({
          inputRange: [0, 1],
          outputRange: [
            origin.y + STATUS_BAR_OFFSET,
            target.y + STATUS_BAR_OFFSET,
          ],
        }),
        width: openVal.interpolate({
          inputRange: [0, 1],
          outputRange: [origin.width, WINDOW_WIDTH],
        }),
        height: openVal.interpolate({
          inputRange: [0, 1],
          outputRange: [origin.height, WINDOW_HEIGHT],
        }),
      },
    ];

    const background = (
      <Animated.View
        style={[
          styles.background,
          { backgroundColor: backgroundColor },
          lightboxOpacityStyle,
        ]}
      ></Animated.View>
    );
    const header = (
      <Animated.View style={[styles.header, lightboxOpacityStyle]}>
        {renderHeader ? (
          renderHeader(this.close)
        ) : (
          <View
            style={{
              marginTop: Helpers.isIphoneX()
                ? Helpers.wS("15%")
                : Helpers.wS("10%"),
              marginLeft: 30,
            }}
          >
            <TouchableOpacity onPress={this.close}>
              {/* <Icon
                containerStyle={[
                  DEVICE.gStyle.center,
                  { width: 50, height: 50 },
                ]}
                name={"times-circle"}
                size={Helpers.fS(25)}
                color={"#ffffff"}
                type={"light"}
              /> */}
              <FontAwesome5
                style={[DEVICE.gStyle.center, { width: 50, height: 50 }]}
                name={"times-circle"}
                size={Helpers.fS(25)}
                color={"#ffffff"}
              />
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    );
    const content = (
      <Animated.View style={[openStyle, dragStyle]} {...handlers}>
        {this.props.children}
      </Animated.View>
    );

    if (this.props.navigator) {
      return (
        <View>
          {background}
          {content}
          {header}
        </View>
      );
    }

    return (
      <Modal
        visible={isOpen}
        transparent={true}
        onRequestClose={() => this.close()}
      >
        {background}
        {content}
        {header}
      </Modal>
    );
  }
}
