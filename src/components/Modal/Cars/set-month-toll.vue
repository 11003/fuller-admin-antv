<template>
  <div class="set-month-toll">
    <a-form :form="form">
      <a-form-item v-bind="formItemLayout" label="选择计费方式">
        <a-radio-group class="input-item" name="radioGroup" :defaultValue="1">
          <a-radio :value="1">临停</a-radio>
          <a-radio :value="2">包月</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="选择停车场">
        <a-tree-select
          class="input-item"
          :treeData="treeData"
          :value="value"
          @change="onChange"
          treeCheckable
          :treeDefaultExpandAll="true"
          placeholder="请选择停车场"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="选择设备">
        <a-select
          class="input-item"
          showSearch
          placeholder="请选择设备"
          optionFilterProp="children"
        >
          <a-select-option v-for="item in device_list" :value="item.key">{{
            item.value
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="选择月份">
        <a-select placeholder="请选择月份" class="input-item">
          <a-select-option v-for="i in 12" :value="i">
            {{ i + `月` }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="包月停车价格">
        <a-input-number
          class="input-item"
          placeholder="请输入包月停车价格"
        /><span class="ml5">元</span>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
const treeData = [
  {
    title: "全选",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "武侯区停车场",
        value: "0-0-0",
        key: "0-0-0"
      },
      {
        title: "双流区停车场",
        value: "0-1-0",
        key: "0-1-0"
      },
      {
        title: "金牛区停车场",
        value: "0-1-1",
        key: "0-1-1"
      },
      {
        title: "青羊区停车场",
        value: "0-1-2",
        key: "0-1-2"
      }
    ]
  }
];
const top_money_list = [{ key: 1, value: 1 }, { key: 2, value: 2 }];
const device_list = [{ key: 1, value: "索尼" }, { key: 2, value: "华为" }];
export default {
  name: "SetMonthToll",
  data() {
    return {
      value: ["0-0-0"],
      treeData,
      device_list,
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 }
      },
      form: this.$form.createForm(this, { name: "coordinated" }),
      top_money_list,
      firstStop: true,
      topMoney: true
    };
  },
  methods: {
    confirm() {
      return { res: "12312321" };
    },
    onChange(value) {
      console.log("onChange ", value);
      this.value = value;
    },
    onChangeTime(date, dateString) {
      console.log(date, dateString);
    },
    addNumber(index) {
      this.top_money_list.push({ key: index, value: index });
    },
    delNumber(index) {
      if (this.top_money_list.length > 1) {
        this.top_money_list.splice(index, 1);
      }
    }
  }
};
</script>

<style lang="less">
.set-month-toll {
  padding: 2rem 4rem 0 8rem;
  .input-item {
    width: 300px;
  }
}
</style>
