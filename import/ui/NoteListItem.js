import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

export const NoteListItem = (props) => {
    return(
        <div onClick={() => {
            props.Session.set('selectedNoteId', props.note._id)
        }}>
            <h5>{props.note.title || 'untitled note'}</h5>
            { props.note.selected ? 'selected' : undefined }
            <p>{ moment(props.note.updateAt).format('M/DD/YY')}</p>
        </div>
    )
}

NoteListItem.propTypes = {
    note: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
};

export default withTracker(() => {
    return { Session }
})(NoteListItem)