import React, {Component} from 'react';


class Chatbar extends Component {
    render() {
    return (
        <footer className="chatbar">
        <input className="chatbar-username" onKeyUp={this.props.changeCurrentUser}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.props.newMessage}/>

      </footer>
    )
}
}

export default Chatbar