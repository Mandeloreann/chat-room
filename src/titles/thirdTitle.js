import React, { Fragment } from 'react'

import './thirdTitle.scss'

const chat = () => (
  <Fragment>
    <p className="channels">CHANNELS</p>
    <p
      className="chat">
      THE CHAT
      <button type="submit" className="sendMessage"></button>
      <input type="text" name="chat[text]" placeholder="Type Your Message Here" className="typeMessage"></input>
    </p>
    <p className="profile">3RD BOX FOR PROFILE</p>
  </Fragment>
)

export default chat
