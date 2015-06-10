var AppDispatcher = require("../dispatcher/dispatcher");
var EventEmitter = require("events").EventEmitter;
var ActionTypes = require("../constants/action_types");
var assign = require("react/lib/Object.assign");
var Api = require("../utils/utils");

var products = [];
var errors = [];

var ProductStore = assign({}, EventEmitter.prototype, {

  getProducts: function() {
    return products;
  },

  getErrors: function() {
    return errors;
  },

  emitChange: function() {
    this.emit("change");
  },

  addChangeListener: function(callback) {
    this.on("change", callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener("change", callback);
  }
});

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.ActionTypes.LIST1:
      Api.list1();
      break;

    case ActionTypes.ActionTypes.LIST2:
      products = action.json;
      ProductStore.emitChange();
      break;

    case ActionTypes.ActionTypes.ADD1:
      Api.add1(action.record);
      break;

    case ActionTypes.ActionTypes.ADD2:
      ProductStore.emitChange();
      break;

    case ActionTypes.ActionTypes.REMOVE1:
      Api.remove1(action.id);
      break;

    case ActionTypes.ActionTypes.REMOVE2:
      ProductStore.emitChange();
      break;
  }
});

module.exports = ProductStore;