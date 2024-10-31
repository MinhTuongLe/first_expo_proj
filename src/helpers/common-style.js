/* eslint-disable prettier/prettier */
/**
 * @Description: Common Style
 * @Created by ZiniTeam
 * @Date create: 18/01/2019
 */
/** LIBRARY */
import {Platform} from 'react-native';
import Helpers from '.';

const statusBarHeight =
  Platform.OS === 'android' ? 10 : Helpers.isIphoneX() ? 30 : 20;

export default {
  /* MARGIN */
  mv_5: {marginVertical: 5},
  mv_10: {marginVertical: 10},
  mv_15: {marginVertical: 15},
  mv_20: {marginVertical: 20},

  mh_5: {marginHorizontal: 5},
  mh_10: {marginHorizontal: 10},
  mh_15: {marginHorizontal: 15},
  mh_20: {marginHorizontal: 20},

  mt_5: {marginTop: 5},
  mb_5: {marginBottom: 5},
  ml_5: {marginLeft: 5},
  mr_5: {marginRight: 5},

  mt_10: {marginTop: 10},
  mb_10: {marginBottom: 10},
  ml_10: {marginLeft: 10},
  mr_10: {marginRight: 10},

  mt_15: {marginTop: 15},
  mb_15: {marginBottom: 15},
  ml_15: {marginLeft: 15},
  mr_15: {marginRight: 15},

  mt_20: {marginTop: 20},
  mb_20: {marginBottom: 20},
  ml_20: {marginLeft: 20},
  mr_20: {marginRight: 20},

  /* PADDING */
  pv_5: {paddingVertical: 5},
  pv_10: {paddingVertical: 10},
  pv_15: {paddingVertical: 15},
  pv_20: {paddingVertical: 20},

  ph_5: {paddingHorizontal: 5},
  ph_10: {paddingHorizontal: 10},
  ph_15: {paddingHorizontal: 15},
  ph_20: {paddingHorizontal: 20},

  pall_5: {padding: 5},
  pall_10: {padding: 10},
  pall_15: {padding: 15},
  pall_20: {padding: 20},

  pt_5: {paddingTop: 5},
  pb_5: {paddingBottom: 5},
  pl_5: {paddingLeft: 5},
  pr_5: {paddingRight: 5},

  pt_10: {paddingTop: 10},
  pb_10: {paddingBottom: 10},
  pl_10: {paddingLeft: 10},
  pr_10: {paddingRight: 10},

  pt_15: {paddingTop: 15},
  pb_15: {paddingBottom: 15},
  pl_15: {paddingLeft: 15},
  pr_15: {paddingRight: 15},

  pt_20: {paddingTop: 20},
  pb_20: {paddingBottom: 20},
  pl_20: {paddingLeft: 20},
  pr_20: {paddingRight: 20},

  pt_25: {paddingTop: 25},
  pb_25: {paddingBottom: 25},
  pl_25: {paddingLeft: 25},
  pr_25: {paddingRight: 25},

  statusBarHeight,
};
