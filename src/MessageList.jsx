import React, {Component} from "react";
import Message from "./Message.jsx";
import Notification from "./notification.jsx"

class MessageList extends Component {
  render() {
    let newArray = this.props.messages.map((message) => {
      switch(message.type) {
        case "incomingMessage":
          return <Message key={message.id} message={message.content} username={message.username}/> ;

        case "incomingNotification":
          return <Notification key={message.id} newUser={message.content} oldUser={message.username}/>;
      }
        });
      


      return (
        <main className="messages">
            {newArray}
        </main>
      )
  
}
}

export default MessageList;
