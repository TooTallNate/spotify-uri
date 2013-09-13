
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
  if ('string' == typeof parsed) parsed = parse(parsed);
  if (parsed.starred) {
    // user's "starred" playlist
    return 'spotify:user:' + encode(parsed.user) + ':starred';
  } else if ('playlist' == parsed.type) {
    // user "playlist"
    return 'spotify:user:' + encode(parsed.user) + ':playlist:' + parsed.id;
  } else if ('local' == parsed.type) {
    // "local" file
    return 'spotify:local:' + encode(parsed.artist) +
                        ':' + encode(parsed.album) +
                        ':' + encode(parsed.track) +
                        ':' + parsed.seconds;
  } else if ('search' == parsed.type) {
    // "search" query
    return 'spotify:search:' + encode(parsed.query);
  } else {
    // artist, album, track
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
