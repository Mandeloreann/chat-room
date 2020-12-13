import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
// import Navbar from 'react-bootstrap/Navbar'
import messages from '../AutoDismissAlert/messages'
// import socket.io to establish socket connection with server
import io from 'socket.io-client'

import { chatIndex, createMessage, chatDelete } from '../../api/chat'

import '../../pages/thirdPage.scss'

// const channelStyle = {
//   outline: 'none'
// }

let socketUrl
const socketUrls = {
  production: 'wss://aqueous-atoll-85096.herokuapp.com',
  development: 'ws://localhost:4741'
}
// const socket = io(socketUrl, {
//   // reconnection: false
// })
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
        update: ''
      }
    }
  }

  // what is this section? Isn't it repeated below
  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })
  componentDidMount () {
    // After Page Loads perform Axios Index Request for Chat Resource
    const { user, msgAlert } = this.props
    chatIndex(user)
      .then(res => {
        // console.log(res)
        this.setState({ chats: res.data.chats })
      })
      // .then(console.log(this.state))
      // .then(() => {
      //   msgAlert({
      //     heading: 'Chat Thread Refreshed',
      //     variant: 'success',
      //     message: 'Chat room has now loaded, send a message to get started.'
      //   })
      // })
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
      // console.log(socket)
      socket.emit('join')
    })
    // Alert Other Users this User Has Disconnected/Closed the Page
    socket.on('disconnect', () => {
      // console.log(socket)
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
    // console.log(event)
    // console.log(event.target.value)
    this.setState(prevState => {
      const updatedField = {
        [event.target.name]: event.target.value
      }
      const updatedData = Object.assign({}, prevState.chat, updatedField)
      // console.log({ chat: updatedData })
      return { chat: updatedData }
    })
  }

  onCreateMessage = (event) => {
    event.preventDefault()
    const { msgAlert } = this.props
    // console.log('this is ', this)
    const { user } = this.props
    // console.log(this.state)
    createMessage(this.state.chat, user)
      .then(response => {
        // console.log('this is the rep ' + response)
        // console.log('this is the rep data ' + response.data.chat)
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
      // Next make form clear on submit
      .catch(error => {
        this.setState({ text: '' })
        msgAlert({
          heading: 'Message failed ' + error.message,
          message: messages.createMessageFailure,
          variant: 'danger'
        })
      })
  }

  onMessageDelete = (event) => {
    event.preventDefault()
    const chatId = event.target.name

    chatDelete(this.props.user, chatId)
      .then(() => {
        this.setState({ text: '' })
        this.props.msgAlert({
          heading: 'Message Deleted!',
          message: messages.deleteMessageSuccess,
          variant: 'success'
        })
      })
      .catch(error => {
        this.props.msgAlert({
          heading: 'You are not the owner of this message ' + error.message,
          message: messages.deleteMessageFailure,
          variant: 'danger'
        })
      })
  }

  // onChangeColor () {
  //   const color = document.getElementById('InputText').value
  //   document.body.style.backgroundColor = color
  // }

  render () {
    const chats = this.state.chats.map(chat => (
      <li key={chat._id}>
        <p className='chatTextStyle'>{chat.text}</p>
        <button name={chat._id} onClick={this.onMessageDelete}>Delete</button>
        <Link to={'/update/' + chat._id}>edit</Link>
      </li>
    ))

    // const changeColor = (
    //   <input type="text" id="InputText">
    //     <input type="color" id="InputColor">
    //       <input type="button" id="colorButton" value="select color" onClick="changeColor()">
    //       </input>
    //     </input>
    //   </input>
    // )
    return (
      <div>
        <p
          className="channels">
          CHANNELS
          {/* <button type="button" className="channel1" style={channelStyle}>English1</button> */}
          {/* <button type="button" className="channel2">English2</button>
          <button type="button" className="channel3">Spanish1</button>
          <button type="button" className="channel4">Spanish2</button>
          <button type="button" className="channel5">Japanese1</button>
          <button type="button" className="channel6">Japanese2</button> */}
        </p>
        <form onSubmit={this.onCreateMessage} className="typeMessageForm">
          <div className="chat">
            <textarea
              className="typeMessage"
              placeholder="Type A Message Here"
              name="text"
              value={this.state.chat.text}
              onChange={this.handleInputChange}
            />
            <button type="submit" className="sendMessageButton"></button>
            <output type="text" name="chat[text]" className="sentMessage">
              <ul className="chatArray">
                {chats}
                {/* {changeColor} */}
              </ul>
            </output>
          </div>
        </form>
      </div>
    )
  }
}
export default withRouter(Chats)
