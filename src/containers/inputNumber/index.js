import React from 'react';
import { Input } from 'antd'

class InputNumber extends React.Component {
    onChange = (e) => {
      const { value } = e.target;
      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
      if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        this.props.onChange(value);
      }
    }
  
    onBlur = () => {
      const { value, onBlur, onChange } = this.props;
      if (value.charAt(value.length - 1) === '.' || value === '-') {
        onChange(value.slice(0, -1));
      }
      if (onBlur) {
        onBlur();
      }
    }
  
    render() {
      return (
          <Input
            {...this.props}
            onChange={this.onChange}
            onBlur={this.onBlur}
            placeholder={this.props.placeholder || ''}
            maxLength={25}
          />
      );
    }
  }

  export default InputNumber