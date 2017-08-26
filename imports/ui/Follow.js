import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Following } from '../api/following';


export default class Follow extends React.Component {

    render() {
        return(

            <div>
                 <button onClick={() => {
                     let username = this.props.username;
                     console.log(username);
                     console.log(typeof username);
                     let userId = Meteor.user()._id;
                        Meteor.call('following.insert', userId, username)
                    }}>
                   x
                </button> 
            </div>

        );
    }
}