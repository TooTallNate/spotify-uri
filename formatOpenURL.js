
/**
 * Module dependencies.
 */

var parse = require('./parse');

/**
 * Module exports.
 */

module.exports = formatOpenURL;

/**
 * Format a "parsed Spotify object" back into a Spotify "open.spotify.com" URL
 * string.
 *
 * @param {Object} parsed
 * @return {String}
 * @api public
 */

function formatOpenURL (parsed) {
  if ('string' == typeof parsed) parsed = parse(parsed);
  return 'http://open.spotify.com/' + parsed.type + '/' + parsed.id;
}
