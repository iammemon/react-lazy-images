import React, { Component } from 'react';

import LazyImage from './components/lazy-image/'
import withIntersectionObserver from './components/hoc/intersectionObserver'
import images from './images'
import './App.css'

class App extends Component {

  state = {
    visibleId: ''
  }

  //this method will be called by hoc when intersection occur
  onView = (entry) => {
    const id = entry.target.dataset.id 
    this.setState({
      visibleId:id
    })
  }


  _renderLazyImages = () => {
    return images.map(img => {
      return (<LazyImage
        visibleId={this.state.visibleId}
        key={img.image.main}
        id={img.image.main}
        observer={this.props.observer}
        aspectratio={img.aspectRatio}
        base64Img={img.base64}
        src={img.image.main}
        srcset={img.image.srcset}
        sizes={img.image.sizes}
      />)
    })
  }

  render() {
    return (
      <div className='App'>
        <h1>Lazy loading images</h1>
        <div className='container'>
          {this._renderLazyImages()}
        </div>
      </div>
    );
  }
}

const config = {
  rootMargin: '5px 0px',
  threshold: 0.01
};
export default withIntersectionObserver(config)(App);