<template>
  <div class="three-add-work-order">
    <a-form>
      <a-row style="margin-left: 5px;">
        <a-col :span="24" class="mt25">
          <p class="desc">诉求信息</p>
        </a-col>

        <a-col :offset="1" :span="10">
          <a-form-item v-bind="formItemLayout" label="举报来源">
            <a-input-number
              placeholder="举报来源"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="举报项目">
            <a-input-number
              placeholder="举报项目"
              v-model="formData.rece_time"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :span="24" class="obj-type">
          <a-form-item v-bind="formItemLayout2" label="举报类型">
            <a-input
              placeholder="举报类型"
              v-model="formData.rece_time"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>

        <a-col :offset="1" :span="10">
          <a-form-item v-bind="formItemLayout" label="举报人姓名">
            <a-input-number
              placeholder="举报人姓名"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="举报人电话">
            <a-input
              maxlength="11"
              v-model="formData.informant_phone"
              placeholder="举报人电话"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :offset="1" :span="10">
          <a-form-item v-bind="formItemLayout" label="举报人邮箱">
            <a-input
              placeholder="举报人邮箱"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="举报人年龄">
            <a-input
              maxlength="3"
              placeholder="举报人年龄"
              v-model="formData.age"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :offset="1" :span="10">
          <a-form-item v-bind="formItemLayout" label="举报人单位">
            <a-input
              placeholder="举报人单位"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="身份证号">
            <a-input
              maxlength="18"
              placeholder="身份证号"
              v-model="formData.id_card"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :offset="1" :span="10">
          <a-form-item v-bind="formItemLayout" label="举报人地址">
            <a-input
              placeholder="举报人地址"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="邮编">
            <a-input
              placeholder="邮编"
              v-model="formData.rece_time"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :span="24" class="obj-type">
          <a-form-item v-bind="formItemLayout2" label="事发区域">
            <a-input
              placeholder="事发区域"
              v-model="formData.rece_time"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item v-bind="formItemLayout24" label="事发地址">
            <a-input
              placeholder="事发地址"
              v-model="formData.rece_time"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>

        <a-col :offset="1" :span="10">
          <a-form-item v-bind="formItemLayout" label="严重程度">
            <a-input
              placeholder="严重程度"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="处理等级">
            <a-input
              placeholder="处理等级"
              v-model="formData.rece_time"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :span="24">
          <a-form-item v-bind="formItemLayout24" label="举报标题">
            <a-input
              placeholder="举报标题"
              v-model="formData.rece_time"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item v-bind="formItemLayout24" label="举报内容">
            <a-textarea
              placeholder="举报内容"
              rows="10"
              :maxlength="limit_content"
              class="f-limit"
              v-model="formData.content"
            />
            <span class="c-limit">{{
              0 + formData.content.length + `/` + limit_content
            }}</span>
          </a-form-item>
        </a-col>

        <a-col :offset="1" :span="10">
          <a-form-item v-bind="formItemLayout" label="是否报审">
            <a-input
              placeholder="是否报审"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="处理时限">
            <a-date-picker
              :showToday="false"
              showTime
              placeholder="处理时限"
              @change="onChangeHandleLimitTime"
              format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :offset="1" :span="10">
          <a-form-item v-bind="formItemLayout" label="是否回复">
            <a-input
              placeholder="是否回复"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="举报时间">
            <a-input
              placeholder="举报时间"
              v-model="formData.rece_time"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :offset="1" :span="10">
          <a-form-item v-bind="formItemLayout" label="原始编号">
            <a-input
              placeholder="是否回复"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="受理人">
            <a-input
              placeholder="受理人"
              v-model="formData.person"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :span="24" style="border-bottom: 1px solid #e8e8e8;"> </a-col>

        <a-col :span="24" class="mt25">
          <p class="desc">各级处理情况一览</p>
        </a-col>
        <a-col :span="24" v-for="(item, index) in foreach_list">
          <a-col :span="10">
            <a-form-item
              v-bind="formItemLayout"
              class="mb-clear"
              label="执行部门"
            >
              <a-input
                placeholder="执行部门"
                v-model="item.handle_com"
                style="width: 100%"
              /> </a-form-item
          ></a-col>
          <a-col :span="10">
            <a-form-item
              v-bind="formItemLayout"
              class="mb-clear"
              label="操作类型"
            >
              <a-input
                placeholder="操作类型"
                v-model="item.oper_type"
                style="width: 100%"
              /> </a-form-item
          ></a-col>
          <a-col :span="10">
            <a-form-item v-bind="formItemLayout" label="操作人">
              <a-input-number
                placeholder="操作人"
                v-model="item.oper_person"
                style="width: 100%"
              /> </a-form-item
          ></a-col>
          <a-col :span="10">
            <a-form-item v-bind="formItemLayout" label="执行时间">
              <a-date-picker
                :showToday="false"
                showTime
                placeholder="执行时间"
                @change="onChangeExeTime"
                format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
              /> </a-form-item
          ></a-col>
          <span class="top-icon-list" v-if="foreach_list.length - 1 <= index">
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
          <a-col :span="24" class="border"> </a-col>
        </a-col>

        <a-col :span="24">
          <a-form-item v-bind="formItemLayout24" label="交办部门">
            <a-input-number
              placeholder="交办部门"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="24">
          <a-form-item v-bind="formItemLayout24" label="交办说明">
            <a-textarea
              class="f-limit"
              placeholder="交办说明"
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
  rece_time: "", //受理时间
  handle_limit_time: "", //处理时限
  tip_off_time: "", //举报时间
  exe_time: "", //执行时间
  person: "", //受理人
  informant_phone: "", //举报人号码
  id_card: "", //举报人身份证
  age: "", //举报人年龄
  content: "", //诉求内容
  remark: "" //交办说明
};
const foreach_list = [
  { handle_com: "", oper_type: "", oper_person: "", handle_time: "" },
  { handle_com: "", oper_type: "", oper_person: "", handle_time: "" }
];
export default {
  name: "ThreeAddWorkOrder",
  data() {
    return {
      limit_content: 500,
      remark_limit: 500,
      formData,
      foreach_list,
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
      formItemLayout2: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 7 }
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
    onChangeExeTime(value, dateString) {
      this.formData.exe_time = dateString;
      console.log(value);
    },
    onChangeTipOffTime(value, dateString) {
      this.formData.tip_off_time = dateString;
    },
    onChangeHandleLimitTime(value, dateString) {
      this.formData.handle_limit_time = dateString;
    },
    addNumber(index) {
      this.foreach_list.push({ key: index, value: index });
    },
    delNumber(index) {
      if (this.foreach_list.length > 1) {
        this.foreach_list.splice(index, 1);
      }
    }
  }
};
</script>

<style lang="scss">
.three-add-work-order {
  .obj-type {
    .ant-form-item {
      .ant-form-item-label {
        margin-left: 8px;
      }
    }
  }
  .top-icon-list {
    display: inline-block;
    margin-top: 50px;
    cursor: pointer;
  }
  .top-icon {
    font-size: 20px;
  }
  .border {
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 25px;
  }
}
</style>
