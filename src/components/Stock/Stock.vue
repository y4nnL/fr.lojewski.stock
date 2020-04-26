<template>

  <q-layout view="hHh lpR fFf">
    <q-header class="bg-spotted text-white"
              elevated
              :height-hint="headerHeightHint">
      <q-toolbar>
        <q-toolbar-title>Stock</q-toolbar-title>
        <q-btn icon="sort"
               @click="toggleFilters"
               dense
               flat
               round>
          <q-badge class="vertical-bottom"
                   color="red"
                   v-if="filtersCount"
                   floating>
            <strong>{{ filtersCount }}</strong>
          </q-badge>
        </q-btn>
        <q-btn icon="settings"
               @click="settings = !settings"
               dense
               flat
               round>
        </q-btn>
        <q-btn icon="person"
               dense
               flat
               round>
          <q-menu anchor="bottom right"
                  self="top right">
            <q-card>
              <q-card-section class="q-pr-xl">
                <div>Email</div>
                <div class="text-subtitle1"><strong>{{ email }}</strong></div>
              </q-card-section>
              <q-card-actions class="q-pa-md">
                <q-btn class="bg-secondary full-width text-white"
                       :loading="disconnecting"
                       @click="logout"
                       flat>
                  Déconnexion
                </q-btn>
              </q-card-actions>
            </q-card>
          </q-menu>
        </q-btn>
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab v-for="(label, to) in tabs"
                     :key="to"
                     :label="label"
                     :to="'/stock/' + to"/>
      </q-tabs>
    </q-header>
    <stock-filter class="fixed stock-filters"
                  :style="filtersStyle"
                  @height="filtersHeight = $event"/>
    <q-page-container class="fix-qpulltorefresh fixed stock-container"
                      :style="pageContainerStyle">
      <q-page class="stock-page">
        <router-view/>
      </q-page>
    </q-page-container>
    <q-dialog position="bottom"
              v-model="settings">
      <settings/>
    </q-dialog>
  </q-layout>

</template>
<style lang="scss" scoped>@import './Stock';</style>
<script src="./Stock.js"></script>
