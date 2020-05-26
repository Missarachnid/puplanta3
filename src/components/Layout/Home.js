import React from 'react';
import heart from '../../img/heart.png';

const Home = () => (
  <div className='jumbotron' id='home'>
    <h1 className='headline'>Welcome to <span className='copy'>Puplanta</span></h1>
    <div className='row'>
      <div className='col-12'>
        <div className='main-logo'>
          <img src={heart} id='georgia' alt='The state of Georgia with a heart over the greater Atlanta area. A corgi face on the left of it, a corgi button on the right.'/>
        </div>
      </div>
      <div className='col-12'>
        <div className='pup-text'>
        <p className='headline' id='pup-home'><span className='copy'>Atlanta's Dog Parks & Shops in one place</span>.<br></br> Vote for your favorite!</p>
        </div>
      </div>
    </div>
  </div>
)
export default Home;