export function forceUpdate(Vue) {
  Vue.$nextTick(() => {
    Vue.$forceUpdate();
  });
}
// 获取url问号后面的参数
export function getQueryString(variable) {
  var query = window.location.href.split("?")[1];
  if (query) {
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
  }
}
