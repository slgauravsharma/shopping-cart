import React from "react";
import { Input } from "antd";

class InputNumber extends React.Component {
  onChange = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\[0-9]*)?$/;
    if (
      (!Number.isNaN(value) && reg.test(value)) ||
      value === "" ||
      value === "-"
    ) {
      this.props.onChange(value);
    }
  };

  onBlur = () => {
    let { value, onBlur, onChange, min } = this.props;
    if (value === "" || value === "0") {
      value = min || "";
      onChange(value);
    }
    if (onBlur) {
      onBlur();
    }
  };

  render() {
    return (
      <Input
        {...this.props}
        onChange={this.onChange}
        onBlur={this.onBlur}
        placeholder={this.props.placeholder || ""}
      />
    );
  }
}

export default InputNumber;
