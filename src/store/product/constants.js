export const PRODUCT_NS = 'product';

export const PRODUCT_FILTERED_LIST = 'filteredList';
export const PRODUCT_FETCH_LIST = 'fetchList';
export const PRODUCT_TERM = 'term';
export const PRODUCT_TYPE = 'type';
export const PRODUCT_ALERT = 'alert';
export const PRODUCT_OS = 'os';
export const PRODUCT_LIST = 'list';
export const PRODUCT_INCREMENT = 'increment';
export const PRODUCT_DECREMENT = 'decrement';
export const PRODUCT_QUANTITY = 'quantity';
export const PRODUCT_FILTERS = 'filters';
export const PRODUCT_RESET_FILTERS = 'resetFilters';
export const PRODUCT_TYPES = {
  ALL: 'all',
  FRUIT: 'fruit',
  PROTEIN: 'protein',
  CARBOHYDRATE: 'carbohydrate',
  FRESH: 'fresh',
  DRINK: 'drink',
  OTHER: 'other'
};

export const PRODUCT_GETTER_FILTERED_LIST = `${PRODUCT_NS}/${PRODUCT_FILTERED_LIST}`;
export const PRODUCT_GETTER_FILTERS = `${PRODUCT_NS}/${PRODUCT_FILTERS}`;

export const PRODUCT_MUTATION_TERM = `${PRODUCT_NS}/${PRODUCT_TERM}`;
export const PRODUCT_MUTATION_TYPE = `${PRODUCT_NS}/${PRODUCT_TYPE}`;
export const PRODUCT_MUTATION_ALERT = `${PRODUCT_NS}/${PRODUCT_ALERT}`;
export const PRODUCT_MUTATION_OS = `${PRODUCT_NS}/${PRODUCT_OS}`;

export const PRODUCT_DISPATCH_INCREMENT = `${PRODUCT_NS}/${PRODUCT_INCREMENT}`;
export const PRODUCT_DISPATCH_DECREMENT = `${PRODUCT_NS}/${PRODUCT_DECREMENT}`;
export const PRODUCT_DISPATCH_QUANTITY = `${PRODUCT_NS}/${PRODUCT_QUANTITY}`;
export const PRODUCT_DISPATCH_FETCH_LIST = `${PRODUCT_NS}/${PRODUCT_FETCH_LIST}`;
export const PRODUCT_DISPATCH_RESET_FILTERS = `${PRODUCT_NS}/${PRODUCT_RESET_FILTERS}`;
