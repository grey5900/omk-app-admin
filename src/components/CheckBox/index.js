/**
 * Created by isaac on 16/4/25.
 */
import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

export default
class CheckBox extends Component {
  static propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
  };

  render() {
    const {label, className, style, ...rest} = this.props;
    return (<div className={cx('ui checkbox', className)} style={style} >
      <input type="checkbox" {...rest} />
      <label>{label}</label>
    </div>);
  }
}
