import { Linking } from "react-native";
import NavigationServices from "./navigation";
import { mainStack } from "../config/navigator";

function action(data) {
  if (data && data.type && data.id) {
    const { type, id } = data;
    switch (type) {
      case "link-extension":
        return Linking.openURL(id);
      case "link-webview":
        return NavigationServices.navigate(mainStack.linking_webview, {
          url: id,
        });
      default:
        const router =
          type === "category"
            ? mainStack.products
            : type === "blog"
            ? mainStack.blog
            : type === "product"
            ? mainStack.product
            : null;
        if (router) {
          return NavigationServices.navigate(router, { id, type });
        }
        return 0;
    }
  }
}
export default action;
