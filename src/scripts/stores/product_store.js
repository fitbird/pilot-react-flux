"use strict";
import ActionTypes from "../constants/action_types";
import assign from "react/lib/Object.assign";
import EventEmitter from "events";
import { register } from "../dispatcher/dispatcher";
import { Schema, arrayOf, normalize } from "normalizr";

const CHANGE_EVENT = "change";
const product = new Schema("products", { idAttribute: "id" });
let errors = [];
let products = {};

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

  getErrors() {
    return errors
  },

  getProducts() {
    return products
  }
})

ProductStore.dispatchToken = register(action => {
  switch(action.type) {
    case ActionTypes.PRODUCT_CREATE_ERROR:
    case ActionTypes.PRODUCT_DESTROY_ERROR:
    case ActionTypes.PRODUCT_LOAD_ERROR:
    case ActionTypes.PRODUCT_UPDATE_ERROR:
      errors = action.error;
      ProductStore.emitChange();
      break

    case ActionTypes.PRODUCT_CREATE_RESPONSE:
    case ActionTypes.PRODUCT_DESTROY_RESPONSE:
    case ActionTypes.PRODUCT_LOAD_RESPONSE:
    case ActionTypes.PRODUCT_UPDATE_RESPONSE:
      let normalized = normalize(action.data, arrayOf(product));
      products = normalized.entities.products
      ProductStore.emitChange();
      break
  }
})

export default ProductStore
