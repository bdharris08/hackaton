import fetch from 'isomorphic-fetch'
import promise from 'es6-promise'

export const REQUEST_PRESCRIPTION = "REQUEST_PRESCRIPTION"
export const RECEIVE_PRESCRIPTION = "RECEIVE_PRESCRIPTION"
export const CREATE_PRESCRIPTION = "CREATE_PRESCRIPTION"
export const INVALIDATE_PRESCRIPTION = "INVALIDATE_PRESCRIPTION"

export function requestPrescription (prescription) {
  return {
    type: REQUEST_PRESCRIPTION,
    prescription
  } 
}

export function receivePrescription (prescription) {
  return {
    type: RECEIVE_PRESCRIPTION,
    prescription
  }
}

export function selectPrescription (prescription) {
  return {
    type: CREATE_PRESCRIPTION,
    prescription
  }
}

export function invalidatePrescription (prescription) {
  return {
    type: INVALIDATE_PRESCRIPTION,
    prescription
  }
}
