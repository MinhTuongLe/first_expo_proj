/**
 * @Description: News Screen Logic
 * @Created by ZiniTeam
 * @Date create: 23/01/2019
 */
/** LIBRARY */
import React from 'react';
import {connect} from 'react-redux';
import {Platform, View} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
/** COMPONENTS **/
import HeaderBar from '../partials/header_bar';
import CLoading from '../../components/CLoading';
import {ViewNewsScreen} from '../news/render';
/** COMMON */
import Services from '../../services';
import {COLOR, DEVICE, KEY, LANG} from '../../config';
/** STYLE */
import styles from './style';

class NewsCMSScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _refreshing: false,
      _loadmore: true,

      _dataNews: [],

      index: 0,
      routes: [
        {key: 'newscms', title: LANG[props.language].title_news_cms},
        {key: 'news', title: LANG[props.language].title_news_school},
      ],
    };
    this._page = 1;
    this._limit = 10;
  }

  /** FUNCTIONS */
  /** For School */
  _getDataFromServer = async (params, type) => {
    let loadmore = true;
    let {_dataNews} = this.state;
    let result = await Services.News.list(params);
    if (result?.data?.length > 0) {
      // console.log('result', result);
      if (result.data.length < this._limit) loadmore = false;
      if (type == KEY.DATA_REFRESH) {
        _dataNews = result.data;
      } else if (KEY.DATA_LOADMORE) {
        _dataNews = [..._dataNews, ...result.data];
      }
      this._page += 1;
    }

    this.setState({
      _dataNews,
      _loading: false,
      _refreshing: false,
      _loadmore: loadmore,
    });
  };

  _onRefresh = () => {
    this.setState({_refreshing: true});
    this._page = 1;
    let params = {
      page: 1,
      limit: this._limit,
      school: this.props.login.data.school,
    };
    this._getDataFromServer(params, KEY.DATA_REFRESH);
  };

  _onLoadMore = () => {
    if (this.state._loadmore) {
      let params = {
        page: this._page,
        limit: this._limit,
        school: this.props.login.data.school,
      };
      this._getDataFromServer(params, KEY.DATA_LOADMORE);
    }
  };

  _onPressPost = data => {
    this.props.navigation.navigate('NewsDetail', {data});
  };

  /** LIFE CYCLE */
  componentDidMount() {
    let params = {
      page: 1,
      limit: this._limit,
      school: this.props.login.data.school,
    };
    this._getDataFromServer(params, KEY.DATA_REFRESH);
  }

  /** RENDER */
  render() {
    return (
      <View style={styles.container}>
        {/* Header */}
        <HeaderBar title={'txtTab3'} titleCenter={false} />

        <ViewNewsScreen
          state={this.state}
          data={this.state._dataNews}
          onRefresh={this._onRefresh}
          onLoadMore={this._onLoadMore}
          onPress={{
            post: this._onPressPost,
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    language: state.language.language,
  };
};

export default connect(mapStateToProps, null)(NewsCMSScreen);
