import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import {Tracker} from 'meteor/tracker';

export const Links = new Mongo.Collection('links');


if (Meteor.isServer) {
    Meteor.publish('links', function () {
        
        return Links.find({ userId: this.userId });
    });

    Meteor.publish('public-links', function () {
        
        return Links.find({visible:false});

    });

}


Meteor.methods({
    'links.insert'(url) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            url: {
                type: String,
                label: "Your link",
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({ url });          

        Links.insert({
            _id: shortid.generate(),
            url,
            userId: this.userId,
            username: Meteor.user().username,
            visible: true,
            visitedCount: 0,
            score: 0,
            favorites: [],
            createdAt: new Date().getTime(),
            lastVisitedAt: null
        });
    },
    'links.setVisibility'(_id, visible) {
        //Check if user is logged in. Throw an error if not.
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            visible: {
                type: Boolean
            }
        }).validate({ _id, visible });

        Links.update( { 
            _id, 
            userId: this.userId 
        }, {
            $set: { visible } 
        });
    },
    'links.trackVisit'(_id) {
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id });
        Links.update({ _id: _id}, {
            $set: {
                lastVisitedAt: new Date().getTime()
            },
            $inc: {
                visitedCount: 1
            }
        })
    },
    'links.addFavorites'(_id, userId) {
        //Check if user is logged in. Throw an error if not.
        // if (!this.userId) {
        //     throw new Meteor.Error('not-authorized');
        // }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            userId: {
                type: String
            }
        }).validate({ _id, userId });

        Links.update( { 
            _id
        }, {
            $inc: { score: 1 }, 
            $push: { favorites: userId }
        });
       

    },

    'links.deleteFavorites'(_id, userId) {
        //Check if user is logged in. Throw an error if not.
        // if (!this.userId) {
        //     throw new Meteor.Error('not-authorized');
        // }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            userId: {
                type: String
            }
        }).validate({ _id, userId });

        Links.update( { 
            _id
        }, {
            $inc: { score: -1 },
            $pull: { favorites: userId } }, { multi: true }
        );
       

    }


});