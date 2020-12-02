import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// import socket.io to establish socket connection with server
import io from 'socket.io-client'
// import ThirdTitle from '../../titles/thirdTitle'

<<<<<<< HEAD
import messages from '../../components/AutoDismissAlert/messages'
=======
import messages from '../AutoDismissAlert/messages'
>>>>>>> 36bb0e0... (hopefully nothing breaks) merging into dev
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
        text: ''
      }
    }
  }

  componentDidMount () {
    // After Page Loads perform Axios Index Request for Chat Resource
    const { user, msgAlert } = this.props
    chatIndex(user)
      .then(res => {
        this.setState({ chats: res.data.chats })
      })
      // .then(console.log(this.state))
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
    // console.log('this is ', this)
    const { user } = this.props
    createMessage(this.state, user)
      .then(response => {
        // console.log('response.data.chat.owner is ', response.data.chat.owner)
        this.setState({
          createdId: response.data._id
          // owner: response.data.chat.owner
        })
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
