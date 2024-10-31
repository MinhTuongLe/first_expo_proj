/**
 * @Description: Health Screen Logic
 * @Created by ZiniTeam
 * @Date create: 27/02/2019
 */
import {StyleSheet} from 'react-native';
/** COMMON */
import {DEVICE} from '../../../config';
import CommonStyle from '../../../helpers/common-style';
import Helpers from '../../../helpers';

const styles = Object.assign({}, CommonStyle, {
  itemThumbImage: {
    backgroundColor: '#dedede',
    width: Helpers.wS('33%'),
    height: Helpers.wS('33.33%'),
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
  },
  checkedPhoto: {
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: Helpers.bR((Helpers.wS('5.33%') * 100) / 2),
    width: Helpers.wS('5.33%'),
    height: Helpers.wS('5.33%'),
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_full: {width: '100%', height: '100%'},
  image_item: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
});

export default styles;
