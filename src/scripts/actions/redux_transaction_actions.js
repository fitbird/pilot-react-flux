// Do we want single receiveTransactionResponse?
// If so, shall it be generic with same type or shall type be a param?
// Remove dispatch, it will be injected by Redux

import * as Api from "../api/api";
import { dispatch } from "../dispatcher/dispatcher";

const ENTITY_NAME = "transaction";

export const TRANSACTION_CREATE_ERROR = "TRANSACTION_CREATE_ERROR";
export const TRANSACTION_CREATE_RESPONSE = "TRANSACTION_CREATE_RESPONSE";
export const TRANSACTION_CREATE_REQUEST = "TRANSACTION_CREATE_REQUEST";

function createTransactionRequest(data) {
  return {
    type: TRANSACTION_CREATE_REQUEST,
    data: data
  }
}

function createTransactionResponse(response) {
  return {
    type: TRANSACTION_CREATE_RESPONSE,
    data: response
  }
}

function createTransactionError(error) {
  return {
    type: TRANSACTION_CREATE_ERROR,
    error: JSON.parse(error.responseText).errors
  }
}

export function create(data) {
  return dispatch => {
    dispatch(createTransactionRequest(data));
    return Api.create(ENTITY_NAME, data)
      .then(() => Api.load(ENTITY_NAME))
      .then(response => {
        dispatch(createTransactionResponse(response));
      }).catch(error => {
        dispatch(createTransactionError(error));
      });
  }
}

export const CLIENT_TOKEN_ERROR = "CLIENT_TOKEN_ERROR";
export const CLIENT_TOKEN_RESPONSE = "CLIENT_TOKEN_RESPONSE";
export const CLIENT_TOKEN_REQUEST = "CLIENT_TOKEN_REQUEST";

export function getClientToken() {
  return dispatch => {
    dispatch({
      type: CLIENT_TOKEN_REQUEST,
    });
    return Api.fetchClientToken(ENTITY_NAME)
      .then(response => {
        dispatch({
          type: CLIENT_TOKEN_RESPONSE,
          clientToken: response.client_token
        });
      }).catch(error => {
        dispatch({
          type: CLIENT_TOKEN_ERROR,
          error: JSON.parse(error.responseText).errors
        });
      });
  }
}

export const TRANSACTION_LOAD_ERROR = "TRANSACTION_LOAD_ERROR";
export const TRANSACTION_LOAD_RESPONSE = "TRANSACTION_LOAD_RESPONSE";
export const TRANSACTION_LOAD_REQUEST = "TRANSACTION_LOAD_REQUEST";

// Temporary exported to enable tests.
export function loadTransactionRequest() {
  return {
    type: TRANSACTION_LOAD_REQUEST
  }
}

function loadTransactionResponse(response) {
  return {
    type: TRANSACTION_LOAD_RESPONSE,
    data: response
  }
}

function loadTransactionError(error) {
  return {
    type: TRANSACTION_LOAD_ERROR,
    error: JSON.parse(error.responseText).errors
  }
}

export function load() {
  return dispatch => {
    dispatch({
      type: TRANSACTION_LOAD_REQUEST
    });
    return Api.load(ENTITY_NAME)
      .then(response => {
        dispatch({
          type: TRANSACTION_LOAD_RESPONSE,
          data: response
        });
      }).catch(error => {
        dispatch({
          type: TRANSACTION_LOAD_ERROR,
          error: error.responseText
        });
      });
  }
}
