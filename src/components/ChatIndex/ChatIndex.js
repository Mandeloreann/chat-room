import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { createMessage } from '../../api/chat'
import messages from '../AutoDismissAlert/messages'

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
    const socket = io(socketUrl, {
      reconnection: false
    })
    console.log(socket)
    // define what you will be listening for here
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

  render () {
    const chats = this.state.chats.map(chat => (
      <li key={chat._id}>
        <Link to={`/chats/${chat._id}`}>{chat.title}</Link>
      </li>
    ))

    return (
      <div>
        <h4>Chats</h4>
        <ul>
          {chats}
        </ul>
        <div>
          <h1>(username)</h1>
          <form onSubmit={this.onCreateMessage}>
            <input
              placeholder="chat away..."
              name="text"
              value={this.state.chat.text}
              onChange={this.handleInputChange}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Chats
