<template>
  <q-layout view="hHh Lpr 1ff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          replace
          :icon="$route.meta.goBack ? 'keyboard_arrow_left' : 'person'"
          :to="$route.meta.goBack ? $route.meta.goBack : {name: 'Edit'}"
          />
        <q-toolbar-title>
          Chat App
        </q-toolbar-title>
        <q-btn
        dense
        flat
        round
        icon="exit_to_app"
        @click="logOff"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { signOut } from '../driver/auth';

export default {
  name: 'ChatLayout',
  methods: {
    async logOff() {
      await signOut();
      window.location.reload();
    },
  },
};
</script>
