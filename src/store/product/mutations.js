import {
  PRODUCT_ALERT,
  PRODUCT_DECREMENT,
  PRODUCT_INCREMENT,
  PRODUCT_QUANTITY,
  PRODUCT_OS,
  PRODUCT_LIST,
  PRODUCT_TERM,
  PRODUCT_TYPE,
  PRODUCT_TYPES, PRODUCT_SHOW_FILTERS, PRODUCT_FILTERS, PRODUCT_GETTER_FILTERS
} from './constants';

const types = Object.values(PRODUCT_TYPES);

export default {
  [PRODUCT_TERM]: (state, term) => {
    let oldTerm = state.term;
    state.term = term ? '' + term : '';
    if (state.term !== oldTerm) {
      state.keep = [];
    }
  },
  [PRODUCT_TYPE]: (state, type) => {
    let oldType = state.type;
    if (types.indexOf(type) > -1) {
      state.type = type;
      if (state.type !== oldType) {
        state.keep = [];
      }
    }
  },
  [PRODUCT_ALERT]: (state, alert) => {
    let oldAlert = state.alert;
    state.alert = !!alert;
    if (state.alert !== oldAlert) {
      state.keep = [];
    }
  },
  [PRODUCT_OS]: (state, os) => {
    let oldOS = state.os;
    state.os = !!os;
    if (state.os !== oldOS) {
      state.keep = [];
    }
  },
  [PRODUCT_LIST]: (state, list) => {
    state.list = list;
  },
  [PRODUCT_SHOW_FILTERS]: (state, showFilters) => {
    state.showFilters = !!showFilters;
  },
  [PRODUCT_INCREMENT]: (state, { productId, unitIndex }) => {
    let product = state.list.find((product) => product.id === productId);
    let productUnit = product ? product.units[unitIndex] : null;
    if (product && productUnit) {
      productUnit.quantity += productUnit.increment;
      if (state.keep.indexOf(product.id) < 0) {
        state.keep.push(product.id);
      }
    }
  },
  [PRODUCT_DECREMENT]: (state, { productId, unitIndex }) => {
    let product = state.list.find((product) => product.id === productId);
    let productUnit = product ? product.units[unitIndex] : null;
    if (product && productUnit && productUnit.quantity - productUnit.increment >= 0) {
      productUnit.quantity -= productUnit.increment;
      if (state.keep.indexOf(product.id) < 0) {
        state.keep.push(product.id);
      }
    }
  },
  [PRODUCT_QUANTITY]: (state, { productId, unitIndex, quantity }) => {
    let product = state.list.find((product) => product.id === productId);
    let productUnit = product ? product.units[unitIndex] : null;
    if (product && productUnit) {
      productUnit.quantity = quantity;
      if (state.keep.indexOf(product.id) < 0) {
        state.keep.push(product.id);
      }
    }
  }
};
