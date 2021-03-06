import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {NormalButton, FormInput} from 'components';
import {Content} from 'components';
import {disableEvent, alertError} from 'utils/ui';
import {changePassword} from 'redux/modules/admin';
import {goBack} from 'react-router-redux';
import CryptoJS from 'crypto-js';
@connect(
  (state) => ({user: state.auth.user}),
  {
    changePassword,
    goBack
  }
)
export default class ChangePassword extends Content {
  static propTypes = {
    user: PropTypes.object,
    params: PropTypes.object,
    changePassword: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  };

  state = this.state = {
    admin: this.props.user
  };

  _onAdminInfoUpdate = (event) => {
    const stateChange = {...this.state.admin};
    const {name, value} = event.target;
    stateChange[name] = value;
    this.setState({admin: stateChange});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {admin} = this.state;
    const oldPassword = admin.old_password;
    const newPassword = admin.new_password;
    const newPasswordConfirm = admin.new_password_confirm;
    if (newPassword !== newPasswordConfirm) {
      alertError('两次输入的新密码不同');
    } else if (newPassword.length <= 1) {
      alertError('新密码长度必须大于1');
    } else {
      const sha1 = CryptoJS.SHA1;
      const adminUpdate = {
        id: admin._id,
        old_password: sha1(oldPassword).toString().toUpperCase(),
        new_password: sha1(newPassword).toString().toUpperCase()
      };
      this.props.changePassword(adminUpdate);
    }
  };
  handleBack = () => {
    this.props.goBack();
  };

  _renderBasic() {
    const {admin} = this.state;
    return (
      <form className="ui form">
        <br />
        <div className="fields" >
          <FormInput size={8} label="旧密码" value={admin.old_password} onChange={this._onAdminInfoUpdate} name="old_password" />
        </div>
        <div className="fields">
          <FormInput size={8} label="新密码(密码长度必须大于1)" value={admin.new_password} onChange={this._onAdminInfoUpdate} name="new_password" />
        </div>
        <div className="fields">
          <FormInput size={8} label="再次输入新密码" value={admin.new_password_confirm} onChange={this._onAdminInfoUpdate} name="new_password_confirm" />
        </div>
      </form>
    );
  }

  render() {
    const style = {
      height: '40px',
      marginTop: '5px'
    };
    const name = '修改密码';
    return (<div is="content" onContextMenu={disableEvent}>
      <div className="panel panel-default" is="panel">
        <div className="panel-heading" style={style}>
          <span is="panelTitle">{name}</span>
        </div>
        <div className="panel-body" is="panelbody">
          {this._renderBasic()}
          <br />
          <div className="fields" >
            <div className="col-sm-3 pull-right" >
              <NormalButton style={{marginRight: '26px', backgroundColor: '#ABABAB'}}
                            onClick={this.handleBack}>返回</NormalButton>
              <NormalButton onClick={this.handleSubmit}>提交</NormalButton>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}
