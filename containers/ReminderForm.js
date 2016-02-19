//ReminderForm.js
//container form for entering reminder info

import React, { Component, PropTypes } from 'react'
import { Button, Input, ButtonInput } from 'react-bootstrap'

export default class ReminderForm extends Component {


  constructor(props) {
    super(props)
    this.pname = ""
    this.doses = 0
    this.times = []
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    console.log(this.refs.name.getValue())
    let name = (typeof this.refs.name !== undefined ? this.refs.name.getValue() : "")
    let doses = (typeof this.refs.doses !== undefined ? this.refs.doses.getValue() : 0)
    let times = (typeof this.refs.times !== undefined ? this.refs.times.getValue() : [])
    this.props.callback(name, doses, times)
  }

  render() {


    return (
      <div>
        //put the form parts back in here
        //get the values that are in the inputs using GetValue() - see bootstrap
        //follow example from AddTodo - button just dispatches action with all the values

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
          label="Reminder Label"/>


        <Input
          type="text"
          //value={this.state.value}
          placeholder="Enter text"
          help="Enter a number."
          //bsStyle={this.validationState()}
          hasFeedback
          ref="doses"
          groupClassName="group-class"
          labelClassName="label-class"
          //onChange={this.handleChange} 
          label="Prescription" />

        <Input
          type="select"
          multiple
          //value={this.state.value}
          placeholder="Enter text"
          help="Hold the ctrl key to select multiple times."
          //bsStyle={this.validationState()}
          hasFeedback
          ref="times"
          groupClassName="group-class"
          labelClassName="label-class"
          //onChange={this.handleChange} 
          label="What times of day?">
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


      </div>
    )
  }
}

ReminderForm.propTypes = {
  callback: PropTypes.func.isRequired
}
