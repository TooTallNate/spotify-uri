
/**
 * Module dependencies.
 */

var formatOpenURL = require('./formatOpenURL');

/**
 * Module exports.
 */

module.exports = formatPlayURL;

/**
 * Format a "parsed Spotify object" back into a Spotify
 * "play.spotify.com" URL string.
 *
 * @param {Object} parsed
 * @return {String}
 * @api public
 */

function formatPlayURL (parsed) {
  return formatOpenURL(parsed, 'https://play.spotify.com');
}
