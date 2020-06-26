export class Store {
  private data: Map<string, any>;
  private group: Map<string, Array<string>>;

  constructor() {
    this.data = new Map();
    this.group = new Map();
  }

  register(name, obj) {
    obj.originName = name;
    this.data.set(name, obj);
  }

  addToGroup(groupName, objName) {
    if (!this.group.has(groupName)) {
      this.group.set(groupName, []);
    }

    const groups = this.group.get(groupName);
    this.group.set(
      groupName,
      [].concat(groups, Array.isArray(objName) ? objName : [objName])
    );
  }

  get(name) {
    return this.data.get(name);
  }

  getNames() {
    return Array.from(this.data.keys());
  }

  getGroups() {
    return Array.from(this.group.keys());
  }

  getObjs(names = []) {
    return names.length
      ? names.map(this.get.bind(this))
      : Array.from(this.data.values());
  }

  getObjsByGroup(group) {
    const names = this.group.get(group);
    return this.getObjs(names);
  }
}
