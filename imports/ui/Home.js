import React from 'react';

import PublicHeader from'./PublicHeader'
import PublicLinksList from './PublicLinksList.js'

export default () => {
    return(
        <div>
            <PublicHeader header="Photo Sharing App"/>
            <div className="page-content">
                <PublicLinksList/>
            </div> 
        </div>
    )
}