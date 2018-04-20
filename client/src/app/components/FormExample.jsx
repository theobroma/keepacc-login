import React, { Component } from 'react';
import { Button, Checkbox, Form, Segment, Input, Header, Grid } from 'semantic-ui-react';

const ENTER_KEY = 13;

class FormExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'admin111',
      password: '777'
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    const { username, password } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column>
          <Header as="h2" color="teal" textAlign="center">
            Login
          </Header>
          <Form size="large" onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Field>
                <Input
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  type="text"
                  autoComplete="username email"
                  name="username"
                  value={username}
                  onChange={this.onChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  autoComplete="current-password"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                />
              </Form.Field>
              <Button type="submit" color="teal" size="large" fluid>
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default FormExample;
