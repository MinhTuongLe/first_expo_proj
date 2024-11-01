import { NavigationActions } from "@react-navigation/compat";
import { NavigationContainerRef } from "@react-navigation/native";

let _navigator: NavigationContainerRef | null = null;

function setTopLevelNavigator(navigatorRef: NavigationContainerRef) {
  _navigator = navigatorRef;
}

function navigate(routeName: string, params: Record<string, any> = {}) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function goBack() {
  _navigator.dispatch(NavigationActions.back());
}

// add other navigation functions that you need and export them

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
};
