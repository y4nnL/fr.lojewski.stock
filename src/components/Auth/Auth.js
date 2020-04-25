import * as authConstants from 'src/store/auth/constants';
import * as productConstants from 'src/router/constants';

export default {
  name: 'Auth',
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  data() {
    return {
      /**
       * Whether the form is submitting
       * @type {boolean}
       */
      isSubmitting: false,
      /**
       * The password input v-model
       * @type {string}
       */
      password: '',
      /**
       * The username input v-model
       * @type {string}
       */
      username: '',
    };
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    /**
     * Submit the given username/password couple to the store
     */
    submit() {
      if (this.isValid) {
        let payload =  {
          username: this.username,
          password: this.password,
        };

        this.isSubmitting = true;

        this.$store.dispatch(authConstants.AUTH_ACTION_LOGIN, payload)
          .then(() => this.$router.push({ name: productConstants.ROUTE_NAME_STOCK }))
          .catch(() => this.$q.dialog({ message: 'Connexion impossible' }))
          .finally(() => this.isSubmitting = false);
      }
    },
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    /**
     * Whether the form is ready to be submitted
     * @returns {boolean}
     */
    isValid() {
      return !!(!this.isSubmitting && this.username && this.password);
    },
  }
};
