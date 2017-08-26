import { Meteor } from 'meteor/meteor'
import React from 'react';
import Clipboard from 'clipboard';
import moment from 'moment';


export default class LinksListItem extends React.Component {
    renderTime() {
        let createdAt = moment(this.props.createdAt).fromNow();
        return <p>{createdAt}</p>
    }
    render() {
        return (
     
                <div className="item boxed-view__info">
                    <img src={this.props.shortUrl}/>
                    <button className="button button--pill" onClick={() => {
                            Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
                        }}>
                        {this.props.visible ? 'Publish' : 'Unpublish'}
                    </button>
                    {this.renderTime()}
                </div>
    

        )
    }

}


LinksListItem.propTypes = {
    _id: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool.isRequired,
    shortUrl: React.PropTypes.string.isRequired,
    visitedCount: React.PropTypes.number.isRequired,
    lastVisitedAt: React.PropTypes.number
};