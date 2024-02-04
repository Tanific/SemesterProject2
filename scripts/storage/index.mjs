/**
 * saves a value to local storage with the specified key
 * @param {string} key - the key under which to store the value
 * @param {*} value - the value to be stored
 */
export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

/**
 * loads a value from local storage using the specified key
 * @param {string} key - the key to retrieve the value
 * @returns {*} the retrieved value, or null if the key is not found/on error
*/
  export function load(key) {
    try {
      const value = localStorage.getItem(key);
      return JSON.parse(value);
    } catch {
      return null
    } 
  }
  
/**
 * removes a value from local storage using the specified key
 * @param {string} key - the key of the value to be removed
 */
  export function remove(key) {
    localStorage.removeItem(key);
  }