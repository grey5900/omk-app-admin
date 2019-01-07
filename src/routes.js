import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { USER_KEY, TOKEN_KEY, setUserAndToken } from 'redux/modules/auth';
import {
  App,
  Clothes,
  ChangePassword,
  Dashboard,
  Devices,
  Feedbacks,
  Login,
  Messages,
  MessageDetail,
  NotFound,
  Patients,
  PatientDetail,
  Weights,
  Recipe,
  Help
} from 'containers';

export default (store, req) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      let {auth: {user}} = store.getState();
      if (!user) {
        if (req) {
          // try to load from cookie
          const str = req.cookies[USER_KEY];
          if (str) {
            const obj = JSON.parse(str);
            const token = JSON.parse(req.cookies[TOKEN_KEY]);
            if (obj) {
              user = obj;
              store.dispatch(setUserAndToken(user, token));
            }
          }
        }
      }
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/login');
      }
      cb();
    }

    checkAuth();
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App} >
      { /* Home (main) route */ }
      <IndexRoute component={Login} />

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin} >

        <Route path="change_password" component={ChangePassword} />
        <Route path="clothes" component={Clothes} />
        <Route path="dashboard" component={Dashboard} />

        <Route path="patients" component={Patients} />
        <Route path="patient/:patientID" component={PatientDetail} />
        <Route path="weights" component={Weights} />
        <Route path="devices" component={Devices} />
        <Route path="feedbacks" component={Feedbacks} />
        <Route path="messages" component={Messages} />
        <Route path="message/add" component={MessageDetail} />
        <Route path="message/:messageID" component={MessageDetail} />
        <Route path="recipes" component={Recipe} />
        <Route path="help" component={Help} />
      </Route>

      { /* Routes */ }
      <Route path="login" component={Login} />
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
