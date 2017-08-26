import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router';

const PrivateHeader = (props) => {
    return(
        <div className="header">
            <div className="header__content">
                
                <button className="button button--link-text" ><a href="/" className="button button--header"><span className="glyphicon glyphicon-th-large"></span></a></button> 
                <button className="button button--link-text" onClick={() => Accounts.logout()}>Logout</button>        
            </div>   
        </div>
    )
    
}


export default PrivateHeader;