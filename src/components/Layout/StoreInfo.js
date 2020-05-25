import React from 'react';
import { withAuthorization } from '../Session';
import * as ROUTES from '../Routes/Routes';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import pawUp from '../../img/paws-up.svg';
import pawDown from '../../img/paws-down.svg';
import { withFirebase } from '../Firebase';

class Store extends React.Component {
  render = () => {

    var temp;
    /* retrieve data for store item clicked */
    for(let i = 0; i < this.props.stores.length; i++){
      if(this.props.stores[i].id === this.props.match.params.id){
        temp = this.props.stores[i];
      }
    }

    const votePawsUp = (e, id) => {
      e.preventDefault();
      let upVote = parseInt(temp.votes.up);
      upVote = upVote + 1;
      let downVote = parseInt(temp.votes.down);
      let ref = this.props.firebase.store(id);
      ref.update({
        'votes': {
          'down': downVote,
          'up': upVote
        }
      })
      .catch(err => console.log('Error updating votes ', err));
      this.props.history.push(ROUTES.STORES);
    }

    const votePawsDown = (e, id) => {
      e.preventDefault();
      let downVote = parseInt(temp.votes.down);
      downVote = downVote + 1;
      let upVote = parseInt(temp.votes.up);
      let ref = this.props.firebase.store(id);
      ref.update({
        'votes': {
          'down': downVote,
          'up': upVote
        }
      })
      .catch(err => console.log('Error updating votes ', err));
      this.props.history.push(ROUTES.STORES);
    }

    return (
      <div className='jumbotron' id='park-item'>
        <h1 className='headline'>{temp ? (temp.title) : null}</h1>
        <img src={temp ? (temp.image) : null} alt={temp ? (temp.title) : null} id='park-item-image'/>
        <div className='paws-park-item'>
          <p>Have you visited this store?</p>
          <p>What do you think?</p>
          <button className='vote' onClick={e => votePawsUp(e, temp.id)}><img src={pawUp} className='paws-vote' alt='A paw pointing upwards like a thumbs up'/></button>
          <span className='paw-seperator'> or </span>
          <button className='vote' onClick={e => votePawsDown(e, temp.id)}><img src={pawDown} className='paws-vote'alt='A paw pointing downwards like a thumbs down'/></button>
        </div>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

const StoreInfo = compose(
  withFirebase,
  withAuthorization(condition),
  withRouter
)(Store);

export default StoreInfo;