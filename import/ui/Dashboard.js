import React from 'react';
import { Meteor } from 'meteor/meteor';

import history from './History'
import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';

export default class dashboard extends React.Component {

    constructor(props){
        super(props);
    }


    componentWillMount(){
        console.log(Meteor.userId());
        if(!Meteor.userId()){
            history.push('/login');
            console.log(Meteor.userId());
        };
    };

    componentDidMount(){ 
        if(!Meteor.userId()){
          history.replace('/');
        }else{
            if(this.props.location.state){
                console.log(this.props.location.state.id)
                Session.set('selectedNoteId', this.props.location.state.id);
            }
        
         
        }        
    }

    render(){
        return (
            <div>
                <PrivateHeader title="Your Links"/>
                <div className="page-content">
                <NoteList/>
                </div>
            </div>          
        )
    };
};