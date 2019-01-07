import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import CryptoJS from 'crypto-js';
import * as authActions from 'redux/modules/auth';
import {fetchCurrentHospital} from 'redux/modules/hospital';
import {disableEvent, alertError} from 'utils/ui';
import {email as emailValidator} from 'utils/validation';

@connect(
  state => ({
    user: state.auth.user,
    loginError: state.auth.error
  }),
  {
    ...authActions,
    fetchCurrentHospital
  })
export default
class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    loginError: PropTypes.string,
    fetchCurrentHospital: PropTypes.func
  };
  state = {email: '', password: ''};
  handleLogin = (event) => {
    event.preventDefault();
    const {email, password} = this.state;
    if (emailValidator(email) && password && password.length > 1) {
      const sha1 = CryptoJS.SHA1;
      this.props.login(email, sha1(password).toString().toUpperCase(), '');
    } else {
      alertError('用户名邮箱格式或密码长度错误!');
    }
  };
  _renderLeftPart = (styles) => {
    return (<div className={styles.left} >
      <div className={styles.title} >小球App服务器管理系统</div>
      <div className={styles.subtitle} >Management system</div>
    </div>);
  };
  _onChange = (event) => {
    const {name, value} = event.target;
    const newState = {...this.state};
    newState[name] = value;
    this.setState(newState);
  };

  render() {
    const {user} = this.props;
    const {email, password} = this.state;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage} onContextMenu={disableEvent} >
        <Helmet title="Login" />
        {!user && this._renderLeftPart(styles)}
        {!user && <div className={styles.formWrapper} >
          <form className="ui form" >
            <h3 style={{textAlign: 'center'}} >小球App后台</h3>
            <div className="field" >
              <input type="text" value={email} name="email" placeholder="邮箱" onChange={this._onChange} />
            </div>
            <div className="field" >
              <input type="password" value={password} name="password" placeholder="密码" onChange={this._onChange} />
            </div>
            <button className="ui primary button" onClick={this.handleLogin} >登入</button>
          </form>
        </div>
        }
      </div>
    );
  }
}
