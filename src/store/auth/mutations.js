import * as constants from './constants';

export default {
  /**
   * Commit the given email to te store
   * @param {string} email Email to commit
   */
  [constants.AUTH_KEY_EMAIL]: (state, email) => {
    state[constants.AUTH_KEY_EMAIL] = '' + email;
  },
};
