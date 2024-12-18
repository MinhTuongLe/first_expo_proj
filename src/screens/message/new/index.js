/* eslint-disable prettier/prettier */
/**
 * @Description: New Album Screen Logic
 * @Created by ZiniTeam
 * @Date create: 26/02/2019
 */
/** LIBRARY */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Platform } from "react-native";
// import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import * as MediaLibrary from "expo-media-library";
/** COMPONENT */
import ViewUploadImageMessage from "./render";
/** COMMON */
import Helpers from "../../../helpers";
/** REDUX */
import * as loadingActions from "../../../redux/actions/loading";

class UploadImageMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _isLoading: true,
      _isLoadMore: false,
      _classChoose: null,
      _numPhoto: 20,
      _pageNumPhoto: 1,
      _dataPhoto: [{ id: "cameraBtn" }],
      _arrSelectedPhoto: null,
      _arrDataClasses: props.login.data.classes,
      _addFrom: props.route.params?.addFrom ?? null,
    };
    this._arrSelected = [];
    this._photoByCamera = null;
  }

  /** FUNCTIONS */
  // _getInfoListMedia = async () => {
  //   let {_numPhoto, _pageNumPhoto} = this.state;
  //   let options = {
  //     first: _pageNumPhoto * _numPhoto,
  //     assetType: 'Photos',
  //   };
  //   if (Platform.OS === 'ios') {
  //     options.groupTypes = 'All';
  //   }
  //   if (Platform.OS === 'android') {
  //     options.include = ['filename', 'imageSize'];
  //   }
  //   let res = await CameraRoll.getPhotos(options);
  //   // console.log(res);
  //   let photoArray = res.edges;
  //   let _classChoose = await Helpers.getAsyStrClassChoosed();
  //   if (_classChoose) {
  //     _classChoose = JSON.parse(_classChoose);
  //   }
  //   if (photoArray.length < 20) {
  //     this.onEndReachedCalledDuringMomentum = false;
  //   }
  //   let tmp = [{id: 'cameraBtn'}];
  //   this.setState({
  //     _dataPhoto: [...tmp, ...photoArray],
  //     _classChoose: _classChoose ? _classChoose : null,
  //     _pageNumPhoto: _pageNumPhoto + 1,
  //     _isLoading: false,
  //     _isLoadMore: photoArray.length === _pageNumPhoto * _numPhoto,
  //   });
  //   this.props.loadingActions.setLoading(false);
  // };

  _getInfoListMedia = async () => {
    let { _numPhoto, _pageNumPhoto } = this.state;
    let options = {
      first: _numPhoto,
      mediaType: "photo", // Chỉ lấy ảnh
    };

    // Gọi MediaLibrary để lấy ảnh
    let res = await MediaLibrary.getAssetsAsync(options);
    let photoArray = res.assets; // Dữ liệu ảnh sẽ nằm ở đây

    let _classChoose = await Helpers.getAsyStrClassChoosed();
    if (_classChoose) {
      _classChoose = JSON.parse(_classChoose);
    }

    if (photoArray.length < _numPhoto) {
      this.onEndReachedCalledDuringMomentum = false;
    }

    // Tạo một mảng tạm thời chứa nút camera
    let tmp = [{ id: "cameraBtn" }];

    // Cập nhật state
    this.setState({
      _dataPhoto: [...tmp, ...photoArray],
      _classChoose: _classChoose ? _classChoose : null,
      _pageNumPhoto: _pageNumPhoto + 1,
      _isLoading: false,
      _isLoadMore: photoArray.length === _numPhoto, // Kiểm tra xem có đủ ảnh để load thêm không
    });

    // Tắt loading
    this.props.loadingActions.setLoading(false);
  };

  _openCamera = async () => {
    let agreeP = await Helpers.askPermissionsCamera();
    if (agreeP) {
      let result = await Helpers.choosePhotoFromCamera();
      if (result) {
        let arrTemp = [];
        arrTemp.push({
          id: "photoByCam",
          data: result,
        });

        let _classChoose = await Helpers.getAsyStrClassChoosed();
        if (_classChoose) {
          _classChoose = JSON.parse(_classChoose);
        }

        let { navigation, route } = this.props;

        if (arrTemp) {
          let fromRoute = this.props.route.name;
          if (fromRoute && fromRoute === "UploadImageMessage") {
            route.params.onPrepareMedia(arrTemp);
            navigation.goBack();
          }
        }

        // this.props.navigation.navigate('UploadAlbum', {
        //   seletedClass: _classChoose,
        //   arrSelectedPhoto: arrTemp,
        //   addFrom: this.state._addFrom,
        //   onRefresh:
        //     this.props.route.params?.onRefresh ??
        //     (arrSelectedPhoto => this._onBack(arrSelectedPhoto)),
        // });
      } else {
        Helpers.toast(
          this.props.language === "vi" ? "Lỗi Camera" : "Camera error"
        );
      }
    }
  };

  _onLoadMore = () => {
    if (this.state._isLoadMore) {
      if (!this.onEndReachedCalledDuringMomentum) {
        this._getInfoListMedia();
        this.onEndReachedCalledDuringMomentum = true;
      }
    }
  };

  _onEndReachedCalledDuringMomentum = () => {
    this.onEndReachedCalledDuringMomentum = false;
  };

  /** HANDLE FUNCTIONS */
  _onPressImageItem = (item) => {
    if (item.id === "cameraBtn") {
      this._openCamera();
    } else {
      this.setState((prevState) => ({
        _arrSelectedPhoto: prevState._arrSelectedPhoto === item ? null : item,
      }));
    }
  };

  _onPressNext = () => {
    let { _arrSelectedPhoto } = this.state;
    let { navigation, route } = this.props;

    if (_arrSelectedPhoto) {
      let fromRoute = this.props.route.name;
      if (fromRoute && fromRoute === "UploadImageMessage") {
        route.params.onPrepareMedia(_arrSelectedPhoto);
        navigation.goBack();
      }
    }
  };

  _onBack = (arrSelectedPhoto) => {
    this.setState({
      _arrSelectedPhoto: arrSelectedPhoto,
      _dataPhoto: [],
    });
    this._getInfoListMedia();
  };

  _onPressBack = () => {
    this.props.route.params?.onRefresh?.();
    this.props.navigation.goBack();
  };

  /* LIFE CYCLE */
  componentDidMount() {
    this._getInfoListMedia();
  }

  /** RENDER */
  render() {
    let { _dataPhoto, _arrDataClasses } = this.state;

    return (
      <ViewUploadImageMessage
        data={{
          photo: _dataPhoto,
          arrSelectedPhoto: this.state._arrSelectedPhoto,
          dataClasses: _arrDataClasses,
        }}
        onEndReachedCalledDuringMomentum={
          this._onEndReachedCalledDuringMomentum
        }
        onLoadMore={this._onLoadMore}
        onPressNext={this._onPressNext}
        onPressImageItem={this._onPressImageItem}
        onPressBack={this._onPressBack}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    language: state.language.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingActions: bindActionCreators(loadingActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadImageMessage);
