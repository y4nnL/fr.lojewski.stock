<template>
  <q-card class="s-product full-height">
    <q-img class="s-product-img"
           :src="imagePath"
           transition="fade"
           spinner-color="white"
           placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADIAQMAAABoEU4WAAAAA1BMVEVwhp6J5dQEAAAAHklEQVQYGe3BMQEAAADCIPunXghfYAAAAAAAAABwCB54AAEPpFPOAAAAAElFTkSuQmCC">
      <div class="absolute-bottom text-h6 s-product-title">{{ name }}</div>
      <template v-slot:loading>
        <q-spinner-gears color="white" />
      </template>
    </q-img>
    <q-card-actions>
      <s-product-unit v-for="(unit, index) in units"
                      :key="index"
                      class="q-pl-sm"
                      v-bind="unit"
                      @increment="$emit('increment', { unitIndex: index })"
                      @decrement="$emit('decrement', { unitIndex: index })"
                      @quantity="$emit('quantity', { unitIndex: index, quantity: $event })"></s-product-unit>
    </q-card-actions>
  </q-card>
</template>

<style lang="scss" scoped>@import './Product';</style>
<script src="./Product.js"></script>
