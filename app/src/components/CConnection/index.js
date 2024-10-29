/**
 * @Description: Custom Component Connection 
 * @Created by ZiniTeam
 * @Date create: 10/01/2019
 */
/** LIBRARY */
import React from 'react';
import { View, Text, Modal, Animated } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NetInfo from "@react-native-community/netinfo";
/** COMMON */
import CText from '../CText';
import { DEVICE, LANG, CONFIG } from '../../config';
import * as connectionActions from '../../redux/actions/connection'
import Helpers from '../../helpers';

/** CLASSES */
class CConnection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _connected: true
    }
    this.animatedValue = new Animated.Value(0);
  }

  /** FUNCTIONS */
  _animate = () => {
    this.setState({ _connected: false });
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 300
      }
    ).start(() => {
      if (this.state._connected) {
        this._reverseAnimate();
      }
    });
  }

  _reverseAnimate = () => {
    this.setState({ _connected: true });
    Animated.timing(
      this.animatedValue,
      {
        toValue: 0,
        duration: 300
      }
    ).start();
  }

  _handleNetInfo = obj => {
    obj.isConnected ? this._reverseAnimate() : this._animate();
    obj.isConnected
      ? this.props.connectionActions.updateNetStatus(true)
      : this.props.connectionActions.updateNetStatus(false);
  }

  /** LIFE CYCLE */
  componentDidMount() {
    NetInfo.addEventListener(this._handleNetInfo);
  }

  /** RENDER */
  render() {
    if (!this.state._connected) {
      return (
        <Modal
          visible={!this.state._connected}
          animationType={'fade'}
          onRequestClose={() => { }}
          transparent={true}
        >
          <View style={styles.con_modal}>
            <CText style={styles.txt_alert_1} i18nKey={'connectionFailed'} />
          </View>
        </Modal>
      );
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.connection.connection
  }
};

const mapDispatchToProps = dispatch => {
  return {
    connectionActions: bindActionCreators(connectionActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CConnection);

const styles = {
  note: {
    fontSize: 20 * DEVICE.s,
    fontFamily: DEVICE.fontBold,
    textAlign: 'center',
    margin: 10,
    color: "white"
  },
  con_modal: { alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,.9)' },
  txt_alert_1: { color: 'red', fontFamily: DEVICE.fontBold, fontSize: Helpers.fS(17), paddingVertical: 10 },
};
