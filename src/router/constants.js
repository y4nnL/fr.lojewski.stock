import { PRODUCT_TYPES } from 'src/store/product/constants';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Meta keys

export const ROUTER_META_AUTH = 'auth';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Paths

export const ROUTER_PATH_ACCOUNT = '/account';
export const ROUTER_PATH_AUTH = '/auth';
export const ROUTER_PATH_FIREBASE = '/firebase';
export const ROUTER_PATH_SETTINGS = '/settings';
export const ROUTER_PATH_SHOPPING = '/shopping';
export const ROUTER_PATH_STOCK = '/stock';
export const ROUTER_PATH_STOCK_ALL = `${ROUTER_PATH_STOCK}/${PRODUCT_TYPES.ALL}`;
export const ROUTER_PATH_STOCK_TYPE = `${ROUTER_PATH_STOCK}/:type(${Object.values(PRODUCT_TYPES).join('|')})`;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Names

export const ROUTER_NAME_ACCOUNT = 'account';
export const ROUTER_NAME_AUTH = 'auth';
export const ROUTER_NAME_FIREBASE = 'firebase';
export const ROUTER_NAME_SETTINGS = 'settings';
export const ROUTER_NAME_SHOPPING = 'shopping';
export const ROUTER_NAME_STOCK = 'stock';
