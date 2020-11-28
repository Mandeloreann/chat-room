import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../apiConfig'

class Chats extends Component {
  constructor (props) {
    super(props)

    this.state = {
      chats: []
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/`)
      .then(res => this.setState({ chats: res.data.chats }))
      .catch(console.error)
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
      </div>
    )
  }
}

export default Chats
