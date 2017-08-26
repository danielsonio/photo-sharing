import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
    Meteor.publish('users', function () {
        
        return Users.find({});
    });


}


Accounts.validateNewUser((user) => {
    const email = user.emails[0].address;
    const username = user.username;

    new SimpleSchema({
        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        },
        username: {
            type: String
        }
    }).validate({ email, username });          

    return true;
});
