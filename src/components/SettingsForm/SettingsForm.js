import * as productConstants from 'src/store/product/constants';
import StorageImg from '../StorageImg/StorageImg.vue';
import { QSpinnerGears } from 'quasar';
import { kebabCase } from 'lodash';

/**
 * Product type options
 * @type {{ value: string, label: string }[]}
 */
let types = [
  { value: productConstants.PRODUCT_TYPES.FRUIT, label: 'Fruits & Légumes' },
  { value: productConstants.PRODUCT_TYPES.PROTEIN, label: 'Protéines' },
  { value: productConstants.PRODUCT_TYPES.CARBOHYDRATE, label: 'Féculents' },
  { value: productConstants.PRODUCT_TYPES.SWEET, label: 'Sucré' },
  { value: productConstants.PRODUCT_TYPES.FRESH, label: 'Frais' },
  { value: productConstants.PRODUCT_TYPES.DRINK, label: 'Boissons' },
  { value: productConstants.PRODUCT_TYPES.HOUSEHOLD, label: 'Droguerie' },
  { value: productConstants.PRODUCT_TYPES.OTHER, label: 'Autres' },
];

/**
 * Product unit control options
 * @type {{ value: string, label: string }[]}
 */
let controls = [
  { value: productConstants.PRODUCT_CONTROLS.NUMBER, label: 'Unité', labelOne: 'unité', labelMany: 'unités' },
  { value: productConstants.PRODUCT_CONTROLS.SLIDER, label: 'Pourcentage', labelOne: '%', labelMany: '%' },
];

export default {
  name: 'SettingsForm',
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  components: {
    StorageImg,
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  props: {
    /**
     * Product to edit. If no product is passed, the form is in "add" mode
     * @type {Product|null}
     */
    product: null,
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  data() {
    return {
      /**
       * Product units controls options
       * @type {{ value: string, label: string }[]}
       */
      controls,
      /**
       * Product id model
       * @type {string}
       */
      modelId: '',
      /**
       * Product image model
       * @type {{ file: File, base64: string }}
       */
      modelImage: null,
      /**
       * Product name model
       * @type {string}
       */
      modelName: '',
      /**
       * Product type model
       * @type {{ value: string, label: string }}
       */
      modelType: null,
      /**
       * Product units model
       * @type {ProductUnit[]}
       */
      modelUnits: [ this.__unitInstance() ],
      /**
       * Product types options
       * @type {{ value: string, label: string }[]}
       */
      types,
    };
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  watch: {
    /**
     * Set the form values
     * @param {Product} product
     */
    product(product) {
      /** @type {Product} */
      product = product ? JSON.parse(JSON.stringify(this.product)) : null;

      this.modelId = product ? product.id : '';
      this.modelImage = null;
      this.modelName = product ? product.name : '';
      this.modelType = product ? this.types.find(t => t.value === product.type) : null;
      this.modelUnits = product ? product.units.map((unit) => {
        unit.__key = '' + Math.random();
        unit.control = /** @type {string} */ controls.find(u => u.value === unit.control);
        return unit;
      }) : [ this.__unitInstance() ];
    },
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    /**
     * Slug a model id from the name
     * @returns {string}
     */
    id() {
      return this.product ? this.modelId : kebabCase(this.modelName).replace(/&/g, '-');
    },
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    /**
     * Clean a unit from its component specific keys
     * @param unit
     * @returns {ProductUnit}
     * @private
     */
    __unitClean(unit) {
      let many = this.unitNeedsMany(unit) ? unit.many : unit.one;
      delete unit.__key;
      unit.alert = Number(unit.alert);
      unit.control = unit.control.value;
      unit.increment = Number(unit.increment);
      unit.many = many;
      unit.quantity = Number(unit.quantity);
      return unit;
    },
    /**
     * Generate a product unit instance
     * @returns {ProductUnit}
     * @private
     */
    __unitInstance() {
      return {
        __key: '' + Math.random(),
        alert: 0,
        control: /** @type {string} */ JSON.parse(JSON.stringify(controls[0])),
        increment: 0,
        many: '',
        one: '',
        quantity: 0,
      };
    },
    /**
     * Display a preview of the chosen product image anytime it changes
     * @param {File} file
     */
    onImageInput(file) {
      const reader = new FileReader();
      reader.onload = () => this.modelImage = { file, base64: reader.result };
      reader.onerror = () => this.$q.dialog({ message: 'Impossible de lire l\'image' });
      reader.readAsDataURL(file);
    },
    /**
     * Shows a dialog with strong user interaction in order to delete the product
     */
    remove() {
      let htmlMessage = `<div class="text-red">Pour supprimer le produit <strong>${ this.modelName }</strong>, merci d'écrire son nom et de valider</div>`;
      this.$q.dialog({
        cancel: 'Annuler',
        html: true,
        message: htmlMessage,
        ok: 'Supprimer',
        persistent: true,
        prompt: { outlined: true },
        title: '<div class="text-red">Supression</div>',
      }).onOk((name) => {
        name = name ? '' + name : '';
        if (name === this.modelName) {
          this.$q.loading.show({ spinner: QSpinnerGears });
          this.$store.dispatch(productConstants.PRODUCT_DO_DELETE, { productId: this.modelId })
            .then(() => this.$emit('cancel'))
            .finally(() => setTimeout(() => this.$q.loading.hide(), 500));
        }
      });
    },
    /**
     * Reset the form
     */
    reset() {
      this.$refs.root.scrollTop = 0;
      this.modelId = '';
      this.modelImage = null;
      this.modelName = '';
      this.modelType = null;
      this.modelUnits = [ this.__unitInstance() ];
    },
    /**
     * Submit the product form to the store depending on the form state (create/update)
     */
    submit() {
      let action = this.product ? productConstants.PRODUCT_DO_UPDATE : productConstants.PRODUCT_DO_CREATE;
      let payload = {
        file: this.modelImage ? this.modelImage.file : null,
        product: {
          id: this.id,
          name: this.modelName,
          type: this.modelType && this.modelType.value,
          units: JSON.parse(JSON.stringify(this.modelUnits)).map(unit => this.__unitClean(unit)),
        },
      };
      this.$q.loading.show({ spinner: QSpinnerGears });
      this.$store.dispatch(action, payload)
        .then(() => this.$emit('cancel'))
        .catch((errors) => console.log(errors))
        .finally(() => setTimeout(() => this.$q.loading.hide(), 500));
    },
    /**
     * Add a new unit the the product unit list
     */
    unitAdd() {
      this.modelUnits.push(this.__unitInstance());
    },
    /**
     * Move a product unit down in the product unit list
     * @param {ProductUnit} unit
     */
    unitDown(unit) {
      let index = this.modelUnits.indexOf(unit);
      if (index < this.modelUnits.length) {
        this.modelUnits.splice(index, 1);
        this.modelUnits.splice(index + 1, 0, unit);
      }
    },
    /**
     * Whether a unit needs to display the "many" field
     * @param {ProductUnit} unit
     * @returns {boolean}
     */
    unitNeedsMany(unit) {
      return unit.control.value === productConstants.PRODUCT_CONTROLS.NUMBER;
    },
    /**
     * Reove a product unit from the product unit list
     * @param {ProductUnit} unit
     */
    unitRemove(unit) {
      if (this.modelUnits.length > 1) {
        let index = this.modelUnits.indexOf(unit);
        let name = unit.one ? `"${ unit.one }"` : `(${ index + 1 })`;
        this.$q.dialog({
          message: `Supprimer le stock ${ name } ?`,
          ok: 'Oui',
        }).onOk(() => {
          this.modelUnits.splice(index, 1);
        });
      }
    },
    /**
     * Determine witch unit suffix to display depending on its control
     * @param {ProductUnit} unit
     * @param {string} key
     * @returns {string}
     */
    unitSuffix(unit, key) {
      return unit.control[`label${ unit[key] >= 2 && 'Many' || 'One' }`];
    },
    /**
     * Move a product unit up in the product unit list
     * @param {ProductUnit} unit
     */
    unitUp(unit) {
      let index = this.modelUnits.indexOf(unit);
      if (index > 0) {
        this.modelUnits.splice(index, 1);
        this.modelUnits.splice(index - 1, 0, unit);
      }
    },
  },
};
