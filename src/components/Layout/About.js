import React from 'react';
import DrogonImg from '../../img/drogon_ball.jpg'
import LaikaImg from '../../img/laika_in_tree_small.jpg'
import NimbusImg from '../../img/Nimbus_1.jpg';
import GitHub from '../../img/GitHub_Logo-2.png';

const About = () => { 
  return (
    <div>
        <div id='about'>
          <div>
            <h1 className='headline'>What is this site for?</h1>
            <p>
              This site has listings of dog parks and stores in the greater Atlanta area. Anyone can view the listings. If you create an account, you can vote on locations that you have visited. Locations are rated with a "Paws Up" or "Paws Down". 
            </p>
            </div>
            <div className='seperator'>
              <h2 className='about-text'>The code for this site</h2>
              <p>This is a project in my portfolio as a JavaScript developer. I am a 'dog person' I decided to make this site to show my skillset. Please checkout the code for this site on my GitHub account.</p>
              <p>Please note I will have to put limits on my google maps usage, due to costs. If you encounter any issues please contact me.</p>
              <button className='btn' id='github-link'>
              <a href='https://github.com/Missarachnid/puplanta2' target='_blank' rel='noopener noreferrer'>
                <img src={GitHub} alt='a GitHub logo'/>
              </a>
              </button>
              </div>
            <div className='seperator'>
              <h3 className='about-text'>Paying the Pet Tax</h3>
              <p>These are my 3 best friends. They keep my life interesting.</p>
            </div>
            <div className='seperator'>
            <div className='row'>
              <div className='col-md-4'>
                <div className='card dog-card'>
                <p className='card-title'>Laika</p>
                  <img src={LaikaImg} className='card-image dog-img' alt='A white dog sticking her head between a forked tree'/>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card dog-card'>
                <p className='card-title'>Drogon</p>
                  <img src={DrogonImg} className='card-image dog-img' alt='A black German Shepherd sitting and waiting for a yellow ball to be thrown to him'/>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card dog-card'>
                <p className='card-title'>Nimbus</p>
                  <img src={NimbusImg} className='card-image dog-img' alt='A fluffy black and gray Pomearanian standing while the wind blows through his hair'/>
                </div>
              </div>
              </div>
            </div>
        </div>
    </div>
  );
}
export default About;