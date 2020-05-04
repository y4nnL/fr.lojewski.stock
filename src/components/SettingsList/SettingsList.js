import * as productConstants from 'src/store/product/constants';
import SettingsForm from '../SettingsForm/SettingsForm.vue';
import StorageImg from '../StorageImg/StorageImg.vue';

export default {
  name: 'SettingsList',
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  components: {
    SettingsForm,
    StorageImg,
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  data() {
    let createMode = /\?new$/.test(this.$route.fullPath);

    return {
      /**
       * Whether the component is in 'create' mode
       * @type {boolean}
       */
      createMode,
      /**
       * Whether the list is delayed
       * @type {boolean}
       */
      delayed: true,
      /**
       * Whether a product is being deleted
       * @type {string}
       */
      deleting: '',
      /**
       * Whether show the product form
       * @type {boolean}
       */
      form: createMode,
      /**
       * The selected product
       * @type {Product|null}
       */
      product: null,
    };
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    /**
     * Return the product list
     * @returns {Array<Product>}
     */
    list() {
      return this.delayed ? [] : this.$store.state[productConstants.PRODUCT_NS][productConstants.PRODUCT_KEY_LIST];
    },
    /**
     * Component title
     * @returns {string}
     */
    title() {
      return this.form ? `${ this.product ? 'Éditer' : 'Créer' } un produit` : 'Liste des produits';
    },
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Delay the list display to the end of the dialog transition for performance reasons
   */
  mounted() {
    let top = -1;
    let count = 0;
    let interval = setInterval(() => {
      if (this.$refs.root) {
        let now = this.$refs.root.getBoundingClientRect().top;
        if (now === top) count++;
        if (count === 2) {
          clearInterval(interval);
          this.delayed = false;
        }
        top = now;
      }
    }, 75);
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    /**
     * Add a new product
     * Or close the form is it's opened
     */
    add() {
      if (this.form) {
        this.onFormCancel();
      } else {
        this.$refs.form.reset();
        this.form = true;
        this.product = null;
      }
    },
    /**
     * Edit the given product
     * @param {Product} product
     */
    edit(product) {
      this.$refs.form.reset();
      this.product = null;
      // let v-ripple the time to take effect
      setTimeout(() => {
        this.form = true;
        this.product = product;
      }, 150);
    },
    /**
     * Hide the dialog
     */
    hide() {
      this.$refs.dialog.hide();
    },
    /**
     * Hide the dialog
     */
    onDialogHide() {
      this.$emit('hide');
    },
    /**
     * Hide the form or close the dialog depending on the createMode
     */
    onFormCancel() {
      if (this.createMode) {
        this.hide();
      } else {
        this.form = false;
      }
    },
    /**
     * Show the dialog
     */
    show() {
      this.$refs.dialog.show();
    },
  },
};
