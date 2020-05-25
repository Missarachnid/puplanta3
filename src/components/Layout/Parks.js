import React from 'react';
import MapContainer from './MapContainer';
import { render } from 'react-dom';
import InfoWindow from './InfoWindow'
import pawUp from '../../img/paws-up.svg';
import pawDown from '../../img/paws-down.svg';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

 class Parks extends React.Component {
  
  render () {
    /* This dynamically loads cards from the park locations data */

    let parks = this.props.parks.map( el => (
      
      <div className='col-sm-12 col-md-6 col-lg-4' key={el.id} >
        <div className='card card-main'>
          <div className='card-body card-main-body'>
          <Link to={`/park/${el.id}`}>
          <img src={el.image} className='card-img-top card-main-image rounded' alt={`${el.title}.` } />
          <div className='card-text-seperator'>
            <h5 className='card-title card-main-title'>{el.title}</h5>
            <p className='card-text card-main-text'>{el.address}</p>
            </div>
            <div className='paws'>
              <img src={pawUp} className='paws-img' alt='A paw pointing upwards like a thumbs up'/>
              <span>{el.votes.up}</span>
              <span className='paw-seperator'></span>
              <img src={pawDown} className='paws-img'alt='A paw pointing downwards like a thumbs down'/>
              <span>{el.votes.down}</span>
            </div>
            </Link>
            <button className='paw-button'><a href={el.website} rel='noopener noreferrer' target='_blank'>Info</a></button>
          </div>
        </div>
      </div>
    ));

    return(
      <div id='parks'>
        <h1 className='headline'>Atlanta Dog Parks</h1>
        <div id='map-placement'>
        <MapContainer
        id='myMap'
        options={{
          center: { lat: 33.8884544, lng: -84.3842454 },
          zoom: 9.4
        }}
        onMapLoad={map => {

          let windowArr = [];

          this.props.parks.map((el) => {
            let temp = el;
            let marker = new window.google.maps.Marker({
              position: { lat: el.lat, lng: el.lng },
              map: map,
              title: el.title,
              website: el.website,
              address: el.address
            });
            
            const createInfoWindow = (e, map) => {

              const infoWindow = new window.google.maps.InfoWindow({
                  content: '<div id="infoWindow" />',
                  position: { lat: e.lat.lat(), lng: e.Lng.lng() },
                  title: e.title,
                  maxWidth: 280
              });

              infoWindow.addListener('domready', (e) => {
                render(<InfoWindow data={temp} />, document.getElementById('infoWindow'));
              });

              windowArr.push(infoWindow);
              
              if(windowArr.length > 1){
                let infoItem = windowArr.shift();
                infoItem.close(map);
                infoWindow.open(map);
              } else {
                infoWindow.open(map)
              }
            }

            marker.addListener('click', e => {
                createInfoWindow(e, map);
            });
            return marker;
          });

        }}
      />
        </div>
        <div className='items-display container'>
          <div className='row align-items-center'>
        
            {parks}

          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(Parks);

/*
import React from 'react';
import MapContainer from './MapContainer';
import { render } from 'react-dom';
import InfoWindow from './InfoWindow'
import pawUp from '../../img/paws-up.svg';
import pawDown from '../../img/paws-down.svg';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

 class Parks extends React.Component {
  
  render () {
    This dynamically loads cards from the park locations data 

    let parks = this.props.parks.map( el => (
      
      <div className='col-sm-12 col-md-6 col-lg-4' key={el.id} >
        <div className='card card-main'>
          <div className='card-body card-main-body'>
          <Link to={`/park/${el.id}`}>
          <img src={el.image} className='card-img-top card-main-image rounded' alt={`${el.title}.` } />
          <div className='card-text-seperator'>
            <h5 className='card-title card-main-title'>{el.title}</h5>
            <p className='card-text card-main-text'>{el.address}</p>
            </div>
            <div className='paws'>
              <img src={pawUp} className='paws-img' alt='A paw pointing upwards like a thumbs up'/>
              <span>{el.votes.up}</span>
              <span className='paw-seperator'></span>
              <img src={pawDown} className='paws-img'alt='A paw pointing downwards like a thumbs down'/>
              <span>{el.votes.down}</span>
            </div>
            </Link>
            <button className='paw-button'><a href={el.website} rel='noopener noreferrer' target='_blank'>Info</a></button>
          </div>
        </div>
      </div>
    ));

    return(
      <div id='parks'>
        <h1 className='headline'>Atlanta Dog Parks</h1>
        <div id='map-placement'>
        <MapContainer
        id='myMap'
        options={{
          center: { lat: 33.8884544, lng: -84.3842454 },
          zoom: 9.4
        }}
        onMapLoad={map => {

          let windowArr = [];

          this.props.parks.map((el) => {
            let temp = el;
            let marker = new window.google.maps.Marker({
              position: { lat: el.lat, lng: el.lng },
              map: map,
              title: el.title,
              website: el.website,
              address: el.address
            });
            
            const createInfoWindow = (e, map) => {

              const infoWindow = new window.google.maps.InfoWindow({
                  content: '<div id="infoWindow" />',
                  position: { lat: e.lat.lat(), lng: e.Lng.lng() },
                  title: e.title,
                  maxWidth: 280
              });

              infoWindow.addListener('domready', (e) => {
                render(<InfoWindow data={temp} />, document.getElementById('infoWindow'));
              });

              windowArr.push(infoWindow);
              
              if(windowArr.length > 1){
                let infoItem = windowArr.shift();
                infoItem.close(map);
                infoWindow.open(map);
              } else {
                infoWindow.open(map)
              }
            }

            marker.addListener('click', e => {
                createInfoWindow(e, map);
            });
            return marker;
          });

        }}
      />
        </div>
        <div className='items-display container'>
          <div className='row align-items-center'>
        
            {parks}

          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(Parks);
*/