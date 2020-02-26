<template>
  <!-- 关键字搜索框 -->
  <div class="search-row-box">
    <a-col style="width:fit-content;margin-left: 50px;">
      <p class="custom-label">{{ name }}</p>
    </a-col>
    <a-col style="margin-right: 15px;">
      <a-select v-model="dftValue" style="width: 120px" @change="handleChange">
        <a-select-option value="1">自然天</a-select-option>
        <a-select-option value="2">自然月</a-select-option>
      </a-select>
    </a-col>
    <a-col>
      <a-date-picker @change="onChange" v-if="dftValue == 1" />
      <a-month-picker
        @change="onChange"
        placeholder="请选择月份"
        v-if="dftValue == 2"
      />
    </a-col>
  </div>
</template>

<script>
export default {
  name: "CustomInputSearch",
  props: {
    name: { type: String, default: "时间筛选" },
    keyName: { type: String, required: true },
    refName: { type: String, default: "" },
    placeholder: { type: String, default: "请输入" }
  },
  data() {
    return {
      dftValue: "1",
      dateString: []
    };
  },
  methods: {
    onSelectOk() {},
    handleChange(value) {
      this.dftValue = value;
    },
    onChange(date, dateString) {
      this.dateString = dateString;
      this.$emit("input", {
        name: this.keyName,
        value: this.dateString
      });
    }
  },
  created() {}
};
</script>

<style scoped lang="less">
.custom-label {
  margin-bottom: 0;
  text-align: right;
  color: rgba(0, 0, 0, 0.85);
  &:after {
    content: ":";
    margin: 0 8px 0 2px;
    position: relative;
    top: -0.5px;
  }
}
.search-buttonBox > button:nth-child(1) {
  margin-right: 10%;
}
</style>
