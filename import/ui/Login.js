import React from 'react'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor';


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

export class Login extends React.Component {

    constructor(props) {//mamy dostęp do wszystkich propsów
        super(props) //wywoływanie konstruktora klasy z której dziedziczymy React.Component i przekazujemy mu propsy aby dostał wszystko co potrzebuje
        this.state = {
            error: '',
            email:'',
            password:''

          };
      };

    componentDidMount(){
        console.log(process.env.NODE_ENV);
        if(Meteor.userId()){
        history.replace('/link');
        };
    };
    
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
    
        this.props.loginWithPassword({email}, password, (err) => {
            if(err){
               this.setState({error: "error"}); 
            }else{
                this.setState({error: ''});
            }
        });
    };

    render(){
        return (
            <div className="boxed-view">
              <div className="boxed-view__box">
                <h1 ref="h1">Login</h1>

                {this.state.error ? <p>{this.state.error}</p> : undefined}
                <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate> 
                <input 
                    type="email" //przerobić oba na on change
                    name="email" 
                    value={this.state.email}
                    onChange={this.onEmailChange.bind(this)}
                    placeholder="Email">
                </input>
                <input 
                    type="password" 
                    name="password" 
                    value={this.state.password}
                    onChange={this.onPasswordChange.bind(this)}
                    placeholder="Password">
                </input>
                <button className="button">Login</button>
                </form>
                <Link to="/signup">Have an accoun?t</Link>
              </div>                
            </div>

        )
    };
};

Login.propTypes = {
    loginWithPassword: PropTypes.func.isRequired
};

export default withTracker(() => {
    return{
        loginWithPassword: Meteor.loginWithPassword
    };
})(Login);