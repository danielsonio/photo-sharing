import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router';

const PrivateHeader = (props) => {
    return(
        <div className="header">
            <div className="header__content">
                <h1 className="header__title">{props.header}</h1> 
                
                <button className="button button--link-text" ><a href="/" className="button button--header"><span className="glyphicon glyphicon-th-large"></span></a></button> 
                <button className="button button--link-text" onClick={() => Accounts.logout()}>logout</button>        
            </div>   
        </div>
    )
    
}

PrivateHeader.propTypes = {
    header: React.PropTypes.string.isRequired
};

export default PrivateHeader;