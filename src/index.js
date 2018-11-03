import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

const Card = (props) => {
  return (
    <div style={{margin: '1em'}}>
      <img alt="Profile" width="75" src={props.avatar_url} />
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}> 
        	{props.name}
        </div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};


const CardList = (props) => {
	return (
  //Props nameProp = Value {...Card} spred operator
  	<div> 
      	{props.cards.map(card => <Card key={card.id} {...card}/>)}
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
        <button type="submit">Add card</button>
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
  
	render(){
  	return(
    	<div>
  	  	<Form onSubmit={this.addNewCard} />
      	<CardList cards={this.state.cards} />
  		</div>
    );  	
  }
}


// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);