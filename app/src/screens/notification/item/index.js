/**
 * @Description: Notification Item Logic
 * @Created by ZiniTeam
 * @Date create: 21/01/2019
 */
/** LIBRARY */
import React from 'react';
/** COMPONENT */
import ViewNotificationItem from './render';

class NotificationItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      _isRead: props.isRead,
    };
  }

  /** FUNCTIONS */
  _onPressItem = () => {
    this.setState({_isRead: true});
    if (this.props.onPress) {
      this.props.onPress(this.props.dataRel);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isRead && !this.props.isRead) {
      this.setState({_isRead: false});
    }
  }

  /** RENDER */
  render() {
    return (
      <ViewNotificationItem
        data={this.props.data}
        isRead={this.state._isRead}
        onPress={{
          item: this._onPressItem,
        }}
      />
    );
  }
}

export default NotificationItem;
