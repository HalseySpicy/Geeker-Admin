export interface LoginFrom {
  username: string;
  password: string;
}

export interface LoginFormExpose {
  count: number;
  consoleNumber: (name: string) => void;
}

export interface InjectProps {
  name: string;
  age: string;
  changeName: () => void;
  [key: string]: any;
}
