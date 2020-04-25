import {
  PRODUCT_FILTERED_LIST, PRODUCT_FILTERS,
  PRODUCT_TYPES
} from './constants';

let filterByType = (state) =>
  (product) =>
    state.keep.indexOf(product.id) > -1 ||
    product.type === state.type;

let filterByTerm = (state) =>
  (product) =>
    state.keep.indexOf(product.id) > -1 ||
    product.name.toLowerCase().indexOf(state.term.toLowerCase()) > -1;

let filterByAlert = (state) =>
  (product) =>
    state.keep.indexOf(product.id) > -1 ||
    product.units.some((unit) => unit.quantity > 0 && unit.quantity <= unit.alert);

let filterByOS = (state) =>
  (product) =>
    state.keep.indexOf(product.id) > -1 ||
    product.units.some((unit) => !unit.quantity);

let filterByAlertAndOS = (state) =>
  (product) =>
    state.keep.indexOf(product.id) > -1 ||
    product.units.some((unit) => unit.quantity >= 0 && unit.quantity <= unit.alert);

export default {
  [PRODUCT_FILTERED_LIST]: (state) => {
    let filteredProducts = state.list;
    if (state.type !== PRODUCT_TYPES.ALL) filteredProducts = filteredProducts.filter(filterByType(state));
    if (state.term) filteredProducts = filteredProducts.filter(filterByTerm(state));
    if (state.alert && !state.os) filteredProducts = filteredProducts.filter(filterByAlert(state));
    if (state.os && !state.alert) filteredProducts = filteredProducts.filter(filterByOS(state));
    if (state.alert && state.os) filteredProducts = filteredProducts.filter(filterByAlertAndOS(state));
    return filteredProducts;
  },
  [PRODUCT_FILTERS]: (state) => {
    let list = [];
    if (state.term) list.push('term');
    if (state.alert) list.push('alert');
    if (state.os) list.push('os');
    return list;
  }
}
