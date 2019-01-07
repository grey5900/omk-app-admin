/**
 * Created by jiang_mac on 16/3/14.
 */
import React, {Component, PropTypes} from 'react';
import InlineCSS from 'react-inline-css';

export default class NormalButton extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    const {children, ...rest} = this.props;
    const styles = `
    &{
      padding: 10px 20px;
      border-radius: 4px !important;
      border: none !important;
      background-color: #00D0BD;
      color: #fff !important;
      cursor: pointer;
      line-height: 34px;
      font-size: 14px !important;
      display: inline;
    }
    &:hover {
      opacity: 0.8 !important;
    }
    `;
    return (<InlineCSS stylesheet={styles} {...rest}>{children}</InlineCSS>);
  }
}
