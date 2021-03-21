<template>
  <q-input
  :value="value"
  :rules="[
      (value) => !!value || 'Please type a valid Name',
      (value) => value.length >= 5 || 'Please type a Name of atleast five characters long',
    ]"
  outlined
  label="Your Name"
  lazy-rules
  v-on="$listeners"
  />
 </template>

<script>
export default {
  name: 'NameInput',
  props: {
    value: {
      type: String,
      default: '',
      required: false,
    },
  },
};
</script>
