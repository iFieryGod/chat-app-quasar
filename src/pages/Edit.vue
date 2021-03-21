<template>
  <q-page padding class="bg-grey-1" flex flex-center>
    <q-card style="width: 350px">
      <q-card-section>
        <h6 class="no-margin">Edit User account</h6>
        <img :src="this.getUser.avatar.key"/>
        <p>{{ this.getUser.avatar}}</p>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md">
          <avatar-input v-model="avatar" ref="avatar" />
          <name-input v-model.trim="name" />
          <username-input v-model.trim="username" />
          <q-separator/>
          <password-input v-model.trim="password" label="Your old Password"/>
          <password-input v-model.trim="newPassword" label="Your new password"/>
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
            label="Update"
            type="submit"
            color="primary"
            class="q-ml-sm"
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
  name: 'EditUser',
  data: () => ({
    name: '',
    username: '',
    avatar: '',
    password: '',
    newPassword: '',
  }),
  methods: {
    ...mapActions('user', [
      'editUser',
    ]),
    async onSubmit() {
      try {
        await this.$refs.avatar.uploadFile();

        await this.editUser({
          name: this.name,
          avatar: this.$refs.avatar.s3file,
          username: this.username,
          password: this.password,
          newPassword: this.newPassword,
        });

        await this.$q.dialog({
          message: 'Successful',
        });
      } catch (e) {
        this.$q.dialog({
          message: e.message,
        });
      }
    },
    onReset() {
      this.name = this.getUser.name;
      this.username = this.getUser.username;
      this.password = '';
      this.newPassword = '';
    },
  },
  components: {
    NameInput: () => import('components/NameInput'),
    UsernameInput: () => import('components/UsernameInput'),
    PasswordInput: () => import('components/PasswordInput'),
    AvatarInput: () => import('components/AvatarInput'),
  },
  created() {
    this.name = this.getUser.name;
    this.username = this.getUser.username;
    this.avatar = this.getUser.avatar;
  },
  computed: {
    ...mapGetters('user', [
      'getUser',
      'isLoading',
    ]),
  },
};
</script>
