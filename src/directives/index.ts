import { App, Directive } from "vue";
import auth from "./modules/auth";

const directivesList: { [key: string]: Directive } = {
  auth
};

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach(key => {
      app.directive(key, directivesList[key]);
    });
  }
};

export default directives;
