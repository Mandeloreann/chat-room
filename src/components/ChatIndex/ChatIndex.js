import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// import socket.io to establish socket connection with server
import io from 'socket.io-client'
// import ThirdTitle from '../../titles/thirdTitle'

import messages from '../../components/AutoDismissAlert/messages'
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

    createMessage(this.state)
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

  onCreateMessage = (event) => {
    event.preventDefault()

    const { msgAlert } = this.props

    createMessage(this.state)
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
        <ul>
          {chats}
        </ul>
        {/* <ThirdTitle /> */}
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
      </div>
    )
  }
}

export default Chats
