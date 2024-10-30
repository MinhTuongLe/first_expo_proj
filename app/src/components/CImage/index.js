/**
 * @Description: Custom Image
 * @Created by ZiniTeam
 * @Date create: 18/01/2019
 */
/** LIBRARY */
import React from "react";
// import FastImage from 'react-native-fast-image';
import { Image } from "expo-image";
/** COMMON */
import { ASSETS } from "../../config";

class CImage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _source: props.src,
    };
  }

  /* FUNCTIONS */
  _onLoad = () => {
    this.setState({ _loading: false });
  };

  _onError = () => {
    this.setState({
      _source: this.props.sourceFailed || ASSETS.imgFailed,
      _loading: false,
    });
  };

  /* LIFE CYCLES */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.src != this.props.src) {
      this.setState({ _source: this.props.src });
    }
  }

  /** RENDER */
  render() {
    let { style, resizeMode, renderContent = null } = this.props;
    let { _source } = this.state;

    return (
      // <FastImage
      //   style={[style, {overflow: 'hidden'}]}
      //   source={
      //     _source.uri
      //       ? {
      //           uri: _source.uri,
      //           priority: FastImage.priority.normal,
      //         }
      //       : _source
      //   }
      //   resizeMode={resizeMode}
      //   cache={FastImage.cacheControl.immutable}
      //   onLoadStart={this._onLoadStart}
      //   onLoad={this._onLoad}
      //   onError={this._onError}>
      //   {renderContent}
      // </FastImage>
      <View style={[style, { overflow: "hidden" }]}>
        <Image
          source={
            _source.uri
              ? {
                  uri: _source.uri,
                }
              : _source
          }
          style={{ width: "100%", height: "100%" }} // Điều chỉnh kích thước theo ý muốn
          resizeMode={resizeMode || "cover"}
          onLoad={this._onLoad}
          onError={this._onError}
        />

        {/* Hiển thị nội dung renderContent nếu có */}
        {renderContent}
      </View>
    );
  }
  // render() {
  //   let {
  //     title,
  //     src,
  //     style,
  //     imageStyle,
  //     resizeMode,
  //     type,
  //     blurRadius,
  //   } = this.props;

  //   return (
  //     <View
  //       style={[{alignItems: 'center', justifyContent: 'center'}, style]}
  //       colors={COLOR.cloGdaPostItem}>
  //       {!src.uri ? (
  //         <Image
  //           style={[{width: '100%', height: '100%'}, imageStyle]}
  //           source={src}
  //           resizeMode={resizeMode ? resizeMode : 'cover'}
  //           onLoadStart={this._onLoadStart}
  //           onLoad={this._onLoad}
  //           onError={this._onError}
  //         />
  //       ) : (
  //         <FastImage
  //           style={[{width: '100%', height: '100%'}, imageStyle]}
  //           source={{
  //             uri: src.uri,
  //             priority: FastImage.priority.normal,
  //             // cache: FastImage.cacheControl.immutable
  //           }}
  //           resizeMode={resizeMode ? resizeMode : FastImage.resizeMode.contain}
  //           onLoadStart={this._onLoadStart}
  //           onLoad={this._onLoad}
  //           onError={this._onError}
  //         />
  //       )}

  //       {this.state.error && (
  //         <View style={[styles.indicator]}>
  //           <Image
  //             style={[{width: '100%', height: '100%'}, imageStyle]}
  //             source={
  //               type === 'avatar' ? CONFIG.users[0].path : ASSETS.imgFailed
  //             }
  //             resizeMode={'cover'}
  //           />
  //         </View>
  //       )}

  //       {title && (
  //         <View style={styles.con_title}>
  //           <Text style={styles.txt_title} numberOfLines={1}>
  //             {title}
  //           </Text>
  //         </View>
  //       )}
  //     </View>
  //   );
  // }

  // _onLoadStart = () => {
  //   this.setState({isReady: false, error: false});
  // };

  // _onLoad = () => {
  //   this.setState({isReady: true, error: false});
  // };

  // _onError = () => {
  //   this.setState({isReady: true, error: true});
  // };
}

CImage.defaultProps = {
  ignoreLoading: false,
  blurRadius: 0,
};

export default CImage;
