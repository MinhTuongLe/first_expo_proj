/**
 * @Description: style Loading layout
 * @Created by ZiniTeam
 * @Date create: 14/11/2018
 */
import {Device} from '../../config';
import Helpers from '../../helpers';

export default {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.8)',
  },
  container_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },

  text_loading: {fontSize: Helpers.FS(15), color: '#ffffff'},
};
