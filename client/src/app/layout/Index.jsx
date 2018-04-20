/* eslint-disable max-len */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import FormExample from '../components/FormExample';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); //fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100); //fake async
  }
};

const Public = () => <h3>Public Page</h3>;
const Protected = () => <h3>Protected Page</h3>;

//const Index = () => <FormExample />;

class Login extends Component {
  render() {
    return (
      <div>
        <h2>Unauthenticated</h2>
        <FormExample />
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

class Index extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>

        <Route path="/public" component={Public} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/protected" component={Protected} />
      </div>
    );
  }
}

export default Index;
