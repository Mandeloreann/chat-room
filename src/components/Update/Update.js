import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
// import { updateMessage } from '../../api/chat' <-- add when available in api
import messages from '../AutoDismissAlert/messages'
// import io from 'socket.io-client'

import Form from 'react-bootstrap/Form'
// maybe add a socketURL config file to lessen copy/pasting
// let socketUrl
// const socketUrls = {
//   production: 'wss://aqueous-atoll-85096.herokuapp.com',
//   development: 'ws://localhost:4741'
// }

// if (window.location.hostname === 'localhost') {
//   socketUrl = socketUrls.development
// } else {
//   socketUrl = socketUrls.production
// }
class UpdateChat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chat: {
        text: '',
        owner: ''
      },
      updated: false
    }
  }
  componentDidMount () {
    // const socket = io(socketUrl, {
    //   reconnection: false // don't keep trying to connect
    // })
    // console.log(socket)
    axios(`${apiUrl}/chats/${this.props.match.params.id}`)
      .then(res => console.log(res.data.chat))
      .then(res => this.setState({ chat: res.data.chat }))
      .catch(console.error)
  }
  handleChange = event => {
    const updatedField = { [event.taget.name]: event.target.value }
    const updatedChat = Object.assign(this.state.chat, updatedField)
    this.setState({ chat: updatedChat })
    console.log(this.state.chat)
  }
  onUpdateChat = event => {
    event.preventDefault()
    // const { msgAlert, history, chat } = this.props <-- use when need arises
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/chats/${this.props.match.params.id}`,
      method: 'PATCH',
      data: { chat: this.state.chat }
    })
      .then(() => this.setState({ updated: true }))
      .then(() => msgAlert({
        heading: 'Message Updated',
        message: messages.chatUpdateSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Message Update Failed with error: ' + error.message,
          message: messages.chatUpdateFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    return (
      <div>
        <h3>Update Message</h3>
        <Form onSubmit={this.onUpdateChat}>
        </Form>
      </div>
    )
  }
}

export default withRouter(UpdateChat)
