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
      return h.getProductCollection({ where: ['id', '==', payload.product.id] })
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size === 0) {
            return h.getProductCollection()
              .doc()
              .set(payload.product)
              .then(() => this.$storageRef.child(payload.product.id + '.jpg').put(payload.file))
              .then(() => dispatch(c.PRODUCT_KEY_FETCH));
          } else {
            return Promise.reject([ { error: c.PRODUCT_ERROR_ID_EXISTS } ]);
          }
        });
    }
  },
  /**
   * Delete the given product id
   * @param {Object} state
   * @param {function(string, *)} commit
   * @param {function(string, *=):Promise} dispatch
   * @param {string} productId
   */
  [c.PRODUCT_KEY_DELETE]({ state, commit, dispatch }, { productId }) {
    let product = h.findProductById(state, productId);
    if (product) {
      return h.getProductCollection({ where: ['id', '==', product.id] })
        .get()
        .then((querySnapshot) => h.getProductCollection().doc(querySnapshot.docs[0].id).delete())
        .then(() => this.$storageRef.child(product.id + '.jpg').delete())
        .then(() => dispatch(c.PRODUCT_KEY_FETCH));
    } else {
      return Promise.reject();
    }
  },
  /**
   * Fetch the product list from the Firestore server
   * @param {function(string, *)} commit
   */
  [c.PRODUCT_KEY_FETCH]({ commit }) {
    return h.getProductCollection({ orderBy: 'name' })
      .get()
      .then((querySnapshot) => {
        let list = [];
        querySnapshot.forEach((document) => list.push(h.createProductFromDocumentData(document)));
        commit(c.PRODUCT_KEY_LIST, list);
        return list;
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
      return h.getProductCollection({ where: ['id', '==', foundProduct.id] })
        .get()
        .then((querySnapshot) => {
          return h.getProductCollection()
            .doc(querySnapshot.docs[0].id)
            .set(payload.product, { merge: true })
            .then(() => {
              if (payload.file) {
                let ref = this.$storageRef.child(payload.product.id + '.jpg');
                return ref.delete()
                  .then(() => ref.put(payload.file))
              }
            })
            .then(() => dispatch(c.PRODUCT_KEY_FETCH));
      });
    }
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Units
  /**
   * Decrement the given product unit and save it to the Firestore server
   * @param {function(string, *)} commit
   * @param {string} productId
   * @param {string} productUnitId
   * @returns {Promise<void>}
   */
  [c.PRODUCT_KEY_DECREMENT]({ commit }, { productId, productUnitId }) {
    return h.commitAndSaveProductUnit({
      commitDo: () => commit(c.PRODUCT_KEY_DECREMENT, { productId, productUnitId }),
      commitUndo: () => commit(c.PRODUCT_KEY_INCREMENT, { productId, productUnitId }),
      productId,
      productUnitId,
      state: this.state[c.PRODUCT_NS],
    });
  },
  /**
   * Increment the given product unit and save it to the Firestore server
   * @param {function(string, *)} commit
   * @param {string} productId
   * @param {string} productUnitId
   * @returns {Promise<void>}
   */
  [c.PRODUCT_KEY_INCREMENT]({ commit }, { productId, productUnitId }) {
    return h.commitAndSaveProductUnit({
      commitDo: () => commit(c.PRODUCT_KEY_INCREMENT, { productId, productUnitId }),
      commitUndo: () => commit(c.PRODUCT_KEY_DECREMENT, { productId, productUnitId }),
      productId,
      productUnitId,
      state: this.state[c.PRODUCT_NS],
    });
  },
  /**
   * Set the given product unit quantity and save it to the Firestore server
   * @param {function(string, *)} commit
   * @param {string} productId
   * @param {string} productUnitId
   * @param {number} productUnitQuantity
   * @returns {Promise<void>}
   */
  [c.PRODUCT_KEY_QUANTITY]({ commit }, { productId, productUnitId, productUnitQuantity }) {
    let { productUnit } = h.findProductUnitById(this.state[c.PRODUCT_NS], productId, productUnitId);
    if (productUnit) {
      return h.commitAndSaveProductUnit({
        commitDo: () => commit(c.PRODUCT_KEY_QUANTITY, { productId, productUnitId, productUnitQuantity }),
        commitUndo: () => commit(c.PRODUCT_KEY_QUANTITY,
          { productId, productUnitId, productUnitQuantity: productUnit.quantity }),
        productId,
        productUnitId,
        state: this.state[c.PRODUCT_NS],
      });
    } else {
      return Promise.reject();
    }
  },
};
