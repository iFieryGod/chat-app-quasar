<template>
  <q-layout view="hHh 1pR fFF">
    <q-header elevated>
      <q-toolbar>
        <q-btn
        v-go-back="$route.meta.goBack"
        dense
        flat
        round
        icon="keyboard_arrow_left"
        />
        <q-toolbar-title>
          Chat App - {{ $route.params.name }}
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
    <q-footer class="bg-white">
      <q-toolbar>
        <q-toolbar-title>
          <chat-input />
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script>
import ChatInput from 'src/components/ChatInput';
import { signOut } from '../driver/auth';

export default {
  name: 'MessagesLayout',
  components: {
    ChatInput,
  },
  methods: {
    async logOff() {
      await signOut();
      window.location.reload();
    },
  },
};
</script>
