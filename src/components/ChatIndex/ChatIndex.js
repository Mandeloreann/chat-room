import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import messages from '../AutoDismissAlert/messages'
// import socket.io to establish socket connection with server
import io from 'socket.io-client'

import { chatIndex, createMessage } from '../../api/chat'

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
      chats: [],
      chat: {
        text: '',
        createdId: null,
        owner: null
      }
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
      .catch(errmessage => {
        msgAlert({
          heading: 'Chat Thread Failed to Load',
          variant: 'danger',
          message: 'Chat Error Message: ' + errmessage
        })
      })
      // Initialize the Server Side Socket
    const socket = io(socketUrl, {
      reconnection: false
    })
    console.log(socket)
    // define what you will be listening for here
    socket.on('connect', () => {
      console.log(socket)
      socket.emit('join')
    })
    // Alert Other Users this User Has Disconnected/Closed the Page
    socket.on('disconnect', () => {
      console.log(socket)
    })
    // listen for messages and update the chat index when one is received
    // socket.on('message', data => {
    //   this.setState({
    //     chats: data
    //   })
    // })
  }
  handleInputChange = (event) => {
    event.persist()
    this.setState(prevState => {
      const updatedField = {
        [event.target.name]: event.target.value
      }
      const updatedData = Object.assign({}, prevState.chat, updatedField)
      return { chat: updatedData }
    })
  }
  onCreateMessage = (event) => {
    event.preventDefault()
    const { msgAlert } = this.props
    console.log('this is ', this)
    const { user } = this.props
    createMessage(this.state, user)
      .then(response => {
        this.setState({ createdId: response.data.chat._id })
      })
      .then(() => msgAlert({
        heading: 'Sent!',
        message: messages.createMessageSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ text: '' })
        msgAlert({
          heading: 'Message failed ' + error.message,
          message: messages.createMessageFailure,
          variant: 'danger'
        })
      })
  }
  // Begin New Message Component, may be moved to it's own page
  handleInputChange = (event) => {
    event.persist()
    this.setState(prevState => {
      const updatedField = {
        [event.target.name]: event.target.value
      }
      const updatedData = Object.assign({}, prevState.chat, updatedField)
      return { chat: updatedData }
    })
  }
  render () {
    const chats = this.state.chats.map(chat => (
      <li key={chat._id}>
        <Link to={`/chats/${chat._id}`}>{chat.title}</Link>
      </li>
    ))

    return (
      <div>
        <ul className="chatList">
          {chats}
        </ul>
      </div>
    )
  }
}

export default Chats
