<template>

  <div ref="rootElement">
    <div class="bg-calm q-px-md q-py-sm text-h6 text-white">Filtrer les produits</div>
    <div class="q-pt-md q-px-md">
      <div>
        <q-input class="q-my-xs stock-filter-input"
                 color="accent"
                 size="md"
                 v-model="name"
                 outlined
                 square>
          <template v-slot:prepend>
            <q-icon name="search"/>
          </template>
          <template v-slot:append>
            <transition name="stock-filter-fade">
              <q-btn color="accent"
                     v-show="name"
                     @click.stop="name = ''"
                     flat
                     round>
                <q-icon class="cursor-pointer"
                        name="close"/>
              </q-btn>
            </transition>
          </template>
        </q-input>
      </div>
      <div>
        <q-toggle color="accent"
                  v-model="alert">
          <span class="text-subtitle1">Proche de la rupture</span>
        </q-toggle>
        <q-toggle color="accent"
                  v-model="os">
          <span class="text-subtitle1">En rupture</span>
        </q-toggle>
      </div>
    </div>
  </div>

</template>
<style lang="scss" scoped>@import './StockFilter';</style>
<script src="./StockFilter.js"></script>
