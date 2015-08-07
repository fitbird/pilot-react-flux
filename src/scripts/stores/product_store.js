"use strict";
import ActionTypes from "../constants/action_types";
import assign from "react/lib/Object.assign";
import Dispatcher from "../dispatcher/dispatcher";
import EventEmitter from "events";

const CHANGE_EVENT = "change";
let products = [];
let errors = [];

let ProductStore = assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.on("CHANGE_EVENT", callback)
  },

  emitChange() {
    return this.emit("CHANGE_EVENT")
  },

  removeChangeListener(callback) {
    this.removeListener("CHANGE_EVENT", callback)
  },

  getAll() {
    return products
  },

  getById(id) {
    for (let k in products) {
      if (products[k].id == id) return products[k]
    }
  },

  getErrors() {
    return errors
  }
})

ProductStore.dispatchToken = Dispatcher.register(action => {
  switch(action.actionType) {

    case ActionTypes.RECEIVE_PRODUCT_DATA:
      products = action.data;
      ProductStore.emitChange()
      break

    case ActionTypes.RECEIVE_PRODUCT_ERRORS:
      errors = action.errors;
      ProductStore.emitChange()
      break
  }
})

export default ProductStore
