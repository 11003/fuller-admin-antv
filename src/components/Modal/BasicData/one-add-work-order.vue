<template>
  <div class="one-add-work-order">
    <a-form>
      <a-row>
        <a-col :span="24" class="mt25">
          <p class="desc">诉求信息</p>
        </a-col>

        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="工单编号">
            <a-input
              maxlength="11"
              placeholder="工单编号"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="诉求时间">
            <a-date-picker
              :showToday="false"
              showTime
              placeholder="诉求时间"
              @change="onChangePleaseTime"
              format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="诉求类型">
            <a-input
              maxlength="11"
              placeholder="诉求类型"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="诉求事件发生时间">
            <a-date-picker
              :showToday="false"
              showTime
              placeholder="诉求事件发生时间"
              @change="onChangePleaseEventHappenTime"
              format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="管辖地">
            <a-input
              placeholder="管辖地"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="紧急重大事项">
            <a-input
              placeholder="紧急重大事项"
              v-model="formData.rece_time"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="诉求来源">
            <a-input
              placeholder="诉求来源"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="回访类型">
            <a-input
              placeholder="信件编号"
              v-model="formData.rece_time"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :span="24">
          <a-form-item v-bind="formItemLayout24" label="归口类型">
            <a-input
              placeholder="归口类型"
              v-model="formData.rece_time"
              style="width: 100%"
            >
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item v-bind="formItemLayout24" label="诉求地址">
            <a-input class="input" placeholder="诉求地址" style="width: 100%" />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item v-bind="formItemLayout24" label="诉求目的">
            <a-textarea
              rows="2"
              class="f-limit"
              placeholder="诉求目的"
              style="width: 100%"
              v-model="formData.please_objective"
              :maxlength="please_objective_limit"
            />
            <span class="c-limit">{{
              0 +
                formData.please_objective.length +
                `/` +
                please_objective_limit
            }}</span>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item v-bind="formItemLayout24" label="诉求内容">
            <a-textarea
              class="f-limit"
              placeholder="诉求内容"
              rows="15"
              v-model="formData.please_content"
              :maxlength="please_content_limit"
            />
            <span class="c-limit">{{
              0 + formData.please_content.length + `/` + please_content_limit
            }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24" style="border-bottom: 1px solid #e8e8e8;"> </a-col>

        <a-col :span="24" class="mt25">
          <p class="desc">诉求人员信息</p>
        </a-col>

        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="姓名">
            <a-input
              placeholder="姓名"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="性别">
            <a-select v-model="formData.sex">
              <a-select-option value="1">男</a-select-option>
              <a-select-option value="2">女</a-select-option>
            </a-select>
          </a-form-item></a-col
        >

        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="电话1">
            <a-input
              maxlength="11"
              placeholder="电话1"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="电话2">
            <a-input
              maxlength="11"
              placeholder="电话2"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="电话3">
            <a-input
              maxlength="11"
              placeholder="电话3"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :span="24">
          <a-form-item v-bind="formItemLayout24" label="备注">
            <a-textarea
              class="f-limit"
              placeholder="备注"
              rows="15"
              v-model="formData.remark"
              :maxlength="remark_limit"
            />
            <span class="c-limit">{{
              0 + formData.remark.length + `/` + remark_limit
            }}</span>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
const formData = {
  order_id: "", //工单编号
  please_time: "", //诉求时间
  please_event_happen_time: "", //诉求事件发生时间
  sex: "1",
  please_objective: "", // 诉求目的
  please_content: "", //诉求内容
  remark: "" //备注
};
export default {
  name: "OneAddWorkOrder",
  data() {
    return {
      formData,
      please_objective_limit: 100, // 诉求目的的限制字数
      please_content_limit: 500, //诉求内容的限制字数
      remark_limit: 500, //备注的限制字数
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 12 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 }
        }
      },
      formItemLayout24: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 15 }
        }
      }
    };
  },
  methods: {
    onChangePleaseTime(value, dateString) {
      this.formData.please_time = dateString;
    },
    onChangePleaseEventHappenTime(value, dateString) {
      this.formData.please_event_happen_time = dateString;
    }
  }
};
</script>

<style lang="scss" scoped></style>
