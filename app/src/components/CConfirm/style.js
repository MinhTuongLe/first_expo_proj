/**
 * @Description: Post screen
 * @Created by ZiniTeam
 * @Date create: 22/01/2019
 */
import {Platform} from 'react-native';
import {DEVICE, COLOR} from '../../config';
import Helpers from '../../helpers';

export default CUploadImageStyle = {
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: DEVICE.width,
    height: DEVICE.height,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  areaClose: {flex: 1, width: '100%'},
  methodGroupBtn: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: 15,
    marginBottom: 10,
  },
  itemBtn: {
    borderBottomWidth: 0.4,
    borderBottomColor: '#cccccc',
    width: '100%',
    height: Helpers.wS('15%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingTop: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: '#cccccc',
    width: '100%',
    minHeight: Helpers.wS('20%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {backgroundColor: '#ffffff', width: '100%', borderRadius: 15},

  txtBtnUpload: {
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(16),
    color: '#000000',
  },
  txtBtnAgree: {
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(16),
    color: 'red',
  },
  txtBtnClose: {
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(16),
    color: 'black',
  },
  txtBtnTitle: {
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(18),
    color: 'black',
  },
};
