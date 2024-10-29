import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import ItemTab from "./ItemTab";

// import { margin } from "src/styles/spacing";
import Text from "../text/Text";

class ScrollableTabViewComponent extends React.Component {
  renderTabBar = ({ goToPage, tabs, activeTab }) => {
    if (tabs.length < 1) {
      return <Text>data null</Text>;
    }
    return (
      <View style={styles.viewTab}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.viewListTab}>
            {tabs.map((tab, index) => (
              <ItemTab
                visit={index}
                activeVisit={activeTab}
                title={tab}
                start={index === 0}
                middle={!(index === 0) && !(index === tabs.length - 1)}
                end={index === tabs.length - 1}
                goToPage={goToPage}
                key={index}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };
  render() {
    const { children, ...rest } = this.props;
    return (
      <ScrollableTabView
        tabBarUnderlineStyle={styles.scroll}
        renderTabBar={this.renderTabBar}
        {...rest}
      >
        {children}
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    height: 0,
    backgroundColor: "transparent",
  },
  viewTab: {
    height: 40,
    marginVertical: 10,
    // marginVertical: margin.large,
  },
  viewListTab: {
    marginHorizontal: 10,
    // marginHorizontal: margin.large,
    flexDirection: "row",
  },
});

export default ScrollableTabViewComponent;
