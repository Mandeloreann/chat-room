import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import '../../titles/thirdTitle.scss'
<<<<<<< HEAD

import { chatIndex } from '../../api/chat'
// import messages from '../AutoDismissAlert/messages'
=======
>>>>>>> chat_matt_s2

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
    // console.log('this is ', this)

    this.state = {
      // or should this be any empty array?
      chats: []
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  componentDidMount () {
    // After Page Loads perform Axios Index Request for Chat Resource
    const { user, msgAlert } = this.props
    chatIndex(user)
      .then(res => {
        this.setState({ chats: res.data.chats })
      })
      .then(console.log(this.state))
      .then(() => {
        msgAlert({
          heading: 'Chat Thread Refreshed',
          variant: 'success',
          message: 'Chat room has now loaded, send a message to get started.'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Chat Thread Failed to Load',
          variant: 'danger',
          message: 'Chat Error Message: ' + err.message
        })
      })
    // Initialize the Server Side Socket
    const socket = io(socketUrl, {
      reconnection: false
    })

    // define what you will be listening for here
    socket.on('connect', () => {
      console.log(socket)
<<<<<<< HEAD
    })

    // Alert Other Users this User Has Disconnected/Closed the Page
    socket.on('disconnect', () => {
      console.log(socket)
    })
    // listen for messages and update the chat index when one is received
=======
      socket.emit('join')
    })

    socket.on('disconnect', () => {
      console.log(socket)
    })
>>>>>>> chat_matt_s2
    // socket.on('message', data => {
    //   this.setState({
    //     chats: data
    //   })
    // })
  }

<<<<<<< HEAD
=======
  // console.log(socket)
  // define what you will be listening for here
>>>>>>> chat_matt_s2
  render () {
    // let chats
    // if (!this.state.chats) {
    //   chats = 'Loading...'
    // } else if (this.state.chats.length === 0) {
    //   chats = 'Chat Room Contains No Messages, Send One To Start The Conversations'
    // } else {
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
<<<<<<< HEAD
        <h4>Chats</h4>
        <ul>
          {chats}
        </ul>
        <button type="submit" className="sendMessageButton"></button>
        <textarea className="typeMessage" type="text" name="chat[text]" placeholder="Type Your Message Here"></textarea>
        <output type="text" name="chat[text]" className="sentMessage"></output>
        <p className="profile">MISC</p>
=======
        <div>
          <h4>Chats</h4>
          <ul>
            {chats}
          </ul>
          <button type="submit" className="sendMessageButton"></button>
          <textarea className="typeMessage" type="text" name="chat[text]" placeholder="Type Your Message Here"></textarea>
          <output type="text" name="chat[text]" className="sentMessage"></output>
          <p className="profile">MISC</p>
        </div>
>>>>>>> chat_matt_s2
      </Fragment>
    )
  }
}

export default Chats
