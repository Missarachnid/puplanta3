import React from 'react';

class InfoWindow extends React.Component {
  render = () => (
    <div key={this.props.data.id}>
      <div className='card-body card-main-body'>
        <h5 className='card-title card-main-title'>{this.props.data.title}</h5>
        <p className='card-text card-main-text'>{this.props.data.address}</p>
        <a href={this.props.data.website} className='btn paw-button-info' rel='noopener noreferrer' target='_blank'>Info</a>
      </div>
    </div>
  )
}


export default InfoWindow;