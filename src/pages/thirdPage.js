import React, { Fragment } from 'react'

import './thirdPage.scss'

const ThirdPage = () => (
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
    <p
      className="chat">
      THE CHAT
      <button type="submit" className="sendMessageButton"></button>
      <textarea className="typeMessage" type="text" name="chat[text]" placeholder="Type Your Message Here"></textarea>
      <output type="text" name="chat[text]" className="sentMessage"></output>
    </p>
    <p className="profile">MISC</p>
  </Fragment>
)

export default ThirdPage
