<template>
  <div class="row full-width text-subtitle2">
    <div>
      Il reste
      <q-chip>
        <q-avatar :color="color"
                  class="overflow-hidden"
                  size="md"
                  text-color="white">
          <span class="s-product-unit-quantity">{{ computedQuantity }}</span>
          <span v-if="control === 'slider'"
                class="s-product-unit-progressbar"
                :style="{ top: (100 - quantity) + '%' }"/>
        </q-avatar>
        <span v-if="quantity < 2">{{ one }}</span>
        <span v-else>{{ many }}</span>
      </q-chip>
    </div>
    <q-space />
    <div v-if="control === 'number'">
      <q-btn flat round dense
             color="accent"
             @click="$emit('increment')"
             icon="add"></q-btn>
      <q-btn flat round dense
             color="accent"
             @click="$emit('decrement')"
             icon="remove"></q-btn>
    </div>
    <div v-else="control === 'slider'"
         class="s-product-unit-slider">
      <q-slider v-model="quantity"
                :min="0"
                :max="100"
                label
                :label-value="quantity + '%'"
                color="accent"
                @change="$emit('quantity', quantity)"
                :step="increment"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>@import './ProductUnit';</style>
<script src="./ProductUnit.js"></script>
