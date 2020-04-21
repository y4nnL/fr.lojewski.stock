import { AUTH_IS_AUTHENTICATED } from './constants';

export default {
  [AUTH_IS_AUTHENTICATED]: (state) => {
    return state.user.name;
  }
};
