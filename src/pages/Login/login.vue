<template>
  <div class="container">
    <div class="login-container">
      <div class="top">
        <div class="header">
          <img alt="logo" src="../../assets/logo.png" class="logo" />
          <span class="title">{{ title }}</span>
        </div>
        <div data-v-bab21d30="" class="desc">
          {{ title }} 是西湖区最具影响力的 Web 设计规范的粉丝
        </div>
      </div>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'username',
              {
                rules: [{ required: true, message: '请输入您的用户名!' }]
              }
            ]"
            placeholder="Username"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请输入您的密码!' }]
              }
            ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <p>账号：admin；密码：admin</p>
        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true
              }
            ]"
          >
            记住我
          </a-checkbox>
          <a-button type="primary" html-type="submit" class="login-form-button">
            登陆
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import defaultSettings from "@/settings";
const { title } = defaultSettings;
export default {
  data() {
    return {
      title: title || "Vue Admin Template"
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch("UserLogin", values).then(() => {
            this.$router.push({ path: this.redirect || "/" });
          });
        }
      });
    }
  }
};
</script>
<style>
.container {
  background: #f0f2f5
    url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)
    no-repeat center 110px;
  background-size: 100%;
  min-height: 100%;
  width: 100%;
  height: 100vh;
  overflow: auto;
}
.login-container {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 0 35px 0;
  margin: 26vh auto;
  overflow: hidden;
}
.login-container input {
  display: inline-block;
  height: 47px;
  -webkit-appearance: none;
  border-radius: 0;
  padding: 12px 5px 12px 15px;
}
.login-container .top {
  text-align: center;
}
.login-container .top .header {
  height: 44px;
  line-height: 44px;
}
.login-container .top .header .logo {
  height: 44px;
  vertical-align: top;
  margin-right: 16px;
}
.login-container .top .header .title {
  font-size: 26px;
  color: rgba(0, 0, 0, 0.85);
  font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;
}
.login-container .desc {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 12px;
  margin-bottom: 40px;
}
.login-form {
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
