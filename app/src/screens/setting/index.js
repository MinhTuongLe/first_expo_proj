/**
 * @Description: Settings
 * @Created by ZiniTeam
 * @Date create: 14/11/2019
 */
/** LIBRARY */
import React from 'react';
import { Animated } from 'react-native';
/** COMPONENTS */
import { ViewSetting } from './render';
/** COMMON */
import { CONFIG } from '../../config';
import Helpers from '../../helpers';

const settings = [
  {
    id: 'setting_1',
    name: 'txtSettingsShowName',
    typeTouch: 'picker', // default, picker
    values: [
      {
        id: 'softname_first_last',
        name: '',
      },
      {
        id: 'softname_last_first',
        name: '',
      },
    ],
  },
];

class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _showSoftname: false,
      _settings: settings,
      _softNameId: CONFIG.settingLocal.softName,
      _animateBg: new Animated.Value(0),
      _dataUser: props.route.params.dataUser ?? {
        firstName: 'NoName',
        lastName: 'NoName',
      }
    };
    this._settingsLocal = null;
  }

  /** FUNCTIONS */
  _saveToAsyncStorage = async (key, value) => {
    let find = this._settingsLocal.findIndex(
      f => f.idUser === this.state._dataUser.id,
    );
    if (find !== -1) {
      this._settingsLocal[find].settings[key] = value;
    }
    Helpers.setAsyStrSettingsLocal(JSON.stringify(this._settingsLocal));
  };

  _getAsyncStorage = async () => {
    this._settingsLocal = await Helpers.getAsyStrSettingsLocal();
    if (this._settingsLocal) {
      this._settingsLocal = JSON.parse(this._settingsLocal);
    }
  };

  _prepareNameUser = () => {
    let { _settings, _dataUser } = this.state;
    let _tmpFirstLast = Helpers.capitalizeName(
      _dataUser.firstName,
      _dataUser.lastName,
      'softname_first_last',
    );
    let _tmpLastFirst = Helpers.capitalizeName(
      _dataUser.firstName,
      _dataUser.lastName,
      'softname_last_first',
    );
    _settings[0].values[0].name = _tmpFirstLast;
    _settings[0].values[1].name = _tmpLastFirst;
    this.setState({ _settings });
  };

  /** HANDLE FUNCTIONS */
  _onToggleSoftName = () => {
    if (this.state._showSoftname) {
      Helpers.animTiming(this.state._animateBg, 0, 200, true);
      setTimeout(() => {
        this.setState({
          _showSoftname: !this.state._showSoftname,
        });
      }, 200);
    } else {
      Helpers.animTiming(this.state._animateBg, 1, 300, true);
      this.setState({
        _showSoftname: !this.state._showSoftname,
      });
    }
  };

  _onChangeSoftName = value => {
    this.setState({ _softNameId: value });
    CONFIG.settingLocal.softName = value;
    this._saveToAsyncStorage('softName', value);
  };

  _onBack = () => {
    this.props.route.params.onRefresh();
    this.props.navigation.goBack();
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._getAsyncStorage();
  }

  UNSAFE_componentWillMount() {
    this._prepareNameUser();
  }

  /** RENDER */
  render() {
    return (
      <ViewSetting
        state={this.state}
        onToggle={{
          softName: this._onToggleSoftName,
        }}
        onChange={{
          softName: this._onChangeSoftName,
          back: this._onBack,
        }}
      />
    );
  }
}

export default SettingScreen;
