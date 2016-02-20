import { combineReducers } from 'redux'
import {
  CHANGE_USER, 
  CREATE_PRESCRIPTION, EDIT_PRESCRIPTION, HIDE_PRESCRIPTION,
  CREATE_REMINDER, EDIT_REMINDER, HIDE_REMINDER,
  CREATE_CONTACT, EDIT_CONTACT, HIDE_CONTACT,
  SELECT_REDDIT, INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

//change the user to the entered name (check input??)
function userName(state = "", action) {
  switch (action.type) {
    case CHANGE_USER:
      return Object.assign({}, state, {
        userName: action.userName
      })
    default:
      return state
  }
}

function prescription(state, action) {
  switch (action.type) {
    case CREATE_PRESCRIPTION:
      return {
        ID: action.id,
        Name: action.prescription.Name,
        NumOfDoses: action.prescription.NumOfDoses,
        DoseTimes: action.prescription.DoseTimes,
        Frequency: action.prescription.Frequency,
        Duration: action.prescription.Duration,  
        PillsTaken: action.prescription.PillsTaken,
        Active: action.prescription.Active,
        OnTrack: action.prescription.OnTrack
      }
    case EDIT_PRESCRIPTION:
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        Name: action.name 
      })

    case HIDE_PRESCRIPTION:
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        Active: "False"
      })
    default:
      return state
    }
}

function prescriptions(state=[], action) {
  switch (action.type) {
    case CREATE_PRESCRIPTION:
      return [
        ...state,
        prescription(undefined, action)
      ]
    case EDIT_PRESCRIPTION:
      return state.map(
        prescription(item, action)
      )
    case HIDE_PRESCRIPTION:
      return state.map(
        prescription(item, action)
      )
    default:
      return state
  }
}

function contact(state, action) {
  switch (action.type) {
    case CREATE_CONTACT:
      return {
        ID: action.id,
        contactName: action.contact.contactname,
        phone: action.contact.phone,
        email: action.contact.email,
        relationship: action.contact.relationship,
        Active: action.contact.Active
      }
    case EDIT_CONTACT:
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        Name: action.contactname 
      })

    case HIDE_CONTACT:
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        Active: "False"
      })
    default:
      return state
    }
}

function contacts(state=[], action) {
  switch (action.type) {
    case CREATE_CONTACT:
      return [
        ...state,
        contact(undefined, action)
      ]
    case EDIT_CONTACT:
      return state.map(
        contact(item, action)
      )
    case HIDE_CONTACT:
      return state.map(
        contact(item, action)
      )
    default:
      return state
  }
}

function selectedReddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit
    default:
      return state
  }
}

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsByReddit(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.reddit]: posts(state[action.reddit], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  userName,
  prescriptions,
  contacts,
  postsByReddit,
  selectedReddit
})

export default rootReducer
