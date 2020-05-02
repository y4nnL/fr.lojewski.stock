export const PRODUCT_NS = 'product';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Globals

export const PRODUCT_CONTROLS = {
  NUMBER: 'number',
  SLIDER: 'slider',
};
export const PRODUCT_FIRESTORE_COLLECTION = 'products';
export const PRODUCT_FIRESTORE_ID = 'firestoreId';
export const PRODUCT_PLACEHOLDER_IMAGE = [
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADIAQMAAABoEU4WAAAAA1BMVEVwh',
  'p6J5dQEAAAAHklEQVQYGe3BMQEAAADCIPunXghfYAAAAAAAAABwCB54AAEPpFPOAAAAAElFTkSuQmCC',
].join('');
export const PRODUCT_TYPES = {
  ALL: 'all',
  FRUIT: 'fruit',
  PROTEIN: 'protein',
  CARBOHYDRATE: 'carbohydrate',
  FRESH: 'fresh',
  DRINK: 'drink',
  OTHER: 'other',
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Keys

export const PRODUCT_KEY_DECREMENT = 'decrement';
export const PRODUCT_KEY_FETCH = 'fetch';
export const PRODUCT_KEY_FILTER_ALERT = 'alert';
export const PRODUCT_KEY_FILTER_KEEP = 'keep';
export const PRODUCT_KEY_FILTER_NAME = 'name';
export const PRODUCT_KEY_FILTER_OS = 'os';
export const PRODUCT_KEY_FILTER_SHOW = 'show';
export const PRODUCT_KEY_FILTER_TYPE = 'type';
export const PRODUCT_KEY_FILTERS = 'filters';
export const PRODUCT_KEY_INCREMENT = 'increment';
export const PRODUCT_KEY_LIST = 'list';
export const PRODUCT_KEY_QUANTITY = 'quantity';
export const PRODUCT_KEY_RESET = 'reset';
export const PRODUCT_KEY_TOGGLE = 'toggle';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Actions (DO)

export const PRODUCT_DO_DECREMENT = `${ PRODUCT_NS }/${ PRODUCT_KEY_DECREMENT }`;
export const PRODUCT_DO_FETCH = `${ PRODUCT_NS }/${ PRODUCT_KEY_FETCH }`;
export const PRODUCT_DO_INCREMENT = `${ PRODUCT_NS }/${ PRODUCT_KEY_INCREMENT }`;
export const PRODUCT_DO_QUANTITY = `${ PRODUCT_NS }/${ PRODUCT_KEY_QUANTITY }`;
export const PRODUCT_DO_RESET = `${ PRODUCT_NS }/${ PRODUCT_KEY_RESET }`;
export const PRODUCT_DO_TOGGLE = `${ PRODUCT_NS }/${ PRODUCT_KEY_TOGGLE }`;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Getters (GET)

export const PRODUCT_GET_FILTERS = `${ PRODUCT_NS }/${ PRODUCT_KEY_FILTERS }`;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Mutations (SET)

export const PRODUCT_SET_FILTER_ALERT = `${ PRODUCT_NS }/${ PRODUCT_KEY_FILTER_ALERT }`;
export const PRODUCT_SET_FILTER_NAME = `${ PRODUCT_NS }/${ PRODUCT_KEY_FILTER_NAME }`;
export const PRODUCT_SET_FILTER_OS = `${ PRODUCT_NS }/${ PRODUCT_KEY_FILTER_OS }`;
export const PRODUCT_SET_FILTER_TYPE = `${ PRODUCT_NS }/${ PRODUCT_KEY_FILTER_TYPE }`;

