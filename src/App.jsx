import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import Navbar from "./navbar.jsx"
import Chatbar from "./ChatBar.jsx"


import messages from './messages.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "Cristof",
      messages: []
    };
    this.newMessage = this.newMessage.bind(this);
    this.changeCurrentUser = this.changeCurrentUser.bind(this);
  }
  componentDidMount() {
    let webSocket = new WebSocket("ws://localhost:3001");
    this.setState({webSocket: webSocket})
    webSocket.onopen = function () {
      console.log("Connected to server");
    }
    webSocket.onmessage = (event) => {
      const message = this.state.messages.concat(JSON.parse(event.data))
      this.setState({messages: message})
      console.log("Connected to server", message);
    }

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 8, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
    }
  changeCurrentUser (evt) {
    if (evt.keyCode === 13) {
      this.setState({currentUser: evt.target.value})
    }
  }



  newMessage (evt) {
   if (evt.keyCode === 13) {
     let newMessages = {
       "type": "incomingMessage",
       "content": evt.target.value,
       "username": this.state.currentUser,
     } 
     this.state.webSocket.send(JSON.stringify(newMessages));
     evt.target.value = '';
    }
  }  
  
  render() {

    return (
    <div>
      <Navbar />
      <MessageList messages={this.state.messages} />
      <Chatbar currentUser={this.state.currentUser} newMessage={this.newMessage} changeCurrentUser={this.changeCurrentUser}/>
  </div>
    )
  }
}

export default App;
