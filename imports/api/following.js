import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import {Tracker} from 'meteor/tracker';

export const Following = new Mongo.Collection('following');


if (Meteor.isServer) {
    Meteor.publish('following', function () {
        
        return Following.find({ userId: this.userId });
    });
}


Meteor.methods({
    'following.insert'(userId, username) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            userId: {
                type: String,
                min: 1
            },
            username: {
                type: String
            }
        }).validate({ userId, username });

        Following.update( { 
            userId
        }, {
            $push: { following: username 
}
        }, {upsert: true});
    }


});
