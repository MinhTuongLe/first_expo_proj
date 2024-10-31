/**
 * @Description: Custom Swiper
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** COMMON */
import {Platform} from 'react-native';
import Helpers from '../../helpers';
import {DEVICE, COLOR} from '../../config';

export default {
  con: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  con_no_data: {alignItems: 'center'},
  con_info: {alignItems: 'flex-start', marginLeft: 10},
  con_info_title: {
    color: '#ffffff',
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(16),
  },
  con_info_des: {
    color: '#ffffff',
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(10),
    marginTop: 0,
  },
  con_icon_detail: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  con_icon_check: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 26,
    width: 26,
    borderRadius: Helpers.bR(25),
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: Helpers.wS('15%'),
    left: Helpers.wS('15%'),
  },
  con_blur: {
    height: Helpers.wS('20%'),
    width: Helpers.wS('20%'),
    borderRadius: Helpers.bR(Helpers.wS('20%')),
    backgroundColor: 'rgba(255,255,255,.5)',
    position: 'absolute',
    top: 5,
    left: 5,
  },
  con_img: {
    height: Helpers.wS('20%'),
    width: Helpers.wS('20%'),
    borderRadius: Helpers.bR(Helpers.wS('20%')),
    backgroundColor: '#ffffff',
    borderColor: COLOR.borderColor,
    borderWidth: 1,
  },
  container_swiper: {height: '100%', width: DEVICE.width},
  n_pagagination: {bottom: 5},
  con_no_item: {
    flex: 1,
    height: '100%',
    width: DEVICE.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  con_icon_info: {paddingRight: 5},
  dotActive: {
    height: 6,
    width: 6,
    borderRadius: Helpers.bR(6),
    backgroundColor: '#ffffff',
    marginHorizontal: 5,
  },
  dotUnactive: {
    height: 6,
    width: 6,
    borderRadius: Helpers.bR(6),
    backgroundColor: 'grey',
    marginHorizontal: 5,
  },

  /** SWIPER ITEM */
  i_con: {
    height: '100%',
    width: DEVICE.width,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  i_con_main: {flexDirection: 'row', padding: 5},

  i_txt_title: {
    color: 'black',
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(16),
    width: Helpers.wS('80%') - 50,
  },
  i_txt_time: {
    color: 'black',
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(10),
    marginTop: 10,
    width: Helpers.wS('80%') - 50,
  },

  txt_no_item: {
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(14),
    color: '#ffffff',
    marginTop: 10,
  },
};
