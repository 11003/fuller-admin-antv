export function getDataType(data) {
  if (typeof data == "number" && isNaN(data)) return "NaN";
  return Object.prototype.toString
    .call(data)
    .replace(/\[object ([a-z]+)]/i, ($1, $2) => $2);
}

export function isArray(data) {
  return data instanceof Array || getDataType(data) == "Array";
}

export function isObject(data) {
  return data instanceof Object || getDataType(data) == "Object";
}

export function isDom(el) {
  if (typeof HTMLElement === "function") {
    return el instanceof HTMLElement;
  }
  return el && el.nodeType === 1;
}

export function forEachData(data, handle) {
  let result;
  if (data instanceof Object) {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        result = handle(data[key], key, data);
        if (result === "break") break;
        if (result === "continue") continue;
        if (result !== undefined) return result;
      }
    }
  } else if (data instanceof Array) {
    for (let i = 0, len = data.length; i < len; i++) {
      result = handle(data[i], i, data);
      if (result === "break") break;
      if (result === "continue") continue;
      if (result !== undefined) return result;
    }
  }
}

export function clone(data) {
  /*这种方式无法处理data内部的function,Date,Dom等,遇到无法序列化的会被丢弃掉*/
  return JSON.parse(JSON.stringify(data));
}

export function deepClone(item) {
  if (!item) return item;
  let result,
    types = [Number, String, Boolean];
  types.forEach(type => {
    if (item instanceof type) {
      result = type(item);
    }
  });
  if (typeof result === "undefined") {
    if (Object.prototype.toString.call(item) === "[object Array]") {
      result = [];
      item.forEach((child, index) => {
        result[index] = deepClone(child);
      });
    } else if (typeof item === "object") {
      if (item.nodeType && typeof item.cloneNode === "function") {
        result = item.cloneNode(true);
      } else if (!item.prototype) {
        if (item instanceof Date) {
          result = new Date(item);
        } else {
          result = {};
          for (let i in item) {
            if (item.hasOwnProperty(i)) {
              result[i] = deepClone(item[i]);
            }
          }
        }
      } else {
        if (item && item.constructor) {
          result = new item.constructor();
        } else {
          result = item;
        }
      }
    } else {
      result = item;
    }
  }
  return result;
}

export function deepDel(data) {
  if (data && data.prototype) deepDel(data.prototype);
  if (data instanceof Object) {
    for (let key in data) {
      if (typeof data[key] !== "object") {
        deepDel(data[key]);
      }
      delete data[key];
    }
  } else if (data instanceof Array) {
    while (data.length) {
      if (typeof data[0] !== "object") {
        data[0] = null;
      } else {
        deepDel(data[0]);
      }
      data.unshift();
    }
  }
  data = null;
}

export function deepMerge(first, second) {
  let result = deepClone(first);
  let type = ["Array", "Object"];
  forEachData(second, (item, index) => {
    let target = result[index];
    let tType = getDataType(target);
    let iType = getDataType(item);
    if (tType == iType && type.indexOf(tType) !== -1) {
      result[index] = deepMerge(target, item);
    } else {
      result[index] = deepClone(item);
    }
  });
  return result;
}

export function deepMergeAll() {
  let list = arguments;
  try {
    let i = 0,
      result = list[0],
      len = list.length;
    while (i < len) {
      result = deepMerge(result, list[i + 1]);
      i++;
    }
    return result;
  } catch (err) {
    console.error(err);
  }
}

export function getParents(el, parentClassName) {
  parentClassName = parentClassName.replace(/^\./, "");
  if (el && el.parentNode && el.parentNode.classList) {
    if (el.parentNode.classList.contains(parentClassName)) {
      return el.parentNode;
    } else {
      return getParents(el.parentNode, parentClassName);
    }
  }
}

export function getId(stamp = 0, str = "id") {
  return str + ((Math.random() + stamp + Date.now()) * 10000).toString(36);
}

export function setStyle(el, style) {
  style = JSON.stringify(style)
    .replace(/{(.*)}/, ($1, $2) => $2)
    .replace(/["]/g, "")
    .replace(/[,]/g, ";");
  el.style.cssText += ";" + style;
}

export function getPoint(e, container) {
  e = e || window.event;
  let sl = container && container.scrollLeft ? container.scrollLeft : 0;
  let st = container && container.scrollLeft ? container.scrollTop : 0;
  let x = e.pageX + sl;
  let y = e.pageY + st;
  return { x, y };
}

export function getElemBCR(el) {
  if (el instanceof DOMRect || (el.lt && el.rb)) return el;
  let bcr = el.getBoundingClientRect();
  bcr.w = bcr.width || el.offsetWidth;
  bcr.h = bcr.height || el.offsetHeight;
  bcr.x = bcr.x || bcr.left;
  bcr.y = bcr.y || bcr.top;
  bcr.sl = el.scrollLeft;
  bcr.st = el.scrollTop;
  /* lt: 矩形左上角坐标 */
  bcr.lt = { x: bcr.x, y: bcr.y };
  /* rb: 矩形右下角坐标 */
  bcr.rb = { x: bcr.x + bcr.w, y: bcr.y + bcr.h };
  return bcr;
}

export function getOffset(el, container) {
  /*el: 元素对象或者bcr对象或者point:{x,y}对象*/
  let bcr = isDom(el) ? getElemBCR(el) : el;
  let cBCR = isDom(container) ? getElemBCR(container) : container;
  // console.log(el, bcr, cBCR);
  return {
    x: bcr.x - cBCR.x + cBCR.sl,
    y: bcr.y - cBCR.y + cBCR.st,
    bcr: bcr,
    cBCR: cBCR
  };
}
export function loadScriptAsync({ id, src, async, defer }) {
  return new Promise((resolve, reject) => {
    if (id && document.getElementById(id)) {
      resolve();
      return false;
    }
    let script = document.createElement("script");
    document.getElementsByTagName("head")[0].appendChild(script);
    if (async === "async") script.async = true;
    if (defer === "defer") script.defer = true;
    script.onload = function() {
      resolve();
    };
    script.onerror = function() {
      reject();
    };
    script.id = id;
    script.src = src;
  }).catch(err => {
    throw err;
  });
}

export function asyncLoadScript({ id, src, type = "async" }) {
  return new Promise((resolve, reject) => {
    if (id && document.getElementById(id)) {
      return resolve();
    }
    let script = document.createElement("script");
    if (["async", "defer"].indexOf(type) !== -1) script[type] = true;
    document.getElementsByTagName("head")[0].appendChild(script);
    script.onload = function() {
      resolve();
    };
    script.onerror = function() {
      reject();
    };
    script.id = id;
    script.src = src;
  }).catch(err => {
    console.error(err);
  });
}
