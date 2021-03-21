<template>
<div>
  <q-input
    :value="value"
    :rules="[
        // eslint-disable-next-line no-mixed-operators
        (value) => !!value || 'Username is required',
        (value) => value.length >= 5 || 'Please type a valid Username of atleast five characters',
      ]"
    outlined
    label="Your Username"
    lazy-rules
    v-on="$listeners"
  />
</div>
</template>

<script>
export default {
  name: 'UsernameInput',
  props: {
    value: {
      type: String,
      default: '',
      required: false,
    },
  },
};
</script>
