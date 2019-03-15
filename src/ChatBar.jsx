import React, {Component} from 'react';


class Chatbar extends Component {
    render() {
    return (
        <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your name (optional)" onKeyUp={this.props.newUser}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.props.newMessage}/>

      </footer>
    )
}
}

export default Chatbar