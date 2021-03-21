<template>
  <q-page padding class="bg-grey-1" flex flex-center>
    <q-card style="width: 350px">
      <q-card-section>
        <h6 class="no-margin">Chat Application</h6>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md">
          <email-input v-model.trim="email" />
          <password-input v-model.trim="password" />
          <q-card-actions align="right">
            <q-btn
            label="Create new account"
            color="primary"
            flat
            class="q-ml-sm"
            @click="createAccount"
            />
            <q-btn
            label="Login"
            type="submit"
            color="primary"
            @click="onSubmit"
            />
            <q-inner-loading :showing="isLoading">
              <q-spinner size="50px" color="primary" />
            </q-inner-loading>
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Index',
  components: {
    PasswordInput: () => import('components/PasswordInput'),
    EmailInput: () => import('components/EmailInput'),
  },
  data: () => ({
    email: '',
    password: '',
  }),
  computed: {
    ...mapGetters('user', [
      'isLoading',
      'getUserId',
    ]),
  },
  async beforeMount() {
    // eslint-disable-next-line no-console
    console.log(this.getUserId);
    if (this.getUserId) {
      await this.$router.replace({ name: 'Contacts' });
    }
  },
  methods: {
    ...mapActions('user', [
      'signInUser',
    ]),
    async onSubmit() {
      try {
        await this.signInUser({
          email: this.email,
          password: this.password,
        });
        await this.$router.push({ name: 'Contacts' });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('error login');
        this.$q.dialog({
          message: err.message,
        });
      }
    },
    createAccount() {
      this.$router.push({ name: 'SignUp' });
    },
  },
};
</script>
