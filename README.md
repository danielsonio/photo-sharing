Photo Sharing

A social sharing site where users can publish and view other pictures in their network. To get started, create an account and upload your pictures to your private profile. When you’re ready, publish your pictures to the homepage – where other users can like them and visit your public profile. Developed with React, Meteor, MongoDB, and SCSS.

To get started:

1. Clone this repo

2. Install Meteor https://www.meteor.com/ 

3. cd into the project folder and run an 'npm install'

4. Meteor has a few packages specific to it's platform which we must install. Run 'meteor add' + the following packages:
accounts-base (tracks user id's)
session (client side storage)
accounts-password (verification)
fourseven:scss@=3.13.0 (scss styling)

5. A Cloudinary server stores the uploaded images. Open a free account at https://cloudinary.com/ and follow the steps to obtain a preset number, api-key, and file hosting url - which belong in './imports/ui/DropZone'.

6. Enter 'meteor run' in the console. Meteor automatically hosts apps on port 3000.


Authors

Danny Walden


Acknowledgments

Bilal Budhani
Andrew Mead 
