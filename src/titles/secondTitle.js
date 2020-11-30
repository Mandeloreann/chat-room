import React from 'react'
// import React, { Fragment, useState } from 'react'
// import ReactDOM from 'react-dom'
// import Modal, { Button } from 'react-modal'

import './secondTitle.scss'

const channel = () => (
  <div>
    <p className="secondTitle">Pick a channel</p>
    <button type="button" className="DefaultChannelButton">English 1</button>
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

export default channel
