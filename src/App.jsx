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
      messages: [],
      counter: 0
    };
    this.newMessage = this.newMessage.bind(this);
    this.newUser = this.newUser.bind(this);
  }
  componentDidMount() {
    let webSocket = new WebSocket("ws://localhost:3001");
    this.setState({webSocket: webSocket})
    webSocket.onopen = function () {
      console.log("Connected to server");
    }
    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch(data.type) {
        case "incomingMessage":
          const message = this.state.messages.concat(data)
          this.setState({messages: message})
          break;
        case "incomingNotification":
           const notification = this.state.messages.concat(data);
           this.setState({messages: notification});
          break;
          case  "userCounter":
          this.setState({counter: data.counter})
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
    }
    console.log("Connected to server");
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

  newUser (evt) {
    if (evt.keyCode === 13) {
      let userChange = {
        "type": "postNotification",
        "content": evt.target.value,
        "username": this.state.currentUser,
      }
      this.setState({currentUser: evt.target.value})
      this.state.webSocket.send(JSON.stringify(userChange));
    }
  }

  newMessage (evt) {
   if (evt.keyCode === 13) {
     let newMessages = {
       "type": "postMessage",
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
      <Navbar navbar={this.state.counter}/>
      <MessageList messages={this.state.messages} />
      <Chatbar currentUser={this.state.currentUser} newMessage={this.newMessage} newUser={this.newUser}/>
  </div>
    )
  }
}

export default App
