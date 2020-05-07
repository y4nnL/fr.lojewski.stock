<template>

  <q-page-container>
    <q-page class="bg-calm flex items-center justify-center">
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
    </q-page>
  </q-page-container>

</template>
<style lang="scss" scoped>@import './Account';</style>
<script src="./Account.js"></script>
