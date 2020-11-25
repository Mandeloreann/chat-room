import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import { updateMessage } from '../../api/chat' <-- add when available in api
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
class UpdateMessage extends Component {
  constructor () {
    super()
    this.state = {}
  }
  onUpdateMessage = event => {
    event.preventDefault()
    // const { msgAlert, history, chat } = this.props <-- use when need arises
    const { msgAlert } = this.props
    // updateMessage(this.state, chat) <-- add when available in api
      .then(() => msgAlert({
        heading: 'Message Updated',
        message: messages.messageUpdateSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Message Update Failed with error: ' + error.message,
          message: messages.messageUpdateFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    return (
      <div>
        <h3>Update Message</h3>
        <Form onSubmit={this.onUpdateMessage}>
        </Form>
      </div>
    )
  }
}

export default withRouter(UpdateMessage)
