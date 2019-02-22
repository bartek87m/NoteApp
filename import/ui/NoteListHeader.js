import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export const NoteListHeader = (props) => {
    
    handleButton = () => {
        props.meteorCall('notes.insert')
    }
    
    return(
        <div>
            <button onClick={handleButton}>Create Note</button>
        </div>
    )
}

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired
};

export default withTracker(() => {
    return{
        meteorCall: Meteor.call
    }
})(NoteListHeader)