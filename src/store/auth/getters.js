import * as constants from './constants';

export default {
  /**
   * Whether the user is authenticated
   * @returns {boolean}
   */
  [constants.AUTH_KEY_IS_AUTHENTICATED]: (state) => {
    return !!state[constants.AUTH_KEY_EMAIL];
  },
};
