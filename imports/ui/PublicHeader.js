import React from 'react';
import { Meteor } from 'meteor/meteor';

function redirect() {
    var url = "/login";
    window.location(url);
}

function renderLink() {
    if(Meteor.user() === null) {
        return <button className="button button--link-text"><a className="button button--header" href="/login">Login</a></button>;
    } else {
        return <button className="button button--link-text"><a className="button button--header" href="/links"><span className="glyphicon glyphicon-user"></span></a></button>;
    }
}

const PublicHeader = (props) => {

    return(
        <div className="header">
            <div className="header__content">  
                <h1 className="header__title">{props.header}</h1>
                {renderLink()}
            </div>
        </div>
    )
    
}

PublicHeader.propTypes = {
    header: React.PropTypes.string.isRequired
};

export default PublicHeader;