/**
 * @Description: Side Menu Layout
 * @Created by ZiniTeam
 * @Date create: 14/02/2019
 */
/** LIBRARY */
import React from 'react';
import {Text, Image, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
/** COMPONENTS */
import CText from '../../../../components/CText';
/** COMMON **/
import {CONFIG, KEY, ASSETS, DEVICE, COLOR} from '../../../../config';
/** STYLES */
import styles from '../style';
import Helpers from '../../../../helpers';

class InfoUserDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.login.data
        ? {uri: CONFIG.host + props.login.data.avatar}
        : ASSETS.avatar,
    };
  }

  /** FUNCTIONS */
  _onError = () => {
    let find = CONFIG.users[0].path;
    if (this.props.login.data) {
      if (this.props.login.data.hasOwnProperty('gender')) {
        find = CONFIG.users.find(f => f.id === this.props.login.data.gender);
        if (find) find = find.path;
      }
    }

    this.setState({avatar: find});
  };

  _userType = () => {
    let userType = '';
    if (CONFIG.USER_TYPE == KEY.TEACHER)
      return (userType = 'txtMessageTitleTeacher');
    else if (CONFIG.USER_TYPE == KEY.PARENT) return (userType = 'txtParent');
    else if (CONFIG.USER_TYPE == KEY.DRIVER) return (userType = 'driver');
  };

  /** LIFE CYCLE */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.login.data && this.props.login.data) {
      if (prevProps.login.data.avatar != this.props.login.data.avatar) {
        this.setState({
          avatar: {uri: CONFIG.host + this.props.login.data.avatar},
        });
      }
    }
  }

  /** RENDER */
  render() {
    let {onPress, fullName} = this.props;
    let {avatar} = this.state;

    return (
      <TouchableOpacity style={styles.con_header_bar} onPress={onPress}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {/** Avatar  */}
          <Image
            style={styles.image_avatar}
            resizeMode={'cover'}
            source={avatar}
            onError={this._onError}
          />

          <View
            style={{
              flex: 1,
              marginLeft: 10,
            }}>
            <Text
              style={styles.txt_name}
              numberOfLines={1}
              ellipsizeMode="tail">
              {fullName}
            </Text>
            <CText style={styles.txt_sub} i18nKey={this._userType()} />
          </View>

          <Icon
            name={'bars'}
            size={Helpers.fS(23)}
            color={'#ffffff'}
            type={'regular'}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
  };
};

export default connect(mapStateToProps, null)(InfoUserDrawer);
