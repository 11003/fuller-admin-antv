<template>
  <!-- 下拉框 -->
  <div class="search-row-box">
    <a-col style="width: 120px">
      <p class="custom-label">{{ name }}</p>
    </a-col>
    <a-col style="width: 200px">
      <a-select
        :placeholder="placeholder"
        @change="onSelectChange"
        v-model="selectedValue"
      >
        <a-select-option
          v-for="(selectItem, indexItem) of selectList"
          :key="indexItem"
          :value="selectItem.value"
          >{{ selectItem.label }}</a-select-option
        >
      </a-select>
    </a-col>
  </div>
</template>

<script>
export default {
  name: "CustomSelect",
  props: {
    refName: { type: String, default: undefined },
    name: { type: String, default: "请传入name" },
    placeholder: { type: String, default: "请选择" },
    keyName: { type: String, required: true },
    selectChildren: {
      type: Array,
      default: () => [
        { value: 1, label: "全部" },
        { value: 2, label: "燕山路" },
        { value: 3, label: "幕府路" }
      ]
    }
  },
  data() {
    return {
      selectedValue: undefined,
      selectList: []
    };
  },
  created() {
    if (this.selectChildren && this.selectChildren.length != 0) {
      this.selectList = this.selectChildren;
    }
  },
  methods: {
    //选择改变
    onSelectChange() {
      this.$emit("input", { name: this.keyName, value: this.selectedValue });
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
