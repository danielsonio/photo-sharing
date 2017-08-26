import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { Following } from '../api/following';
import { Links } from '../api/links';
import FollowListItem from './FollowListItem';

export default class FollowList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            follows: []
        };
    }
    componentDidMount() {
        console.log('component did mount FOllowslists')
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('following')
            const follows = Following.find({}).fetch();
            this.setState({ follows });
        });
    }
    componentWillUnmount() {
        console.log('component will Unmount Follows list');
        this.linksTracker.stop();
    }
    renderLinksListItems() {
        // return this.state.follows.map((follow) => {
        //     console.log(follow.following);
        //     Meteor.subscribe('public-links')
        //     const links = Links.find({username: follow.following[i]}).fetch();
        //     const follow = links;
        //     <FollowListItem key={follow._id} {...follow}/>
        
        console.log(this.state.follows);
        
    }
    render() {
        return (
            <div> 
                <p>Follow List</p>
                <div>
                    <ul>{this.renderLinksListItems()}</ul>
                </div>
            </div>
        );
    }
}