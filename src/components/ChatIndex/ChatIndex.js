import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import '../../titles/thirdTitle.scss'

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

    // define what you will be listening for here
    socket.on('connect', () => {
      console.log(socket)
      socket.emit('join')
    })

    socket.on('disconnect', () => {
      console.log(socket)
    })
    // socket.on('message', data => {
    //   this.setState({
    //     chats: data
    //   })
    // })
  }

  render () {
    const chats = this.state.chats.map(chat => (
      <li key={chat._id}>
        <Link to={`/chats/${chat._id}`}>{chat.title}</Link>
      </li>
    ))

    return (
      <Fragment>
        <p
          className="channels">
          CHANNELS
          <button type="button" className="channel1">English1</button>
          <button type="button" className="channel2">English2</button>
          <button type="button" className="channel3">Spanish1</button>
          <button type="button" className="channel4">Spanish2</button>
          <button type="button" className="channel5">Japanese1</button>
          <button type="button" className="channel6">Japanese2</button>
        </p>
        <h4>Chats</h4>
        <ul>
          {chats}
        </ul>
        <button type="submit" className="sendMessageButton"></button>
        <textarea className="typeMessage" type="text" name="chat[text]" placeholder="Type Your Message Here"></textarea>
        <output type="text" name="chat[text]" className="sentMessage"></output>
        <p className="profile">MISC</p>
      </Fragment>
    )
  }
}

export default Chats
