declare namespace Menu {
	interface MenuOptions {
		path: string;
		title: string;
		icon?: string;
		isLink?: string;
		close?: boolean;
		children?: MenuOptions[];
	}
}

interface PropsSay {
	say<T>(value: T): T;
}

interface PropsNumber<T, U> {
	(a: T, b: U): number;
}
