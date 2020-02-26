<template>
  <div class="set-billing-method">
    <a-form>
      <a-form-item v-bind="formItemLayout" label="选择计费方式">
        <a-radio-group name="radioGroup" v-model="formData.toll_method">
          <a-radio :value="1">临停</a-radio>
          <a-radio :value="2">包月</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="选择停车场">
        <a-tree-select
          style="width: 300px"
          :treeData="treeData"
          :value="value"
          @change="onChange"
          treeCheckable
          :treeDefaultExpandAll="true"
          placeholder="请选择停车场"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="有无首停价格">
        <a-radio-group
          name="radioGroup"
          v-model="formData.first_stop_money.type"
        >
          <a-radio :value="1" @click="firstStop = true">有</a-radio>
          <a-radio :value="2" @click="firstStop = false">无</a-radio>
        </a-radio-group>
        <p v-show="firstStop">
          <a-input-number
            class="first-stop"
            placeholder="首停免费时长"
            v-model="formData.first_stop_money.free"
          /><span class=" ml5"
            >分钟<span class="first-stop-span-tip gray">无则不填</span></span
          ><br />
          <a-input-number
            class="first-stop"
            placeholder="首停时长"
            v-model="formData.first_stop_money.time"
          /><span class="ml5">分钟</span><br />
          <a-input-number
            class="first-stop"
            placeholder="首停价格"
            v-model="formData.first_stop_money.price"
          /><span class="ml5">元</span><br />
        </p>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="计时段收费">
        <span style="margin-right: 5px;">每</span>
        <a-input-number
          class="charge-time"
          v-model="formData.charge_time.time"
          placeholder="时长"
        /><span class="ml5 mr5">分钟</span>
        <a-input-number
          class="charge-time"
          placeholder="单价"
          v-model="formData.charge_time.price"
        /><span class="ml5">元</span>
        <p class="gray">不足xx分钟按xx分钟计</p>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="有无封顶价格">
        <div class="radio-group">
          <a-radio-group name="radioGroup" v-model="formData.top_money.type">
            <a-radio :value="1" @click="topMoney = true">有</a-radio>
            <a-radio :value="2" @click="topMoney = false">无</a-radio>
          </a-radio-group>
          <div v-show="topMoney" v-for="(item, index) in top_money_list">
            <a-range-picker class="input-time" @change="onChangeTime" />
            <a-input-number
              class="top-money"
              v-model="item.money"
              placeholder="封顶价格"
            /><span class="ml5">元</span>
            <span
              class="top-icon-list"
              v-if="top_money_list.length - 1 <= index"
            >
              <a-icon
                class="top-icon ml15"
                type="plus-circle"
                @click="addNumber(index)"
              />
              <a-icon
                class="top-icon ml5"
                type="minus-circle"
                @click="delNumber(index)"
              />
            </span>
            <br />
          </div>
        </div>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="计费公式">
        <p>首停价格+(总停分钟数-首停分钟数)/计时段*计时段单价</p>
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
const top_money_list = [{ money: "", value: "" }, { money: "", value: "" }];
const formData = {
  toll_method: 1, //选择计费方式
  p_list: "", //选择停车场
  // 有无首停价格
  first_stop_money: {
    type: 1, //有无
    free: "", //首停免费时长
    time: "", //首停时长
    price: "" //首停价格
  },
  //计时段收费
  charge_time: {
    time: "", //时长
    price: "" //单价
  },
  // 封顶加个
  top_money: {
    type: 1
  }
};
export default {
  name: "SetStopToll",
  data() {
    return {
      value: ["0-0-0"],
      treeData,
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 }
      },
      formData,
      top_money_list,
      firstStop: true,
      topMoney: true
    };
  },
  methods: {
    confirm() {
      return { res: this.formData };
    },
    onChange(value) {
      this.formData.p_list = value;
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
.set-billing-method {
  padding: 1rem 0 0 1rem;
  .custom-dialog {
    .ant-modal-content {
      .ant-modal-header {
        text-align: center;
      }
    }
  }
  .first-stop {
    width: 200px;
  }
  .first-stop-span-tip {
    margin-left: 8px;
  }
  .charge-time {
    width: 100px;
  }
  .gray {
    color: #999;
  }
  .input-time {
    width: 220px;
  }
  .top-money {
    margin-left: 2.5rem;
    width: 120px;
  }
  .top-icon-list {
    cursor: pointer;
  }
  .top-icon {
    font-size: 20px;
  }
}
</style>
