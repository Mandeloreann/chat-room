import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
// import ChatCreate from '../src/components/ChatCreate/ChatCreate'
import ChatIndex from './components/ChatIndex/ChatIndex'
import FirstPage from './pages/firstPage'
import SecondPage from './pages/secondPage'
// import ThirdPage from './pages/thirdPage'
// import ThirdTitle from './titles/thirdTitle'
import colorPicker from './settings/colorPicker'
// import English from './components/Channels/English'
// import channelChats from './components/Channels/chats'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route exact path="/" component={FirstPage} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          { /* ChatIndex will render a list of all chats within the server's chat array and requires the user to be logged in */ }

          <AuthenticatedRoute user={user} path='/chats' render={() => (
            <div>
              <ChatIndex msgAlert={this.msgAlert} user={user} />
              {/* <ChatCreate msgAlert={this.msgAlert} user={user} /> */}
            </div>
          )} />
        </main>
        <Route exact path="/channels" component={SecondPage} />
        <Route exact path="/settings" component={colorPicker} />
        {/* <Route exact path="/chats" component={ThirdPage} /> */}
      </Fragment>
    )
  }
}

export default App
