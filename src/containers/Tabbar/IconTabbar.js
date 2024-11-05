import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";

import { Dot } from "../Pagination";
import { red } from "../../components/config/colors";

// import { countWishListSelector } from "src/modules/common/selectors";
// import { countItemSelector } from "src/modules/cart/selectors";

class IconTabbar extends React.Component {
  render() {
    const { nameData, countWishlist, countCart, ...rest } = this.props;
    const isDot =
      nameData === "cart"
        ? countCart > 0
        : nameData === "wishList"
        ? countWishlist
        : 0;

    return (
      <View>
        {/* <Icon name="home" size={22} {...rest} /> */}
        <FontAwesome5 name="home" size={22} {...rest} />
        {isDot ? <Dot size={9} color={red} style={styles.dot} /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dot: {
    position: "absolute",
    right: -1,
    bottom: 0,
  },
});

const mapStateToProps = (state) => ({
  countWishlist: () => console.log("countWishListSelector"),
  countCart: () => console.log("countCart"),
});

export default connect(mapStateToProps, null)(IconTabbar);
