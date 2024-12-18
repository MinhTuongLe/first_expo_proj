/**
* @Description: ./src/components/CMenuDropdown
* @CreatedAt: 13/11/2019
* @Author: ZiniSoft
*/
/** LIBRARY */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

function MenuDivider({ color }) {
  return <View style={[styles.divider, { borderBottomColor: color }]} />;
}

MenuDivider.defaultProps = {
  color: 'rgba(0,0,0,0.12)',
};

MenuDivider.propTypes = {
  color: PropTypes.string,
};

const styles = StyleSheet.create({
  divider: {
    flex: 1,
    borderBottomWidth: .4
  },
});

export default MenuDivider;