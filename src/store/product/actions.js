import * as c from './constants';
import * as h from './helpers';

export default {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Filters
  /**
   * Reset all the filters
   * @param {function(string, *)} commit
   */
  [c.PRODUCT_KEY_RESET]({ commit }) {
    commit(c.PRODUCT_KEY_FILTER_ALERT, false);
    commit(c.PRODUCT_KEY_FILTER_NAME, '');
    commit(c.PRODUCT_KEY_FILTER_OS, false);
  },
  /**
   * Toggle the filter show state
   * @param {function(string, *)} commit
   */
  [c.PRODUCT_KEY_TOGGLE]({ commit }) {
    commit(c.PRODUCT_KEY_FILTER_SHOW, !this.state[c.PRODUCT_NS][c.PRODUCT_KEY_FILTER_SHOW]);
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // List
  /**
   * Fetch the product list from the Firestore server
   * @param {function(string, *)} commit
   */
  [c.PRODUCT_KEY_FETCH]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      h.getProductCollection({ orderBy: 'name' })
        .get()
        .then((querySnapshot) => {
          let products = [];
          querySnapshot.forEach((document) => products.push(h.createProductFromDocumentData(document)));
          commit(c.PRODUCT_KEY_LIST, products);
          resolve();
        })
        .catch(reject);
    });
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Units
  /**
   * Decrement the given product unit and save it to the Firestore server
   * @param {function(string, *)} commit
   * @param {string} productId
   * @param {number} productUnitIndex
   * @returns {Promise<void>}
   */
  [c.PRODUCT_KEY_DECREMENT]({ commit }, { productId, productUnitIndex }) {
    return h.commitAndSaveProductUnit({
      commitDo: () => commit(c.PRODUCT_KEY_DECREMENT, { productId, productUnitIndex }),
      commitUndo: () => commit(c.PRODUCT_KEY_INCREMENT, { productId, productUnitIndex }),
      productId,
      productUnitIndex,
      state: this.state[c.PRODUCT_NS],
    });
  },
  /**
   * Increment the given product unit and save it to the Firestore server
   * @param {function(string, *)} commit
   * @param {string} productId
   * @param {number} productUnitIndex
   * @returns {Promise<void>}
   */
  [c.PRODUCT_KEY_INCREMENT]({ commit }, { productId, productUnitIndex }) {
    return h.commitAndSaveProductUnit({
      commitDo: () => commit(c.PRODUCT_KEY_INCREMENT, { productId, productUnitIndex }),
      commitUndo: () => commit(c.PRODUCT_KEY_DECREMENT, { productId, productUnitIndex }),
      productId,
      productUnitIndex,
      state: this.state[c.PRODUCT_NS],
    });
  },
  /**
   * Set the given product unit quantity and save it to the Firestore server
   * @param {function(string, *)} commit
   * @param {string} productId
   * @param {number} productUnitIndex
   * @param {number} productUnitQuantity
   * @returns {Promise<void>}
   */
  [c.PRODUCT_KEY_QUANTITY]({ commit }, { productId, productUnitIndex, productUnitQuantity }) {
    let { productUnit } = h.findProductUnitByIndex(this.state[c.PRODUCT_NS], productId, productUnitIndex);
    if (productUnit) {
      return h.commitAndSaveProductUnit({
        commitDo: () => commit(c.PRODUCT_KEY_QUANTITY, { productId, productUnitIndex, productUnitQuantity }),
        commitUndo: () => commit(c.PRODUCT_KEY_QUANTITY,
          { productId, productUnitIndex, productUnitQuantity: productUnit.quantity }),
        productId,
        productUnitIndex,
        state: this.state[c.PRODUCT_NS],
      });
    } else {
      return Promise.reject();
    }
  },
};
