import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import './bootstrap.min.css';

//render one item
const Card = (props) => {
  return (
    <div style={{margin: '1em'}}>
      <img alt="Profile" width="75" src={props.avatar_url} />
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}> 
        	{props.name}
        </div>
        <div>{props.company}</div>
        <button
          //when I click here should trigger App's delete funcition how can I call that func from here
          onClick = { () => props.delete()}
          className="btn btn-danger btn-sm">Delete</button>
      </div>
    </div>
  );
};

//render a list of items
const CardList = (props) => {
	return (
  //Props.nameProp = Value {...Card} spred operator
  	<div> 
      	{props.cards.map(card => <Card delete={props.deleteCard} key={card.id} {...card} />)}
  	</div>
  );
}

class Form extends React.Component {
	
  state = {
  	userName: ''
  };
	
  handleSubmit = (e) => {
  	e.preventDefault();
    //console.log('Event: from subit', this.state.userName);
    //ajax ... (fetch or axios)    
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    	.then( resp => {
      	this.props.onSubmit(resp.data)
        this.setState({userName: ''})
      });
    
  };
  
	render() {
  	return(
    	<form onSubmit={this.handleSubmit}>
        <input 
        	type="text"
          //ref = {(input) => this.userNameInput = input}
          value={this.state.userName}
          onChange={(e) => this.setState({userName: e.target.value})}
          
        	placeholder="Github username" required />
        <button className="btn btn-primary btn-sm" type="submit">Add card</button>
    	</form>
    );
  }
}

class App extends React.Component {
	state = {
  	cards: [
    ]
  };
  
  addNewCard = (cardInfo) => {
  	this.setState(prevState => ({
    	cards: prevState.cards.concat(cardInfo)
    }))
  };
  
  deleteCard = () => {
    alert("some code to delete a user");  
    /* this.setState(prevState => ({
        //array.filter creates a new array with elements who pass the foo
        cards: prevState.cards.filter(card => card !== selectedCard)
      })); */
  }

	render(){
    const {
      cards,
    } = this.state;
  	return(
    	<div className="container" style={{marginTop: 15}}>
  	  	<Form onSubmit={this.addNewCard} />        
        <div className="container" style={{padding: 20}}>
          {
            cards.length > 0 ? 
            <CardList deleteCard={this.deleteCard} cards={cards} />
            :
            <p>Your list is empty</p>
          }
        </div>      	
  		</div>
    );  	
  }
}


// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);