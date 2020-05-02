import * as c from './constants';

export default {
  /**
   * Return the list of active filters identified by their key
   * @returns {Array<string>}
   */
  [c.PRODUCT_KEY_FILTERS]: (state) => {
    return [ c.PRODUCT_KEY_FILTER_ALERT, c.PRODUCT_KEY_FILTER_NAME, c.PRODUCT_KEY_FILTER_OS ]
      .filter(key => !!state[key]);
  },
  /**
   * Return the list of filtered products
   * @returns {Array<Product>}
   */
  [c.PRODUCT_KEY_LIST]: (state) => {
    let list = /** @type {Array<{ keep: boolean, p: Product, }>} */
      (state[c.PRODUCT_KEY_LIST].map(p => ({ keep: state[c.PRODUCT_KEY_FILTER_KEEP].indexOf(p.id) > -1, p })));

    // Filter by type
    if (state[c.PRODUCT_KEY_FILTER_TYPE] !== c.PRODUCT_TYPES.ALL) {
      list = list.filter(({ keep, p }) => keep || p.type === state[c.PRODUCT_KEY_FILTER_TYPE]);
    }
    // Filter by name
    if (state[c.PRODUCT_KEY_FILTER_NAME]) {
      let name = state[c.PRODUCT_KEY_FILTER_NAME].toLowerCase();
      list = list.filter(({ keep, p }) => keep || p.name.toLowerCase().indexOf(name) > -1);
    }
    // Filter by alert threshold only
    if (state[c.PRODUCT_KEY_FILTER_ALERT] && !state[c.PRODUCT_KEY_FILTER_OS]) {
      list = list.filter(({ keep, p }) => keep || p.units.some((u) => u.quantity > 0 && u.quantity <= u.alert));
    }
    // Filter by out of stock only
    if (state[c.PRODUCT_KEY_FILTER_OS] && !state[c.PRODUCT_KEY_FILTER_ALERT]) {
      list = list.filter(({ keep, p }) => keep || p.units.some((unit) => !unit.quantity));
    }
    // Filter by both alert threshold and out of stock
    if (state[c.PRODUCT_KEY_FILTER_ALERT] && state[c.PRODUCT_KEY_FILTER_OS]) {
      list = list.filter(({ keep, p }) => keep || p.units.some((u) => u.quantity >= 0 && u.quantity <= u.alert));
    }

    return list.map(({ p }) => p);
  },
};
