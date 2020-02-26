<template>
  <div class="dialog-layout-main">
    <div class="dialog-layout-body">
      <slot></slot>
    </div>
    <div class="dialog-layout-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "LayoutMain",
  created() {
    this.$nextTick(() => {
      this.$emit("onCreated");
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit("onMounted");
    });
  },
  beforeDestroy() {
    this.$nextTick(() => {
      this.$emit("onBeforeDestroy");
    });
  },
  destroyed() {
    this.$nextTick(() => {
      this.$emit("onDestroyed");
    });
  }
};
</script>
<style lang="scss" scoped>
$height: 50px;
$padding: 20px;
.dialog-layout-main,
.dialog-layout-body,
.dialog-layout-footer {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.dialog-layout-main {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  .dialog-layout-body {
    height: 100%;
    padding: $padding $padding $padding + $height $padding;
  }
  .dialog-layout-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: $height;
    margin: 0;
    padding: 0 0.8 * $padding;
    border-top: 1px solid #e8e8e8;
    border-radius: 0 0 4px 4px;
    background: #ffffff;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
}
</style>
