<template>

  <div class="app"
       id="q-app">
    <q-layout view="hHh lpr fFf">
      <router-view/>
      <q-footer class="bg-white z-top"
                v-if="isAuthenticated"
                bordered>
        <q-tabs class="flex row text-primary">
          <q-route-tab active-class="text-secondary"
                       class="col-3"
                       :to="ROUTER_PATH_STOCK">
            <q-icon name="dashboard"
                    size="sm"/>
            <span style="font-size: 70%">Stock</span>
          </q-route-tab>
          <q-route-tab active-class="text-secondary"
                       class="col-3"
                       :to="ROUTER_PATH_SHOPPING">
            <q-icon name="shopping_basket"
                    size="sm"/>
            <span style="font-size: 70%">Courses</span>
          </q-route-tab>
          <q-route-tab active-class="text-secondary"
                       class="col-3"
                       :to="ROUTER_PATH_SETTINGS">
            <q-icon name="settings"
                    size="sm"/>
            <span style="font-size: 70%">Paramètres</span>
          </q-route-tab>
          <q-route-tab active-class="text-secondary"
                       class="col-3"
                       :to="ROUTER_PATH_ACCOUNT">
            <q-icon name="person"
                    size="sm"/>
            <span style="font-size: 70%">Compte</span>
          </q-route-tab>
        </q-tabs>
      </q-footer>
    </q-layout>
  </div>

</template>
// style is imported through the css quasar conf file
<script src="./App.js"></script>
