
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
    return 'spotify:search:' + escape(parsed.query);
  } else {
    return 'spotify:' + parsed.type + ':' + parsed.id;
  }
}
