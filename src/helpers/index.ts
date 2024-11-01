/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/** LIBRARY */
import { Dimensions, PixelRatio, Platform, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
// import ImagePicker from "react-native-image-crop-picker";
// import Permissions, { PERMISSIONS } from "react-native-permissions";
import { CommonActions } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import ImageResizer from "react-native-image-resizer";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

/** COMMON */
import { CONFIG, KEY, fileLastExtensions } from "./../config";
import moment, { Moment } from "moment";

export function isIPhoneXSize(dim: { height: number; width: number }) {
  return dim.height == 812 || dim.width == 812;
}

export function isIPhoneXrSize(dim: { height: number; width: number }) {
  return dim.height == 896 || dim.width == 896;
}

/* INIT SREEN SIZE */
export const STANDARD_SIZE = {
  width: 375,
};

export default {
  /** Set async storage for rating */
  setAsyStrSettingsLocal: async (value: any) => {
    try {
      await AsyncStorage.setItem(KEY.ASYNC_STORAGE_SETTINGS_LOCAL, value);
    } catch (error) {
      console.log("Error save to AsyncStorage: ", error);
      return null;
    }
  },
  getAsyStrSettingsLocal: async () => {
    try {
      let value = await AsyncStorage.getItem(KEY.ASYNC_STORAGE_SETTINGS_LOCAL);
      if (value !== null) {
        if (typeof value === "string") {
          return value;
        } else {
          return JSON.parse(value);
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error get from AsyncStorage: ", error);
      return null;
    }
  },
  /** Set async storage for rating */
  setAsyStrRating: async (value: string) => {
    try {
      await AsyncStorage.setItem(KEY.ASYNC_STORAGE_RATING, value);
    } catch (error) {
      console.log("Error save to AsyncStorage: ", error);
      return null;
    }
  },
  getAsyStrRating: async () => {
    try {
      let value = await AsyncStorage.getItem(KEY.ASYNC_STORAGE_RATING);
      if (value !== null) {
        if (typeof value === "string") {
          return value;
        } else {
          return JSON.parse(value);
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error get from AsyncStorage: ", error);
      return null;
    }
  },
  /** Set async storage for number to rating */
  setAsyStrNumberToRating: async (value: string) => {
    try {
      await AsyncStorage.setItem(KEY.ASYNC_STORAGE_NUMBER_TO_RATING, value);
    } catch (error) {
      console.log("Error save to AsyncStorage: ", error);
      return null;
    }
  },
  getAsyStrNumberToRating: async () => {
    try {
      let value = await AsyncStorage.getItem(
        KEY.ASYNC_STORAGE_NUMBER_TO_RATING
      );
      if (value !== null) {
        if (typeof value === "string") {
          return value;
        } else {
          return JSON.parse(value);
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error get from AsyncStorage: ", error);
      return null;
    }
  },
  /** Set async storage for class choosed */
  setAsyStrShowNameChoosed: async (value: string) => {
    try {
      await AsyncStorage.setItem(KEY.ASYNC_STORAGE_SHOW_NAME_CHOOSED, value);
    } catch (error) {
      console.log("Error save to AsyncStorage: ", error);
      return null;
    }
  },
  getAsyStrShowNameChoosed: async () => {
    try {
      let value = await AsyncStorage.getItem(
        KEY.ASYNC_STORAGE_SHOW_NAME_CHOOSED
      );
      if (value !== null) {
        if (typeof value === "string") {
          return value;
        } else {
          return JSON.parse(value);
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error get from AsyncStorage: ", error);
      return null;
    }
  },
  /** Set async storage for class choosed */
  setAsyStrClassChoosed: async (value: string) => {
    try {
      await AsyncStorage.setItem(KEY.ASYNC_STORAGE_CLASS_CHOOSED, value);
    } catch (error) {
      console.log("Error save to AsyncStorage: ", error);
      return null;
    }
  },
  getAsyStrClassChoosed: async () => {
    try {
      let value = await AsyncStorage.getItem(KEY.ASYNC_STORAGE_CLASS_CHOOSED);
      if (value !== null) {
        if (typeof value === "string") {
          return value;
        } else {
          return JSON.parse(value);
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error get from AsyncStorage: ", error);
      return null;
    }
  },
  /** Set async storage for student choosed */
  setAsyStrStudentChoosed: async (value: string) => {
    try {
      await AsyncStorage.setItem(KEY.ASYNC_STORAGE_STUDENT_CHOOSED, value);
    } catch (error) {
      console.log("Error save to AsyncStorage: ", error);
      return null;
    }
  },
  getAsyStrStudentChoosed: async () => {
    try {
      let value = await AsyncStorage.getItem(KEY.ASYNC_STORAGE_STUDENT_CHOOSED);
      if (value !== null) {
        if (typeof value === "string") {
          return value;
        } else {
          return JSON.parse(value);
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error get from AsyncStorage: ", error);
      return null;
    }
  },
  /** Set async storage for setting app */
  setAsyncStorageSettings: async (value: string) => {
    try {
      await AsyncStorage.setItem(KEY.ASYNC_STORAGE_SETTINGS, value);
    } catch (error) {
      console.log("Error save to AsyncStorage: ", error);
      return null;
    }
  },
  getAsyncStorageSettings: async () => {
    try {
      let value = await AsyncStorage.getItem(KEY.ASYNC_STORAGE_SETTINGS);
      if (value !== null) {
        return JSON.parse(value);
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error get from AsyncStorage: ", error);
      return null;
    }
  },
  // Choose photo from canera or gallery
  choosePhotoFromCamera: async () => {
    // let result = await ImagePicker.openCamera({
    //   mediaTypes: "photo",
    //   cropping: false,
    //   includeBase64: true,
    //   includeExif: true,
    // });
    // return result;
    // Yêu cầu quyền truy cập máy ảnh
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access camera is required!");
      return;
    }

    // Mở máy ảnh
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true,
      exif: true,
    });

    if (!result.canceled) {
      return result.assets[0];
    }
  },
  choosePhotoFromGallery: async () => {
    // let result = await ImagePicker.openPicker({
    //   mediaTypes: "photo",
    //   cropping: false,
    //   includeBase64: true,
    //   includeExif: true,
    // });
    // return result;
    // Yêu cầu quyền truy cập thư viện ảnh
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    // Mở thư viện ảnh
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true,
      exif: true,
    });

    if (!result.canceled) {
      return result.assets[0];
    }
  },
  /** Capitalize the first character */
  capitalizeFirstLetter: (str: string) => {
    return str[0].toUpperCase() + str.slice(1);
  },
  /** Capitalize the character with options
   *   option:
   *     + softname_first_last: Ho - Ten
   *     + softname_last_first: Ten - Ho
   */
  capitalizeName: (
    firstName: string,
    lastName: string,
    option: string = "softname_first_last"
  ) => {
    if (firstName != "" && lastName != "") {
      let ho = lastName,
        ten = firstName;
      if (option === "softname_first_last") {
        return ten + " " + ho;
      } else if (option === "softname_last_first") {
        return ho + " " + ten;
      } else {
        return ho + " " + ten;
      }
    } else {
      return firstName;
    }
  },
  // Resize photo
  resizePhoto: async (data: any) => {
    let height = data.node.image.height;
    let width = data.node.image.width;
    let cur_width = 1200;
    let cur_height = (cur_width * height) / width;
    let type = data.node.image.uri
      .split(".")
      [data.node.image.uri.split(".").length - 1].toUpperCase();
    if (type !== "JPEG" && type !== "PNG" && type !== "WEBP") {
      type = "JPEG";
    }
    const resizedImage = await ImageResizer.createResizedImage(
      data.node.image.uri,
      cur_width,
      cur_height,
      type,
      80,
      0,
      undefined,
      true,
      {
        mode: "contain",
      }
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
    return resizedImage;
  },

  checkAndroidPermissions: async () => {},

  // askPermissionsCamera: async () => {
  //   if (Platform.OS === "ios") {
  //     const permission = await Permissions.check(PERMISSIONS.IOS.PHOTO_LIBRARY);
  //     if (
  //       permission === Permissions.RESULTS.GRANTED ||
  //       permission === Permissions.RESULTS.LIMITED
  //     ) {
  //       return true;
  //     }
  //     const res = await Permissions.request(PERMISSIONS.IOS.PHOTO_LIBRARY);
  //     if (
  //       res === Permissions.RESULTS.GRANTED ||
  //       res === Permissions.RESULTS.LIMITED
  //     ) {
  //       return true;
  //     }
  //     if (res === Permissions.RESULTS.BLOCKED) {
  //       return false;
  //     }
  //   } else if (Platform.OS === "android") {
  //     if (parseInt(Platform.Version) >= 33) {
  //       const permissions = await Permissions.checkMultiple([
  //         PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  //         PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
  //       ]);
  //       if (
  //         permissions[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
  //           Permissions.RESULTS.GRANTED &&
  //         permissions[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
  //           Permissions.RESULTS.GRANTED
  //       ) {
  //         return true;
  //       }
  //       const res = await Permissions.requestMultiple([
  //         PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  //         PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
  //       ]);
  //       if (
  //         res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
  //           Permissions.RESULTS.GRANTED &&
  //         res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
  //           Permissions.RESULTS.GRANTED
  //       ) {
  //         return true;
  //       }
  //       if (
  //         res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
  //           Permissions.RESULTS.DENIED ||
  //         res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
  //           Permissions.RESULTS.DENIED
  //       ) {
  //         return false;
  //       }
  //       if (
  //         res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
  //           Permissions.RESULTS.BLOCKED ||
  //         res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
  //           Permissions.RESULTS.BLOCKED
  //       ) {
  //         return false;
  //       }
  //     } else {
  //       const permission = await Permissions.check(
  //         PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
  //       );
  //       if (permission === Permissions.RESULTS.GRANTED) {
  //         return true;
  //       }
  //       const res = await Permissions.request(
  //         PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
  //       );
  //       if (res === Permissions.RESULTS.GRANTED) {
  //         return true;
  //       }
  //       if (res === Permissions.RESULTS.DENIED) {
  //         return false;
  //       }
  //       if (res === Permissions.RESULTS.BLOCKED) {
  //         return false;
  //       }
  //     }
  //   }
  // },

  askPermissionsCamera: async () => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status === "granted") {
        return true;
      } else if (status === "denied") {
        return false;
      }
    }
    return false;
  },

  resetNavigation: (navigation: any, routeName: string, params: any = null) => {
    let resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    });

    navigation.dispatch(resetAction);
  },

  toast: (message: string) => {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  },

  customToast: (message: string) => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: -100,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  },

  /* Parse width with screen size */
  wS: (widthPercent: string) => {
    let screenWidth = Dimensions.get("window").width;
    // Convert string input to decimal number
    let elemWidth = parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
  },

  /* Parse height with screen size */
  hS: (heightPercent: string) => {
    let screenHeight = Dimensions.get("window").height;
    // Convert string input to decimal number
    let elemHeight = parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
  },
  /* Parse font system with screen size */
  fS: (size: number) => {
    return (size * Dimensions.get("window").width) / STANDARD_SIZE.width;
  },
  /* Parse border radius with screen size */
  bR: (height: number) => {
    if (Platform.OS == "android") {
      return height;
    } else if (Platform.OS == "ios") {
      return height / 2;
    }
  },
  /* Format datetime */
  getShortTimeWithNow: (timestamp: number) => {
    try {
      let _tmpTime: string | Moment = moment.unix(timestamp / 1000);
      let _tmpNow = moment();
      let compare = _tmpNow.diff(_tmpTime, "days");

      if (compare > 0) {
        if (compare < 7) {
          return {
            time: compare,
            type: "days",
            des: "days",
          };
        }
        return {
          time: moment.unix(timestamp / 1000).format("HH:mm") + " ",
          type: "days",
          des: moment.unix(timestamp / 1000).format(CONFIG.formatDate),
        };
      } else if (compare == 0) {
        _tmpTime = moment.unix(timestamp / 1000).format("YYYY-MM-DD HH:mm");
        _tmpNow = moment();
        let result = {
          time: _tmpNow.diff(_tmpTime, "hours"),
          type: "hours",
          des: "hours",
        };
        if (result.time == 0) {
          result = {
            time: _tmpNow.diff(_tmpTime, "minutes"),
            type: "minutes",
            des: "minutes",
          };
        }
        return result;
      } else {
        return {
          time: moment.unix(timestamp / 1000).format("HH:mm") + " ",
          type: "days",
          des: moment.unix(timestamp / 1000).format(CONFIG.formatDate),
        };
      }
    } catch (e) {
      return {
        time: moment.unix(timestamp / 1000).format("HH:mm") + " ",
        type: "days",
        des: moment.unix(timestamp / 1000).format(CONFIG.formatDate),
      };
    }
  },
  /* Format news time */
  parseTimeNews: (time: string) => {
    let diffYear = moment().diff(
      moment(time, `${CONFIG.formatDate}THH:mm:ss`),
      "years"
    );
    if (diffYear > 0) {
      return { data: diffYear, des: "years_news" };
    }
    if (diffYear === 0) {
      let diffMonth = moment().diff(
        moment(time, `${CONFIG.formatDate}THH:mm:ss`),
        "months"
      );
      if (diffMonth > 0) {
        return { data: diffMonth, des: "month_news" };
      }
      if (diffMonth === 0) {
        let diffDate = moment().diff(
          moment(time, `${CONFIG.formatDate}THH:mm:ss`),
          "days"
        );
        if (diffDate > 0) {
          return { data: diffDate, des: "days_news" };
        }
        if (diffDate === 0) {
          let diffHour = moment().diff(
            moment(time, `${CONFIG.formatDate}THH:mm:ss`),
            "hours"
          );
          if (diffHour > 0) {
            return { data: diffHour, des: "hours_news" };
          }
          if (diffHour === 0) {
            let diffMinute = moment().diff(
              moment(time, `${CONFIG.formatDate}THH:mm:ss`),
              "minutes"
            );
            return { data: diffMinute, des: "minutes_news" };
          }
        }
      }
    }
  },
  /* Convert time to HH:mm with timezone */
  formatToTimeZone: (timestamp: number) => {
    return moment(timestamp).format("HH:mm");
  },
  /* Format number */
  formatMoney: (text: string) => {
    let reg = text.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " đ";
    return reg;
  },
  /* Validate E-mail */
  validateEmail: (email: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  },
  /* Validate phone number */
  validatePhone: (phone: string) => {
    if (!phone || phone.length < 8) {
      return false;
    }
    return true;
  },

  animTiming: (
    state: any,
    toValue: number,
    duration: number,
    isStart: boolean
  ) => {
    if (isStart) {
      return Animated.timing(state, {
        toValue: toValue,
        duration: duration,
        useNativeDriver: true,
      }).start();
    } else {
      return Animated.timing(state, {
        toValue: toValue,
        duration: duration,
        useNativeDriver: true,
      });
    }
  },
  animParallel: (arrAnim: any, isStart: boolean) => {
    if (isStart) {
      return Animated.parallel(arrAnim).start();
    } else {
      return Animated.parallel(arrAnim);
    }
  },
  animSequence: (arrAnim: any, isStart: boolean) => {
    if (isStart) {
      return Animated.sequence(arrAnim).start();
    } else {
      return Animated.sequence(arrAnim);
    }
  },

  isIphoneX: () => {
    const dim = Dimensions.get("window");
    return Platform.OS === "ios" && (isIPhoneXSize(dim) || isIPhoneXrSize(dim));
  },
};
