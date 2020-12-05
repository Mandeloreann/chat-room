import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { channelIndex, createChannel } from '../../api/channel'

const createChannelStyle = {
  color: 'red'
}

class Channels extends Component {
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
    const { user, msgAlert } = this.props
    channelIndex(user)
      .then(res => {
        this.setState({ channels: res.data.channels })
      })
      .then(() => {
        msgAlert({
          heading: 'Created a channel successfully',
          variant: 'success',
          message: 'Create your channel.'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'you have failed to create the channel',
          variant: 'danger',
          message: 'Channel Error Message: ' + err.message
        })
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

      const { msgAlert } = this.props
      const { user } = this.props
      createChannel(this.state.channel, user)
        .then(response => {
          this.setState({
            createdId: response.data._id
          })
        })
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
    render () {
      const channels = this.state.channels.map(channel => (
        <li key={channel._id}>
          <Link to={`/channelCreator/${channel._id}`}>{channel.title}</Link>
          {/* <button onClick={this.channelDelete}>Delete </button> */}
          <Link to={'/channel-update/' + channel._id}>Update Channel </Link>
          <Link to={`/channelCreator/${channel._id}`}>{channel.name}</Link>
        </li>
      ))
      return (
        <div className="row">
          <Link to="/chats" className="backButton">Back</Link>
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h3 className="createChannelStyle" style={createChannelStyle}>Create A Channel</h3>
            <Form onSubmit={this.onChannelCreate}>
              <Form.Group controlId="name">
                <Form.Label className="createChannelStyle" style={createChannelStyle}>Name of Channel</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="text"
                  placeholder="Enter Your Channels Name"
                  value={this.state.channel.name}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
              <p>
                {channels}
              </p>
            </Form>
          </div>
        </div>
      )
      //   <div>
      //     <p>Creating A Channel
      //       <form onSubmit={this.onChannelCreate} className="channelCreateForm">
      //         <input
      //           type="text"
      //           name="text"
      //           value={this.state.channel.name}
      //           onChange={this.handleInputChange}
      //           placeholder="Your Channels Name">{channels}</input>
      //       </form>
      //     </p>
      //   </div>
      // )
    }
}

export default Channels
