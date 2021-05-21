import React from "react";
import "antd/dist/antd.css";
import { Input, Tooltip } from "antd";

function formatNumber(value) {
  value += "";
  const list = value.split(".");
  const prefix = list[0].charAt(0) === "-" ? "-" : "";
  let num = prefix ? list[0].slice(1) : list[0];
  let result = "";
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ""}`;
}

const maskMobileNumber = (value, maxLength = 14, radix = "-") => {
  const currencyRegExp = new RegExp(`(\\d{3})(\\d{4})?(\\d{4})`, "g");
  return value.replace(currencyRegExp, (match, p1, p2, p3) =>
    [p1, p3].join(radix)
  );
};

class MobileNumericInput extends React.Component {
  onChange = (e) => {
    const { value } = e.target;
    const reg = /^-?[0-9]*(\.[0-9]*)?$/;
    if (reg.test(value) || value === "" || value === "-") {
      this.props.onChange(value);
    }
  };

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    let valueTemp = value;
    if ((value && value.charAt(value.length - 1) === ".") || value === "-") {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, "$1"));
    if (onBlur) {
      onBlur();
    }
  };

  render() {
    return (
      <Input
        {...this.props}
        onChange={this.onChange}
        // onBlur={this.onBlur}
        placeholder={this.props.placeholder}
        maxLength={this.props.maxLength}
      />
    );
  }
}

export default MobileNumericInput;
