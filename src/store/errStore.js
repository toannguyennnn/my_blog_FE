import { defineStore } from "pinia";

export const useErrStore = defineStore("errStore", {
  state: () => ({
    isShow: false,
    type: "success",
    message: "",
    title: "",
    action: "",
    handleAction: "",
  }),
  actions: {
    showAlert(type, title, message, action, handleAction) {
      this.isShow = true;
      this.type = type;
      this.title = title;
      this.message = message;
      this.action = action;
      this.handleAction = handleAction;

      setTimeout(() => {
        this.isShow = false;
      }, 5000);
    },
    closeAlert() {
      this.isShow = false;
    },
  },
});
