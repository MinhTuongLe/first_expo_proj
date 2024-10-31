/**
 * @Description: New Album Screen Logic
 * @Created by ZiniTeam
 * @Date create: 26/02/2019
 */
/** LIBRARY */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
/** COMMON */
import Services from '../../../../services';
import Helpers from '../../../../helpers';
import {LANG, CONFIG} from '../../../../config';
/** COMPONENT */
import ViewUploadAlbum from './render';
/** REDUX */
import * as loadingActions from '../../../../redux/actions/loading';
import Toast from 'react-native-root-toast';
import {Keyboard} from 'react-native';

class UploadAlbumScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _albumName: '',
      _dataUser: props.login.data,
      _arrSelectedPhoto: props.route.params.arrSelectedPhoto ?? [],
      _seletedClass: props.route.params.seletedClass ?? '',
      _addFrom: props.route.params.addFrom ?? [],
    };
    this._arrIDPhoto = [];
  }

  /** FUNCTIONS */
  _getValAlbumName = text => {
    this.setState({_albumName: text});
  };

  /** HANDLE FUNCTION */
  _onPressPost = async () => {
    let {_arrSelectedPhoto, _dataUser, _albumName, _seletedClass} = this.state;
    let {navigation} = this.props;

    if (_albumName == '' || _arrSelectedPhoto.length == 0) {
      let txtErr =
        _albumName == ''
          ? LANG[CONFIG.lang].txtRequireNameAlbum
          : _arrSelectedPhoto.length == 0
          ? LANG[CONFIG.lang].txtRequirePhoto
          : '';
      return Helpers.toast(txtErr);
    }

    Keyboard.dismiss();
    this.props.loadingActions.setLoading(true);
    Helpers.toast(LANG[CONFIG.lang].txtUploading);

    /* Start post media */
    let paramsMedia;
    if (
      _arrSelectedPhoto.length === 1 &&
      _arrSelectedPhoto[0].id === 'photoByCam'
    ) {
      let fileName = _arrSelectedPhoto[0].data.path.substring(
        _arrSelectedPhoto[0].data.path.lastIndexOf('/') + 1,
        _arrSelectedPhoto[0].data.path.length,
      );

      paramsMedia = {
        typeChange: 'Media',
        status: 1,
        files: [
          {
            node: {
              image: {
                uri: _arrSelectedPhoto[0].data.path,
                fileName,
                typeImage: 'image/jpeg',
              },
            },
          },
        ],
        user: this.props.login.data.id,
        school: this.props.login.data.school,
      };
    } else {
      let i;
      for (i = 0; i < _arrSelectedPhoto.length; i++) {
        let newPhoto = await Helpers.resizePhoto(_arrSelectedPhoto[i]);

        _arrSelectedPhoto[i].node.image.uri = newPhoto.uri;
        _arrSelectedPhoto[i].node.image.fileName = newPhoto.name;
        _arrSelectedPhoto[i].node.image.width = newPhoto.width;
        _arrSelectedPhoto[i].node.image.height = newPhoto.height;
        _arrSelectedPhoto[i].node.image.typeImage = 'image/jpeg';
      }

      paramsMedia = {
        typeChange: 'Media',
        status: 1,
        files: _arrSelectedPhoto,
        user: this.props.login.data.id,
        school: this.props.login.data.school,
      };

      // console.log(paramsMedia);
    }

    let resp = await Services.Media.add(paramsMedia);
    if (resp) {
      this._arrIDPhoto = resp.data;

      /* Start post album */
      let params = {
        title: _albumName,
        description: '',
        photos: this._arrIDPhoto,
        status: 1,
        owner: _dataUser.id,
        class: _seletedClass.id,
        courseSession: _seletedClass.courseSession,
        school: this.props.login.data.school,
      };

      // console.log("Selected Class: ", _seletedClass)

      let result = await Services.Album.create(params);
      let txtRes = LANG[CONFIG.lang].txtUploadSuccess;
      this.props.loadingActions.setLoading(false);

      if (result && result.status == '200') {
        Helpers.toast(txtRes);
      } else {
        Helpers.toast(LANG[CONFIG.lang].txtUploadFailed);
      }
      Helpers.resetNavigation(navigation, 'RootDrawer');
    } else {
      Helpers.toast(
        'Error: Multiple file are lagre than ' +
          this.props.setting.config.value.maximumUploadSize +
          ' Mb',
      );
      this.props.loadingActions.setLoading(false);
    }
  };

  _onPressRemove = item => {
    let {_arrSelectedPhoto} = this.state;

    if (item.hasOwnProperty('id')) {
      _arrSelectedPhoto.splice(0, 1);
    } else {
      let pos = _arrSelectedPhoto.indexOf(item);
      if (pos != -1) {
        _arrSelectedPhoto.splice(pos, 1);
      }
    }
    this.setState({_arrSelectedPhoto});
  };

  _onBack = () => {
    this.props.route.params.onRefresh(this.state._arrSelectedPhoto);
    this.props.navigation.goBack();
  };

  /** RENDER */
  render() {
    let {_albumName, _arrSelectedPhoto} = this.state;

    return (
      <ViewUploadAlbum
        albumName={_albumName}
        language={this.props.language}
        arrSelectedPhoto={_arrSelectedPhoto}
        onPressPost={this._onPressPost}
        onPressRemove={this._onPressRemove}
        onBack={this._onBack}
        getValAlbumName={this._getValAlbumName}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    isLoading: state.loading.isLoading,
    setting: state.setting,
    language: state.language.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadingActions: bindActionCreators(loadingActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadAlbumScreen);
