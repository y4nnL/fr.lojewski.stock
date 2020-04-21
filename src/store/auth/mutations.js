import { AUTH_USER } from './constants';

export default {
  [AUTH_USER]: (state, user) => {
    state.user = user;
  }
};
