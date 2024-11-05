/**
 * @Description: New Album Screen Layout
 * @Created by ZiniTeam
 * @Date create: 26/02/2019
 */
/** LIBRARY */
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
/** COMMON */
import { COLOR, DEVICE } from "../../../config";
/** STYLE */
import styles from "./style";
import Helpers from "../../../helpers";

class CItemPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _isSelected: props.isCheck,
    };
  }

  /** HANDLE FUNCTIONS */
  _onPressItem = () => {
    this.setState({ _isSelected: !this.state._isSelected });
    this.props.onPress();
  };

  /** RENDER */
  render() {
    let { _isSelected } = this.state;
    let { data, isRemove, onPressRemove } = this.props;
    let pathImage = "";
    if (isRemove) {
      if (data.hasOwnProperty("node")) {
        pathImage = data.node.image.uri;
      } else {
        pathImage = data.data.path;
      }
    }

    return (
      <View>
        {isRemove ? (
          <View style={styles.itemThumbImage}>
            <TouchableOpacity
              style={styles.checkedPhoto}
              onPress={() => onPressRemove(data)}
            >
              {/* <Icon
                name={"times-circle"}
                size={Helpers.fS(20)}
                color={"#ffffff"}
                type={"light"}
              /> */}
              <FontAwesome5
                name={"times-circle"}
                size={Helpers.fS(20)}
                color={"#ffffff"}
              />
            </TouchableOpacity>
            <Image
              style={styles.image_full}
              source={{ uri: pathImage }}
              resizeMode={"cover"}
            />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.itemThumbImage}
            onPress={this._onPressItem}
          >
            {data.id !== "cameraBtn" && (
              <Image
                style={styles.image_item}
                source={{ uri: data.node.image.uri }}
                resizeMode={"cover"}
              />
            )}

            {data.id !== "cameraBtn" && (
              <View
                style={[
                  styles.checkedPhoto,
                  _isSelected ? { backgroundColor: COLOR.primaryApp } : {},
                ]}
              >
                {_isSelected && (
                  // <Icon
                  //   name={"check-circle"}
                  //   size={Helpers.fS(20)}
                  //   color={"#ffffff"}
                  //   type={"light"}
                  // />
                  <FontAwesome5
                    name={"check-circle"}
                    size={Helpers.fS(20)}
                    color={"#ffffff"}
                  />
                )}
              </View>
            )}
            {data.id === "cameraBtn" ? (
              // <Icon
              //   name={"camera"}
              //   size={Helpers.fS(24)}
              //   color={"black"}
              //   type={"light"}
              // />
              <FontAwesome5
                name={"camera"}
                size={Helpers.fS(24)}
                color={"black"}
                type={"light"}
              />
            ) : (
              <Image
                style={styles.image_full}
                source={{ uri: data.node.image.uri }}
                resizeMode={"cover"}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

CItemPhoto.defaultProps = {
  data: {},
  isRemove: false,
  onPress: () => {},
  onPressRemove: () => {},
};

export default CItemPhoto;
