
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

export  class ImageDetails extends Component {

  constructor(props) {
    super(props);
  }

  

  render() {
    return (
      <div className="img-details">
        <img src={this.props.image.download_url} />
        <h1>{this.props.image.author}</h1>
      </div>
    );
  }
}


