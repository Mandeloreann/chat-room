import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { channelIndex, createChannel, channelDelete, channelUpdate } from '../../api/channel'

const createChannelStyle = {
  color: 'red'
}

export class Channels extends Component {
  constructor (props) {
    super(props)
    this.state = {
      channels: [],
      channel: {
        name: ''
      }
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })
  componentDidMount () {
    const { user } = this.props
    channelIndex(user)
      .then(res => {
        this.setState({ channels: res.data.channels })
      })
  }
    handleInputChange = (event) => {
      event.persist()
      this.setState(prevState => {
        const updatedField = {
          [event.target.name]: event.target.value
        }
        const updatedData = Object.assign({}, prevState.channel, updatedField)
        return { channel: updatedData }
      })
    }

    onChannelCreate = (event) => {
      event.preventDefault()

      const { msgAlert, user, history } = this.props
      createChannel(this.state.channel, user)
        .then(response => {
          this.setState({
            createdId: response.data._id
          })
        })
        .then(() => history.push('/chats'))
        .then(() => msgAlert({
          heading: 'Channel Created',
          message: messages.createChannelSuccess,
          variant: 'success'
        }))
        .catch(error => {
          this.setState({ text: '' })
          msgAlert({
            heading: 'Channel Creation Failed ' + error.message,
            message: messages.createChannelFailure,
            variant: 'danger'
          })
        })
    }

    updateChannel = (event) => {
      event.preventDefault()
      const channelId = event.target.name
      const updateChannelData = this.state.channel.uData
      channelUpdate(this.props.user, channelId, updateChannelData)
        .then(() => {
          this.setState({ text: '' })
          this.props.msgAlert({
            heading: 'Channel Updated!',
            message: messages.updateMessageSuccess,
            variant: 'success'
          })
        })
        .catch(error => {
          this.props.msgAlert({
            heading: 'Channel update failed ' + error.message,
            message: messages.updateMessageFailure,
            variant: 'danger'
          })
        })
    }

    handleChannelUpdate = (event) => {
      event.persist()
      this.setState(prevState => {
        const uField = {
          'text': event.target.value
        }
        const uData = Object.assign({}, prevState.channel, uField)
        return { chat: uData }
      })
    }

    onChannelDelete = (event) => {
      event.preventDefault()
      const channelId = event.target.name

      channelDelete(this.props.user, channelId)
        .then(() => {
          this.setState({ text: '' })
          this.props.msgAlert({
            heading: 'Channel Deleted!',
            message: messages.deleteChannelSuccess,
            variant: 'success'
          })
        })
        .catch(error => {
          this.props.msgAlert({
            heading: 'Channel delete failed ' + error.message,
            message: messages.deleteChannelFailure,
            variant: 'danger'
          })
        })
    }

    render () {
      const channels = this.state.channels.map(channel => (
        <li key={channel._id}>
          <Link to={`/channelCreator/${channel._id}`}>{channel.title}</Link>
          <button name={channel._id} onClick={this.onChannelDelete}>Delete</button>
          <textarea placeholder='update channel' type='text' name='update' value={this.state.channel.updateData} onChange={this.handleChannelUpdate}/>
          <button name={channel._id} type='submit' onSubmit={this.updateChannel}>Update</button>
        </li>
      ))
      return (
        <div className="row">
          <Link to="/chats" className="backButton">Back</Link>
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h3 className="createChannelStyle" style={createChannelStyle}>Create a Channel</h3>
            <Form onSubmit={this.onChannelCreate}>
              <Form.Group controlId="name">
                <Form.Control
                  required
                  type="text"
                  name="name"
                  placeholder="Enter Your Channels Name"
                  value={this.state.channel.name}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
              <p className="createdChannelText">
                {channels}
              </p>
            </Form>
          </div>
        </div>
      )
    }
}

export default (
  withRouter(Channels)
)
