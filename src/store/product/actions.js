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
  // Products
  /**
   * Create the given product
   * @param {Object} state
   * @param {function(string, *=)} commit
   * @param {function(string, *=):Promise} dispatch
   * @param {{ product: Product, file: File }} payload
   */
  [c.PRODUCT_KEY_CREATE]({ state, commit, dispatch }, payload) {
    let errors = h.validateProduct(state, payload, 'create');
    if (errors.length) {
      return Promise.reject(errors);
    } else {
      return new Promise((resolve, reject) => {
        h.getProductCollection()
          .where('id', '==', payload.product.id)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              h.getProductCollection()
                .doc()
                .set(payload.product)
                .then(() => this.$storageRef.child(payload.product.id + '.jpg').put(payload.file))
                .then(() => dispatch(c.PRODUCT_KEY_FETCH))
                .then(resolve)
                .catch(reject);
            } else {
              reject([ { error: c.PRODUCT_ERROR_ID_EXISTS } ]);
            }
          }).catch(reject);
      });
    }
  },
  /**
   * Delete the given product id
   * @param {Object} state
   * @param {function(string, *)} commit
   * @param {string} productId
   */
  [c.PRODUCT_KEY_DELETE]({ state, commit }, { productId }) {
    let product = h.findProductById(state, productId);
    if (product) {
      return new Promise((resolve, reject) => {
        h.getProductCollection()
          .doc(product[c.PRODUCT_FIRESTORE_ID])
          .delete()
          .then(() => this.$storageRef.child(product.id + '.jpg').delete())
          .then(() => {
            let products = state[c.PRODUCT_KEY_LIST].filter(product => product.id !== productId);
            commit(c.PRODUCT_KEY_LIST, products);
            resolve();
          })
          .catch(reject);
      });
    } else {
      return Promise.reject();
    }
  },
  /**
   * Fetch the product list from the Firestore server
   * @param {function(string, *)} commit
   */
  [c.PRODUCT_KEY_FETCH]({ commit }) {
    return new Promise((resolve, reject) => {
      h.getProductCollection({ orderBy: 'name' })
        .get()
        .then((querySnapshot) => {
          let list = [];
          querySnapshot.forEach((document) => list.push(h.createProductFromDocumentData(document)));
          commit(c.PRODUCT_KEY_LIST, list);
          resolve(list);
        })
        .catch(reject);
    });
  },
  /**
   * Update the given product
   * @param {Object} state
   * @param {function(string, *=)} commit
   * @param {function(string, *=):Promise} dispatch
   * @param {{ product: Product, file: File }} payload
   */
  [c.PRODUCT_KEY_UPDATE]({ state, commit, dispatch }, payload) {
    let errors = h.validateProduct(state, payload, 'update');
    let foundProduct = h.findProductById(state, payload.product.id);
    if (errors.length) {
      return Promise.reject(errors);
    } else {
      return new Promise((resolve, reject) => {
        h.getProductCollection()
          .where('id', '==', foundProduct.id)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size === 1) {
              h.getProductCollection()
                .doc(foundProduct.firestoreId)
                .set(payload.product, { merge: true })
                .then(() => {
                  if (payload.file) {
                    let ref = this.$storageRef.child(payload.product.id + '.jpg');
                    return ref.delete()
                      .then(() => ref.put(payload.file))
                  }
                })
                .then(() => dispatch(c.PRODUCT_KEY_FETCH))
                .then(resolve)
                .catch(reject);
            } else {
              reject([ { error: c.PRODUCT_ERROR_ID_UNKNOWN } ]);
            }
          }).catch(reject);
      });
    }
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
