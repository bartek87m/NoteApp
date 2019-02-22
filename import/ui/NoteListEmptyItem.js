import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

const NoteListEmptyItem = () => {

    return(
        <div>
            <p>Can't find any notes</p>
        </div>
    )

}


export default NoteListEmptyItem;