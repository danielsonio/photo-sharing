import React from 'react';

import PublicHeader from'./PublicHeader'
import PublicLinksList from './PublicLinksList.js'

export default () => {
    return(
        <div>
            <PublicHeader header="PHOTO SHARING"/>
            <div className="page-content">
                <PublicLinksList/>
            </div> 
        </div>
    )
}