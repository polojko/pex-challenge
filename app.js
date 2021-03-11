const Immutable = require('immutable');

/**
 * Helper function that converts object to nested or flat object
 * Concatenates error messages
 * @param {object} obj  original object
 * @returns {object}    transformed object
 */
const convertToNestedStructure = function (obj) {
    return obj.map(item => {
        if (Immutable.Map.isMap(item)) {
            return convertToNestedStructure(item);
        }
        else {
            return convertToFlatStructure(item);
        }
    });
};

/**
 * Helper function that removes dups, flattens and joins obj to string
 * @param {object} obj    original object
 * @returns {object}      transformed object
 */
const convertToFlatStructure = function (obj) {
    return obj
        .toSet()                    // removes dups
        .flatten()                  // flattens obj
        .map(item => item + '.')    // adds '.' after each string
        .join(' ');                 // joins strings, with space
};

/**
 * Tranforms errors to spec
 * @param  {object} obj   original object
 * @param  {string} keys  keys to skip
 * @returns {object}       transformed object
 */
const transformErrors = function (obj, ...keys) {
    return obj
        .map((o, k) => {
            if (keys.includes(k)) { // key already included, preserve nesting
                return convertToNestedStructure(o);
            }
            else {
                return convertToFlatStructure(o);
            }
        });
};


module.exports = transformErrors;