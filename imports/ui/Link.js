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
        <PrivateHeader header={"Your Pics"}/>
        <div className="page-content">
          <DropFile/>
          <LinksListFilters/>
          <LinksList/>
        </div>

    </div>
  )
}
