<template>

  <div class="row full-width text-subtitle2">
    <div>
      Il reste
      <q-chip>
        <q-avatar class="overflow-hidden"
                  size="md"
                  text-color="white"
                  :color="color">
          <span class="product-unit-quantity"
                :style="{ 'font-size': this.control === 'slider' ? '70%' : '100%' }">{{ computedQuantity }}</span>
          <span class="product-unit-progressbar"
                v-if="control === 'slider'"
                :style="{ top: (100 - quantityModel) + '%' }"/>
        </q-avatar>
        <span v-if="quantity < 2">{{ one }}</span>
        <span v-else>{{ many }}</span>
      </q-chip>
    </div>
    <q-space/>
    <div v-if="control === 'number'">
      <q-btn color="accent"
             icon="add"
             @click="$emit('increment')"
             dense
             flat
             round/>
      <q-btn color="accent"
             icon="remove"
             @click="$emit('decrement')"
             dense
             flat
             round/>
    </div>
    <div class="product-unit-slider"
         v-else>
      <q-slider color="accent"
                label
                v-model="quantityModel"
                :label-value="this.one + ' ' + quantityModel + '%'"
                :max="100"
                :min="0"
                :step="increment"
                @change="$emit('quantity', quantityModel)"/>
    </div>
  </div>

</template>
<style lang="scss" scoped>@import './ProductUnit';</style>
<script src="./ProductUnit.js"></script>
