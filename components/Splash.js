import React, { Component, PropTypes } from 'react'
import { Button, Jumbotron, Image, Panel, Row, Col } from 'react-bootstrap'

export default class Splash extends Component {

  render() {
    return (
      <Jumbotron>
        <Row>
          <Col>
            <h1> Pillosophy </h1>
          </Col>
          <Col>
            <h4> Remember your medication</h4>
          </Col>
        </Row>
      </Jumbotron>
    )
  }

}

Splash.propTypes = {
  visible: PropTypes.bool.isRequired
}

//<Image 
 //         src="http://authoritynutrition.com/wp-content/uploads/2015/01/cup-of-coffee-and-pills.jpg" 
  //        responsive />