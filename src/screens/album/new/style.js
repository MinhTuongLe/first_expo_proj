/**
 * @Description: Health Screen Logic
 * @Created by ZiniTeam
 * @Date create: 27/02/2019
 */
import {Platform} from 'react-native';
/** COMMON */
import {DEVICE, COLOR} from '../../../config';
import CommonStyle from '../../../helpers/common-style';
import Helpers from '../../../helpers';

const styles = Object.assign({}, CommonStyle, {
  con: [DEVICE.gStyle.flex_1, {backgroundColor: COLOR.backgroundMain}],
  selectedBar: [
    DEVICE.gStyle.row_align_center,
    {
      position: 'absolute',
      bottom: 0,
      left: 0,
      paddingLeft: 10,
      width: DEVICE.width,
      height: Helpers.wS('10.66%'),
      backgroundColor: 'rgba(0, 0, 0, .5)',
      justifyContent: 'flex-start',
      zIndex: 3,
    },
  ],
  txtSelected: [DEVICE.initFont.X_SMALL, {color: '#ffffff'}],

  modalChooseClass: [
    DEVICE.gStyle.flex_1,
    {
      width: DEVICE.width,
      height: DEVICE.height,
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 100,
      backgroundColor: 'rgba(0,0,0,.5)',
    },
  ],
  boxContent: [
    DEVICE.gStyle.flex_1,
    {
      backgroundColor: '#ffffff',
      borderRadius: 5,
      padding: 10,
      margin: 10,
      height: Helpers.hS('40%'),
      marginBottom: Platform.OS === 'ios' ? 15 : 35,
    },
  ],
  boxTitle: {height: Helpers.wS('10.66%'), paddingTop: 13},
  txtTitleBox: [DEVICE.initFont.X_SMALL, {fontFamily: DEVICE.fontBold}],
  //Name
  nameArea: [
    DEVICE.gStyle.row_align_center,
    {
      borderBottomWidth: 0.4,
      borderBottomColor: COLOR.borderColor,
      height: '100%',
      width: '100%',
    },
  ],
  txtNameStudent: [DEVICE.initFont.X_SMALL, {marginLeft: 10}],
  //ITEM ROW
  rowItemStudent: [
    DEVICE.gStyle.justify_center,
    {height: Helpers.wS('16%'), alignItems: 'flex-start'},
  ],
});

export default styles;
