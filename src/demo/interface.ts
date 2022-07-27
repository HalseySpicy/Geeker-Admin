interface IsSumOdd {
	(a: number, b: number): boolean;
	type: string;
	calculate: (a: number, b: number) => number;
}

let isSumOdd: IsSumOdd = Object.assign(
	// 相当于匿名函数
	function(x: number, y: number): boolean {
		return (x + y) % 2 !== 0;
	},
	// 此函数下的属性，因为函数也是对象
	{
		type: 'oddChecker',
		calculate: function(x: number, y: number): number {
			return x + y;
		}
	}
)

console.log(isSumOdd(1, 2));
console.log(isSumOdd.type);
console.log(isSumOdd.calculate(1, 2));
