import { Meteor } from 'meteor/meteor';
import React from 'react';
import Clipboard from 'clipboard';
import { Link } from 'react-router';
import moment from 'moment';


export default class PublicLinksListItem extends React.Component {
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
    renderFavorites(){
        let favorites = this.props.favorites;
        let userLikes = false;
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i]===Meteor.user()._id) {
                userLikes = true;
            }
        }

        if (favorites.length === 0) {
            return <p>Be the first person to like this</p>
        } else if (userLikes && favorites.length === 1){
            return <p>You like this</p>
        } else if (userLikes && favorites.length === 2) {
            return <p>You and one other person like this</p>
        } else if (userLikes) {
            return <p>You and {favorites.length - 1} other people like this </p>
        } else if (!userLikes && favorites.length===1){
            return <p>One person likes this</p>
        } else {
            return <p> {favorites.length} people like this</p>
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
                        {this.renderFavorites()}
                        {this.renderTime()}
                    </div>
                </div>
            </div>
        )
    }

}


PublicLinksListItem.propTypes = {
    _id: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool.isRequired,
    shortUrl: React.PropTypes.string.isRequired,
    visitedCount: React.PropTypes.number.isRequired,
    lastVisitedAt: React.PropTypes.number
};