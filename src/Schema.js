export default class Schema {

  static findObjectByType(schema, type) {
    if (typeof schema === 'object' && '@type' in schema && schema['@type'] === type) {
      return schema;
    } else if (typeof schema === 'object') {
      return Object.values(schema).find(a => this.constructor.findObjectByType(a, type));
    } else if (Array.isArray(schema)) {
      return schema.find(a => this.constructor.findObjectByType(a, type));
    }

    return null;
  };
}
