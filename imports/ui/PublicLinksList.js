import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Links } from '../api/links';
import PublicLinksListItem from './PublicLinksListItem';

export default class PublicLinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
    }
    componentDidMount() {
        console.log('component did mount Linkslists')
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('public-links')
            const links = Links.find({
                visible: false
            }, {
                sort: {
                    score: -1
                }
            }).fetch();
            this.setState({ links });
        });
    }
    componentWillUnmount() {
        console.log('component will Unmount Links list');
        this.linksTracker.stop();
    }
    renderLinksListItems() {
        return this.state.links.map((link) => {
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <PublicLinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
        });
    }
    render() {
        return (
            <div> 
                <div className="boxed-view__box">
                    <FlipMove maintainContainerHeight={true}>
                        {this.renderLinksListItems()}
                     </FlipMove>
                </div>
                
            </div>
        );
    }
}