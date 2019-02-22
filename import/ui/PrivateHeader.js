import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import history from '././History'
import { withTracker } from 'meteor/react-meteor-data';

export const PrivateHeader = (props) => {

    const onLogout = () => {
        Accounts.logout();
        history.push('/login')
    }

    return(
        <div className="header">
            <div className="header__content">
                <h1 className="header__text">{props.title}</h1>
                <button className="button button--logout" onClick={onLogout}>Logout</button>
            </div>
        </div>
     
    )
}

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired
};

//dzięki create container możemy do komponentu przekazać co czcemy i puźniej go wyrenderować

export default withTracker(() => {
    return{
        handleLogout: () =>  Accounts.logout()
    }
}) (PrivateHeader)

// export default PrivateHeader;