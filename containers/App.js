import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import Splash from '../components/Splash'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
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
        <div>
          <div>
            <Splash />
          </div>
          <div>
            <h1>Phil-osophy</h1> 

              <ul> 
                <li>Register Pills</li>
                <li>View Schedule</li>
                <li>Create Schedule</li>
                <li>Add Alerts</li>
              </ul> 

              <h3>Questions</h3> 
              <ul> 
                <li>Feature for traveling</li> 
              </ul>

              <h2>Add Perscription</h2>
              <ul> 
<<<<<<< HEAD
                <li>Associated medication</li> 
                <li>Time since taken medication</li> 
=======
                    <li>Perscription Type</li> 
                    <li>Frequency</li> 
                    <li>Num of Pills</li>
                    <li>Urgency/Alerts</li> 
              </ul> 

              <h2>View Sechdule</h2> 
              <ul>
                  <li>Show sechudle of the pills and the days/times that you need to take them</li> 
>>>>>>> origin/master
              </ul>

              <h2>Add Alert</h2> 
              <ul> 
                <li>Name</li> 
                <li>Phone number</li> 
                <li>Email</li> 
                <li>Condition for alert</li> 
                <ul> 
                  <li>Associated medication</li> 
                  <li>Time since taken medication</li> 
                </ul>
              </ul> 
            </div>
        </div>
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
