// import directives
import copy from "./modules/copy";
import debounce from "./modules/debounce";
import longpress from "./modules/longpress";

const directivesList: any = {
	// Custom directives
	copy,
	debounce,
	longpress
};

const directives = {
	install: function (app: any) {
		Object.keys(directivesList).forEach(key => {
			// 注册自定义指令
			app.directive(key, directivesList[key]);
		});
	}
};

export default directives;
