import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { showChats, chatDelete } from '../../api/chat'

const ChatShow = (props) => {
  // const [loading, setLoading] = useState(true)
  const [chat, setChat] = useState(null)
  const { user, msgAlert, match, history } = props

  // useEffect for componentDidMount
  // Load the chat to show
  useEffect(() => {
    // runs just once on mount :)
    // const { id } = props.match.params

    showChats(user, match.params.chatId)
      .then(res => {
        console.log(res)
        setChat(res.data.chat)
      })
      .then(() => {
        msgAlert({
          heading: 'Show Chat Success',
          message: 'See the chat there!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Show Chat Failed :(',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  const handleDelete = () => {
    chatDelete(user, match.params.chatId)
      .then(() => {
        msgAlert({
          heading: 'Chat Deleted',
          message: 'Back to the list of chats that exist',
          variant: 'success'
        })
      })
      .then(() => history.push('/chats'))
      .catch(err => {
        msgAlert({
          heading: 'Deletion Failed',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  // If loading (chat is null), print 'Loading...'
  return (
    <div>
      {chat ? (
        <div>
          <h2>{chat.text}</h2>
          <button onClick={handleDelete}>Delete</button>
          <Link to={'/chat-update/' + chat._id}>Update Chat</Link>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(ChatShow)
