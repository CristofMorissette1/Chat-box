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
      messages: messages
    };
    this.newMessage = this.newMessage.bind(this);
  }
  componentDidMount() {
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



  newMessage (evt) {
   if (evt.keyCode === 13) {
     let newMessages = {
       "type": "incomingMessage",
       "content": evt.target.value,
       "username": this.state.currentUser,
       "id": Math.floor(100000 + Math.random() * 900000)
     }
     let curData = this.state.messages;
     curData.push(newMessages);
     this.setState({messages: curData})
   }
  }  
  
  render() {

    return (
    <div>
      <Navbar />
      <MessageList messages={this.state.messages} />
      <Chatbar currentUser={this.state.currentUser} newMessage={this.newMessage}/>
  </div>
    )
  }
}
export default App;
