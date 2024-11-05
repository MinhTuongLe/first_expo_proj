import * as Analytics from "expo-firebase-analytics";

export async function trackScreen(screenName) {
  await Analytics.logEvent("screen_view", {
    screen_name: screenName,
  });
}
