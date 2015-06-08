import React from "react";
import AppDispatcher from "../dispatchers/app_dispatcher";
import ProductConstants from "../constants/product_constants";
import EventEmitter from "EventEmitter";
import { assign } from "object-assign";

var _products = {};

function add(product) {
};

function edit(product) {
};

function remove(id) {
};

// class ProductStore extends React.Component
var ProductStore = assign({}, EventEmitter.prototype, {

  get() {
    return _products;
  },

  emitChange() {
    this.emit("change");
  },

  addChangeListener(callback) {
    this.on("change", callback);
  },

  removeChangeListener(callback) {
    this.removeListener("change", callback);
  },

  AppDispatcher.register(function(payload) {
    var action = payload.action;
    var text;

    switch(action.actionType) {
      case ProductConstants.ADD:
        add(action.data);
        break;

      case ProductConstants.EDIT:
        edit(action.data);
        break;

      case ProductConstants.REMOVE:
        remove(action.data);
        break;

      default:
        return true;
    }

    ProductStore.emitChange();

    return true;
  })
});

export default ProductStore;
