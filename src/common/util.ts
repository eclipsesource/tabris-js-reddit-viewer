type Model = {[key: string]: any};

export function assignToModel<T extends Model>(model: T, data: Partial<T>): T {
  forEachProtoKey(model, prop => {
    if (prop in data) {
      model[prop] = data[prop];
    }
  });
  return model;
}

export function modelToString<T extends {}>(model: T): string {
  return objectSummary(modelToDictionary(model));
}

export function objectSummary<T extends {}>(object: T): string {
  const result: any = {};
  for (const key in object) {
    result[key] = String(object[key]);
  }
  return JSON.stringify(result);
}

export function modelToDictionary<T extends Model>(model: T): T {
  let result: Partial<T> = {};
  forEachProtoKey(model, prop => {
    if (typeof prop !== 'symbol' && typeof model[prop] !== 'function') {
      result[prop] = model[prop];
    }
  });
  return result as T;
}

function forEachProtoKey<T extends Model>(model: T, cb: ((key: keyof T) => any)) {
  Object.keys(Object.getPrototypeOf(model)).forEach(cb);
}
