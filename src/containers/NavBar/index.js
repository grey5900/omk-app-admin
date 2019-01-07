/**
 * Created by isaac on 2/24/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {logout} from 'redux/modules/auth';

const weekDays = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
];

const wrapper = {
  height: '60px',
  width: '100%',
  backgroundColor: '#FFFFFF',
  borderBottom: '1px solid rgba(230,230,230,0.7)'
};
const dropdown = {
  marginTop: '18px',
  marginRight: '10px'
};
const section = {
  display: 'inline-block',
  float: 'left',
  height: '100%',
  lineHeight: '60px',
  padding: '0 10px',
  color: '#222',
};
const hospitalStyle = {
  ...section,
  fontSize: '22px',
  padding: '0 30px'
};
const searchStyle = {
  padding: '20px 0',
  // display: 'inline-block'
  display: 'none'
};

@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})
export default
class NavBar extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,

    // searchClient
    searchClientCallback: PropTypes.func,
    searchClientResetCallback: PropTypes.func,
    placeholder: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
    const obj = new Date();
    const date = `${obj.getFullYear()}年${obj.getMonth() + 1}月${obj.getDate()}日`;
    const time = `${this._formatTime(obj.getHours())}:${this._formatTime(obj.getMinutes())}:${this._formatTime(obj.getSeconds())}`;
    this.state = {date, time};
  }

  componentDidMount() {
    $('.ui.inline.dropdown').dropdown();
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(this._updateTime, 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  _formatTime = (value) => {
    let result = value;
    if (result < 10) {
      result = `0${result}`;
    }
    return result;
  };
  _updateTime = () => {
    const obj = new Date();
    const time = `${this._formatTime(obj.getHours())}:${this._formatTime(obj.getMinutes())}:${this._formatTime(obj.getSeconds())}`;
    this.setState({time});
  };
  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };
  changePassword = (event) => {
    event.preventDefault();
    this.props.pushState('/change_password');
  }

  render() {
    const {user} = this.props;
    const {hospital} = user;
    const {date, time} = this.state;
    const idx = new Date().getDay();
    const week = weekDays[idx];
    let name = user ? user.name : null;
    if (!name) {
      name = user.email;
    }
    return (
      <div style={wrapper} >
        <div style={hospitalStyle} >{hospital && hospital.name}</div>
        <div style={searchStyle} >
        </div>
        <div className="pull-right" style={dropdown} >
          <div className="ui inline dropdown" >
            <div className="text" >
              <img className="ui avatar image" src={user ? user.avatar : ''} />{name}
            </div>
            <i className="dropdown icon" />
            <div className="menu" >
              <div className="item" onClick={this.handleLogout} >登出</div>
            </div>
          </div>
        </div>
        <div className="pull-right" >
          <div style={section} >{date}</div>
          <div style={section} >{time}</div>
          <div style={section} >{week}</div>
        </div>
      </div>
    );
  }
}
