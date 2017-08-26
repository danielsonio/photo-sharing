import React from 'react';

import PublicHeader from'./PublicHeader';
import PublicUserProfileList from './PublicUserProfileList';


export default class PublicUserProfile extends React.Component {

    render() {
        return (
            <div>
                <PublicHeader header={this.props.params.username}/>
                <div className="page-content">
                    <PublicUserProfileList username={this.props.params.username}/>
                </div>
            </div>
        );
    }

}


