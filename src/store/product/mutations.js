import * as c from './constants';
import * as h from './helpers';

export default {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Filters
  /**
   * Mutate the product alert filter
   * @param {Object} state
   * @param {boolean} alert
   */
  [c.PRODUCT_KEY_FILTER_ALERT]: (state, alert) => {
    if (state[c.PRODUCT_KEY_FILTER_ALERT] !== alert) {
      state[c.PRODUCT_KEY_FILTER_ALERT] = !!alert;
      state[c.PRODUCT_KEY_FILTER_KEEP] = [];
    }
  },
  /**
   * Mutate the product name filter
   * @param {Object} state
   * @param {string} name
   */
  [c.PRODUCT_KEY_FILTER_NAME]: (state, name) => {
    if (state[c.PRODUCT_KEY_FILTER_NAME] !== name) {
      state[c.PRODUCT_KEY_FILTER_NAME] = name ? '' + name : '';
      state[c.PRODUCT_KEY_FILTER_KEEP] = [];
    }
  },
  /**
   * Mutate the product os filter
   * @param {Object} state
   * @param {boolean} os
   */
  [c.PRODUCT_KEY_FILTER_OS]: (state, os) => {
    if (state[c.PRODUCT_KEY_FILTER_OS] !== os) {
      state[c.PRODUCT_KEY_FILTER_OS] = !!os;
      state[c.PRODUCT_KEY_FILTER_KEEP] = [];
    }
  },
  /**
   * Mutate the product show filter
   * @param {Object} state
   * @param {boolean} show
   */
  [c.PRODUCT_KEY_FILTER_SHOW]: (state, show) => {
    if (state[c.PRODUCT_KEY_FILTER_SHOW] !== show) {
      state[c.PRODUCT_KEY_FILTER_SHOW] = !!show;
    }
  },
  /**
   * Mutate the product type filter
   * @param {Object} state
   * @param {string} type
   */
  [c.PRODUCT_KEY_FILTER_TYPE]: (state, type) => {
    if (state[c.PRODUCT_KEY_FILTER_TYPE] !== type && Object.values(c.PRODUCT_TYPES).indexOf(type) > -1) {
      state[c.PRODUCT_KEY_FILTER_TYPE] = type;
      state[c.PRODUCT_KEY_FILTER_KEEP] = [];
    }
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // List
  /**
   * Mutate the product list
   * @param {Object} state
   * @param {Product[]} list
   */
  [c.PRODUCT_KEY_LIST]: (state, list) => {
    state[c.PRODUCT_KEY_LIST] = list;
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Units
  /**
   * Decrement the given product unit
   * @param {Object} state
   * @param {string} productId
   * @param {number} productUnitIndex
   */
  [c.PRODUCT_KEY_DECREMENT]: (state, { productId, productUnitIndex }) => {
    let { product, productUnit } = h.findProductUnitByIndex(state, productId, productUnitIndex);
    if (product && productUnit && productUnit.quantity - productUnit.increment >= 0) {
      productUnit.quantity -= productUnit.increment;
      if (state[c.PRODUCT_KEY_FILTER_KEEP].indexOf(product.id) < 0) {
        state[c.PRODUCT_KEY_FILTER_KEEP].push(product.id);
      }
    }
  },
  /**
   * Increment the given product unit
   * @param {Object} state
   * @param {string} productId
   * @param {number} productUnitIndex
   */
  [c.PRODUCT_KEY_INCREMENT]: (state, { productId, productUnitIndex }) => {
    let { product, productUnit } = h.findProductUnitByIndex(state, productId, productUnitIndex);
    if (product && productUnit) {
      productUnit.quantity += productUnit.increment;
      if (state[c.PRODUCT_KEY_FILTER_KEEP].indexOf(product.id) < 0) {
        state[c.PRODUCT_KEY_FILTER_KEEP].push(product.id);
      }
    }
  },
  /**
   * Set the given product unit quantity
   * @param {Object} state
   * @param {string} productId
   * @param {number} productUnitIndex
   * @param {number} productUnitQuantity
   */
  [c.PRODUCT_KEY_QUANTITY]: (state, { productId, productUnitIndex, productUnitQuantity }) => {
    let { product, productUnit } = h.findProductUnitByIndex(state, productId, productUnitIndex);
    if (product && productUnit) {
      productUnit.quantity = productUnitQuantity;
      if (state[c.PRODUCT_KEY_FILTER_KEEP].indexOf(product.id) < 0) {
        state[c.PRODUCT_KEY_FILTER_KEEP].push(product.id);
      }
    }
  },
};
