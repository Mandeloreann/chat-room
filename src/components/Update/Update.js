import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { chatUpdate } from '../../api/chat'

const UpdateChat = props => {
  const [chat, setChat] = useState({ text: '' })
  const [updated, setUpdated] = useState(false)
  const { user, msgAlert, match } = props

  const handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    setChat(oldChat => {
      const updatedChat = { ...oldChat, ...updatedField }
      return updatedChat
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    chatUpdate(user, chat, match.params.chatId)
      .then(() => setUpdated(true))
      // Instead of state + Redirect pairing, you can also use `history`
      // as long as the component is exported `withRouter` or is passed the
      // `history` prop explicitely (see the `App.js` file)
      // This object can be destructured from the `props` as well.
      // The `ChatShow` component uses this pattern for delete
      // .then(() => props.history.push('/chat-show/' + match.params.chatId))
      .then(() => msgAlert({
        heading: 'Update successful',
        message: 'Message has been edited',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Update failed',
        message: 'WhOOPs ' + err.message,
        variant: 'danger'
      }))
  }

  if (updated) {
    return (
      <Redirect to={`/chats/${match.params.id}`} />
    )
  }

  return (
    <React.Fragment>
      <h1>Update Message</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Edit Message"
          value={chat.text}
          onChange={handleChange}
          name="text"
        />
        <button type="submit">Update Chat</button>
      </form>
    </React.Fragment>
  )
}

export default UpdateChat
