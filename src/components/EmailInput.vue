<template>
  <q-input
  :value="value"
  :rules="[
      (value) => !!value || 'Please provide an email address',
      (email) => /.@./.test(email) || 'email must be valid',
    ]"
  outlined
  type="email"
  label="Your Email Here"
  lazy-rules
  v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'EmailInput',
  props: {
    value: {
      type: String,
      default: '',
      required: false,
    },
  },
};
</script>
