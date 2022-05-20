<template>
  <div class="chh-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col v-bind="colLayout" v-for="item in formItems" :key="item.label">
          <el-form-item :label="item.label" :rules="item.rules" :style="itemStyle">
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                :type="item.textarea"
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                :show-password="item.type === 'password'"
                :value="formData[item.field]"
                @input="(value) => onChangeValue(item.field, value)"
                :disabled="item.disabled"
              />
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                style="width: 100%"
                :value="formData[item.field]"
                @change="(value) => onChangeValue(item.field, value)"
                :disabled="item.disabled"
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :value="option.value"
                  :label="option.title"
                  >{{ option.title }}</el-option
                >
              </el-select>
            </template>
            <template v-else-if="item.type === 'datepicker'">
              <el-date-picker
                style="width: 100%"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-bind="item.otherOptions"
                v-model="formData[item.field]"
                :disabled="item.disabled"
              >
                > @change="value => onChangeValue(item.field, value)" ></el-date-picker
              >
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
    formItems: {
      type: Array,
      default: () => [],
    },
    labelWidth: {
      type: String,
      default: '100px',
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' }),
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      }),
    },
  },
  methods: {
    onChangeValue(field, value) {
      console.log('onChangeValue');
      this.$emit('onChangeValue', { ...this.formData, [field]: value });
    },
  },
};
</script>

<style lang="scss" scoped>
.chh-form {
  display: inline-block;
  left: 100px;
  position: relative;
  /* padding-top: 0px; */
  width: 300px;
}
</style>
