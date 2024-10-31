/**
 * @Description: Album Detail Screen Logic
 * @Created by ZiniTeam
 * @Date create: 21/01/2019
 */
/** LIBRARY */
import React from 'react';
import {connect} from 'react-redux';
import {Keyboard} from 'react-native';
import moment from 'moment';
/** COMPONENT */
import ViewAlbumDetailScreen from './render';
/** COMMON */
import Services from '../../../services';

class AlbumDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _isLiked: false,
      _idx: props.route.params?.idx ?? '',
      _idAlbum: props.route.params?.id ?? '',
      _dataAlbum: null,
      _dataAlbumPrepared: {
        comments: [],
        whoLike: [],
        createAt: 1,
        title: '',
        photos: [],
      },
    };
    this._listParentPrepared = {};
    this._listTeacherPrepared = {};
  }

  /** FUNCTIONS */
  _checkDataAlbum = async () => {
    let resp = await Services.Album.get(this.state._idAlbum);
    if (resp && resp.data) {
      this._prepareAlbumData(resp.data);
    }
  };

  _prepareAlbumData = _dataAlbum => {
    let photoTemp = [],
      _arrCommentsPrepared = [],
      i;
    let whoLike = _dataAlbum.whoLike;
    let createAt = _dataAlbum.createdAt;
    let title = _dataAlbum.title;

    photoTemp = _dataAlbum.photos.map(item => item);
    for (i = 0; i < _dataAlbum.comments.length; i++) {
      if (this._listParentPrepared[_dataAlbum.comments[i].idUserPost]) {
        let objUserCmt = {
          id: this._listParentPrepared[_dataAlbum.comments[i].idUserPost].id,
          gender:
            this._listParentPrepared[_dataAlbum.comments[i].idUserPost].gender,
          avatar:
            this._listParentPrepared[_dataAlbum.comments[i].idUserPost].avatar,
          firstName:
            this._listParentPrepared[_dataAlbum.comments[i].idUserPost]
              .firstName,
          lastName:
            this._listParentPrepared[_dataAlbum.comments[i].idUserPost]
              .lastName,
          createAt: _dataAlbum.comments[i].createAt,
          contentCmt: _dataAlbum.comments[i].contentCmt,
        };
        _arrCommentsPrepared.push(objUserCmt);
      } else if (this._listTeacherPrepared[_dataAlbum.comments[i].idUserPost]) {
        let objUserCmt = {
          id: this._listTeacherPrepared[_dataAlbum.comments[i].idUserPost].id,
          gender:
            this._listTeacherPrepared[_dataAlbum.comments[i].idUserPost].gender,
          avatar:
            this._listTeacherPrepared[_dataAlbum.comments[i].idUserPost].avatar,
          firstName:
            this._listTeacherPrepared[_dataAlbum.comments[i].idUserPost]
              .firstName,
          lastName:
            this._listTeacherPrepared[_dataAlbum.comments[i].idUserPost]
              .lastName,
          createAt: _dataAlbum.comments[i].createAt,
          contentCmt: _dataAlbum.comments[i].contentCmt,
        };
        _arrCommentsPrepared.push(objUserCmt);
      }
    }

    let _dataAlbumPrepared = {
      comments:
        _arrCommentsPrepared.length > 0 ? _arrCommentsPrepared.reverse() : [],
      whoLike: whoLike,
      createAt: createAt,
      title: title,
      photos: photoTemp,
      owner: _dataAlbum.owner,
    };

    //Check liked
    let pos = _dataAlbum.whoLike.indexOf(this.props.login.data.id);
    this.setState({
      _isLiked: pos !== -1,
      _dataAlbum,
      _dataAlbumPrepared,
      _loading: false,
    });
  };

  _onPressLike = async () => {
    let {_dataAlbum, _isLiked} = this.state;
    let whoLikeNew = _dataAlbum.whoLike;

    if (_isLiked) {
      let pos = whoLikeNew.indexOf(this.props.login.data.id);
      whoLikeNew.splice(pos, 1);
    } else {
      whoLikeNew.push(this.props.login.data.id);
    }

    let params = {
      idAlbum: _dataAlbum.id,
      title: _dataAlbum.title,
      whoLike: whoLikeNew,
    };
    let resp = await Services.Album.like(params);
    if (resp.data) {
      this._checkDataAlbum();
    }
  };

  _onPressSendComment = async ref => {
    let textVal = ref.value;
    if (textVal == '') {
      return;
    }
    let {_dataAlbum} = this.state;
    Keyboard.dismiss();

    let oldComments = _dataAlbum.comments;
    let newContentComment = {
      idUserPost: this.props.login.data.id,
      contentCmt: textVal,
      createAt: moment().valueOf(),
    };

    let newComments = oldComments.concat(newContentComment);
    let params = {
      idAlbum: _dataAlbum.id,
      title: _dataAlbum.title,
      comments: newComments,
    };

    let resp = await Services.Album.comment(params);
    if (resp.data) {
      ref.clear;
      this._checkDataAlbum();
    }
  };

  _onPressCmt = ref => ref.focus;

  /** HANDLE FUNCTIONS */
  _onPressBack = () => {
    this.props.route.params?.onRefresh?.();
    this.props.navigation.goBack();
  };

  /** LIFE CYCLE */
  componentDidMount() {
    let {parents, teachers} = this.props,
      i;
    if (parents.data) {
      for (i = 0; i < parents.data.length; i++) {
        this._listParentPrepared[parents.data[i].id] = parents.data[i];
      }
    }
    if (teachers.data) {
      for (i = 0; i < teachers.data.length; i++) {
        this._listTeacherPrepared[teachers.data[i].id] = teachers.data[i];
      }
    }
    this._checkDataAlbum();
  }

  /** RENDER */
  render() {
    let {_loading, _isLiked, _dataAlbumPrepared} = this.state;

    return (
      <ViewAlbumDetailScreen
        isLoading={_loading}
        isLiked={_isLiked}
        data={_dataAlbumPrepared}
        language={this.props.language}
        onPress={{
          like: this._onPressLike,
          cmt: this._onPressCmt,
          send: this._onPressSendComment,
          goBack: this._onPressBack
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    teachers: state.teachers,
    parents: state.parents,
    login: state.login,
    language: state.language.language,
  };
};

export default connect(mapStateToProps, null)(AlbumDetailScreen);
