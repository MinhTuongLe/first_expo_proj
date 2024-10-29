/* eslint-disable prettier/prettier */
/**
 * @Description: Album Screen Logic
 * @Created by ZiniTeam
 * @Date create: 21/01/2019
 */
/** LIBRARY */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
/** COMPONENT */
import ViewAlbumScreen from './render';
/** COMMON */
import Helpers from '../../helpers';
import Services from '../../services';
import {CONFIG, KEY} from '../../config';
/** REDUX */
import * as loadingActions from '../../redux/actions/loading';

class AlbumScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _refreshing: false,
      _isLoadmore: true,
      _loadForList: true,
      _classChoose: null,
      _studentChoose: null,
      _dataAlbum: props.route.params?.data ?? [],
      _dataStudents: props.login.data.students,
      _dataClasses: props.login.data.classes,
    };
    this._limit = 10;
    this._page = 1;
  }

  /** FUNCTIONS */
  _checkClasses = async () => {
    let _classChoose = null;
    /** Check class choosed from storage */
    _classChoose = await Helpers.getAsyStrClassChoosed();
    if (_classChoose) {
      _classChoose = JSON.parse(_classChoose);
    }

    this.setState(
      {
        _classChoose: _classChoose || null,
        _loadForList: false,
      },
      () => this._onRefresh(),
    );
  };

  _checkStudents = async () => {
    let {_studentChoose} = this.state;
    /** Check student choosed from storage */
    _studentChoose = await Helpers.getAsyStrStudentChoosed();
    if (_studentChoose) {
      _studentChoose = JSON.parse(_studentChoose);
    }
    this.setState(
      {
        _classChoose: _studentChoose ? _studentChoose.class : null,
        _studentChoose: _studentChoose || null,
        _loadForList: false,
      },
      () => this._onRefresh(),
    );
  };

  _onRefresh = async () => {
    let resultAlbum = [],
      isLoadmore = true;

    let paramsListAlbum = {
      page: 1,
      limit: this._limit,
      classId: this.state._classChoose?.id,
      school: this.props.login.data.school,
    };

    let resp = await Services.Album.list(paramsListAlbum);
    if (resp && resp.data.length > 0) {
      if (resp.data.length < this._limit) {
        isLoadmore = false;
      }

      resultAlbum = resultAlbum.concat(resp.data);
      resultAlbum.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1;
        }
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        return 0;
      });
    }
    // console.log('resultAlbum', resultAlbum);
    this.setState({
      _dataAlbum: resultAlbum,
      _isLoadmore: isLoadmore,
      _refreshing: false,
      _loading: false,
    });
  };

  _onLoadMore = () => {
    if (this.state._isLoadmore) {
      let paramsAlbumList = {
        page: this._page + 1,
        limit: 10,
        classId: this.state._classChoose?.id,
        school: this.props.login.data.school,
      };
      this._getDataFromServer(paramsAlbumList);
    }
  };

  _getDataFromServer = async params => {
    let resultAlbum = await Services.Album.list(params);
    this._fetchSuccess(resultAlbum.data);
  };

  _fetchSuccess = album => {
    let {_dataAlbum} = this.state;
    let isLoadmore = true;

    if (album && album.length > 0) {
      if (album.length < this._limit) {
        isLoadmore = false;
      }
      _dataAlbum = [..._dataAlbum, ...album];
      this._page += 1;
    }
    this.setState({
      _dataAlbum,
      _isLoadmore: isLoadmore,
      _refreshing: false,
      _loading: false,
    });
  };

  /** HANDLE FUNCTIONS */
  _onPressChooseClass = async classObj => {
    if (classObj.id !== this.state._classChoose.id) {
      Helpers.setAsyStrClassChoosed(JSON.stringify(classObj));
      this.setState({_classChoose: classObj, _loading: true}, () =>
        this._onRefresh(),
      );
    }
  };

  _onPressChooseStudent = async studentObj => {
    if (studentObj.id !== this.state._studentChoose.id) {
      Helpers.setAsyStrStudentChoosed(JSON.stringify(studentObj));
      this.setState({_studentChoose: studentObj, _loading: true}, () =>
        this._onRefresh(),
      );
    }
  };

  _onPressAdd = async () => {
    let agreeP = await Helpers.askPermissionsCamera();
    if (agreeP) {
      try {
        this.props.loadingActions.setLoading(true);
        this.props.navigation.navigate('NewAlbum');
      } catch (e) {
        console.log('--- camera error ---', e);
      }
    }
  };

  _onPressAlbumItem = data => {
    // console.log('--- CLICK ALBUM ITEM ---', data);
    this.props.navigation.navigate('AlbumDetail', {
      id: data.id,
    });
  };

  /** HANDLE FUNCTIONS */
  _onPressBack = () => {
    this.props.route.params?.onRefresh?.();
    this.props.navigation.goBack();
  };

  /** LIFE CYCLE */
  componentDidMount() {
    if (CONFIG.USER_TYPE === KEY.PARENT) {
      this._checkStudents();
    }
    if (CONFIG.USER_TYPE === KEY.TEACHER) {
      this._checkClasses();
    }
  }

  /** RENDER */
  render() {
    let {
      _refreshing,
      _loading,
      _loadForList,
      _dataAlbum,
      _dataStudents,
      _dataClasses,
      _classChoose,
      _studentChoose,
    } = this.state;

    return (
      <ViewAlbumScreen
        isRefresh={_refreshing}
        isLoading={_loading}
        loadForHeader={_loadForList}
        lazy={{
          onRefresh: this._onRefresh,
          onLoadMore: this._onLoadMore,
        }}
        data={{
          dataAlbum: _dataAlbum,
          classes: _dataClasses,
          students: _dataStudents,
          classChoose: _classChoose,
          studentChoose: _studentChoose,
        }}
        onPress={{
          add: this._onPressAdd,
          albumItem: this._onPressAlbumItem,
          chooseClass: this._onPressChooseClass,
          chooseStudent: this._onPressChooseStudent,
          goBack: this._onPressBack,
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    isLoading: state.loading.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadingActions: bindActionCreators(loadingActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumScreen);
