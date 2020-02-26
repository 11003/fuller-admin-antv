export function forceUpdate(Vue) {
  Vue.$nextTick(() => {
    Vue.$forceUpdate();
  });
}
