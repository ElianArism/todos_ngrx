export class Todo {
  id!: number;
  text!: string;
  complete!: boolean;

  constructor(text: string) {
    this.text = text;
    this.id = Date.now() + Math.random() * 1000;
    this.complete = false;
  }
}
