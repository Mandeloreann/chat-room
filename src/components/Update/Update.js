import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import { updateMessage } from '../../api/chat' <-- add when available in api
import messages from '../AutoDismissAlert/messages'
import io from 'socket.io-client'

import Form from 'react-bootstrap/Form'
// maybe add a socketURL config file to lessen copy/pasting
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
class UpdateChat extends Component {
  constructor () {
    super()
    this.state = {}
  }
  componentDidMount () {
    const socket = io(socketUrl, {
      reconnection: false // don't keep trying to connect
    })
    console.log(socket)
  }
  onUpdateChat = event => {
    event.preventDefault()
    // const { msgAlert, history, chat } = this.props <-- use when need arises
    const { msgAlert } = this.props
    // updateMessage(this.state, chat) <-- add when available in api
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
