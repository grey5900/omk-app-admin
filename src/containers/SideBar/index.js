/**
 * Created by isaac on 2/24/16.
 */
import React, {Component} from 'react';
import {disableEvent} from 'utils/ui';

import {SideBarItem, Logo} from 'components';
import {Scrollbars} from 'react-custom-scrollbars';
import menus from './menus';

const sidebarStyle = {
  paddingLeft: 0,
  display: 'block',
  position: 'static',
  margin: 0,
  backgroundColor: 'transparent',
  width: '100%',
  borderRadius: 0,
  boxShadow: 'none',
  borderRight: 'none',
  borderTop: 'none'
};
const logoStyle = {
  width: '100%',
  textAlign: 'center',
  margin: 'auto',
  backgroundColor: '#272b35',
  borderBottom: '1px solid #232730',
  padding: '10px 0px 10px 0px'
};
const menuWrapper = {
  height: 'calc(100% - 70px)'
};

export default
class SideBar extends Component {

  render() {
    const styles = require('./style.scss');
    const result = [];
    menus.forEach((info, index) => {
      result.push(<div className={styles.header} key={`${index}.header`} >{info.header}</div>);
      info.menus.forEach((subinfo, subindex) => {
        const key = `${index}.${subindex}`;
        result.push(<SideBarItem key={key} {...subinfo} />);
      });
      if (index !== menus.length - 1) {
        result.push(<div className="ui divider" key={`${index}.divider`} />);
      }
    });
    return (
      <div className={styles.sidebar} onContextMenu={disableEvent} >
        <div style={logoStyle} ><Logo /></div>
        <div style={menuWrapper} >
          <Scrollbars>
            <ul style={sidebarStyle} >{result}</ul>
          </Scrollbars>
        </div>
      </div>
    );
  }
}
