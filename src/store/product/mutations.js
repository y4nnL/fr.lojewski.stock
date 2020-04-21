import {
  PRODUCT_ALERT,
  PRODUCT_DECREMENT,
  PRODUCT_INCREMENT,
  PRODUCT_QUANTITY,
  PRODUCT_OS,
  PRODUCT_LIST,
  PRODUCT_TERM,
  PRODUCT_TYPE,
  PRODUCT_TYPES
} from './constants';

const types = Object.values(PRODUCT_TYPES);

export default {
  [PRODUCT_TERM]: (state, term) => {
    state.term = term ? '' + term : '';
  },
  [PRODUCT_TYPE]: (state, type) => {
    if (types.indexOf(type) > -1) {
      state.type = type;
    }
  },
  [PRODUCT_ALERT]: (state, alert) => {
    state.alert = !!alert;
  },
  [PRODUCT_OS]: (state, os) => {
    state.os = !!os;
  },
  [PRODUCT_LIST]: (state, list) => {
    state.list = list;
  },
  [PRODUCT_INCREMENT]: (state, { productId, unitIndex }) => {
    let product = state.list.find((product) => product.id === productId);
    let productUnit = product ? product.units[unitIndex] : null;
    if (product && productUnit) {
      productUnit.quantity += productUnit.increment;
    }
  },
  [PRODUCT_DECREMENT]: (state, { productId, unitIndex }) => {
    let product = state.list.find((product) => product.id === productId);
    let productUnit = product ? product.units[unitIndex] : null;
    if (product && productUnit && productUnit.quantity - productUnit.increment >= 0) {
      productUnit.quantity -= productUnit.increment;
    }
  },
  [PRODUCT_QUANTITY]: (state, { productId, unitIndex, quantity }) => {
    let product = state.list.find((product) => product.id === productId);
    let productUnit = product ? product.units[unitIndex] : null;
    if (product && productUnit) {
      productUnit.quantity = quantity;
    }
  }
};
