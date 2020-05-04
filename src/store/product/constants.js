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
  CARBOHYDRATE: 'carbohydrate',
  DRINK: 'drink',
  FRESH: 'fresh',
  FRUIT: 'fruit',
  HOUSEHOLD: 'household',
  OTHER: 'other',
  PROTEIN: 'protein',
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Keys

export const PRODUCT_KEY_CREATE = 'create';
export const PRODUCT_KEY_DECREMENT = 'decrement';
export const PRODUCT_KEY_DELETE = 'delete';
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
export const PRODUCT_KEY_UPDATE = 'update';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Actions (DO)

export const PRODUCT_DO_CREATE = `${ PRODUCT_NS }/${ PRODUCT_KEY_CREATE }`;
export const PRODUCT_DO_DECREMENT = `${ PRODUCT_NS }/${ PRODUCT_KEY_DECREMENT }`;
export const PRODUCT_DO_DELETE = `${ PRODUCT_NS }/${ PRODUCT_KEY_DELETE }`;
export const PRODUCT_DO_FETCH = `${ PRODUCT_NS }/${ PRODUCT_KEY_FETCH }`;
export const PRODUCT_DO_INCREMENT = `${ PRODUCT_NS }/${ PRODUCT_KEY_INCREMENT }`;
export const PRODUCT_DO_QUANTITY = `${ PRODUCT_NS }/${ PRODUCT_KEY_QUANTITY }`;
export const PRODUCT_DO_RESET = `${ PRODUCT_NS }/${ PRODUCT_KEY_RESET }`;
export const PRODUCT_DO_TOGGLE = `${ PRODUCT_NS }/${ PRODUCT_KEY_TOGGLE }`;
export const PRODUCT_DO_UPDATE = `${ PRODUCT_NS }/${ PRODUCT_KEY_UPDATE }`;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Getters (GET)

export const PRODUCT_GET_FILTERS = `${ PRODUCT_NS }/${ PRODUCT_KEY_FILTERS }`;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Mutations (SET)

export const PRODUCT_SET_FILTER_ALERT = `${ PRODUCT_NS }/${ PRODUCT_KEY_FILTER_ALERT }`;
export const PRODUCT_SET_FILTER_NAME = `${ PRODUCT_NS }/${ PRODUCT_KEY_FILTER_NAME }`;
export const PRODUCT_SET_FILTER_OS = `${ PRODUCT_NS }/${ PRODUCT_KEY_FILTER_OS }`;
export const PRODUCT_SET_FILTER_TYPE = `${ PRODUCT_NS }/${ PRODUCT_KEY_FILTER_TYPE }`;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Errors

export const PRODUCT_ERROR_FILE_MALFORMED = 'PRODUCT_ERROR_FILE_MALFORMED';
export const PRODUCT_ERROR_FILE_NOT_SUPPORTED = 'PRODUCT_ERROR_FILE_NOT_SUPPORTED';
export const PRODUCT_ERROR_ID_EXISTS = 'PRODUCT_ERROR_ID_EXISTS';
export const PRODUCT_ERROR_ID_MALFORMED = 'PRODUCT_ERROR_ID_MALFORMED';
export const PRODUCT_ERROR_ID_UNKNOWN = 'PRODUCT_ERROR_ID_UNKNOWN';
export const PRODUCT_ERROR_MISSING_FILE = 'PRODUCT_ERROR_MISSING_FILE';
export const PRODUCT_ERROR_MISSING_ID = 'PRODUCT_ERROR_MISSING_ID';
export const PRODUCT_ERROR_MISSING_NAME = 'PRODUCT_ERROR_MISSING_NAME';
export const PRODUCT_ERROR_MISSING_TYPE = 'PRODUCT_ERROR_MISSING_TYPE';
export const PRODUCT_ERROR_MISSING_UNIT_ALERT_MALFORMED = 'PRODUCT_ERROR_MISSING_UNIT_ALERT_MALFORMED';
export const PRODUCT_ERROR_MISSING_UNIT_INCREMENT = 'PRODUCT_ERROR_MISSING_UNIT_INCREMENT';
export const PRODUCT_ERROR_MISSING_UNIT_INCREMENT_MALFORMED = 'PRODUCT_ERROR_MISSING_UNIT_INCREMENT_MALFORMED';
export const PRODUCT_ERROR_MISSING_UNIT_MANY = 'PRODUCT_ERROR_MISSING_UNIT_MANY';
export const PRODUCT_ERROR_MISSING_UNIT_ONE = 'PRODUCT_ERROR_MISSING_UNIT_ONE';
export const PRODUCT_ERROR_MISSING_UNIT_QUANTITY_MALFORMED = 'PRODUCT_ERROR_MISSING_UNIT_QUANTITY_MALFORMED';
export const PRODUCT_ERROR_MISSING_UNITS = 'PRODUCT_ERROR_MISSING_UNITS';
export const PRODUCT_ERROR_TYPE_UNKNOWN = 'PRODUCT_ERROR_TYPE_UNKNOWN';

