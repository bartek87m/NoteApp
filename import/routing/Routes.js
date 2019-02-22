import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Signup from '../ui/Signup';
import dashboard from '../ui/Dashboard';
import Notfound from '../ui/NotFound';
import Login from '../ui/Login';

export default class Routes extends React.Component {

    render(){
      return (
        <div>        
          <Router>
            <div>
              <Switch>             
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup}/>
                <Route path="/dashboard" component={dashboard}/> 
                <Route path="/dashboard/:id" render={dashboard }/> 

                {/* <Route path="/dashboard" render={(props) => <dashboard {...props}/>}/> */}
                
                <Route exact path="/" component={Login}/>
                <Route path="*" component={Notfound}/>              
              </Switch>
            </div>
          </Router>
        </div>
        
      );
    };
  };