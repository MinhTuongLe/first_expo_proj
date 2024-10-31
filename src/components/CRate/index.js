/** LIBRARY */
import React from 'react';
import { Text, View, Image, Modal, TouchableOpacity } from 'react-native';
/** COMMON */
import CText from '../CText';
import { ASSETS, DEVICE, COLOR } from '../../config';
/** STYLE */
import styles from './style';

class CRate extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  /** RENDER */
  render() {
    let { visible, onRequestClose, onOK } = this.props;

    return (
      <Modal
        visible={visible}
        animationType={'fade'}
        onRequestClose={onRequestClose}
        transparent
      >
        <TouchableOpacity style={styles.con_bg} onPress={onRequestClose} activeOpacity={1}>
          <View style={styles.con_modal}>
            <View style={styles.con_content}>
              <View style={styles.con_img}>
                <Image
                  style={styles.img}
                  source={ASSETS.imgLogoShort}
                  resizeMode={'contain'}
                />
              </View>

              <CText style={styles.txt_name_app} i18nKey={'appName'} />

              <CText style={styles.txt_des} i18nKey={'rateForApp'} />
            </View>

            <View style={styles.con_btn}>
              <TouchableOpacity style={styles.con_btn_left} onPress={onRequestClose}>
                <CText style={styles.txt_btn_left} i18nKey={'remindMeLater'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.con_btn_right} onPress={onOK}>
                <CText style={styles.txt_btn_right} i18nKey={'ok'} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }
}

export default CRate;