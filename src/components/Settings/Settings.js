import * as productConstants from 'src/store/product/constants';
import * as routerConstants from 'src/router/constants';
import SettingsList from '../SettingsList/SettingsList.vue';

export default {
  name: 'Settings',
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  data() {
    return {
      /**
       * Dialog to open when a /settings route is triggered
       * @type {QVueGlobals.dialog}
       */
      dialog: null,
    };
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  destroyed() {
    if (this.dialog) {
      this.dialog.hide();
    }
  },
  mounted() {
    if (!this.dialog) {
      this.dialog = this.$q.dialog({
        component: SettingsList,
        parent: this,
      }).onDismiss(() => this.close());
    }
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    close() {
      this.dialog = null;
      let pathRe = new RegExp(routerConstants.ROUTER_PATH_SETTINGS + '(\\?new)?');
      if (pathRe.test(this.$route.fullPath)) {
        this.$router.push({ path: this.$route.fullPath.replace(pathRe, '') });
      }
    }
  }
};
