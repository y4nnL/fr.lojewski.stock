<template>

  <q-layout view="hHh lpR lfr"
            class="bg-white s-settings"
            container>
    <q-header class="bg-secondary">
      <q-toolbar>
        <q-toolbar-title>
          Liste des produits
        </q-toolbar-title>
        <q-btn dense flat round
               icon="add"
               @click="add = !add">
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <p v-for="item in list">{{ item.name }}...................................................</p>
        <q-dialog v-model="add"
                  position="bottom">
          yo
        </q-dialog>
      </q-page>
    </q-page-container>

  </q-layout>

</template>
<style lang="scss" scoped>@import './Settings';</style>
<script src="./Settings.js"></script>
