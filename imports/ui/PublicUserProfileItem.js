import { Meteor } from 'meteor/meteor'
import React from 'react';
import Clipboard from 'clipboard';
import { Link } from 'react-router';
import moment from 'moment';

export default class PublicUserProfileItem extends React.Component {
    changeButton() {
        const userId = Meteor.user()._id;
        for (let i = 0; i < this.props.favorites.length; i++) {
            if (userId === this.props.favorites[i]) {
                return <span className="glyphicon glyphicon-heart"></span>;
            }
        }
        return <span className="glyphicon glyphicon-heart-empty heart-black"></span>;

    }
    renderButton() {
        if (Meteor.user()) {
          return  <button className="button button--heart" onClick={() => {
                const userId = Meteor.user()._id;
                let deleteFavorite = null;
                for (let i = 0; i < this.props.favorites.length; i++) {
                    if (userId === this.props.favorites[i]) {
                        Meteor.call('links.deleteFavorites', this.props._id, userId)
                        deleteFavorite = true;
                    }
                }

                if (!deleteFavorite) {
                    Meteor.call('links.addFavorites', this.props._id, userId)
                }    
            }}>
                
                {
                    this.changeButton()}
            </button>
            
        }

    }
    renderTime() {
        let createdAt = moment(this.props.createdAt).fromNow();
        return <p className="item__time">{createdAt}</p>
    }
    render() {
        return (
                <div>
                    <div className="item boxed-view__info">
                        <Link to={"profiles/" + this.props.username}>{this.props.username}</Link>
                        <div>
                            <img src={this.props.shortUrl} />
                            {this.renderButton()}  
                            <p>{this.props.favorites.length} like(s)</p>
                            {this.renderTime()}
                        </div>
                    </div>
                </div>
            )
    }

}


PublicUserProfileItem .propTypes = {
    _id: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool.isRequired,
    shortUrl: React.PropTypes.string.isRequired,
    visitedCount: React.PropTypes.number.isRequired,
    lastVisitedAt: React.PropTypes.number
};