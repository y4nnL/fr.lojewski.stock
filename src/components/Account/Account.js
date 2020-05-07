import * as authConstants from 'src/store/auth/constants';
import { mapState } from 'vuex';
import * as routerConstants from 'src/router/constants';

export default {
  name: 'Account',
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  components: {
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  data() {
    return {
      /**
       * Disconnect button loading state
       * @type {boolean}
       */
      disconnecting: false,
    };
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    /**
     * The user's email
     * @name email
     * @type {string}
     */
    ...mapState(authConstants.AUTH_NS, { email: authConstants.AUTH_KEY_EMAIL }),
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    /**
     * Trigger the logout store action
     */
    logout() {
      this.disconnecting = true;
      setTimeout(() => {
        this.$store.dispatch(authConstants.AUTH_DO_LOGOUT)
          .then(() => this.$router.push({ name: routerConstants.ROUTER_NAME_AUTH }))
          .finally(() => this.disconnecting = false);
      }, 750);
    },
  },
};
