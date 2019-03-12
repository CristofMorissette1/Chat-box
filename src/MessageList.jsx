import React, {Component} from "react";
import Message from "./Message.jsx";
import Notification from "./notification.jsx"

class MessageList extends Component {
  render() {
    let newArray = this.props.messages.map((message) => {
    return <Message key={message.id} message={message.content} username={message.username}/> })
      return (
        <main className="messages">
            {newArray}
            <Notification />
        </main>
      )
  }
}

export default MessageList;
