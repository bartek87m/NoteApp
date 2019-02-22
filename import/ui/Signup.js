import React from 'react';
import { Link } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'

// do testów lonigm potrzebue creat memory history dlatego podczas importu zczytujemy wartość zmiennej NODE_ENV,
// którą ustwaiamy w packkage.json
if(process.env.NODE_ENV === "test"){
  import history from './testHistory';
}
else{
  import history from './History';
}

import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

export class Signup extends React.Component {

  constructor(props) {//mamy dostęp do wszystkich propsów
    super(props) //wywoływanie konstruktora klasy z której dziedziczymy React.Component i przekazujemy mu propsy aby dostał wszystko co potrzebuje
    this.state = {
      error: '',
      email:'',
      password:''
    }
  }

  componentDidMount(){
    console.log('Entered public Page');
    if(Meteor.userId()){
      history.replace('/link');
    }
  }

  onEmailChange(e){
    this.setState({email: e.target.value.trim()})
    console.log(this.state.email);
}

onPasswordChange(e){
    this.setState({password: e.target.value.trim()})
}

  onSubmit(e){
    e.preventDefault();

    let email = this.state.email;
    let password = this.state.password;  
    
    this.props.createUser({email, password}, (err) => {
      if(err){
        this.setState({error: err.reason}); 
      }else{
  
         this.setState({error:''});
     }
    });

    if(password.length < 3){
      this.setState({error:"Password must have at least 3 chracters"}); 
    }
  }

  render(){
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1 ref="h1">Join</h1>

            {this.state.error ? <p>{this.state.error}</p> : undefined}

            <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate> 
              <input 
                type="email" 
                value={this.state.email}
                onChange={this.onEmailChange.bind(this)}
                name="email" 
                placeholder="Email">
              </input>
              <input 
                type="password" 
                value={this.state.password}
                onChange={this.onPasswordChange.bind(this)}
                name="password" 
                placeholder="Password">
              </input>
              <button className="button">Create Account</button>
            </form>

            <Link to="/Login">Already have an account</Link>
            
        </div>
      </div>
    )
  };
};

Signup.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default withTracker(() => {
  return{
    createUser: Accounts.createUser
  };
})(Signup);

