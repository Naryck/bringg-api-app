/**
 * Compares object keys values
 * @param {*} a input object
 * @param {*} b object to compare with
 */
exports.isEquivalent = (a, b) => Object.keys(b).filter(key => b[key] != undefined).every(key => exports.isObject(b[key]) ? exports.isEquivalent(a[key], b[key]) : a[key] == b[key]);

/**
 * Checks if input parameter is Object
 * @param {*} a 
 */
exports.isObject = (a) => (!!a) && (a.constructor === Object);