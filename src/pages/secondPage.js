import React from 'react'
import { Link } from 'react-router-dom'
// import React, { Fragment, useState } from 'react'
// import ReactDOM from 'react-dom'
// import Modal, { Button } from 'react-modal'

import './secondPage.scss'

const SecondPage = () => (
  <div>
    <p className="secondPage">Pick a channel</p>
    <Link to="/chats" className="DefaultChannel1">English 1</Link>
  </div>
)

// modals are to complicated in react do later
// const Example = () => {
//   const [show, setShow] = useState(false)

//   const handleClose = () => setShow(false)
//   const handleShow = () => setShow(true)

//   return (
//     <Fragment>
//       <Button variant="primary" onClick={handleShow}>
//         Launch demo modal
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Woohoo, you&apos;re reading this text in a modal!</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Fragment>
//   )
// }

// ReactDOM.render(<Example />)

export default SecondPage
