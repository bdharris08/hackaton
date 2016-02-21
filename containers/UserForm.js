//UserForm.js
//container form for entering prescription info

import React, { Component, PropTypes } from 'react'
import { Button, Input, ButtonInput, Modal } from 'react-bootstrap'

export default class UserForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)
    this.state = {showModal: false};
  }

  closeModal() {
    this.setState({showModal: false})
  }

  openModal() {
    console.log("openmodal")
    this.setState({showModal: true})
  }

  handleSubmit() {
    //onsole.log(this.refs.name.getValue())
    let name = (typeof this.refs.name !== undefined ? this.refs.name.getValue() : "")
    let phone = (typeof this.refs.phone !== undefined ? this.refs.phone.getValue() : 0)
    this.setState({showModal: false})
    this.props.callback(name, phone)
  }

  render() {


    return (
      <div>
        <Button bsStyle="primary" onClick={this.openModal}>Log in</Button>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
              type="text"
              //value={this.state.value}
              placeholder="Enter text"
              //help="Enter a nam."
              //bsStyle={this.validationState()}
              hasFeedback
              ref="name"
              groupClassName="group-class"
              labelClassName="label-class"
              //onChange={this.handleChange} 
              label="User Name"/>


            <Input
              type="text"
              //value={this.state.value}
              placeholder="Enter a number"
              //help="Enter a number."
              //bsStyle={this.validationState()}
              hasFeedback
              ref="phone"
              groupClassName="group-class"
              labelClassName="label-class"
              //onChange={this.handleChange} 
              label="Phone Number" />

            <ButtonInput bsStyle="primary" type="submit" value="Log in"
              onClick={this.handleSubmit}/>

          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

UserForm.propTypes = {
  callback: PropTypes.func.isRequired
}
