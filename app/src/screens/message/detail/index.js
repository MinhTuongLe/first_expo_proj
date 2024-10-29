/* eslint-disable prettier/prettier */
/**
 * @Description: Message Detail Screen Logic
 * @Created by ZiniTeam
 * @Date create: 26/02/2019
 */
/** LIBRARY */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import * as ScopedStorage from 'react-native-scoped-storage';
/** COMPONENT */
import {RenderMessageDetailScreen} from './render';
/** API */
import Services from '../../../services';
import sailsApi from '../../../config/sails.api';
import {CONFIG, KEY, LANG, fileLastExtensions} from '../../../config';
import * as loadingActions from '../../../redux/actions/loading';
import Helpers from '../../../helpers';
import {Linking, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MessageDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _isLoadmore: true,
      _page: 1,
      _dataMessage: [],
      _isPreview: false,
      _isExistedData: [],
    };
    this._dataChoosed = props.route.params.data ?? null;
    this._socket = props.route.params.socket ?? null;
    this._chatId = props.route.params.chatId ?? null;
  }

  /** FUNCTIONS */
  _getDataFromServer = async () => {
    let {_page, _dataMessage} = this.state;
    let {login} = this.props;

    if (this._dataChoosed) {
      let params = {
        messageId: this._dataChoosed.id,
        page: _page,
        userId: login.data.id,
      };
      let resultStore = await Services.Message.getSeenMessage(params);
      if (resultStore.data && resultStore.data.length > 0) {
        let resultData = await Services.Message.getListMessages(params);
        if (
          resultData &&
          resultData.data &&
          resultData.data?.dataLogs?.length > 0
        ) {
          _dataMessage = resultData.data.dataLogs;
        }
      }
    }
    _dataMessage = this._sortData(_dataMessage);
    this.setState({
      _dataMessage,
      _page: _page + 1,
    });
    await this._checkAll(_dataMessage);
    if (this.props.isLoading) {
      this.props.loadingActions.setLoading(false);
    }
  };

  _loadMore = async () => {
    if (this.state._isLoadmore) {
      let {_page, _dataMessage} = this.state;
      let params = {
        messageId: this._dataChoosed.id,
        page: _page,
      };
      let resultData = await Services.Message.getListMessages(params);
      if (
        resultData &&
        resultData.data &&
        resultData.data?.dataLogs?.length > 0
      ) {
        _dataMessage = _dataMessage.concat(resultData.data.dataLogs);
        _dataMessage = this._sortData(_dataMessage);
        this.setState({
          _dataMessage,
          _page: _page + 1,
        });
      } else {
        this.setState({
          _isLoadmore: false,
        });
      }
    }
  };

  _onPressSend = inputRef => {
    if (inputRef.value.trim() === '') return;
    this._storeMessageData(inputRef.value, 'text');
  };

  _onPressUploadImage = async () => {
    let agreeP = await Helpers.askPermissionsCamera();
    if (agreeP) {
      try {
        this.props.loadingActions.setLoading(true);
        this.props.navigation.navigate('UploadImageMessage', {
          onPrepareMedia: this._onPrepareMedia,
        });
      } catch (e) {
        console.log('--- upload image error ---', e);
      }
    }
  };

  _onPressUploadFile = async () => {
    const response = await DocumentPicker.pick({
      presentationStyle: 'fullScreen',
    });
    await this._onPressSendFile(response[0]);
  };

  _onPrepareMedia = async selectedPhoto => {
    await this._onPressPost(selectedPhoto);
  };

  _onPressPost = async selectedPhoto => {
    if (!selectedPhoto) {
      return Helpers.toast(LANG[CONFIG.lang].txtRequirePhoto);
    }

    this.props.loadingActions.setLoading(true);
    /* Start post media */
    let paramsMedia;
    if (selectedPhoto?.[0]?.id === 'photoByCam') {
      let fileName = selectedPhoto[0].data.path.substring(
        selectedPhoto[0].data.path.lastIndexOf('/') + 1,
        selectedPhoto[0].data.path.length,
      );

      paramsMedia = {
        typeChange: 'ImageMessage',
        file: [
          {
            node: {
              image: {
                uri: selectedPhoto[0].data.path,
                fileName,
                typeImage: 'image/jpeg',
              },
            },
          },
        ],
      };
    } else {
      let newPhoto = await Helpers.resizePhoto(selectedPhoto);
      selectedPhoto.node.image.uri = newPhoto.uri;
      selectedPhoto.node.image.fileName = newPhoto.name;
      selectedPhoto.node.image.width = newPhoto.width;
      selectedPhoto.node.image.height = newPhoto.height;
      selectedPhoto.node.image.typeImage = 'image/jpeg';

      paramsMedia = {
        typeChange: 'ImageMessage',
        file: selectedPhoto,
      };
    }

    try {
      let resultData = await Services.Message.fileSendMessage(paramsMedia);
      if (resultData?.file) {
        await this._storeMessageData(resultData.file, 'image');
      }
    } catch (error) {
      return Helpers.toast('FILE UPLOADED IS OVERSIZE');
    }
  };

  _onPressSendFile = async selectedFile => {
    let paramsMedia = {
      typeChange: 'File',
      file: selectedFile,
    };
    let resultData = await Services.Message.fileSendMessage(paramsMedia);
    if (resultData) {
      await this._storeMessageData(resultData.file, 'file');
    } else {
      Helpers.toast(LANG[CONFIG.lang].txtUploadError);
    }
  };

  _getFileType = filename => {
    const extension = filename.split('.').pop().toLowerCase();

    for (const fileType in fileLastExtensions) {
      if (fileLastExtensions[fileType].extension.includes(extension)) {
        return fileLastExtensions[fileType].name;
      }
    }

    return '';
  };

  _storeMessageData = async (content, type) => {
    let {login} = this.props;
    let params = {
      school: login.data.school,
      userId: this.props.login.data.id,
      userType: CONFIG.USER_TYPE === KEY.TEACHER ? 'USER' : 'PARENT',
      // classId:
      txtMessage: content,
      messageId: this._dataChoosed.id,
      groupType:
        this._dataChoosed.type === KEY.PERSONAL
          ? 'TE_PA_' + this._dataChoosed.id
          : 'GROUP_' + this._dataChoosed.id,
      dateUse: moment().format('YYYY-MM-DD'),
      type,
    };

    // console.log('params: ', params);

    this._socket.post(
      '/api/v4/mobile' + sailsApi.message.storeMessageData,
      params,
    );
    inputRef.value = '';
  };

  _initChat = () => {
    if (this._chatId) {
      this._socket.on(this._chatId, newMessage => {
        let {_dataMessage} = this.state;
        if (newMessage.hasOwnProperty('dataLogs')) {
          _dataMessage = newMessage.dataLogs;
          // _dataMessage = [..._dataMessage, newMessage.data];
        } else {
          // _dataMessage = newMessage.dataLogs;
          _dataMessage = [..._dataMessage, newMessage.data];
        }
        _dataMessage = this._sortData(_dataMessage);

        this.setState({
          _dataMessage,
        });
      });
    }
  };

  _sortData = data => {
    data.sort(function (a, b) {
      var keyA = new Date(a.createdAt),
        keyB = new Date(b.createdAt);
      // Compare the 2 dates
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });

    return data;
  };

  _onBack = () => {
    this.props.route.params.onRefresh();
    this.props.navigation.navigate('RootDrawer');
  };

  _onPreviewImage = status => {
    this.setState({
      _isPreview: status,
    });
  };

  _onDownloadFile = async (fileUrl, fileName) => {
    const basePath =
      Platform.OS === 'android'
        ? RNFS.DownloadDirectoryPath + '/Kindie'
        : RNFS.LibraryDirectoryPath;
    const filePath = basePath + '/' + fileName;

    await RNFS.exists(basePath)
      .then(exists => {
        if (!exists) {
          return RNFS.mkdir(basePath);
        }
      })
      .then(() => {
        return RNFS.downloadFile({
          fromUrl: fileUrl,
          toFile: filePath,
          background: true, // Enable downloading in the background (iOS only)
          discretionary: true, // Allow the OS to control the timing and speed (iOS only)
          progress: res => {
            const progress = (res.bytesWritten / res.contentLength) * 100;
            console.log(`Progress: ${progress.toFixed(2)}%`);
          },
        }).promise;
      })
      .then(response => {
        Helpers.toast(LANG[CONFIG.lang].txtDownloadSuccessfully);
        console.log('File downloaded!', response);
      })
      .catch(err => {
        Helpers.toast(LANG[CONFIG.lang].txtDownloadFailed);
        console.log('Download error:', err);
      });

    await this._checkAll(this.state._dataMessage);
  };

  _onCheckExistedFile = async dataMsg => {
    const basePath =
      Platform.OS === 'android'
        ? RNFS.DownloadDirectoryPath + '/Kindie'
        : RNFS.LibraryDirectoryPath;
    const filePath =
      basePath + '/' + dataMsg.split('/')[dataMsg.split('/').length - 1];

    let isExisted = false;
    await RNFS.exists(filePath).then(exists => {
      if (exists) {
        isExisted = true;
      }
    });
    return isExisted;
  };

  _checkAll = async _dataMessage => {
    let curr = [];
    for (let i = 0; i < _dataMessage.length; i++) {
      const message = _dataMessage[i]?.txtMessage;
      await this._onCheckExistedFile(message).then(check => {
        curr.push(check);
      });
    }
    this.setState({
      _isExistedData: curr,
    });
  };

  _onAccessDir = async () => {
    // await AsyncStorage.removeItem('userMediaDirectory');
    let saved_dir = await AsyncStorage.getItem('userMediaDirectory');
    saved_dir = JSON.parse(saved_dir);
    const persistedUris = await ScopedStorage.getPersistedUriPermissions();

    if (persistedUris.indexOf(saved_dir) !== -1) {
      await ScopedStorage.openDocument();
    } else {
      let dir = await ScopedStorage.openDocumentTree(true);
      if (dir.uri.includes(persistedUris[0])) {
        await AsyncStorage.setItem(
          'userMediaDirectory',
          JSON.stringify(persistedUris[0]),
        );
        await ScopedStorage.openDocument();
      }
    }
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._initChat();
    this._getDataFromServer();
  }

  componentWillUnmount() {
    this._socket.off(this._chatId);
  }

  /** RENDER */
  render() {
    let {_dataMessage, _isPreview, _isExistedData} = this.state;

    return (
      <RenderMessageDetailScreen
        loadMore={this._loadMore}
        language={this.props.language}
        data={{
          choosed: this._dataChoosed,
          messages: _dataMessage,
          existedData: _isExistedData,
        }}
        onPress={{
          send: this._onPressSend,
        }}
        onPressUploadImage={{
          upload: this._onPressUploadImage,
        }}
        onPressUploadFile={{
          upload: this._onPressUploadFile,
        }}
        onBack={this._onBack}
        getFileType={this._getFileType}
        onPreviewImage={this._onPreviewImage}
        onDownloadFile={this._onDownloadFile}
        _isPreview={_isPreview}
        onAccessDir={this._onAccessDir}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.loading.isLoading,
    login: state.login,
    language: state.language.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadingActions: bindActionCreators(loadingActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageDetailScreen);
