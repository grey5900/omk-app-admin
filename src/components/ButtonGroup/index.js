/**
 * Created by isaac on 2016/3/22.
 */

import React, {Component, PropTypes} from 'react';
// import cx from 'classnames';

export default
class ButtonGroup extends Component {
  static propTypes = {
    items: PropTypes.array,
    selected: PropTypes.number,
    didChangeTo: PropTypes.func.isRequired,
    children: PropTypes.any,
    style: PropTypes.object
  };
  state = {
    selected: this.props.selected
  };

  _handleItemClick = (idx, event) => {
    event.preventDefault();
    this.setState({
      selected: idx
    });
    this.props.didChangeTo(idx);
  };

  _renderElements() {
    const {items} = this.props;
    const style = {
      height: '30px',
      lineHeight: '30px',
      display: 'inline-block',
      textAlign: 'center',
      margin: '10px 10px 10px 10px',
      paddingLeft: '10px',
      paddingRight: '10px',
      width: '12%'
    };
    const {selected} = this.state;
    return items.map((name, idx) => {
      let elementStyle = null;
      if (idx === selected) {
        elementStyle = {
          ...style,
          backgroundColor: '#FF7D28',
          borderRadius: '30px',
          color: 'white'
        };
      } else {
        elementStyle = style;
      }
      return (<div key={idx} style={elementStyle} onClick={this._handleItemClick.bind(null, idx)} >{name}</div>);
    });
  }

  render() {
    const {children, ...rest} = this.props;
    const style = this.props.style || {};
    Object.assign(style, {
      display: 'inline-block',
      width: '100%'
    });
    return (<div style={style} {...rest}>
      {this._renderElements()}
      {children}
    </div>);
  }
}

