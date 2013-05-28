
/**
 * Module dependencies.
 */

var parse = require('./parse');

/**
 * Module exports.
 */

module.exports = formatOpenURL;

/**
 * Base URL.
 */

var base = 'http://open.spotify.com';

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
  if (parsed.starred) {
    // "starred" playlist
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
