<template>
  <div class="InputMap">
    <a-form style="margin-top: 20px">
      <a-form-item v-bind="formItemLayout" :label="inputName">
        <a-input max="15" :placeholder="`请输入` + inputName" />
      </a-form-item>
      <map-normal />
    </a-form>
  </div>
</template>

<script>
import MapNormal from "@/components/Modal/map-normal";
export default {
  name: "InputMap",
  components: {
    MapNormal
  },
  props: {
    inputName: { default: "商城名称" }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 }
      }
    };
  }
};
</script>

<style scoped></style>
