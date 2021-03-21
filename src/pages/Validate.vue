<template>
  <q-page padding class="bg-grey-1" flex flex-center>
    <q-card style="width: 350px">
      <q-card-section>
        <h6 class="no-margin">Validate new Account</h6>
        <div class="text-subtitle2">{{ getUserEmail }}</div>
      </q-card-section>
      <q-card-section>
        <p>A Validation code was sent to your E-Mail,</p>
        <p>Please enter it to validate your new account.</p>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input v-model.trim="code"
          :rules="[(val) => !!val || 'Please enter a valid code']"
          outlined
          label="Validation Code"
          lazy-rules
          />
          <q-card-actions align="right">
            <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            @click="onReset"
            />
            <q-btn
            flat
            label="Re-send code"
            color="secondary"
            class="q-ml-sm"
            @click="resendCode"
            />
            <q-btn
            label="Validate"
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
import { resendValidationCode } from '../driver/auth';

export default {
  name: 'Validate',
  data: () => ({
    code: '',
  }),
  computed: {
    ...mapGetters('user', [
      'isLoading',
      'getUserEmail',
    ]),
  },
  methods: {
    ...mapActions('user', [
      'createNewUser',
    ]),
    async onSubmit() {
      try {
        await this.createNewUser(this.code);
        // eslint-disable-next-line no-console
        await this.$router.replace({ name: 'Index' });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('real err', e);
        this.$q.dialog({
          message: e.message,
        });
      }
    },
    async resendCode() {
      await resendValidationCode(this.getUserEmail);
    },
    onReset() {
      this.code = '';
    },
  },
};
</script>
