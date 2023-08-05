import { camelCase } from "lodash";

/**
 * convertSqlToJson
 * @param {object} obj
 */
export const convertSqlToJson = (
  obj: undefined | Record<string, any> | Record<string, any>[]
): any => {
  if (!obj) return null;
  if (typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    // Return an array type object even if array is empty
    return obj.map(convertSqlToJson);
  }
  const newObj: Record<string, any> = {};
  Object.keys(obj).map(k => {
    const key = camelCase(k);
    let val = obj[k];
    if (Array.isArray(val)) {
      val = val.map(convertSqlToJson);
    } else if (typeof val === 'object' && !(val instanceof Date)) {
      val = convertSqlToJson(val);
    }
    newObj[key] = val;
  });
  return newObj;
};