<template>

  <div>
    <q-header class="bg-spotted text-white"
              elevated
              :height-hint="headerHeightHint">
      <q-toolbar>
        <q-toolbar-title>Stock</q-toolbar-title>
        <q-btn icon="filter_list"
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
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab v-for="(label, to) in tabs"
                     :key="to"
                     :label="label"
                     :to="`${ROUTER_PATH_STOCK}/${to}`"/>
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
  </div>

</template>
<style lang="scss" scoped>@import './Stock';</style>
<script src="./Stock.js"></script>
