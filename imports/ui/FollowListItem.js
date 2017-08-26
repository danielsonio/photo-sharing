import { Meteor } from 'meteor/meteor'
import React from 'react';
import Clipboard from 'clipboard';


export default class FollowListItem extends React.Component {

    // renderUsersFollowing() {
    //     for (let i = 0; i < this.props.following.length; i++) {
    //         console.log(this.props.following[i]);
    //     }
    // }
    render() {
        
        return(
         <div> 
             <p>Following:</p>
            <img src={this.props.shortUrl} width="100" height="100" />
            <p>{this.props.username}</p>
            <p>Number of likes: {this.props.favorites.length}</p>
            {/* <p>{this.props.visitedCount} - {this.props.lastVisitedAt}</p> */}
            <button ref="copy" data-clipboard-text={this.props.shortUrl} >{this.state.justCopied ? 'Copied' : 'Copy'}</button>
            <button onClick={() => {
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
                
                {/* {this.props.deleteFavorite ? 'Unlike' : 'Like'}} */}
                {this.changeButton()}
            </button>
        </div>

        );

        
    }

}


// PublicUserProfileItem .propTypes = {
//     _id: React.PropTypes.string.isRequired,
//     url: React.PropTypes.string.isRequired,
//     userId: React.PropTypes.string.isRequired,
//     username: React.PropTypes.string.isRequired,
//     visible: React.PropTypes.bool.isRequired,
//     shortUrl: React.PropTypes.string.isRequired,
//     visitedCount: React.PropTypes.number.isRequired,
//     lastVisitedAt: React.PropTypes.number
// };