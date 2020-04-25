import { AUTH_DISPATCH_LOGIN } from 'src/store/auth/constants';
import { ROUTE_NAME_STOCK } from 'src/router/constants';

export default {
  name: 'Auth',
  data() {
    return {
      submitting: false,
      error: false,
      username: '',
      password: ''
    };
  },
  methods: {
    onSubmit() {
      if (this.isValid) {
        this.submitting = true;
        this.error = false;
        this.$store.dispatch(AUTH_DISPATCH_LOGIN, { username: this.username, password: this.password })
          .then(() => {
            this.$router.push({ name: ROUTE_NAME_STOCK });
          })
          .catch(() => {
            this.$q.dialog({
              message: 'Connexion impossible'
            });
          })
          .finally(() => {
            this.submitting = false;
          });
      }
    }
  },
  computed: {
    isValid() {
      return !!(!this.submitting && this.username && this.password);
    }
  }
};
