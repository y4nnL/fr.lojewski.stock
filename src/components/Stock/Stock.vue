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
                     :to="'/stock/' + to"
                     :label="label"
                     :key="to"/>
      </q-tabs>
    </q-header>
    <filters :namespace="productNs"
             class="fixed stock-filters"
             @height="filtersHeight = $event"
             :style="{ height: showFilters ? filtersHeight + 'px' : 0 }"/>
    <q-page-container class="fixed stock-container"
                      :style="{ top: (showFilters ? 98 + filtersHeight: 98) + 'px' }">
      <q-page class="stock-page">
        <router-view/>
      </q-page>
    </q-page-container>
    <q-dialog v-model="settings"
              position="bottom">
      <settings/>
    </q-dialog>
  </q-layout>

</template>
<style lang="scss" scoped>@import './Stock';</style>
<script src="./Stock.js"></script>
