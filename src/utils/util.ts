/**
 * 获取localStorage
 * @param key Storage名称
 * @returns {String}
 */
export function localGet(key: string) {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(window.localStorage.getItem(key) as string);
  } catch (error) {
    return value;
  }
}

/**
 * 存储localStorage
 * @param key Storage名称
 * @param value Storage值
 */
export function localSet(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

/**
 * 清除localStorage
 * @param key Storage名称
 */
export function localRemove(key: string) {
  window.localStorage.removeItem(key);
}

/**
 * 清除所有localStorage
 * @returns {String}
 */
export function localClear() {
  window.localStorage.clear();
}
