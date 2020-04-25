<template>


  <transition appear name="product-list-fade">
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

</template>
<style lang="scss" scoped>@import './ProductList';</style>
<script src="./ProductList.js"></script>
