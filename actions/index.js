import fetch from 'isomorphic-fetch'

export const CHANGE_USER = "CHANGE_USER"
export const CREATE_PRESCRIPTION = "CREATE_PRESCRIPTION"
export const EDIT_PRESCRIPTION = "EDIT_PRESCRIPTION"
export const DELETE_PRESCRIPTION = "DELETE_PRESCRIPTION"
export const CREATE_REMINDER = "CREATE_REMINDER"
export const EDIT_REMINDER = "EDIT_REMINDER"
export const DELETE_REMINDER = "DELETE_REMINDER"
export const CREATE_CONTACT = "CREATE_CONTACT"
export const EDIT_CONTACT = "EDIT_CONTACT"
export const DELETE_CONTACT = "DELETE_CONTACT"
//todo remove reddit stuff
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'


export function changeUser(userName) {
  return {
    type: CHANGE_USER,
    userName
  }
}

export function createPrescription(prescription) {
  return {
    type: CREATE_PRESCRIPTION,
    prescription
  }
}

export function editPrescription(prescription) {
  return {
    type: EDIT_PRESCRIPTION,
    prescription
  }
}

export function deletePrescription(prescription) {
  return {
    type: DELETE_PRESCRIPTION,
    prescription
  }
}

export function createReminder(reminder) {
  return {
    type: CREATE_REMINDER,
    reminder
  }
}

export function editReminder(reminder) {
  return {
    type: EDIT_REMINDER,
    reminder
  }
}

export function deleteReminder(reminder) {
  return {
    type: DELETE_REMINDER,
    reminder
  }
}

export function createContact(contact) {
  return {
    type: CREATE_CONTACT,
    contact
  }
}

export function editContact(contact) {
  return {
    type: EDIT_CONTACT,
    contact
  }
}

export function deleteContact(contact) {
  return {
    type: DELETE_CONTACT,
    contact
  }
}

/* todo: remove reddit stuff */

export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  }
}

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  }
}

function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  }
}

function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit: reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchPosts(reddit) {
  return dispatch => {
    dispatch(requestPosts(reddit))
    return fetch(`https://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(reddit, json)))
  }
}

function shouldFetchPosts(state, reddit) {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit))
    }
  }
}
