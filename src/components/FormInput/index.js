/**
 * Created by isaac on 2016/4/5.
 */
import React, {Component, PropTypes} from 'react';
import FormField from './FormField';

const sizeMap = {
  1: 'one wide ',
  2: 'two wide ',
  3: 'three wide ',
  4: 'four wide ',
  5: 'five wide ',
  6: 'six wide ',
  7: 'seven wide ',
  8: 'eight wide ',
  9: 'nine wide ',
  10: 'ten wide ',
  11: 'eleven wide ',
  12: 'twelve wide ',
  13: 'thirteen wide ',
  14: 'fourteen wide ',
  15: 'fifteen wide ',
  16: 'sixteen wide '
};

export default
class FormInput extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    label: PropTypes.any,
    type: PropTypes.string,
    suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    inputElement: PropTypes.any,
    options: PropTypes.array
  };
  _renderInput = (inputElement, props) => {
    const rest = {...props};
    if (!rest.type) {
      rest.type = 'text';
    }
    if (!rest.value) {
      rest.value = '';
    }
    const InputComponent = inputElement;
    let result = null;
    if (InputComponent) {
      result = (<InputComponent {...rest} />);
    } else {
      result = (<input {...rest} />);
    }
    return result;
  };
  _renderSelect = (options, props) => {
    let result = null;
    if (options) {
      result = (<select {...props} className="ui fluid dropdown">
        {options.map((info, index) => {
          return (<option key={index} value={info.value} >{info.name}</option>);
        })}
      </select>);
    }
    return result;
  };

  render() {
    const {size, label, inputElement, options, suffix, ...rest} = this.props;
    return (<div className={`${sizeMap[size]} field`} >
      <FormField label={label} suffix={suffix}>
        {!options && this._renderInput(inputElement, rest)}
        {options && this._renderSelect(options, rest)}
      </FormField>
    </div>);
  }
}
