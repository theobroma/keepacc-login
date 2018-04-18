import React from 'react';
import { Button, Checkbox, Form, Segment, Input, Header, Grid } from 'semantic-ui-react';

const FormExample = () => (
  <Grid textAlign="center" verticalAlign="middle">
    <Grid.Column>
      <Header as="h2" color="teal" textAlign="center">
        Login
      </Header>
      <Form size="large">
        <Segment stacked>
          <Form.Field>
            <Input
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              type="text"
              autoComplete="username email"
            />
          </Form.Field>
          <Form.Field>
            <Input
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
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

export default FormExample;
