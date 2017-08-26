import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import { Key } from '../api/links';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: '',
      files: []
    };
  }

  onDrop = files => {
    // Push all the axios request promise into a single array
    this.handleModalClose()
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", Key.preset); // Replace the preset name with your own
      formData.append("api_key", Key.secret); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);
      
      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios.post("https://api.cloudinary.com/v1_1/duvgxhils/image/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }).then(response => {
        const data = response.data;
        const fileURL = data.secure_url // You should store this URL for future references in your app
        console.log(data);

        if (fileURL) {
            Meteor.call('links.insert', fileURL, (err,res) => {
              if (!err) {
                  this.setState({url: ''});
              }
            });
          }
      })
    });
  
    // Once all the files are uploaded 
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
      console.log('Successful Operation Indeed!')
    });
  }

  handleModalClose() {
    this.setState({
      isOpen: false,
      url: '',
      error: ''
    });
  }
  render() {
    return (
      <div>
        <button className="button button--header button--drop" onClick={() => this.setState({isOpen: true})}><span className="glyphicon glyphicon-picture"></span></button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add picture"
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal">
          <h5>Add Photo</h5>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form className="boxed-view__form">
              <section>
                <div className="dropzone">
                  <Dropzone onDrop={this.onDrop.bind(this)} className="dropzone">
                      <p>Drag and drop your picture, or click to upload from a directory.</p>
                  </Dropzone> 
                </div>
              </section>
              <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}

