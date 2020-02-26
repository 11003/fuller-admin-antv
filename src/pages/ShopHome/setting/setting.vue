<template>
  <div class="Setting">
    <div class="desc" style="margin-left: 15px;">
      <h1>停车场满场预警值设置</h1>
      <p>
        单个停车场满场预警(%)=(已停车位数/总车位数)*100%，达到预警值时会进行预警提示
      </p>
    </div>
    <a-form @submit="handleSubmit">
      <a-form-item
        label="Note"
        :label-col="{ span: 1 }"
        :wrapper-col="{ span: 3 }"
      >
        <a-input-number
          style="width: 230px;"
          :default-value="0"
          :min="0"
          :max="100"
          :formatter="value => `${value}%`"
          :parser="value => value.replace('%', '')"
          @change="onChange"
        />
      </a-form-item>
      <a-form-item style="margin-left: 15px;">
        <a-button type="primary" html-type="submit">
          保存
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "Setting",
  data() {
    return {
      formLayout: "horizontal"
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
    },
    onChange(value) {
      console.log(value);
    }
  }
};
</script>

<style scoped></style>
