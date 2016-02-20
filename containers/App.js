import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit,
        createPrescription, editPrescription, deletePrescription,
        createContact, editContact, deleteContact} from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import Navigation from '../components/Navigation'
import PrescriptionForm from '../containers/PrescriptionForm'
import ContactForm from './ContactForm'
import Splash from '../components/Splash'
import { Panel, Grid, Row, Col } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handlePrescriptionForm = this.handlePrescriptionForm.bind(this)
    this.handleContactForm = this.handleContactForm.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedReddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch, selectedReddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedReddit))
    }
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
            <Panel header="Create Reminders" bsStyle="info">

              <PrescriptionForm callback={this.handlePrescriptionForm} />
              <ContactForm callback={this.handleContactForm} />
            </Panel>
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
