import React from 'react';
import { withAuthorization } from '../Session';
import * as ROUTES from '../Routes/Routes';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import pawUp from '../../img/paws-up.svg';
import pawDown from '../../img/paws-down.svg';
import { withFirebase } from '../Firebase';

class Park extends React.Component {
  render = () => {
    var temp;
    var userId = this.props.user.uid
    var upVote, downVote, voteData;
    
    /* retrieve data for park item clicked */ 
    for(let i = 0; i < this.props.parks.length; i++){
      if(this.props.parks[i].id === this.props.match.params.id){
        temp = this.props.parks[i];
        //parkId = temp.id;
        upVote = parseInt(temp.votes.up);
        downVote = parseInt(temp.votes.down);
        console.log('parkId', temp.id)
      }
    }

    //Paws Up Starts
    const votePawsUp = (e, id) => {
      e.preventDefault();
      //var ref = this.props.firebase.park(id); //can this be moved up top somewhere?
      let tempVote = `users/${userId}/parks/${id}`;
      let parkRef = this.props.firebase.db.ref('parks/' + id);
      let userVotes = this.props.firebase.db.ref(tempVote);
      console.log('userVotes', userVotes)

      userVotes.once('value')
      .then(snapshot => {
        //return JSON.stringify(snapshot.child('parks').child(`${id}`).val());
        return JSON.stringify(snapshot.val());
      })
      .then( data => {
        voteData = data;
        console.log('pawsUp', voteData);

        switch(voteData) {
          //Since I didn't originally add a votes tracker to the user db, this adds a vote property
          case 'null':
            console.log(null);
            upVote = upVote + 1;
            userVotes.set({
              down: false,
              up: true
            })
            .then(() => {
              parkRef.update({
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
            console.log('{down: true, up: false}');
            upVote = upVote + 1;
            downVote = downVote - 1;
            userVotes.update({
              down: false,
              up: true
            })
            .then(() => {
              parkRef.update({
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
            console.log('{down: false, up: true}');
            upVote = upVote - 1;
            userVotes.update({
              down: false,
              up: false
            })
            .then(() => {
              parkRef.update({
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
            console.log('{down: false, up: false}');
            upVote = upVote + 1;
            userVotes.update({
              down: false,
              up: true
            })
            .then(() => {
              parkRef.update({
                'votes': {
                  'down': downVote,
                  'up': upVote
                }
              })
            })
            .catch(err => console.log('Error in upvote case #4', err));
            break;
          default:
            console.log('default case in switch', voteData);
          break;
        }
      })
      .then(() => {
        this.props.history.push(ROUTES.PARKS);
      })
      .catch(err => console.log('Error updating votes ', err));
    }
    //Paws Up Ends

    //Paws Down Starts
    const votePawsDown = (e, id) => {
      e.preventDefault();
      let tempVote = `users/${userId}/parks/${id}`;
      let parkRef = this.props.firebase.db.ref('parks/' + id);
      let userVotes = this.props.firebase.db.ref(tempVote);
      console.log('userVotesdown', userVotes)

      userVotes.once('value')
      .then(snapshot => {
        //return JSON.stringify(snapshot.child('parks').child(`${id}`).val());
        return JSON.stringify(snapshot.val());
      })
      .then( data => {
        voteData = data;
        console.log('pawsDown', voteData);

        switch(voteData) {
          //Since I didn't originally add a votes tracker to the user db, this adds a vote property
          case 'null':
            console.log(null);
            downVote = downVote + 1;
            userVotes.set({
              down: true,
              up: false
            })
            .then(() => {
              parkRef.update({
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
            console.log('{down: true, up: false}');
            downVote = downVote + 1;
            upVote = upVote - 1;
            userVotes.update({
              down: false,
              up: false
            })
            .then(() => {
              parkRef.update({
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
            console.log('{down: false, up: true}');
            upVote = upVote - 1;
            userVotes.update({
              down: false,
              up: false
            })
            .then(() => {
              parkRef.update({
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
            console.log('{down: false, up: false}');
            upVote = upVote + 1;
            userVotes.update({
              down: false,
              up: true
            })
            .then(() => {
              parkRef.update({
                'votes': {
                  'down': downVote,
                  'up': upVote
                }
              })
            })
            .catch(err => console.log('Error in upvote case #4', err));
            break;
          default:
            console.log('default case in switch', voteData);
          break;
        }
      })
      .then(() => {
        this.props.history.push(ROUTES.PARKS);
      })
      .catch(err => console.log('Error updating votes ', err));
    }
    //Paws Down Ends

    return (
      <div className='jumbotron' id='park-item'>
        <h1 className='headline'>{temp ? (temp.title) : null}</h1>
        <img src={temp ? (temp.image) : null} alt={temp ? (temp.title) : null} id='park-item-image'/>
        <div className='paws-park-item'>
          <p>Have you visited this park?</p>
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

const ParkInfo = compose(
  withFirebase,
  withAuthorization(condition),
  withRouter
)(Park);

export default ParkInfo;

/*
class Park extends React.Component {
  render = () => {
    var temp;
    /* retrieve data for park item clicked */ /*
    for(let i = 0; i < this.props.parks.length; i++){
      if(this.props.parks[i].id === this.props.match.params.id){
        temp = this.props.parks[i];
      }
    }

    

    const votePawsUp = (e, id) => {
      e.preventDefault();
      let upVote = parseInt(temp.votes.up);
      upVote = upVote + 1;
      let downVote = parseInt(temp.votes.down);
      let ref = this.props.firebase.park(id);
      ref.update({
        'votes': {
          'down': downVote,
          'up': upVote
        }
      })
      .catch(err => console.log('Error updating votes ', err));
      this.props.history.push(ROUTES.PARKS);
    }

    const votePawsDown = (e, id) => {
      e.preventDefault();
      let downVote = parseInt(temp.votes.down);
      downVote = downVote + 1;
      let upVote = parseInt(temp.votes.up);
      let ref = this.props.firebase.park(id);
      ref.update({
        'votes': {
          'down': downVote,
          'up': upVote
        }
      })
      .catch(err => console.log('Error updating votes ', err));
      this.props.history.push(ROUTES.PARKS);
    }

    return (
      <div className='jumbotron' id='park-item'>
        <h1 className='headline'>{temp ? (temp.title) : null}</h1>
        <img src={temp ? (temp.image) : null} alt={temp ? (temp.title) : null} id='park-item-image'/>
        <div className='paws-park-item'>
          <p>Have you visited this park?</p>
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

const ParkInfo = compose(
  withFirebase,
  withAuthorization(condition),
  withRouter
)(Park);

export default ParkInfo;

*/




/*

var findUserVotes = () => {
      var data;
      var userId = this.props.user.uid
      let ref = this.props.firebase.db.ref(`users/${userId}/votes/parks/${parkId}`);
      ref.on('value', snapshot => {
        data = snapshot.val();
        console.log("data", data);
      
        if(data === null){
          //add this parks # and votes
          //console.log('its null');
         ref.set({
          up: true, 
          down: false
         });
        } else {
          //console.log('temp', temp)
          ref.update({
            up: true,
            down: false
          });
        }
      })
    }
    findUserVotes();
*/



/*

const votePawsUp = (e, id) => {
      let something = () => {
        var userVotes = this.props.firebase.users(`${userId}`);
        userVotes.on('value', snapshot => {
          //snap = snapshot.key;
          snap = snapshot.child('parks').val();
          console.log('snap', snap)
        })
      }
      
      something();
*/


/*
        switch(voteData) {
          case null:
            console.log('inswitch is null');
            userVotes.set({
              up: true,
              down: false
            });
            break;
          case {down: false, up: true}: 
            console.log('{up: true, down: false}');
            upVote = upVote - 1;
            userVotes.update({
              down: false,
              up: false
            })
            .then(() => {
              parkRef.update({
                'votes': {
                  'down': downVote,
                  'up': upVote
                }
              })
            })
            .catch(err => console.log('Error in upvote case 1'));
          
            break;
          case {down: true, up: false}:
            console.log('{up: false, down: true}');
            upVote = upVote + 1;
            downVote = downVote - 1;
            userVotes.update({
              down: false,
              up: true
            })
            .then(() => {
              parkRef.update({
                'votes': {
                  'down': downVote,
                  'up': upVote
                }
              })
            })
            .catch(err => console.log('Error in upvote case 2'));

            break;
          case {down: false, up: false}:
            console.log('{up: false, down: false}');
            upVote = upVote + 1;
            userVotes.update({
              down: false,
              up: true
            })
            .then(() => {
              parkRef.update({
                'votes': {
                  'down': downVote,
                  'up': upVote
                }
              })
            })
            .catch(err => console.log('Error in upvote case 3'));
            break;
          default:
            break;
        } */