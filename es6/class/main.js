const obj = {
  _name: "",
  get name() {
    return this._name;
  },
  set name(val) {
    this._name = val;
  },
};
obj.name = 22;
console.log(obj);
