<template>
  <select @change="changeOption">
    <option disabled value="">Выберите из списка:</option>
    <option v-for="option in options" :key="option.id" :value="option.id">
      {{ option.value }}
    </option>
  </select>
</template>

<script>
export default {
  name: "my-select",
  props: {
    modelValue: {},
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOption(event) {
      this.$emit("update:model-value", {
        optId: event.target.value,
        listId: this.modelValue,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./src/assets/scss/var.scss";

select {
  background: $bg_base;
  padding: $pd_vsmall;
  margin: 0 $pd_big;
  font-size: $heder_3;
  color: $color_base;
  width: $width_select;
  text-align: center;

  & > option {
    color: $color_base;
    font-size: $header_5;
    padding: $pd_small;
  }
}
</style>