
/**
 * Module dependencies.
 */

var parse = require('./parse');

/**
 * Module exports.
 */

module.exports = formatURI;

/**
 * Format a "parsed Spotify object" back into a Spotify URI string.
 *
 * @param {Object} parsed
 * @return {String}
 * @api public
 */

function formatURI (parsed) {
  if ('search' == parsed.type) {
    return 'spotify:search:' + encode(parsed.query);
  } else {
    return 'spotify:' + parsed.type + ':' + parsed.id;
  }
}

/**
 * URL-encode, also turn ` ` (space) chars into `+` (plus).
 *
 * @param {String} str
 * @api private
 */

function encode (str) {
  return escape(str.replace(/ /g, '+'));
}
