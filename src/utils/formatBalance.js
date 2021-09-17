import BigNumber from "bignumber.js";

function FormatterBalance(value) {

  let val = new BigNumber(value);
  var newValue = value;
  if (val < 1e3) return val.toFixed(1);
  if (val >= 1e3 && val < 1e6) return +(val / 1e3).toFixed(1) + "K";
  if (val >= 1e6 && val < 1e9) return +(val / 1e6).toFixed(1) + "M";
  if (val >= 1e9 && val < 1e12) return +(val / 1e9).toFixed(1) + "B";
  if (val >= 1e12) return +(val / 1e12).toFixed(1) + "T";
  return newValue;
}

export default FormatterBalance;