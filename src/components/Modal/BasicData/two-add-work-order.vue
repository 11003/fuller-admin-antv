<template>
  <div class="two-add-work-order">
    <a-form>
      <a-row style="margin-left: 5px;">
        <a-col :span="24" class="mt25">
          <p class="desc">诉求信息</p>
        </a-col>

        <a-col :offset="1" :span="10">
          <a-form-item v-bind="formItemLayout" label="工单编号">
            <a-input-number
              placeholder="工单编号"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="受理时间">
            <a-date-picker
              :showToday="false"
              showTime
              placeholder="处理时限"
              @change="onChangeReceTime"
              format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :offset="1" :span="10">
          <a-form-item v-bind="formItemLayout" label="诉求人">
            <a-input-number
              placeholder="诉求人"
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

        <a-col :offset="1" :span="10">
          <a-form-item v-bind="formItemLayout" label="来电号码">
            <a-input-number
              maxlength="11"
              placeholder="来电号码"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="联系电话">
            <a-input-number
              maxlength="11"
              placeholder="联系电话"
              v-model="formData.rece_time"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :offset="1" :span="10">
          <a-form-item v-bind="formItemLayout" label="工单来源">
            <a-input
              placeholder="工单来源"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="信件编号">
            <a-input
              placeholder="信件编号"
              v-model="formData.rece_time"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :offset="1" :span="10">
          <a-form-item v-bind="formItemLayout" label="诉求分类">
            <a-input
              placeholder="诉求分类"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="诉求归口">
            <a-input
              placeholder="诉求归口"
              v-model="formData.rece_time"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :offset="1" :span="10">
          <a-form-item v-bind="formItemLayout" label="工单到达时间">
            <a-date-picker
              :showToday="false"
              showTime
              placeholder="工单到达时间"
              @change="onChangeWorkOrderOverTime"
              format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="过期时间">
            <a-date-picker
              :showToday="false"
              showTime
              placeholder="过期时间"
              @change="onChangeOverTime"
              format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :offset="1" :span="10">
          <a-form-item v-bind="formItemLayout" label="重要程度">
            <a-input
              placeholder="重要程度"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="电子邮箱">
            <a-input
              placeholder="电子邮箱"
              v-model="formData.rece_time"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :span="24">
          <a-form-item v-bind="formItemLayout24" label="归口管理">
            <a-input
              placeholder="归口管理"
              v-model="formData.rece_time"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item v-bind="formItemLayout24" label="详细地址">
            <a-input
              placeholder="详细地址"
              v-model="formData.rece_time"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item v-bind="formItemLayout24" label="诉求内容">
            <a-textarea
              placeholder="诉求内容"
              rows="20"
              :maxlength="limit_content"
              class="f-limit"
              v-model="formData.content"
            />
            <span class="c-limit">{{
              0 + formData.content.length + `/` + limit_content
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
  rece_time: "", //受理时间
  work_order_over_time: "", //工单到达时间
  over_time: "", //过期时间
  sex: "1",
  content: "" //诉求内容
};
export default {
  name: "TwoAddWorkOrder",
  data() {
    return {
      limit_content: 2000,
      formData,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      formItemLayout24: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 17 }
        }
      }
    };
  },
  methods: {
    onChangeReceTime(value, dateString) {
      this.formData.rece_time = dateString;
    },
    onChangeWorkOrderOverTime(value, dateString) {
      this.formData.work_order_over_time = dateString;
    },
    onChangeOverTime(value, dateString) {
      this.formData.over_time = dateString;
    }
  }
};
</script>

<style scoped></style>
