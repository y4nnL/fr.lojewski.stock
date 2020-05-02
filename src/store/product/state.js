import * as c from './constants';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Type definitions

/**
 * @typedef {Object} Product
 * @property {string} firestoreId
 * @property {string} id
 * @property {string} name
 * @property {string} type
 * @property {Array<ProductUnit>} units
 */

/**
 * @typedef {Object} ProductUnit
 * @property {number} alert
 * @property {string} control
 * @property {number} increment
 * @property {string} many
 * @property {string} one
 * @property {number} quantity
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// State

export default function () {
  return {
    [c.PRODUCT_KEY_FILTER_ALERT]: false,
    [c.PRODUCT_KEY_FILTER_KEEP]: [],
    [c.PRODUCT_KEY_FILTER_NAME]: '',
    [c.PRODUCT_KEY_FILTER_OS]: false,
    [c.PRODUCT_KEY_FILTER_SHOW]: false,
    [c.PRODUCT_KEY_FILTER_TYPE]: '',
    [c.PRODUCT_KEY_LIST]: [],
  };
}
