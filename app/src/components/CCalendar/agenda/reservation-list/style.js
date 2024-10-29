import { StyleSheet } from 'react-native';
import * as defaultStyle from '../../style';
import { DEVICE } from '../../../../config';
import Helpers from '../../../../helpers';

const STYLESHEET_ID = 'stylesheet.agenda.list';

export default function styleConstructor(theme = {}) {
  const appStyle = { ...defaultStyle, ...theme };
  return StyleSheet.create({
    container: {
      flexDirection: 'row'
    },
    dayNum: {
      fontSize: 28,
      fontFamily: DEVICE.fontBold,
      color: appStyle.agendaDayNumColor
    },
    dayText: {
      fontSize: Helpers.fS(18),
      fontFamily: DEVICE.fontBold,
      color: appStyle.textDefaultColor,
      marginTop: -5,
      backgroundColor: 'rgba(0,0,0,0)'
    },
    day: {
      width: 63,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 32
    },
    today: {
      color: appStyle.agendaTodayColor
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}
