<template>
  <!-- 关键字搜索框 -->
  <div class="search-row-box">
    <a-col style="width:fit-content;margin-left: 50px;">
      <p class="custom-label">{{ name }}</p>
    </a-col>
    <a-col :style="styleCss">
      <a-input-search
        :placeholder="placeholder"
        @search="onSearch"
        enter-button="搜索"
        v-model="keyWords"
        :ref="refName"
        ><a-icon
          v-show="keyWords"
          slot="suffix"
          type="close-circle"
          @click="inputEmpty(refName)"
      /></a-input-search>
    </a-col>
    <a-col :span="3" push="1" class="search-buttonBox">
      <!--      <a-button type="primary" @click="onSearch">搜索</a-button>-->
      <a-button v-if="hasReset" type="danger" @click="keyWordsReset"
        >重置</a-button
      >
    </a-col>
  </div>
</template>

<script>
export default {
  name: "CustomInputSearch",
  props: {
    name: { type: String, default: "" },
    keyName: { type: String, required: true },
    refName: { type: String, default: "" },
    styleCss: { type: String, default: "width: 260px" },
    hasReset: { type: Boolean, default: false },
    placeholder: { type: String, default: "请输入" },
    selectedValueProps: { type: String, default: undefined }
  },
  data() {
    return {
      keyWords: undefined
    };
  },
  methods: {
    //清空输入框
    inputEmpty(inputName) {
      this.$refs[inputName].focus();
      this.keyWords = undefined;
      this.$emit("input", { name: this.keyName, value: "" });
    },
    //点击搜索传数据出去
    onSearch() {
      this.$emit("input", { name: this.keyName, value: this.keyWords });
    },
    keyWordsReset() {
      this.$emit("searchRest");
    }
  },
  created() {
    this.selectedValueProps ? (this.keyWords = this.selectedValueProps) : "";
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
