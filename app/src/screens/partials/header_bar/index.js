/* eslint-disable prettier/prettier */
/**
 * @Description: Header Bar Logic
 * @Created by ZiniTeam
 * @Date create: 18/01/2019
 */
/** LIBRARY */
import React, {Component} from 'react';
import {Share} from 'react-native';
import NavigationService from '../../../navigation/NavigationService';
/** COMPONENT */
import ViewHeaderBar from './render';
import {LANG, CONFIG} from '../../../config';

class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAtRoute: NavigationService.getCurrentRoute().name,
    };
  }

  /** FUNCTIONS */
  _onBack = () => {
    if (this.props.onBack) {
      this.props.onBack();
    }
  };

  _onMenu = () => {
    console.log('ON_MENU');
    // console.log(this.props);
    NavigationService.toggleDrawer();
  };

  _onPressShare = async () => {
    let result = null;
    try {
      if (this.state.isAtRoute === 'NewsDetail') {
        result = await Share.share({
          message: LANG[CONFIG.lang].txtNewsShare,
          url: this.props.data.alias,
          title: LANG[CONFIG.lang].txtDrawerShare,
        });
      } else if (this.state.isAtRoute === 'NewsCMSDetail') {
        result = await Share.share({
          message: this.props.data.link,
          url: this.props.data.link,
          title: this.props.data.link,
        });
      }

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Post shared with activity type of result.activityType');
        } else {
          console.log('Post Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('Post cancelled');
      }
    } catch (e) {
      alert('Error share: ', e);
      console.log('Error share: ', e);
      return null;
    }
  };

  /** RENDER */
  render() {
    let {
      title,
      hasBack,
      hasCustomHeaderRight = false,
      textRight,
      textRightValue,
      titleUpperCase,
      iconRight,
      onPressNext,
      onPressPost,
      dataCustomHeaderRight,
      loadCustomHeaderRight,
      onCustomHeaderRight,
      dataChooseCustomHeaderRight,
      shadow,
      hasMultiLang,
      titleCenter,
    } = this.props;
    let {isAtRoute} = this.state;

    return (
      <ViewHeaderBar
        title={title}
        hasBack={hasBack}
        shadow={shadow}
        hasMultiLang={hasMultiLang}
        hasCustomHeaderRight={hasCustomHeaderRight}
        loadCustomHeaderRight={loadCustomHeaderRight}
        textRight={textRight}
        textRightValue={textRightValue}
        iconRight={iconRight}
        titleCenter={titleCenter}
        titleUpperCase={titleUpperCase}
        dataCustomHeaderRight={dataCustomHeaderRight}
        dataChooseCustomHeaderRight={dataChooseCustomHeaderRight}
        isAtRoute={isAtRoute}
        onBack={this._onBack}
        onMenu={this._onMenu}
        onPressShare={this._onPressShare}
        onPressNext={onPressNext}
        onPressPost={onPressPost}
        onCustomHeaderRight={onCustomHeaderRight}
      />
    );
  }
}

HeaderBar.defaultProps = {
  hasBack: false,
  shadow: true,
  hasCustomHeaderRight: false,
  loadCustomHeaderRight: false,
  textRight: false,
  hasMultiLang: true,
  titleCenter: false,
  textRightValue: '',
  titleUpperCase: false,
  iconRight: '',
  dataCustomHeaderRight: [],
  dataChooseCustomHeaderRight: null,
  onPressNext: () => {},
  onPressPost: () => {},
  onCustomHeaderRight: () => {},
};

export default HeaderBar;
