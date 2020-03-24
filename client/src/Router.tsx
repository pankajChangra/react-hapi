import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from "./components/homepage/Layout"
import Register from './components/account/Register';
import Login from './components/account/Login';

class BaseRouter extends React.Component{

    render(){
      return (
          <Router>
              <Switch>
                <Route exact path="/" component={Layout} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
              </Switch>
          </Router>
        )
    }
}

export default BaseRouter;