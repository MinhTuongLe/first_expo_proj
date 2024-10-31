/**
 * @Description: Home Screen Style
 * @Created by ZiniTeam
 * @Date create: 18/01/2019
 */
/** COMMON */
import {DEVICE, COLOR, CONFIG} from '../../config';
import Helpers from '../../helpers';
import CommonStyle from '../../helpers/common-style';

const styles = Object.assign({}, CommonStyle, {
  con: {flex: 1, backgroundColor: COLOR.backgroundMain},
  con_kid: {
    paddingVertical: 10,
    backgroundColor: COLOR.primaryApp,
    height: Helpers.wS('29.33%'),
    width: '100%',
  },

  con_album: {marginTop: 10},
  con_album_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  con_album_content: {
    width: '100%',
    height: Helpers.hS('19.8%'),
    paddingVertical: 5,
  },

  con_empty: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  con_beta: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 2,
    marginLeft: 5,
  },
  txt_beta: {
    color: '#ffffff',
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(10),
  },
  txt_quick_menu: {
    color: 'black',
    fontSize: Helpers.fS(14),
    fontFamily: DEVICE.fontRegular,
    textAlign: 'center',
    marginTop: 5,
  },
  txt_album_header: {
    color: COLOR.primaryApp,
    fontSize: Helpers.fS(17),
    fontFamily: DEVICE.fontBold,
  },

  img_quick_action: {
    height: Helpers.wS('18%'),
    width: Helpers.wS('18%'),
    borderRadius: Helpers.bR(Helpers.wS('18%')),
  },

  /**
   * QUICK action
   */
  quickActionBox: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  quickActionItem: {
    width: Helpers.wS('30%'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: COLOR.primaryApp,
    margin: 5,
    borderRadius: 5,
  },
  quickActionItemTop: {
    height: Helpers.wS('14.93%'),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  quickActionItemBot: {
    height: Helpers.wS('6%'),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionIcon: {width: Helpers.wS('15%'), height: Helpers.wS('15%')},
  txtQuickActionItem: {
    fontFamily: DEVICE.fontMedium,
    fontSize: Helpers.fS(14),
    color: '#ffffff',
  },

  /**
   * ALBUM ITEM
   */
  headerAlbum: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  img_album_item: [
    {
      height: Helpers.wS('28%'),
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  ],
  txtTitleBoxHome: [DEVICE.initFont.X_SMALL, {fontFamily: DEVICE.fontMedium}],

  txt_empty: {
    color: COLOR.borderColor,
    fontFamily: DEVICE.fontRegular,
    fontSize: Helpers.fS(12),
    marginTop: 10,
  },
  txt_see_all: [
    {fontStyle: 'italic', color: COLOR.primaryApp, fontSize: Helpers.fS(14)},
  ],
  txt_title: [{fontFamily: DEVICE.fontMedium, fontSize: Helpers.fS(14)}],
});

export default styles;
