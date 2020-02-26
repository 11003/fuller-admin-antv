import { Modal } from "ant-design-vue";
function ModalTools(modalOption) {
  this.type = "success";
  this.timeout = 3;
  this.option = { centered: true };
  this.parseOption(modalOption);
  return this;
}
ModalTools.prototype = {
  parseOption(option) {
    if (!option || option.constructor.name !== "Object") return false;
    if (option.type) {
      this.type = option.type;
      delete option.type;
    }
    if (option.timeout) {
      this.timeout = option.timeout;
      delete option.timeout;
    }
    this.option = { ...this.option, ...option };
  },
  getContent(calc = true) {
    if (/\d+s/.test(this.option.content)) {
      if (calc) {
        this.option.content = this.option.content.replace(/\d+s/, $0 => {
          this.timeout = parseInt($0) - 1;
          return this.timeout + "s";
        });
      }
      return this.option.content;
    } else {
      return `将在 ${this.timeout} s 后返回上一页.`;
    }
  },
  open(modalOption) {
    this.parseOption(modalOption);
    return new Promise(resolve => {
      this.modal = Modal[this.type]({
        ...this.option,
        content: this.getContent(false)
      });
      this.interval = setInterval(() => {
        if (this.timeout > 1) {
          this.timeout -= 1;
          this.modal.update({
            content: this.getContent()
          });
        } else {
          this.close();
          resolve();
        }
      }, 1000);
    }).catch(err => {
      console.log(err);
    });
  },
  close(cb) {
    clearInterval(this.interval);
    this.modal.destroy();
    typeof cb === "function" && cb();
    return this;
  },
  destroy() {
    this.close();
    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        this[key] = null;
        delete this[key];
      }
    }
  }
};
export const $ModalTools = ModalTools;
