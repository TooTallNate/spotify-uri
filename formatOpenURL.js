
/**
 * Module dependencies.
 */

var parse = require('./parse');

/**
 * Module exports.
 */

module.exports = formatOpenURL;

/**
 * Format a "parsed Spotify object" back into a Spotify
 * "open.spotify.com" URL string.
 *
 * @param {Object} parsed
 * @return {String}
 * @api public
 */

function formatOpenURL (parsed, base) {
  if ('string' == typeof parsed) parsed = parse(parsed);
  if ('string' != typeof base) base = 'http://open.spotify.com';
  if (parsed.starred) {
    // user's "starred" playlist
    return base + '/user/' + encode(parsed.user) + '/starred';
  } else if ('playlist' == parsed.type) {
    // user "playlist"
    return base + '/user/' + encode(parsed.user) + '/playlist/' + parsed.id;
  } else if ('local' == parsed.type) {
    // "local" file
    return base + '/local/' + encode(parsed.artist) +
                        '/' + encode(parsed.album) +
                        '/' + encode(parsed.track) +
                        '/' + parsed.seconds;
  } else if ('search' == parsed.type) {
    // "search" query
    return base + '/search/' + encode(parsed.query);
  } else {
    // artist, album, track
    return base + '/' + parsed.type + '/' + parsed.id;
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
