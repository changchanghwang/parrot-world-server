export const isProd = process.env.NODE_ENV === 'production';

/**
 * @param obj
 */
export function stripUndefined(obj: { [key: string]: any }) {
  const stripped = Object.keys(obj).reduce((acc: { [key: string]: any }, prop) => {
    if (obj[prop] !== undefined) {
      acc[prop] = obj[prop];
    }
    return acc;
  }, {});
  if (Object.keys(stripped).length === 0) {
    return undefined;
  }
  return stripped;
}
