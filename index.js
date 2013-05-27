
/**
 * Module dependencies.
 */

var url = require('url');
var qs = require('querystring');

/**
 * Module exports.
 */

module.exports = parse;
parse.parse = parse;

/**
 * Parses a "Spotify URI".
 *
 * @param {String} uri
 * @return {Object} parsed Spotify uri object
 * @api public
 */

function parse (uri) {
  var parts;
  var parsed = url.parse(uri);
  var rtn = { uri: uri };
  if ('spotify:' == parsed.protocol) {
    parts = uri.split(':');
    parseParts(parts, rtn);
  } else if ('embed.spotify.com' == parsed.hostname) {
    return parse(qs.parse(parsed.query).uri);
  } else { // http: or https:
    parts = parsed.pathname.split('/');
    parseParts(parts, rtn);
  }
  return rtn;
}

function parseParts (parts, obj) {
  var len = parts.length;
  if ('search' == parts[1]) {
    obj.type = 'search';
    obj.query = unencode(parts.slice(2).join(':'));
  } else if (len >= 3 && 'local' == parts[1]) {
    // local
    obj.type = 'local';
    obj.artist = unencode(parts[2]);
    obj.album = unencode(parts[3]);
    obj.track = unencode(parts[4]);
    obj.seconds = +parts[5];
  } else if (len >= 5) {
    // playlist
    obj.user = unencode(parts[2]);
    obj.type = parts[3];
    obj.id = parts[4];
  } else if (len >= 4 && 'starred' == parts[3]) {
    // starred
    obj.type = 'playlist';
    obj.starred = true;
    obj.user = unencode(parts[2]);
  } else if (len >= 3) {
    // track, artist, album
    obj.type = parts[1];
    obj.id = parts[2];
  }
}

function unencode (str) {
  return unescape(str).replace(/\+/g, ' ');
}
