<template>

  <q-layout view="hHh lpR fFf">
    <q-header elevated
              class="bg-primary text-white"
              height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          Stock
        </q-toolbar-title>
        <q-btn dense flat round
               icon="sort"
               @click="toggleFilters">
          <q-badge v-if="filtersCount"
                   color="red"
                   class="vertical-bottom"
                   floating>
            <strong>{{ filtersCount }}</strong>
          </q-badge>
        </q-btn>
        <q-btn dense flat round
               icon="settings"
               @click="settings = !settings">
        </q-btn>
        <q-btn dense flat round
               icon="person">
          <q-menu anchor="bottom right"
                  self="top right">
            <q-card>
              <q-card-section class="q-pr-xl">
                <div>Email</div>
                <div class="text-subtitle1"><strong>{{ user.name }}</strong></div>
              </q-card-section>
              <q-card-actions class="q-pa-md">
                <q-btn flat
                       class="bg-secondary text-white full-width"
                       :loading="disconnecting"
                       @click="logout">Déconnexion
                </q-btn>
              </q-card-actions>
            </q-card>
          </q-menu>
        </q-btn>
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab v-for="(label, to) in tabs"
                     :to="'/products/' + to"
                     :label="label"
                     :key="to"/>
      </q-tabs>
    </q-header>
    <filters :namespace="productNs"
             class="fixed s-filters"
             @height="filtersHeight = $event"
             :style="{ height: showFilters ? filtersHeight + 'px' : 0 }"/>
    <q-page-container class="fixed s-container"
                      :style="{ top: (showFilters ? 98 + filtersHeight: 98) + 'px' }">
      <router-view/>
    </q-page-container>
    <q-dialog v-model="settings"
              position="bottom">
      <settings/>
    </q-dialog>
  </q-layout>

</template>
<style scoped>
  .s-container,
  .s-filters {
    top: 98px;
    left: 0;
    right: 0;
  }

  .s-container {
    transition: top .3s ease-out;
    bottom: 0;
    padding: 0 !important;
    overflow: auto;
  }

  .s-filters {
    transition: height .3s ease-out;
    overflow: hidden;
  }

  .s-container > main {
    min-height: auto !important;
  }
</style>
<script>

  import Settings from '../components/Settings/Settings.vue';
  import Filters from '../components/Filters/Filters.vue';
  import { mapState } from 'vuex';
  import {
    PRODUCT_DISPATCH_TOGGLE_FILTERS,
    PRODUCT_GETTER_FILTERS, PRODUCT_NS, PRODUCT_SHOW_FILTERS,
    PRODUCT_TYPES
  } from '../store/product/constants';
  import {
    AUTH_NS, AUTH_USER,
    AUTH_DISPATCH_LOGOUT
  } from '../store/auth/constants';
  import { ROUTE_NAME_AUTH } from '../router/constants';

  const tabs = {
    [PRODUCT_TYPES.ALL]: 'Tous',
    [PRODUCT_TYPES.FRUIT]: 'Fruits & Légumes',
    [PRODUCT_TYPES.PROTEIN]: 'Protéines',
    [PRODUCT_TYPES.CARBOHYDRATE]: 'Féculents',
    [PRODUCT_TYPES.FRESH]: 'Frais',
    [PRODUCT_TYPES.DRINK]: 'Boissons',
    [PRODUCT_TYPES.OTHER]: 'Autres'
  };

  export default {
    name: 'Main',
    components: {
      Settings,
      Filters
    },
    data() {
      return {
        filtersHeight: 0,
        account: false,
        filters: false,
        settings: false,
        disconnecting: false,
        productNs: PRODUCT_NS,
        tabs
      };
    },
    computed: {
      ...mapState(AUTH_NS, {
        [AUTH_USER]: (state) => state.user
      }),
      ...mapState(PRODUCT_NS, [
        PRODUCT_SHOW_FILTERS
      ]),
      filtersCount() {
        return this.$store.getters[PRODUCT_GETTER_FILTERS].length;
      }
    },
    methods: {
      toggleFilters() {
        this.$store.dispatch(PRODUCT_DISPATCH_TOGGLE_FILTERS);
      },
      logout() {
        this.disconnecting = true;
        setTimeout(() => {
          this.$store.dispatch(AUTH_DISPATCH_LOGOUT)
            .then(() => this.$router.push({ name: ROUTE_NAME_AUTH }))
            .finally(() => this.disconnecting = false);
        }, 750);
      }
    }
  };

</script>
