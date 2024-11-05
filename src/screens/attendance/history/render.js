/* eslint-disable prettier/prettier */
/**
 ** FileName:
 ** FileAuthor:
 ** FileCreateAt:
 ** FileDescription:
 **/
/* LIBRARY */
import React from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
/* COMPONENTS */
import HeaderBar from "../../partials/header_bar";
import HeaderInfoChildren from "../../partials/header_info_children";
import CImage from "../../../components/CImage";
import CText from "../../../components/CText";
import CLoading from "../../../components/CLoading";
/** COMMON */
import Helpers from "../../../helpers";
import { CONFIG, DEVICE, COLOR, LANG, KEY, activeSteps } from "../../../config";
/** STYLES */
import styles from "./style";

const ViewNoData = () => {
  return (
    <View style={[styles.con_not_info, { marginTop: (DEVICE.width * 1) / 3 }]}>
      {/* <Icon
        name={"search"}
        size={Helpers.fS(50)}
        color={COLOR.placeholderTextColor}
        type={"light"}
      /> */}
      <FontAwesome5
        name={"search"}
        size={Helpers.fS(50)}
        color={COLOR.placeholderTextColor}
      />
      <CText style={styles.txt_no_data} i18nKey={"txtEmptyOfDay"} />
    </View>
  );
};

const configAvt = (id) => {
  let gender = CONFIG.users.find((f) => f.id === id);
  if (gender) {
    return gender.path;
  } else {
    return CONFIG.users[0].path;
  }
};

const newFullName = (parent) => {
  let newFullName = Helpers.capitalizeName(
    parent.firstName,
    parent.lastName,
    CONFIG.settingLocal.softName
  );
  return newFullName;
};

const family = (id) => {
  let res = "";
  let gender = CONFIG.users.find((f) => f.id === id);
  if (gender) {
    res = gender.family;
  } else {
    res = CONFIG.users[0].family;
  }

  return LANG[CONFIG.lang][res];
};

const userType = (id) => {
  let res = "";
  let type = CONFIG.userType.find((f) => f.id === id);
  if (type) {
    res = type.name;
  } else {
    res = CONFIG.users[0].name.toLowerCase();
  }

  return LANG[CONFIG.lang][res];
};

export const ViewHistoryAttendance = ({
  state = null,
  data = {},
  onFunction = {
    onBack: () => {},
  },
}) => {
  let attendance = state._historyDetail;
  let time = Helpers.getShortTimeWithNow(attendance.createdAt);

  return (
    <View style={styles.con}>
      {/* Header bar */}
      {CONFIG.USER_TYPE !== KEY.PARENT && !state._loading && time && (
        <HeaderBar
          hasMultiLang={false}
          title={`${LANG[CONFIG.lang].txtHomeAttendance} ${time.time} ${
            time.type === time.des ? LANG[CONFIG.lang][time.type] : time.des
          }`}
          hasBack
          onBack={onFunction.onBack}
        />
      )}

      {!state._loading && (
        <View style={DEVICE.gStyle.flex_1}>
          {!attendance ||
          Object.keys(attendance).length === 0 ||
          attendance?.activeStep === "" ? (
            ViewNoData()
          ) : (
            <ScrollView
              style={[
                DEVICE.gStyle.flex_1,
                styles.mb_10,
                {
                  backgroundColor: COLOR.backgroundSec,
                  marginHorizontal: 10,
                  paddingBottom: 15,
                  paddingTop: 10,
                  borderRadius: 10,
                },
              ]}
            >
              <View style={styles.con_drove_kid}>
                <View style={DEVICE.gStyle.column_align_center}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                      style={[
                        DEVICE.gStyle.center,
                        {
                          width: "49%",
                          paddingHorizontal: 5,
                          alignItems: "flex-end",
                          marginRight: 10,
                        },
                      ]}
                    >
                      <CText
                        style={styles.txtListStudent}
                        i18nKey={"txtAbsentFrom"}
                        upperCase
                      />
                    </View>

                    <View
                      style={[
                        DEVICE.gStyle.center,
                        {
                          width: "49%",
                          paddingHorizontal: 5,
                          alignItems: "flex-start",
                          marginLeft: 10,
                        },
                      ]}
                    >
                      <CText
                        style={styles.txtListStudent}
                        i18nKey={"txtAbsentTo"}
                        numberOfLines={1}
                        upperCase
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.con_drove_kid}>
                {Object.values(activeSteps).includes(attendance.activeStep) &&
                  attendance.onBusIn !== "" && (
                    <View style={DEVICE.gStyle.column_align_center}>
                      <View style={[DEVICE.gStyle.center, styles.con_time]}>
                        <CText
                          style={[DEVICE.initFont.XXX_SMALL, styles.txt_time]}
                        >
                          {attendance.onBusIn}
                        </CText>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                      >
                        <View
                          style={[
                            DEVICE.gStyle.center,
                            {
                              width: "49%",
                              paddingHorizontal: 5,
                              paddingBottom: 10,
                            },
                          ]}
                        >
                          <View style={styles.rowItemStudent}>
                            <View
                              style={[
                                styles.nameIconArea,
                                {
                                  marginRight: 10,
                                },
                              ]}
                            >
                              <View
                                style={[
                                  styles.nameArea,
                                  {
                                    alignItems: "flex-end",
                                  },
                                ]}
                              >
                                <Text style={styles.txtNameStudent}>
                                  {newFullName(
                                    attendance.onBusInData.personFrom
                                  )}
                                </Text>
                                <Text style={styles.txtNamePickup}>
                                  {family(
                                    attendance.checkInData.personFrom.gender ??
                                      1
                                  )}
                                </Text>
                              </View>
                            </View>

                            <CImage
                              style={styles.con_avatar}
                              resizeMode={"contain"}
                              src={
                                attendance.onBusInData.personFrom &&
                                attendance.onBusInData.personFrom?.avatar !==
                                  null &&
                                attendance.onBusInData.personFrom?.avatar !== ""
                                  ? {
                                      uri:
                                        CONFIG.host +
                                        attendance.onBusInData.personFrom
                                          ?.avatar,
                                    }
                                  : attendance.onBusInData.personFrom?.gender ||
                                    attendance.onBusInData.personFrom
                                      ?.gender === 0
                                  ? configAvt(
                                      attendance.onBusInData.personFrom?.gender
                                    )
                                  : configAvt(1)
                              }
                            />
                          </View>
                        </View>

                        <View style={styles.con_separator_item} />

                        <View
                          style={[
                            DEVICE.gStyle.center,
                            {
                              width: "49%",
                              paddingHorizontal: 5,
                              paddingBottom: 10,
                            },
                          ]}
                        >
                          <View style={styles.rowItemStudent}>
                            <CImage
                              style={styles.con_avatar}
                              resizeMode={"contain"}
                              src={
                                attendance.onBusInData.personTo &&
                                attendance.onBusInData.personTo?.avatar !==
                                  null &&
                                attendance.onBusInData.personTo?.avatar !== ""
                                  ? {
                                      uri:
                                        CONFIG.host +
                                        attendance.onBusInData.personTo?.avatar,
                                    }
                                  : attendance.onBusInData.personTo?.gender ||
                                    attendance.onBusInData.personTo?.gender ===
                                      0
                                  ? configAvt(
                                      attendance.onBusInData.personTo?.gender
                                    )
                                  : configAvt(1)
                              }
                            />

                            <View
                              style={[styles.nameIconArea, { marginLeft: 10 }]}
                            >
                              <View style={styles.nameArea}>
                                <Text style={styles.txtNameStudent}>
                                  {newFullName(attendance.onBusInData.personTo)}
                                </Text>
                                <Text style={styles.txtNamePickup}>
                                  {userType(2)}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}

                {Object.values(activeSteps).includes(attendance.activeStep) &&
                  attendance.activeStep !== activeSteps.ON_BUS_IN &&
                  attendance.checkIn !== "" && (
                    <View style={DEVICE.gStyle.column_align_center}>
                      <View style={[DEVICE.gStyle.center, styles.con_time]}>
                        <CText
                          style={[DEVICE.initFont.XXX_SMALL, styles.txt_time]}
                        >
                          {attendance.checkIn}
                        </CText>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                      >
                        <View
                          style={[
                            DEVICE.gStyle.center,
                            {
                              width: "49%",
                              paddingHorizontal: 5,
                              paddingBottom: 10,
                            },
                          ]}
                        >
                          <View style={styles.rowItemStudent}>
                            <View
                              style={[styles.nameIconArea, { marginRight: 10 }]}
                            >
                              {attendance.checkInData.personFrom &&
                              typeof attendance.checkInData.personFrom ===
                                "object" ? (
                                <View
                                  style={[
                                    styles.nameArea,
                                    {
                                      alignItems: "flex-end",
                                    },
                                  ]}
                                >
                                  <Text style={styles.txtNameStudent}>
                                    {newFullName(
                                      attendance.checkInData.personFrom
                                    )}
                                  </Text>
                                  <Text style={styles.txtNamePickup}>
                                    {userType(2)}
                                  </Text>
                                </View>
                              ) : (
                                <View
                                  style={[
                                    styles.nameArea,
                                    {
                                      alignItems: "flex-end",
                                    },
                                  ]}
                                >
                                  <Text style={styles.txtNameStudent}>
                                    {attendance.checkInData.hasOwnProperty(
                                      "note"
                                    )
                                      ? attendance.checkInData.note
                                      : "No Name"}
                                  </Text>
                                </View>
                              )}
                            </View>

                            <CImage
                              style={styles.con_avatar}
                              resizeMode={"contain"}
                              src={
                                attendance.checkInData.personFrom &&
                                attendance.checkInData.personFrom?.avatar !==
                                  null &&
                                attendance.checkInData.personFrom?.avatar !== ""
                                  ? {
                                      uri:
                                        CONFIG.host +
                                        attendance.checkInData.personFrom
                                          ?.avatar,
                                    }
                                  : attendance.checkInData.personFrom?.gender ||
                                    attendance.checkInData.personFrom
                                      ?.gender === 0
                                  ? configAvt(
                                      attendance.checkInData.personFrom?.gender
                                    )
                                  : configAvt(1)
                              }
                            />
                          </View>
                        </View>

                        <View style={styles.con_separator_item} />

                        <View
                          style={[
                            DEVICE.gStyle.center,
                            {
                              width: "49%",
                              paddingHorizontal: 5,
                              paddingBottom: 10,
                            },
                          ]}
                        >
                          <View style={styles.rowItemStudent}>
                            <CImage
                              style={styles.con_avatar}
                              resizeMode={"contain"}
                              src={
                                attendance.checkInData.personTo &&
                                attendance.checkInData.personTo?.avatar !==
                                  null &&
                                attendance.checkInData.personTo?.avatar !== ""
                                  ? {
                                      uri:
                                        CONFIG.host +
                                        attendance.checkInData.personTo?.avatar,
                                    }
                                  : attendance.checkInData.personTo?.gender ||
                                    attendance.checkInData.personTo?.gender ===
                                      0
                                  ? configAvt(
                                      attendance.checkInData.persion?.gender
                                    )
                                  : configAvt(1)
                              }
                            />

                            <View
                              style={[styles.nameIconArea, { marginLeft: 10 }]}
                            >
                              <View style={styles.nameArea}>
                                <Text style={styles.txtNameStudent}>
                                  {newFullName(attendance.checkInData.personTo)}
                                </Text>
                                <Text style={styles.txtNamePickup}>
                                  {userType(1)}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
              </View>

              <View style={styles.con_pick_up_kid}>
                {(attendance.activeStep === activeSteps.ON_BUS_IN ||
                  attendance.activeStep === activeSteps.ON_BUS_OUT ||
                  attendance.activeStep === activeSteps.CHECK_OUT) &&
                  attendance.onBusIn !== "" && (
                    <View style={DEVICE.gStyle.column_align_center}>
                      <View style={[DEVICE.gStyle.center, styles.con_time]}>
                        <CText
                          style={[DEVICE.initFont.XXX_SMALL, styles.txt_time]}
                        >
                          {attendance.onBusOut}
                        </CText>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                      >
                        <View
                          style={[
                            DEVICE.gStyle.center,
                            {
                              width: "49%",
                              paddingHorizontal: 5,
                              paddingBottom: 10,
                            },
                          ]}
                        >
                          <View style={styles.rowItemStudent}>
                            <View
                              style={[styles.nameIconArea, { marginRight: 10 }]}
                            >
                              {attendance.onBusOutData.personFrom &&
                              typeof attendance.onBusOutData.personFrom ===
                                "object" ? (
                                <View
                                  style={[
                                    styles.nameArea,
                                    {
                                      alignItems: "flex-end",
                                    },
                                  ]}
                                >
                                  <Text style={styles.txtNameStudent}>
                                    {newFullName(
                                      attendance.onBusOutData.personFrom
                                    )}
                                  </Text>
                                  <Text style={styles.txtNamePickup}>
                                    {userType(1)}
                                  </Text>
                                </View>
                              ) : (
                                <View
                                  style={[
                                    styles.nameArea,
                                    {
                                      alignItems: "flex-end",
                                    },
                                  ]}
                                >
                                  <Text style={styles.txtNameStudent}>
                                    {attendance.onBusOutData.hasOwnProperty(
                                      "note"
                                    )
                                      ? attendance.onBusOutData.note
                                      : "No Name"}
                                  </Text>
                                </View>
                              )}
                            </View>

                            <CImage
                              style={styles.con_avatar}
                              resizeMode={"contain"}
                              src={
                                attendance.onBusOutData.personFrom &&
                                attendance.onBusOutData.personFrom?.avatar !==
                                  null &&
                                attendance.onBusOutData.personFrom?.avatar !==
                                  ""
                                  ? {
                                      uri:
                                        CONFIG.host +
                                        attendance.onBusOutData.personFrom
                                          ?.avatar,
                                    }
                                  : attendance.onBusOutData.personFrom.gender ||
                                    attendance.onBusOutData.personFrom
                                      .gender === 0
                                  ? configAvt(
                                      attendance.onBusInData.personFrom.gender
                                    )
                                  : configAvt(1)
                              }
                            />
                          </View>
                        </View>

                        <View style={styles.con_separator_item} />

                        <View
                          style={[
                            DEVICE.gStyle.center,
                            {
                              width: "49%",
                              paddingHorizontal: 5,
                              paddingBottom: 10,
                            },
                          ]}
                        >
                          <View style={styles.rowItemStudent}>
                            <CImage
                              style={styles.con_avatar}
                              resizeMode={"contain"}
                              src={
                                attendance.onBusOutData.personTo &&
                                attendance.onBusOutData.personTo?.avatar !==
                                  null &&
                                attendance.onBusOutData.personTo?.avatar !== ""
                                  ? {
                                      uri:
                                        CONFIG.host +
                                        attendance.onBusOutData.personTo
                                          ?.avatar,
                                    }
                                  : attendance.onBusOutData.personTo.gender ||
                                    attendance.onBusOutData.personTo.gender ===
                                      0
                                  ? configAvt(
                                      attendance.onBusOutData.personTo.gender
                                    )
                                  : configAvt(1)
                              }
                            />

                            <View
                              style={[styles.nameIconArea, { marginLeft: 10 }]}
                            >
                              <View style={styles.nameArea}>
                                <Text style={styles.txtNameStudent}>
                                  {newFullName(
                                    attendance.onBusOutData.personTo
                                  )}
                                </Text>
                                <Text style={styles.txtNamePickup}>
                                  {userType(2)}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}

                {attendance.activeStep === activeSteps.CHECK_OUT &&
                  attendance.checkOut !== "" && (
                    <View style={DEVICE.gStyle.column_align_center}>
                      <View style={[DEVICE.gStyle.center, styles.con_time]}>
                        <CText
                          style={[DEVICE.initFont.XXX_SMALL, styles.txt_time]}
                        >
                          {attendance.checkOut}
                        </CText>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                      >
                        <View
                          style={[
                            DEVICE.gStyle.center,
                            {
                              width: "49%",
                              paddingHorizontal: 5,
                              paddingBottom: 10,
                            },
                          ]}
                        >
                          <View style={styles.rowItemStudent}>
                            <View
                              style={[styles.nameIconArea, { marginRight: 10 }]}
                            >
                              <View
                                style={[
                                  styles.nameArea,
                                  {
                                    alignItems: "flex-end",
                                  },
                                ]}
                              >
                                <Text style={styles.txtNameStudent}>
                                  {newFullName(
                                    attendance.checkOutData.personFrom
                                  )}
                                </Text>
                                <Text style={styles.txtNamePickup}>
                                  {userType(2)}
                                </Text>
                              </View>
                            </View>

                            <CImage
                              style={styles.con_avatar}
                              resizeMode={"contain"}
                              src={
                                attendance.checkOutData.personFrom &&
                                attendance.checkOutData.personFrom?.avatar !==
                                  null &&
                                attendance.checkOutData.personFrom?.avatar !==
                                  ""
                                  ? {
                                      uri:
                                        CONFIG.host +
                                        attendance.checkOutData.personFrom
                                          ?.avatar,
                                    }
                                  : attendance.checkOutData.personFrom
                                      ?.gender ||
                                    attendance.checkOutData.personFrom
                                      ?.gender === 0
                                  ? configAvt(
                                      attendance.checkOutData.personFrom?.gender
                                    )
                                  : configAvt(1)
                              }
                            />
                          </View>
                        </View>

                        <View style={styles.con_separator_item} />

                        <View
                          style={[
                            DEVICE.gStyle.center,
                            {
                              width: "49%",
                              paddingHorizontal: 5,
                              paddingBottom: 10,
                            },
                          ]}
                        >
                          <View style={styles.rowItemStudent}>
                            <CImage
                              style={styles.con_avatar}
                              resizeMode={"contain"}
                              src={
                                attendance.checkOutData.personTo &&
                                attendance.checkOutData.personTo?.avatar !==
                                  null &&
                                attendance.checkOutData.personTo?.avatar !== ""
                                  ? {
                                      uri:
                                        CONFIG.host +
                                        attendance.checkOutData.personTo
                                          ?.avatar,
                                    }
                                  : attendance.checkOutData.personTo.gender ||
                                    attendance.checkOutData.personTo.gender ===
                                      0
                                  ? configAvt(
                                      attendance.checkOutData.personTo.gender
                                    )
                                  : configAvt(1)
                              }
                            />

                            <View
                              style={[styles.nameIconArea, { marginLeft: 10 }]}
                            >
                              <View style={styles.nameArea}>
                                <Text style={styles.txtNameStudent}>
                                  {newFullName(
                                    attendance.checkOutData.personTo
                                  )}
                                </Text>
                                <Text style={styles.txtNamePickup}>
                                  {family(
                                    attendance.checkOutData.personFrom.gender ??
                                      1
                                  )}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
              </View>

              {attendance.activeStep === activeSteps.CHECK_OUT &&
                attendance.checkOut !== "" && (
                  <View style={[DEVICE.gStyle.center, styles.con_pick_up_kid]}>
                    {/* <Icon
                      name="home-lg"
                      color={COLOR.primaryButton}
                      size={Helpers.fS(28)}
                      type={"solid"}
                    /> */}
                    <FontAwesome5
                      name="home-lg"
                      color={COLOR.primaryButton}
                      size={Helpers.fS(28)}
                      solid
                    />
                  </View>
                )}
            </ScrollView>
          )}
        </View>
      )}

      {state._loading && (
        <View style={DEVICE.gStyle.full_center}>
          <CLoading />
        </View>
      )}
    </View>
  );
};
