class Animal {
	sound: string

	constructor(sound: string) {
		this.sound = sound;
	}

	getSound(): string{
		return this.sound;
	}
}

interface AnimalInterface {
	new ( sound: string ): Animal;
}

let createAnimal = ( ctor: AnimalInterface, type: string ) : Animal => {
	return type === 'dog' ? new ctor('Woof') : new ctor('Menw');
}

let dog = createAnimal(Animal, 'dog');
console.log(dog.getSound());
