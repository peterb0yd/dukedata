import moment from "moment"

export const formatDate = (date: Date): string => {
  if (!date) return "";
  return moment(date).format("D/M/YY h:mm A")
};