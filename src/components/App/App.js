import * as authConstants from 'src/store/auth/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    /**
     * Whether the user is authenticated
     * @name isAuthenticated
     * @type {boolean}
     */
    ...mapGetters(authConstants.AUTH_NS, [ authConstants.AUTH_KEY_IS_AUTHENTICATED ]),
  },
};
