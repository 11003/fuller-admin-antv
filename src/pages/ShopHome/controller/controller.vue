<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <h1>name: {{ name }}</h1>
    </div>
    <div class="dashboard-text">
      <h1>introduction: {{ introduction }}</h1>
    </div>
    <div>
      第一个顶层路由：http://localhost:8082/shop-home<br />
      第二个顶层路由：http://localhost:8082/basic-home<br />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Controller",
  computed: {
    ...mapGetters(["name", "introduction"])
  }
};
</script>

<style scoped></style>
