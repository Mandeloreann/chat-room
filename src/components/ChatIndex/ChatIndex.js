import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// import socket.io to establish socket connection with server
import io from 'socket.io-client'

let socketUrl
const socketUrls = {
  production: 'wss://aqueous-atoll-85096.herokuapp.com',
  development: 'ws://localhost:4741'
}

if (window.location.hostname === 'localhost') {
  socketUrl = socketUrls.development
} else {
  socketUrl = socketUrls.production
}

class Chats extends Component {
  constructor (props) {
    super(props)

    this.state = {
      chats: []
    }
  }

  componentDidMount () {
    const socket = io(socketUrl, {
      reconnection: false
    })
    console.log(socket)
    // define what you will be listening for here
  }
  render () {
    const chats = this.state.chats.map(chat => (
      <li key={chat._id}>
        <Link to={`/chats/${chat._id}`}>{chat.title}</Link>
      </li>
    ))

    return (
      <div>
        <ul>
          {chats}
        </ul>
      </div>
    )
  }
}

export default Chats
