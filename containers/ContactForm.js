//ContactForm.js
//container form for entering prescription info

import React, { Component, PropTypes } from 'react'
import { Button, Input, ButtonInput, Modal, DropdownButton, MenuItem } from 'react-bootstrap'

export default class ContactForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)
    this.handleDropDown = this.handleDropDown.bind(this)
    this.state = {
      showModal: false,
      relationship: "Relationship"
    };
  }

  closeModal() {
    this.setState({showModal: false, relationship: "Relationship"})
  }

  openModal() {
    //console.log("openmodal")
    this.setState({showModal: true})
  }

  handleDropDown(event, eventKey) {
    this.setState({relationship:eventKey})
  }


  handleSubmit() {
    let contactname = (typeof this.refs.contactname !== undefined ? this.refs.contactname.getValue() : "")
    let phone = (typeof this.refs.phone !== undefined ? this.refs.phone.getValue() : 0)
    let email = (typeof this.refs.email !== undefined ? this.refs.email.getValue() : [])
    this.closeModal()
    this.props.callback(contactname, phone, email, this.state.relationship)
  }

  render() {


    return (
      <div>
        <Button bsStyle="primary" onClick={this.openModal}>New Contact</Button>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>New Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
              type="text"
              //value={this.state.value}
              placeholder="Enter text"
              //help="Enter a nam."
              //bsStyle={this.validationState()}
              hasFeedback
              ref="contactname"
              groupClassName="group-class"
              labelClassName="label-class"
              //onChange={this.handleChange} 
              label="Contact Name"/>

            <Input
              type="text"
              //value={this.state.value}
              placeholder="Enter text"
              help="Enter phone number like (###) ###-####"
              //bsStyle={this.validationState()}
              hasFeedback
              ref="phone"
              groupClassName="group-class"
              labelClassName="label-class"
              //onChange={this.handleChange} 
              label="Phone Number" />

            <Input
              type="text"
              //value={this.state.value}
              placeholder="Enter text"
              help="Enter email like asdf@gmail.com"
              //bsStyle={this.validationState()}
              hasFeedback
              ref="email"
              groupClassName="group-class"
              labelClassName="label-class"
              //onChange={this.handleChange} 
              label="Email" />

            <DropdownButton 
              bsStyle="default" 
              title={this.state.relationship} 
              id="relationship-dropdown"
              onSelect={this.handleDropDown}>
              <MenuItem eventKey="Housemate">Housemate</MenuItem>
              <MenuItem eventKey="Family">Family</MenuItem>
              <MenuItem eventKey="Care Giver">Care Giver</MenuItem>
              <MenuItem eventKey="Doctor">Doctor</MenuItem>
              <MenuItem eventKey="Emergency">Emergency</MenuItem>
            </DropdownButton>

            <ButtonInput bsStyle="primary" type="submit" value="Add Contact"
              onClick={this.handleSubmit}/>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

ContactForm.propTypes = {
  callback: PropTypes.func.isRequired
}
