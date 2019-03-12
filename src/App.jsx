import React, {Component} from 'react';
// import MessageList from "./MessageList.jsx";
import Message from "./Message.jsx";
import Notification from "./notification.jsx"
import Chatbar from "./ChatBar.jsx"

class App extends Component {
  render() {
    return (
  <div>
      <nav className="navbar">
  <a href="/" className="navbar-brand">Chatty</a>
</nav>
 <Message />
 <Notification />
 <Chatbar />
  </div>
    )
  }
}
export default App;
