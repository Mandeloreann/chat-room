import React from 'react'
import Alert from 'react-bootstrap/Alert'

import './AutoDismissAlert.scss'

class AutoDismissAlert extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: true
    }
    this.timeout = null
  }

  componentDidMount () {
    this.timeout = setTimeout(() => {
      this.handleClose()
    }, 5000)
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  handleClose = () => this.setState({ show: false })

  render () {
    const { variant, heading, message, deleteAlert, id } = this.props

    // Delete this alert after the fade animation time (300 ms by default)
    if (!this.state.show) {
      setTimeout(() => {
        deleteAlert(id)
      }, 300)
    }

    return (
      <Alert
        dismissible
        show={this.state.show}
        variant={variant}
        onClose={this.handleClose}
      >
        <div className="container">
          <Alert.Heading>
            {heading}
          </Alert.Heading>
          <p className="alert-body">{message}</p>
        </div>
      </Alert>
    )
  }
}

export default AutoDismissAlert
