
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import {  ImageDetails}  from "./ImageDetails";



export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      images: [],
      dragClicked:false
    }

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
  }

  componentDidMount() {
     fetch("https://picsum.photos/v2/list")
     .then(response  => response.json())
     .then(data => {
       console.log(data);
       this.setState({images:data})
     }) 


     document.addEventListener('mousedown',this.mouseDown)
     document.addEventListener('mouseup',this.mouseUp)
     document.addEventListener('mousemove',this.mouseMove)
    
     
  }

  mouseDown(e) {
    var dragbar = document.getElementById('dragbar')
      
      if (e.target === dragbar) {
        console.log('clicked dragbar');
        this.setState({dragClicked:true})
      }
  }

  mouseUp(e) {
    this.setState({dragClicked:false})
  }

  mouseMove(e) {
    var dragbar = document.getElementById('dragbar');
    var wrapper = document.getElementById('wrapper');
    var list = document.getElementById('sidebar');
    var main = document.getElementById('main');

    if (!this.state.dragClicked) {
      console.log('not clicked');
      return
    }
    
    //offset of wrapper div  (0)
    var containerOffsetLeft = wrapper.offsetLeft;
    
    //find what percent of the screen x coord the mouse is over
    var pointerRelativeXpos = (e.clientX - containerOffsetLeft) / window.innerWidth * 100;
    
    //min width of left column
    var boxAminWidth = 1;
   
    list.style.flex = pointerRelativeXpos + 3 +  '%';
    main.style.flex = 100 - pointerRelativeXpos + "%"
  }

  render() {
    return (
      <div className="App" id="wrapper">
        <Router>
        <div className="sidebar" id="sidebar">
          {this.state.images.map((image) => {
            return (
              <div>
                 <Link to={'/image/'  + image.id } >
                  <img src={image.download_url } />
                  </Link>
              </div>
            )
          })}
        </div>
        <div onClick={this.dragbarClick} className="dragbar" id="dragbar"></div>
        <div  className="main"  id="main">
            {this.state.images.length > 0 && 
              <Route path={'/image/:id'} render={({match})  => (
                <ImageDetails image={this.state.images.find(img => img.id === match.params.id)} />
              )}/>
            }
        </div>
        </Router>
      </div>
    );
  }
}


