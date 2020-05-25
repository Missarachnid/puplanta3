import React from 'react';
import Georgia from '../../img/georgia-corgi.png';

const Home = () => (
  <div className='jumbotron' id='home'>
    <h1 className='headline'>Welcome to puplanta</h1>
    <div className='row'>
      <div className='col-md-12 col-lg-6'>
        <img src={Georgia} id='georgia' alt='The state of Georgia with a heart over the greater Atlanta area. A corgi face on the left of it, a corgi button on the right.'/>
      </div>
      <div className='col-md-12 col-lg-6'>
        <div className='pup-text'>
        <p className='headline' id='pup-home'>Greater Atlanta's dog parks and shops in one place. Vote for your favorite!</p>
        </div>
      </div>
    </div>
  </div>
)
export default Home;