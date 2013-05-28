
/**
 * Module dependencies.
 */

var formatURI = require('./formatURI');

/**
 * Module exports.
 */

module.exports = formatEmbedURI;

/**
 * Format a "parsed Spotify object" back into a Spotify "embed.spotify.com" URL
 * string.
 *
 * @param {Object} parsed
 * @return {String}
 * @api public
 */

function formatEmbedURI (parsed) {
  return 'https://embed.spotify.com/?uri=' + formatURI(parsed);
}
