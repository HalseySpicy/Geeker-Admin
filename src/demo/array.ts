let array1: ReadonlyArray<string | Array<string>> = ['1', '2', ['3', '4']];
let array2: [string, number] = ['2', 1, 3]

console.log(array1.flat().flatMap((value) => value + '3'))



interface Point {
	name: string;
}

class Line implements Point {
	name: string;
	constructor() {
		this.name = '23423';
	}
}
