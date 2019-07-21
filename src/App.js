import React from 'react';
import Container from '@material-ui/core/Container';


import Categories from './components/Categories';
import Locations from './components/Locations';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import BottomAppBar from './components/BottomAppBar';



export default function App() {
  return (
    <Container maxWidth="sm">
        <Router>
          <Switch>

            <Route path="/categories" exact component={Categories} />
            <Route path="/locations" component={Locations}/>   
            <Route exact path="/" render={() => <Redirect to="/categories" />} />
          </Switch>
          <BottomAppBar/>
        </Router>
       
    </Container>
  );
}
