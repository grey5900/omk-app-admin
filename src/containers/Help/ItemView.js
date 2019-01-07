/**
 * Created by isaac on 16/8/13.
 */
import React, {Component, PropTypes} from 'react';

const activeStyle = {
  cursor: 'default',
  background: '#CCE2FF',
  color: '#222',
  borderRight: '3px solid #777',
  lineHeight: '16px',
  padding: '6px 6px 6px 16px'
};

const normalStyle = {
  cursor: 'default',
  lineHeight: '16px',
  padding: '6px 6px 6px 16px'
};

export default
class ItemView extends Component {
  static propTypes = {
    active: PropTypes.bool,
    item: PropTypes.object,
  };

  render() {
    const {active, item, ...rest} = this.props;
    const className = active ? 'item active' : 'item';
    let {name} = item;
    if (!name || name.length === 0) {
      name = '<空>';
    }
    return (<div className={className} style={active ? activeStyle : normalStyle} {...rest}>{name}</div>);
  }
}
