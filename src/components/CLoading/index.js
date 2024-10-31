/**
 * @Description: Custom Loading
 * @Created by ZiniTeam
 * @Date create: 18/01/2019
 */
/** LIBRARY */
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

/** STYLES */
import styles from './style';

/** COMPONENT */
import CInnerLoading from '../CInnerLoading';


class CLoading extends React.PureComponent {
  render() {
    return (
      <CInnerLoading />
    )
  }
}

export default connect()(CLoading);
