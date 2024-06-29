type FlattenedObject = Record<string, string>;

export const flattenObject = (
  obj: unknown,
  parentKey = "",
  result: FlattenedObject = {},
): FlattenedObject => {
  if (obj === null || typeof obj !== "object") {
    result[parentKey] = obj as string;
    return result;
  }

  if (Array.isArray(obj)) {
    obj
      .sort((a, b) => {
        const aOrder = (a as { order?: number }).order ?? 0;
        const bOrder = (b as { order?: number }).order ?? 0;
        return aOrder - bOrder;
      })
      .forEach((item, index) => {
        flattenObject(item, `${parentKey}.${index}`, result);
      });
  } else {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        const value = (obj as Record<string, unknown>)[key];
        if (typeof value === "object" && value !== null) {
          flattenObject(value, newKey, result);
        } else {
          result[newKey] = value as string;
        }
      }
    }
  }

  return result;
};
