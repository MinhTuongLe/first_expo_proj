import moment from "moment-timezone";

export const timeAgo = (date: string, tz: string = "UTC") => {
  if (!date) {
    return null;
  }
  return moment.tz(date, tz).fromNow();
};

export const getTimeDate = (date: string, tz: string = "UTC") => {
  if (!date) {
    return null;
  }
  return moment.tz(date, tz).format("DD/MM/YYYY [at] hh:mma");
};
