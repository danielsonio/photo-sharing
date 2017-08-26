import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import moment from 'moment';
import '../imports/api/users';
import { Links } from '../imports/api/links';
import { Following } from '../imports/api/following';
import '../imports/startup/simple-schema-configuration.js';
import axios from 'axios';

Meteor.startup(() => {

    let now = new Date();

    let momentNow = moment();
    console.log(momentNow.format('MMM Do, YYYY'));


    WebApp.connectHandlers.use((req, res, next) => {
        const _id = req.url.slice(1);
        const link = Links.findOne({ _id });

        if (link) {
            res.statusCode = 302;
            res.setHeader('Location', link.url);
            res.end();
            Meteor.call('links.trackVisit', _id);
        } else {
            next();
        }

    });
    //Reference for middleware
    // WebApp.connectHandlers.use((req, res, next) => {
    //     console.log('This is from my custon middleware!!!');
    //     console.log(req.url, req.method, req.headers, req.query);
    //     //Set HTTP status code
    //     // res.statusCode = 404;
    //     //set HTTP header on the response
    //     // res.setHeader('my-custom-header', 'here is dannys custom header');
    //     //set HTTP body
    //     // res.write('<h1>This is my middleware at work</h1>');
    //     //End HTTP request
    //     // res.end();


    //     next();
    // });

});
