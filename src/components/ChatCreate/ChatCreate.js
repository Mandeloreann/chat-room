import React, { Component, Fragment } from 'react'
// import { Redirect } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'

// import ThirdTitle from '../../titles/thirdTitle'
import './ChatCreate.scss'

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
        <form onSubmit={this.handleSubmit}>
          <p
            className="chat">
            THE CHAT
            <button type="submit" className="sendMessageButton"></button>
            <textarea className="typeMessage" type="text" name="chat[text]" placeholder="Type Your Message Here"></textarea>
            <output type="text" name="chat[text]" className="sentMessage">LOL</output>
          </p>
        </form>
        <p className="profile">MISC</p>
      </Fragment>
    )
    //  {/* <form onSubmit={this.handleSubmit}>
    //    <textarea
    //      className="typeMessage"
    //      type="text"
    //      name="chat[text]"
    //      placeholder="Type Message Here"
    //      value={this.state.chat.text}
    //      onChange={this.handleInputChange}
    //    >
    //    </textarea>
    //      <input
    //       type='text'
    //       name='text'
    //       value={this.state.chat.text}
    //       onChange={this.handleInputChange}
    //     ></input>
    //     <ThirdTitle
    //       value={this.state.chat.text}
    //       onChange={this.handleInputChange}
    //     />
    //     <output type="text" name="chat[text]" className="sentMessage"></output>
    //     <button type="submit" className="sendMessageButton"></button>
    // </form> */}
  }
}

export default ChatCreate
