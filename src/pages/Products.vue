<template>

  <q-page style="position: relative">
    <transition appear name="s-fade">
      <template v-if="!fetching && filteredProducts.length">
        <q-pull-to-refresh @refresh="refresh">
          <div class="flex row q-pa-md q-col-gutter-md items-stretch">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 items-stretch"
                 v-for="product in filteredProducts"
                 :key="product.id">
              <product v-bind="product"
                       @increment="increment(product, $event)"
                       @decrement="decrement(product, $event)"
                       @quantity="quantity(product, $event)"/>
            </div>
          </div>
        </q-pull-to-refresh>
      </template>
      <template v-if="!fetching && !filteredProducts.length">
        <div class="absolute-top text-center full-width q-pt-lg">
          <p>
            <img src="~assets/sad.svg"
                 style="width:30vw;max-width:150px;">
          </p>
          <p class="text-faded text-h6">Aucun produit trouvé</p>
          <div v-if="hasFilters"
               class="text-faded">
            <p class="q-pa-none q-ma-none q-mb-xs">Des filtres sont actifs</p>
            <q-btn v-if="hasFilters"
                   flat
                   class="bg-secondary text-white"
                   @click="resetFilters">
              Supprimer les filtres
            </q-btn>
          </div>
          <q-btn v-else
                 flat
                 class="bg-secondary text-white">
            Créer un produit
          </q-btn>
        </div>
      </template>
    </transition>
  </q-page>

</template>
<style>

  .s-fade-enter-active,
  .s-fade-leave-active {
    transition: opacity .3s;
  }

  .s-fade-enter,
  .s-fade-leave-to {
    opacity: 0;
  }

</style>
<script>

  import Product from '../components/Product/Product.vue';
  import {
    PRODUCT_GETTER_FILTERED_LIST,
    PRODUCT_DISPATCH_INCREMENT,
    PRODUCT_DISPATCH_DECREMENT,
    PRODUCT_DISPATCH_QUANTITY,
    PRODUCT_DISPATCH_FETCH_LIST,
    PRODUCT_DISPATCH_RESET_FILTERS,
    PRODUCT_GETTER_FILTERS, PRODUCT_NS, PRODUCT_SHOW_FILTERS
  } from '../store/product/constants';
  import { QSpinnerGears } from 'quasar';
  import { mapState } from 'vuex';

  export default {
    name: 'Products',
    data() {
      return {
        productNs: PRODUCT_NS,
        fetching: true
      };
    },
    components: {
      Product
    },
    created() {
      this.$q.loading.show({
        spinner: QSpinnerGears
      });
      this.refresh(() => {
        this.fetching = false;
        setTimeout(() => this.$q.loading.hide(), 500);
      });
    },
    computed: {
      filteredProducts() {
        return this.$store.getters[PRODUCT_GETTER_FILTERED_LIST];
      },
      hasFilters() {
        return !!this.$store.getters[PRODUCT_GETTER_FILTERS].length;
      }
    },
    methods: {
      refresh(done) {
        this.$store.dispatch(PRODUCT_DISPATCH_FETCH_LIST)
          .finally(done);
      },
      increment(product, { unitIndex }) {
        this.$store.dispatch(PRODUCT_DISPATCH_INCREMENT, {
          productId: product.id,
          unitIndex
        });
      },
      decrement(product, { unitIndex }) {
        this.$store.dispatch(PRODUCT_DISPATCH_DECREMENT, {
          productId: product.id,
          unitIndex
        });
      },
      quantity(product, { unitIndex, quantity }) {
        this.$store.dispatch(PRODUCT_DISPATCH_QUANTITY, {
          productId: product.id,
          unitIndex,
          quantity
        });
      },
      resetFilters() {
        this.$store.dispatch(PRODUCT_DISPATCH_RESET_FILTERS);
      }
    }
  };

</script>
