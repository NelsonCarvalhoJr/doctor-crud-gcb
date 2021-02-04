import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import CreateDoctor from '../pages/CreateDoctor';
import UpdateDoctor from '../pages/UpdateDoctor';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/create" exact component={CreateDoctor} />
    <Route path="/update/:id" component={UpdateDoctor} />
  </Switch>
);

export default Routes;
