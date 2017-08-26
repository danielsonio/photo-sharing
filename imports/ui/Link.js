import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters'
import DropFile from './DropFile';


export default () => {
  return(
    <div>
        <PrivateHeader header={"your pictures"}/>
        <div className="page-content">
          <div className='drop--center'>
            <DropFile/>
          </div>
          <LinksListFilters/>
          <LinksList/>
        </div>

    </div>
  )
}
