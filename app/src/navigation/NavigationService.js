/* eslint-disable prettier/prettier */
/**
 ** Name:
 ** Author:
 ** CreateAt:
 ** Description:
 **/
/* LIBRARY */
import {CommonActions, DrawerActions} from '@react-navigation/native';

class NavigatorRef {
  constructor() {
    this._navigator = undefined;

    this.setTopLevelNavigator = function (navigatorRef) {
      this._navigator = navigatorRef;
    };

    this.navigate = function (routeName, params = {}) {
      this._navigator?.dispatch(
        CommonActions.navigate({
          name: routeName,
          params,
        }),
      );
    };

    this.goBack = function () {
      this._navigator?.dispatch(CommonActions.goBack());
    };

    this.getCurrentRouteName = function () {
      if (this._navigator && this._navigator.state.nav.routes.length > 0) {
        let length = this._navigator.state.nav.routes.length;
        let lastRouteName =
          this._navigator.state.nav.routes[length - 1].routeName;
        return lastRouteName;
      }
      return null;
    };

    this.setParams = function (key, value) {
      this._navigation?.setParams(key, value);
    };

    this.toggleDrawer = function () {
      // console.log(this._navigator);
      // console.log(
      //   'DrawerActions.toggleDrawer(): ',
      //   DrawerActions.toggleDrawer(),
      // );
      this._navigator.dispatch(DrawerActions.toggleDrawer());
    };

    this.getCurrentRoute = function () {
      return this._navigator?.getCurrentRoute;
    };
  }
}

const navigatorRefInstance = new NavigatorRef();

export default navigatorRefInstance;

// let _navigator;

// function setTopLevelNavigator(navigatorRef) {
//   _navigator = navigatorRef;
// }

// function navigate(routeName, params) {
//   console.log(_navigator);
//   _navigator &&
//     _navigator.dispatch(
//       CommonActions.navigate({
//         routeName,
//         params,
//       }),
//     );
// }

// function getCurrentRouteName() {
//   if (_navigator && _navigator.state.nav.routes.length > 0) {
//     let length = _navigator.state.nav.routes.length;
//     let lastRouteName = _navigator.state.nav.routes[length - 1].routeName;
//     return lastRouteName;
//   }
//   return null;
// }

// function setParams(key, value) {
//   _navigator._navigation.setParams(key, value);
// }

// export default {
//   navigate,
//   getCurrentRouteName,
//   setParams,
//   setTopLevelNavigator,
// };
