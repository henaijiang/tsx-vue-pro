class testDTO {
  id: string = "";
  name: string = "";
  constructor({id, name}: {
    id: string,
    name: string
  }) {
    this.id = id;
    this.name = name;
  }
  say(){
    alert(`my name is ${this.name}`)
  }
}
export { testDTO }