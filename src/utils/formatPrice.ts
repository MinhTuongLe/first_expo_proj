export const customFormatMoney = (value: number) => {
  const formattedValue = new Intl.NumberFormat("en-VN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

  return `${formattedValue.replaceAll(",", ".")} VND`;
};
