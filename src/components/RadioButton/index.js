/**
 * Created by isaac on 16/4/25.
 */
import React, {Component, PropTypes} from 'react';

export default
class RadioButton extends Component {
  static propTypes = {
    label: PropTypes.string,
    style: PropTypes.object
  };

  render() {
    const {label, style, ...rest} = this.props;
    return (<div className="ui radio checkbox" style={style} >
      <input type="radio" {...rest} />
      <label>{label}</label>
    </div>);
  }
}
