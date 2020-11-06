type Model = {[key: string]: any};

export function assignToModel<T extends Model>(model: T, data: Partial<T>): T {
  forEachProtoKey(model, prop => {
    if (prop in data) {
      model[prop] = data[prop];
    }
  });
  return model;
}

function forEachProtoKey<T extends Model>(model: T, cb: ((key: keyof T) => any)) {
  Object.keys(Object.getPrototypeOf(model)).forEach(cb);
}
