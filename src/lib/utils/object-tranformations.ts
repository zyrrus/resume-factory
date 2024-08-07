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

const convertValue = (value?: string): string | boolean | undefined => {
  // Check if value is undefined
  if (value === undefined) return undefined;

  // Check if value is a valid boolean
  if (value === "true") return true;
  if (value === "false") return false;

  // // Check if value is a valid Date
  // const date = new Date(value);
  // if (!isNaN(date.getTime())) return date;

  // Return the value as is (string)
  return value;
};

export const unflattenObject = (obj: FlattenedObject): unknown => {
  const result: unknown = {};

  for (const key in obj) {
    const value = obj[key];
    const keys = key.split(".");
    let currentLevel = result as Record<string, unknown>;

    keys.forEach((k, index) => {
      if (index === keys.length - 1) {
        currentLevel[k] = convertValue(value);
      } else {
        if (!currentLevel[k]) {
          currentLevel[k] = isNaN(Number(keys[index + 1])) ? {} : [];
        }
        currentLevel = currentLevel[k] as Record<string, unknown>;
      }
    });
  }

  return result;
};
