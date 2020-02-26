<template>
  <!-- 下拉框 -->
  <div class="search-row-box">
    <a-col style="width:fit-content;margin-left: 50px;">
      <p class="custom-label">{{ name }}</p>
    </a-col>
    <a-col style="width: 332px">
      <a-range-picker
        v-model="selectedRange"
        @change="onSelectChange"
        @ok="onSelectOk"
        :showTime="{
          hideDisabledOptions: true
        }"
        format="YYYY-MM-DD HH:mm:ss"
      />
    </a-col>
  </div>
</template>

<script>
export default {
  name: "CustomSelectTimeRange",
  props: {
    refName: { type: String, default: undefined },
    name: { type: String, default: "请传入name" },
    placeholder: { type: String, default: "请选择" },
    keyName: { type: String, required: true },
    selectedValueProps: { type: Array, default: undefined }
  },
  data() {
    return {
      selectedRange: this.selectedValueProps,
      dateString: []
    };
  },
  created() {},
  methods: {
    onSelectOk() {
      this.$emit("input", {
        name: this.keyName,
        value: this.dateString.join("~")
      });
    },
    //选择改变
    onSelectChange(date, dateString) {
      this.dateString = dateString;
      if (dateString[0] === "") {
        this.onSelectOk();
      }
      // this.$emit("input", { name: this.keyName, value: dateString.join("~") });
    }
  }
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
