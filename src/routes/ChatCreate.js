import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../apiConfig'

class ChatCreate extends Component {
  constructor () {
    super()
    this.state = {
      chat: {
        text: ''
      },
      createdId: null
    }
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

  handleSubmit = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/chats`,
      method: 'post',
      data: { chat: this.state.chat }
    })
      .then(response => {
        this.setState({ createdId: response.data.chat._id })
      })
      .catch(console.error)
  }

  render () {
    // if (this.state.createdId) {
    //   return <Redirect to={`/chats/${this.state.createdId}`}/>
    // }

    return (
      <div>
        <h1>Chat</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="chat away..."
            name="text"
            value={this.state.chat.text}
            onChange={this.handleInputChange}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }
}

export default ChatCreate
