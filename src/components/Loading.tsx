import React from "react";
import { StyleSheet, Modal, View, ActivityIndicator } from "react-native";
import { withTheme } from "./config";

const Loading = ({ color, visible }: { color: string; visible: boolean }) => {
  return (
    <Modal animationType="none" transparent visible={visible}>
      <View style={styles.viewLoading}>
        <ActivityIndicator size="small" color={color} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default withTheme(Loading, "Loading");
