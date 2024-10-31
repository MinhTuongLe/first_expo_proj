/**
 * @Description: Loading layout
 * @Created by ZiniTeam
 * @Date create: 17/01/2019
 */
import React from 'react';
import {
  View, Image, Modal, ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import { ASSETS, COLOR, DEVICE } from '../../config';

class CInnerLoading extends React.Component {

  render() {
    let { style, imageStyle, visible } = this.props;

    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={visible}
        onRequestClose={() => null}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.cloGdaLoading, width: '100%', height: '100%' }}>
          <ActivityIndicator color={COLOR.text_1} />
        </View>
      </Modal>
    )
  }
}

export default CInnerLoading;