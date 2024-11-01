import moment from "moment";
import { CONFIG } from "../config";

export const getMonthsDifference = (startDate: string) => {
  const start = new Date(startDate);
  const now = new Date();

  const yearsDifference = now.getFullYear() - start.getFullYear();
  const monthsDifference = now.getMonth() - start.getMonth();

  return yearsDifference * 12 + monthsDifference;
};

export const extractDate = (dateInput: string) => {
  let date;
  date = moment(dateInput, CONFIG.formatDate, true);
  if (date.isValid()) {
    return {
      day: date.format("DD"),
      month: date.format("MM"),
    };
  }
  return null;
};
