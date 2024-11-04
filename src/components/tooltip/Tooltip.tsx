import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Modal, View, StatusBar } from "react-native";

import { ViewPropTypes, withTheme } from "../config";
import { ScreenWidth, ScreenHeight, isIOS } from "../helpers";

import Triangle from "./Triangle";
import getTooltipCoordinate, {
  getElementVisibleWidth,
} from "./getTooltipCoordinate";

const Tooltip = ({
  children,
  withPointer = true,
  popover,
  toggleOnPress = true,
  height = 40,
  width = 150,
  containerStyle = {},
  pointerColor,
  onClose = () => {},
  onOpen = () => {},
  withOverlay = true,
  backgroundColor = "#617080",
  highlightColor = "transparent",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({
    yOffset: 0,
    xOffset: 0,
    elementWidth: 0,
    elementHeight: 0,
  });
  const renderedElement = useRef(null);

  const toggleTooltip = useCallback(() => {
    getElementPosition();
    setIsVisible((prev) => {
      if (prev && !isIOS) onClose();
      return !prev;
    });
  }, [onClose]);

  const wrapWithPress = (toggleOnPress, children) => {
    if (toggleOnPress) {
      return (
        <TouchableOpacity onPress={toggleTooltip} activeOpacity={1}>
          {children}
        </TouchableOpacity>
      );
    }
    return children;
  };

  const getTooltipStyle = () => {
    const { yOffset, xOffset, elementHeight, elementWidth } = tooltipPos;

    const { x, y } = getTooltipCoordinate(
      xOffset,
      yOffset,
      elementWidth,
      elementHeight,
      ScreenWidth,
      ScreenHeight,
      width,
      height,
      withPointer
    );

    return {
      position: "absolute",
      left: x,
      top: y,
      width,
      height,
      backgroundColor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      borderRadius: 10,
      padding: 10,
      ...containerStyle,
    };
  };

  const renderPointer = (tooltipY) => {
    const { yOffset, xOffset, elementHeight, elementWidth } = tooltipPos;
    const pastMiddleLine = yOffset > tooltipY;

    return (
      <View
        style={[
          styles.viewPointer,
          {
            top: pastMiddleLine ? yOffset - 13 : yOffset + elementHeight - 2,
            left:
              xOffset +
              getElementVisibleWidth(elementWidth, xOffset, ScreenWidth) / 2 -
              7.5,
          },
        ]}
      >
        <Triangle
          style={{ borderBottomColor: pointerColor || backgroundColor }}
          isDown={pastMiddleLine}
        />
      </View>
    );
  };

  const renderContent = (withTooltip) => {
    if (!withTooltip) {
      return wrapWithPress(toggleOnPress, children);
    }

    const tooltipStyle = getTooltipStyle();
    return (
      <View>
        <View
          style={[
            styles.viewContent,
            {
              top: tooltipPos.yOffset,
              left: tooltipPos.xOffset,
              backgroundColor: highlightColor,
              width: tooltipPos.elementWidth,
              height: tooltipPos.elementHeight,
            },
          ]}
        >
          {children}
        </View>
        {withPointer && renderPointer(tooltipStyle.top)}
        <View style={tooltipStyle} testID="tooltipPopoverContainer">
          {popover}
        </View>
      </View>
    );
  };

  const getElementPosition = () => {
    renderedElement.current?.measure(
      (frameOffsetX, frameOffsetY, width, height, pageOffsetX, pageOffsetY) => {
        setTooltipPos({
          xOffset: pageOffsetX,
          yOffset: isIOS ? pageOffsetY : pageOffsetY - StatusBar.currentHeight,
          elementWidth: width,
          elementHeight: height,
        });
      }
    );
  };

  useEffect(() => {
    setTimeout(getElementPosition, 500);
  }, []);

  return (
    <View collapsable={false} ref={renderedElement}>
      {renderContent(false)}
      <Modal
        animationType="fade"
        visible={isVisible}
        transparent
        onDismiss={onClose}
        onShow={onOpen}
        onRequestClose={onClose}
      >
        <TouchableOpacity
          style={styles.container(withOverlay)}
          onPress={toggleTooltip}
          activeOpacity={1}
        >
          {renderContent(true)}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

Tooltip.propTypes = {
  children: PropTypes.element,
  withPointer: PropTypes.bool,
  popover: PropTypes.element,
  toggleOnPress: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerStyle: ViewPropTypes?.style,
  pointerColor: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  withOverlay: PropTypes.bool,
  backgroundColor: PropTypes.string,
  highlightColor: PropTypes.string,
};

const styles = {
  container: (withOverlay) => ({
    backgroundColor: withOverlay ? "rgba(250, 250, 250, 0.70)" : "transparent",
    flex: 1,
  }),
  viewPointer: {
    position: "absolute",
  },
  viewContent: {
    position: "absolute",
    overflow: "visible",
  },
};

export { Tooltip };
export default withTheme(Tooltip, "Tooltip");
