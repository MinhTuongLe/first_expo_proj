/**
 * @Description: News Details Screen Logic
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** LIBRARY */
import React from 'react';
/** COMPONENTS **/
import ViewNewsDetail from './render'

class NewsDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      _data: props.route.params?.data
    }
  }
/** HANDLE FUNCTIONS */
_onPressBack = () => {
  this.props.route.params?.onRefresh?.();
  this.props.navigation.goBack();
};
  render() {
    let { _data } = this.state;
    return (
      <ViewNewsDetail
        data={_data}
        onPressBack={this._onPressBack}
      />
    )
  }
}

export default NewsDetailScreen;
