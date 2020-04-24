import {
  PRODUCT_FETCH_LIST,
  PRODUCT_TYPES,
  PRODUCT_LIST,
  PRODUCT_RESET_FILTERS,
  PRODUCT_TERM,
  PRODUCT_OS,
  PRODUCT_ALERT,
  PRODUCT_INCREMENT,
  PRODUCT_DECREMENT,
  PRODUCT_QUANTITY, PRODUCT_TOGGLE_FILTERS,
  PRODUCT_SHOW_FILTERS
} from 'src/store/product/constants';
import { commitSaveProductUnit, productCollection } from 'src/store/product/helpers';

export default {
  [PRODUCT_FETCH_LIST]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      let collection = productCollection();
      collection = collection.orderBy('name');
      collection.get()
        .then((querySnapshot) => {
          let products = [];
          querySnapshot.forEach((doc) => {
            products.push({ firestoreId: doc.id, ...doc.data() });
          });
          commit(PRODUCT_LIST, products);
          resolve();
        })
        .catch(reject);
    });
  },
  [PRODUCT_INCREMENT]({ commit }, { productId, unitIndex }) {
    return commitSaveProductUnit({
      state: this.state.product,
      doCommit: () => commit(PRODUCT_INCREMENT, { productId, unitIndex }),
      undoCommit: () => commit(PRODUCT_DECREMENT, { productId, unitIndex }),
      productId,
      unitIndex
    });
  },
  [PRODUCT_DECREMENT]({ commit }, { productId, unitIndex }) {
    return commitSaveProductUnit({
      state: this.state.product,
      doCommit: () => commit(PRODUCT_DECREMENT, { productId, unitIndex }),
      undoCommit: () => commit(PRODUCT_INCREMENT, { productId, unitIndex }),
      productId,
      unitIndex
    });
  },
  [PRODUCT_QUANTITY]({ commit }, { productId, unitIndex, quantity }) {
    let undoQuantity = quantity;
    return commitSaveProductUnit({
      state: this.state.product,
      doCommit: () => commit(PRODUCT_QUANTITY, { productId, unitIndex, quantity }),
      undoCommit: () => commit(PRODUCT_QUANTITY, { productId, unitIndex, undoQuantity }),
      productId,
      unitIndex
    });
  },
  [PRODUCT_TOGGLE_FILTERS]({ commit }) {
    commit(PRODUCT_SHOW_FILTERS, !this.state.product.showFilters);
  },
  [PRODUCT_RESET_FILTERS]({ commit }) {
    commit(PRODUCT_TERM, '');
    commit(PRODUCT_OS, '');
    commit(PRODUCT_ALERT, '');
  }
};
