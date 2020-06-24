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
    var userId = this.props.user.uid
    var upVote, downVote, voteData;
    
    /* retrieve data for park item clicked */ 
    for(let i = 0; i < this.props.stores.length; i++){
      if(this.props.stores[i].id === this.props.match.params.id){
        temp = this.props.stores[i];
        //storeId = temp.id;
        upVote = parseInt(temp.votes.up);
        downVote = parseInt(temp.votes.down);
        //console.log('parkId', temp.id)
      }
    }

    //Paws Up Starts
    const votePawsUp = (e, id) => {
      e.preventDefault();
      //var ref = this.props.firebase.stores(id); //can this be moved up top somewhere?
      var tempVote = `users/${userId}/stores/${id}`;
      var storeRef = this.props.firebase.db.ref('stores/' + id);
      var userVotes = this.props.firebase.db.ref(tempVote);
      //console.log('userVotes', userVotes)

      userVotes.once('value')
      .then(snapshot => {
        //return JSON.stringify(snapshot.child('stores').child(`${id}`).val());
        return JSON.stringify(snapshot.val());
      })
      .then( data => {
        voteData = data;
        //console.log('pawsUp', voteData);

        switch(voteData) {
          //Since I didn't originally add a votes tracker to the user db, this adds a vote property
          case 'null':
            //console.log(null);
            upVote = upVote + 1;
            userVotes.set({
              down: false,
              up: true
            })
            .then(() => {
              storeRef.update({
                'votes': {
                  'down': downVote,
                  'up': upVote
                }
              })
            })
            .catch(err => console.log('Error in switch case #1', err));
            break;
          //If a person previously downvoted and would like to change it to up
          case JSON.stringify({down: true, up: false}):
            //console.log('{down: true, up: false}');
            upVote = upVote + 1;
            downVote = downVote - 1;
            userVotes.update({
              down: false,
              up: true
            })
            .then(() => {
              storeRef.update({
                'votes': {
                  'down': downVote,
                  'up': upVote
                }
              })
            })
            .catch(err => console.log('Error in switch case #2', err));
            break;
            //If a user previously voted up and would like to undo that
          case JSON.stringify({down: false, up: true}):
            //console.log('{down: false, up: true}');
            upVote = upVote - 1;
            userVotes.update({
              down: false,
              up: false
            })
            .then(() => {
              storeRef.update({
                'votes': {
                  'down': downVote,
                  'up': upVote
                }
              })
            })
            .catch(err => console.log('Error in switch case #3', err));
            break;
          //If a person has removed an up or down vote previously, and wants to upvote
          case JSON.stringify({down: false, up: false}):
            //console.log('{down: false, up: false}');
            upVote = upVote + 1;
            userVotes.update({
              down: false,
              up: true
            })
            .then(() => {
              storeRef.update({
                'votes': {
                  'down': downVote,
                  'up': upVote
                }
              })
            })
            .catch(err => console.log('Error in upvote case #4', err));
            break;
          default:
            //console.log('default case in switch', voteData);
          break;
        }
      })
      .then(() => {
        this.props.history.push(ROUTES.STORES);
      })
      .catch(err => console.log('Error updating votes ', err));
    }
    //Paws Up Ends

    //Paws Down Starts
    const votePawsDown = (e, id) => {
      e.preventDefault();
      var tempVote = `users/${userId}/stores/${id}`;
      var storeRef = this.props.firebase.db.ref('stores/' + id);
      var userVotes = this.props.firebase.db.ref(tempVote);
      //console.log('userVotesdown', userVotes)

      userVotes.once('value')
      .then(snapshot => {
        //return JSON.stringify(snapshot.child('stores').child(`${id}`).val());
        return JSON.stringify(snapshot.val());
      })
      .then( data => {
        voteData = data;
        //console.log('pawsDown', voteData);

        switch(voteData) {
          //Since I didn't originally add a votes tracker to the user db, this adds a vote property
          case 'null':
            //console.log(null);
            downVote = downVote + 1;
            userVotes.set({
              down: true,
              up: false
            })
            .then(() => {
              storeRef.update({
                'votes': {
                  'down': downVote,
                  'up': upVote
                }
              })
            })
            .catch(err => console.log('Error in switch downVote case #1', err));
            break;
          //If a person previously downvoted and would undo that
          case JSON.stringify({down: true, up: false}):
            //console.log('{down: true, up: false}');
            downVote = downVote + 1;
            upVote = upVote - 1;
            userVotes.update({
              down: false,
              up: false
            })
            .then(() => {
              storeRef.update({
                'votes': {
                  'down': downVote,
                  'up': upVote
                }
              })
            })
            .catch(err => console.log('Error in downVote s switch case #2', err));
            break;
            //If a user previously voted up and would like to undo that
          case JSON.stringify({down: false, up: true}):
            //console.log('{down: false, up: true}');
            upVote = upVote - 1;
            userVotes.update({
              down: false,
              up: false
            })
            .then(() => {
              storeRef.update({
                'votes': {
                  'down': downVote,
                  'up': upVote
                }
              })
            })
            .catch(err => console.log('Error in switch case #3', err));
            break;
          //If a person has removed an up or down vote previously, and wants to upvote
          case JSON.stringify({down: false, up: false}):
            //console.log('{down: false, up: false}');
            upVote = upVote + 1;
            userVotes.update({
              down: false,
              up: true
            })
            .then(() => {
              storeRef.update({
                'votes': {
                  'down': downVote,
                  'up': upVote
                }
              })
            })
            .catch(err => console.log('Error in upvote case #4', err));
            break;
          default:
            //console.log('default case in switch', voteData);
          break;
        }
      })
      .then(() => {
        this.props.history.push(ROUTES.STORES);
      })
      .catch(err => console.log('Error updating votes ', err));
    }
    //Paws Down Ends

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
