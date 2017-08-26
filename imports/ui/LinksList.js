import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
    }
    componentDidMount() {
        console.log('component did mount Linkslists')
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links')
            const links = Links.find({
                visible: Session.get('showVisible')
            }, {
                sort: {
                    createdAt: -1
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
        if (this.state.links.length === 0) {
            return (
                <div className="item">
                    <p>No unpublished pictures.</p>
                </div>
            );
        }
        return this.state.links.map((link) => {
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
        });
    }
    render() {
        return (
            <div> 
                <FlipMove maintainContainerHeight={true}>
                    <div className="boxed-view__box">
                        {this.renderLinksListItems()}
                    </div>
                </FlipMove>
            </div>
        );
    }
}