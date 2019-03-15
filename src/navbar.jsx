import React, {Component} from "react";

class Navbar extends Component {
render() {
    return (
        
    <nav className="navbar">
        <a className="onlineUsers">User's online: {this.props.navbar}</a>
        <a href="/" className="navbar-brand">Chatty</a>
    </nav>
    )
}
}
 

export default Navbar