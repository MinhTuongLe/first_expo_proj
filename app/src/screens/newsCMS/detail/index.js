/**
 * @Description: News Details Screen Logic
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** LIBRARY */
import React from 'react';
/** COMPONENTS **/
import { ViewNewsCMSDetail } from './render';
/** COMMON */
import Services from "../../../services";

class NewsCMSDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      _loading: true,
      _data: null,
      _dataRelated: []
    }
  }

  /** FUNCTION */
  _onFetchData = async () => {
    let { _data, _dataRelated } = this.state;
    /** Get post */
    let _id = this.props.route.params.id ?? "";
    let res = await Services.News.getCMS(_id);
    if (res && !res.code) _data = res;

    /** Get post related */
    let resRelated = await Services.News.listCMSRelated(_id);
    if (resRelated && !resRelated.code) _dataRelated = resRelated;

    this.setState({
      _data, _dataRelated,
      _loading: false
    })
  }

  _onPressPost = (data) => {
    this.props.navigation.push('NewsCMSDetail', { id: data.id });
  }

  _onPressCategory = (data) => {
    this.props.navigation.navigate('CategoryNews', { data });
  }

  _onPressAuthor = (data) => {
    this.props.navigation.navigate('AuthorNews', { data });
  }

  _onPressTag = (data) => {
    this.props.navigation.navigate('TagNews', { data });
  }

  /** LIFE CYCLE */
  componentDidMount() {
    this._onFetchData();
  }

  /** RENDER */
  render() {
    return (
      <ViewNewsCMSDetail
        state={this.state}
        onPress={{
          post: this._onPressPost,
          category: this._onPressCategory,
          author: this._onPressAuthor,
          tag: this._onPressTag
        }}
      />
    )
  }
}

export default NewsCMSDetailScreen;
