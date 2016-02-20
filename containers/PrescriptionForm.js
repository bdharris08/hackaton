//PrescriptionForm.js
//container form for entering prescription info

import React, { Component, PropTypes } from 'react'
import { Button, Input, ButtonInput, Modal } from 'react-bootstrap'

export default class PrescriptionForm extends Component {

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
    console.log(this.refs.name.getValue())
    let name = (typeof this.refs.name !== undefined ? this.refs.name.getValue() : "")
    let doses = (typeof this.refs.doses !== undefined ? this.refs.doses.getValue() : 0)
    let times = (typeof this.refs.times !== undefined ? this.refs.times.getValue() : [])
    this.setState({showModal: false})
    this.props.callback(name, doses, times)
  }

  render() {


    return (
      <div>
        <Button bsStyle="primary" onClick={this.openModal}>New Prescription</Button>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>New Prescription</Modal.Title>
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
              label="Prescription Name"/>


            <Input
              type="text"
              //value={this.state.value}
              placeholder="Enter a number"
              //help="Enter a number."
              //bsStyle={this.validationState()}
              hasFeedback
              ref="doses"
              groupClassName="group-class"
              labelClassName="label-class"
              //onChange={this.handleChange} 
              label="Number of pills in the container?" />

            <Input
              type="select"
              multiple
              //value={this.state.value}
              placeholder="Enter text"
              help="Hold the ctrl key to select multiple."
              //bsStyle={this.validationState()}
              hasFeedback
              ref="times"
              groupClassName="group-class"
              labelClassName="label-class"
              //onChange={this.handleChange} 
              label="Prescription Details?">
              <option value="asNeeded">As Needed</option>
              <option value="daily">Daily</option>
              <option value="4hours">Every four hours</option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
              <option value="0000">12:00 AM</option>
              <option value="0100">1:00 AM</option>
              <option value="0200">2:00 AM</option>
              <option value="0300">3:00 AM</option>
              <option value="0400">4:00 AM</option>
              <option value="0500">5:00 AM</option>
              <option value="0600">6:00 AM</option>
              <option value="0700">7:00 AM</option>
              <option value="0800">8:00 AM</option>
              <option value="0900">9:00 AM</option>
              <option value="1000">10:00 AM</option>
              <option value="1100">11:00 AM</option>
              <option value="1200">12:00 PM</option>
              <option value="1300">1:00 PM</option>
              <option value="1400">2:00 PM</option>
              <option value="1500">3:00 PM</option>
              <option value="1600">4:00 PM</option>
              <option value="1700">5:00 PM</option>
              <option value="1800">6:00 PM</option>
              <option value="1900">7:00 PM</option>
              <option value="2000">8:00 PM</option>
              <option value="2100">9:00 PM</option>
              <option value="2200">10:00 PM</option>
              <option value="2300">11:00 PM</option>
            </Input>

            <ButtonInput bsStyle="primary" type="submit" value="Add Prescription"
              onClick={this.handleSubmit}/>

          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

PrescriptionForm.propTypes = {
  callback: PropTypes.func.isRequired
}
