import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit,
        createPrescription, editPrescription, deletePrescription,
        submitPrescription, postPrescription, receiveResponse, 
        createContact, editContact, deleteContact } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import Navigation from '../components/Navigation'
import PrescriptionForm from '../containers/PrescriptionForm'
import ContactForm from './ContactForm'
import Splash from '../components/Splash'
import { Panel, PanelGroup, Grid, Row, Col, Button } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handlePrescriptionForm = this.handlePrescriptionForm.bind(this)
    this.handleContactForm = this.handleContactForm.bind(this)
  }

  componentDidMount() {
    //const { dispatch, selectedReddit } = this.props
    //dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  componentWillReceiveProps(nextProps) {
    //if (nextProps.selectedReddit !== this.props.selectedReddit) {
     // const { dispatch, selectedReddit } = nextProps
     // dispatch(fetchPostsIfNeeded(selectedReddit))
    //}
  }

  handlePrescriptionForm(name, doses, times) {
    const newPrescription = {
      Name: name,
      NumOfDoses: doses, 
      DoseTimes: times,
      Frequency: times.length,
      Duration: (doses / times.length), 
      PillsTaken: 0,
      Active: "True", 
      OnTrack: "True"
    }
    this.props.dispatch(createPrescription(newPrescription))
    this.handlePostPrescription(newPrescription)
  }

  handleContactForm(contactname, phone, email, relationship) {
    const newContact = {
      Contact: contactname,
      Phone: phone,
      Email: email,
      Relationship: relationship,
      Active: "True"
    }
    this.props.dispatch(createContact(newContact))
  }

  handleChange(nextReddit) {
    this.props.dispatch(selectReddit(nextReddit))
  }

  handlePostPrescription(prescription) {
    console.log(prescription)
    this.props.dispatch(postPrescription(prescription))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedReddit } = this.props
    dispatch(invalidateReddit(selectedReddit))
    dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  render() {
    return (
      <Grid>
        <Row>

        </Row>
        <div>
          <div>
            <Navigation />
          </div>
          <div>
            <Splash visible={true} />
          </div>
          <div>
            <PanelGroup defaultActiveKey="1" accordian>
              <Panel header="Set up account" bsStyle="info" eventKey="1">

              </Panel>
              <Panel header="Add prescriptions" bsStyle="info" eventKey="2">
                <PrescriptionForm callback={this.handlePrescriptionForm} />
              </Panel>
              <Panel header="Add contacts" bsStyle="info" eventKey="3">
                <ContactForm callback={this.handleContactForm} />
              </Panel>
            </PanelGroup>
            <Button bsStyle="primary" onClick={this.openModal}>New Contact</Button>
          </div>
        </div>
      </Grid>
      )
  }

 /* render() {
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
        <Picker value={selectedReddit}
                onChange={this.handleChange}
                options={[ 'reactjs', 'frontend' ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
        }
      </div>
    )
  }*/
}

App.propTypes = {
  selectedReddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedReddit, postsByReddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
