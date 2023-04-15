import { App, Directive } from "vue";
import auth from "./modules/auth";
import copy from "./modules/copy";
import waterMarker from "./modules/waterMarker";
import draggable from "./modules/draggable";
import debounce from "./modules/debounce";
import throttle from "./modules/throttle";
import longpress from "./modules/longpress";

const directivesList: { [key: string]: Directive } = {
  auth,
  copy,
  waterMarker,
  draggable,
  debounce,
  throttle,
  longpress
};

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach(key => {
      app.directive(key, directivesList[key]);
    });
  }
};

export default directives;
