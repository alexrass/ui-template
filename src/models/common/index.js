export const Model = obj => class extends Immutable.Record(obj) {
  static attrParsers = {}

  constructor(values) {
    const record = super(values);
    const attrParsers = this.constructor.attrParsers || {};
    const keys = Immutable.List(Object.keys(attrParsers));

    return keys.reduce((acc, key) => {
      const attrParser = attrParsers[key];
      return acc.set(key, attrParser(acc.get(key)));
    }, record);
  }
};

