// 函数表达式的接口定义
interface IdGenerator {
	(chars: string, nums: number): string;
}
const fun: IdGenerator = function(name, id) {
 return name + id;
}

fun('userlu', 2234234234342);

// 函数声明的接口定义
interface NameFun {
	(name: string): string
}

declare function getName(name: string): string;
console.log(getName('232'))

