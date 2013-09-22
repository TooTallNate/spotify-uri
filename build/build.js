
/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module.exports) {
    module.exports = {};
    module.client = module.component = true;
    module.call(this, module.exports, require.relative(resolved), module);
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("component-url/index.js", Function("exports, require, module",
"\n\
/**\n\
 * Parse the given `url`.\n\
 *\n\
 * @param {String} str\n\
 * @return {Object}\n\
 * @api public\n\
 */\n\
\n\
exports.parse = function(url){\n\
  var a = document.createElement('a');\n\
  a.href = url;\n\
  return {\n\
    href: a.href,\n\
    host: a.host || location.host,\n\
    port: ('0' === a.port || '' === a.port) ? location.port : a.port,\n\
    hash: a.hash,\n\
    hostname: a.hostname || location.hostname,\n\
    pathname: a.pathname.charAt(0) != '/' ? '/' + a.pathname : a.pathname,\n\
    protocol: !a.protocol || ':' == a.protocol ? location.protocol : a.protocol,\n\
    search: a.search,\n\
    query: a.search.slice(1)\n\
  };\n\
};\n\
\n\
/**\n\
 * Check if `url` is absolute.\n\
 *\n\
 * @param {String} url\n\
 * @return {Boolean}\n\
 * @api public\n\
 */\n\
\n\
exports.isAbsolute = function(url){\n\
  return 0 == url.indexOf('//') || !!~url.indexOf('://');\n\
};\n\
\n\
/**\n\
 * Check if `url` is relative.\n\
 *\n\
 * @param {String} url\n\
 * @return {Boolean}\n\
 * @api public\n\
 */\n\
\n\
exports.isRelative = function(url){\n\
  return !exports.isAbsolute(url);\n\
};\n\
\n\
/**\n\
 * Check if `url` is cross domain.\n\
 *\n\
 * @param {String} url\n\
 * @return {Boolean}\n\
 * @api public\n\
 */\n\
\n\
exports.isCrossDomain = function(url){\n\
  url = exports.parse(url);\n\
  return url.hostname !== location.hostname\n\
    || url.port !== location.port\n\
    || url.protocol !== location.protocol;\n\
};//@ sourceURL=component-url/index.js"
));
require.register("component-trim/index.js", Function("exports, require, module",
"\n\
exports = module.exports = trim;\n\
\n\
function trim(str){\n\
  return str.replace(/^\\s*|\\s*$/g, '');\n\
}\n\
\n\
exports.left = function(str){\n\
  return str.replace(/^\\s*/, '');\n\
};\n\
\n\
exports.right = function(str){\n\
  return str.replace(/\\s*$/, '');\n\
};\n\
//@ sourceURL=component-trim/index.js"
));
require.register("component-querystring/index.js", Function("exports, require, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var trim = require('trim');\n\
\n\
/**\n\
 * Parse the given query `str`.\n\
 *\n\
 * @param {String} str\n\
 * @return {Object}\n\
 * @api public\n\
 */\n\
\n\
exports.parse = function(str){\n\
  if ('string' != typeof str) return {};\n\
\n\
  str = trim(str);\n\
  if ('' == str) return {};\n\
\n\
  var obj = {};\n\
  var pairs = str.split('&');\n\
  for (var i = 0; i < pairs.length; i++) {\n\
    var parts = pairs[i].split('=');\n\
    obj[parts[0]] = null == parts[1]\n\
      ? ''\n\
      : decodeURIComponent(parts[1]);\n\
  }\n\
\n\
  return obj;\n\
};\n\
\n\
/**\n\
 * Stringify the given `obj`.\n\
 *\n\
 * @param {Object} obj\n\
 * @return {String}\n\
 * @api public\n\
 */\n\
\n\
exports.stringify = function(obj){\n\
  if (!obj) return '';\n\
  var pairs = [];\n\
  for (var key in obj) {\n\
    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));\n\
  }\n\
  return pairs.join('&');\n\
};\n\
//@ sourceURL=component-querystring/index.js"
));
require.register("component-stack/index.js", Function("exports, require, module",
"\n\
/**\n\
 * Expose `stack()`.\n\
 */\n\
\n\
module.exports = stack;\n\
\n\
/**\n\
 * Return the stack.\n\
 *\n\
 * @return {Array}\n\
 * @api public\n\
 */\n\
\n\
function stack() {\n\
  var orig = Error.prepareStackTrace;\n\
  Error.prepareStackTrace = function(_, stack){ return stack; };\n\
  var err = new Error;\n\
  Error.captureStackTrace(err, arguments.callee);\n\
  var stack = err.stack;\n\
  Error.prepareStackTrace = orig;\n\
  return stack;\n\
}//@ sourceURL=component-stack/index.js"
));
require.register("component-assert/index.js", Function("exports, require, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var stack = require('stack');\n\
\n\
/**\n\
 * Load contents of `script`.\n\
 *\n\
 * @param {String} script\n\
 * @return {String}\n\
 * @api private\n\
 */\n\
\n\
function getScript(script) {\n\
  var xhr = new XMLHttpRequest;\n\
  xhr.open('GET', script, false);\n\
  xhr.send(null);\n\
  return xhr.responseText;\n\
}\n\
\n\
/**\n\
 * Assert `expr` with optional failure `msg`.\n\
 *\n\
 * @param {Mixed} expr\n\
 * @param {String} [msg]\n\
 * @api public\n\
 */\n\
\n\
module.exports = function(expr, msg){\n\
  if (expr) return;\n\
  if (!msg) {\n\
    if (Error.captureStackTrace) {\n\
      var callsite = stack()[1];\n\
      var fn = callsite.fun.toString();\n\
      var file = callsite.getFileName();\n\
      var line = callsite.getLineNumber() - 1;\n\
      var col = callsite.getColumnNumber() - 1;\n\
      var src = getScript(file);\n\
      line = src.split('\\n\
')[line].slice(col);\n\
      expr = line.match(/assert\\((.*)\\)/)[1].trim();\n\
      msg = expr;\n\
    } else {\n\
      msg = 'assertion failed';\n\
    }\n\
  }\n\
\n\
  throw new Error(msg);\n\
};//@ sourceURL=component-assert/index.js"
));
require.register("spotify-uri/index.js", Function("exports, require, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var parse = require('./parse');\n\
var formatURI = require('./formatURI');\n\
var formatOpenURL = require('./formatOpenURL');\n\
var formatPlayURL = require('./formatPlayURL');\n\
var formatEmbedURL = require('./formatEmbedURL');\n\
\n\
/**\n\
 * Module exports.\n\
 */\n\
\n\
exports = module.exports = parse;\n\
\n\
exports.parse = parse;\n\
exports.formatURI = formatURI;\n\
exports.formatOpenURL = formatOpenURL;\n\
exports.formatPlayURL = formatPlayURL;\n\
exports.formatEmbedURL = formatEmbedURL;\n\
//@ sourceURL=spotify-uri/index.js"
));
require.register("spotify-uri/parse.js", Function("exports, require, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var url = require('url');\n\
var qs = require('querystring');\n\
\n\
/**\n\
 * Module exports.\n\
 */\n\
\n\
module.exports = parse;\n\
\n\
/**\n\
 * Parses a \"Spotify URI\".\n\
 *\n\
 * @param {String} uri\n\
 * @return {Object} parsed Spotify uri object\n\
 * @api public\n\
 */\n\
\n\
function parse (uri) {\n\
  var rtn;\n\
  var parts;\n\
  if ('object' == typeof uri) {\n\
    // re-use the `uri` Object if one is passed in\n\
    rtn = uri;\n\
    uri = rtn.uri;\n\
  } else {\n\
    rtn = { uri: uri };\n\
  }\n\
  var parsed = url.parse(uri);\n\
  if ('spotify:' == parsed.protocol) {\n\
    parts = uri.split(':');\n\
    parseParts(parts, rtn);\n\
  } else if ('embed.spotify.com' == parsed.hostname) {\n\
    return parse(qs.parse(parsed.query).uri);\n\
  } else { // http: or https:\n\
    parts = parsed.pathname.split('/');\n\
    parseParts(parts, rtn);\n\
  }\n\
  return rtn;\n\
}\n\
\n\
function parseParts (parts, obj) {\n\
  var len = parts.length;\n\
  if ('search' == parts[1]) {\n\
    obj.type = 'search';\n\
    obj.query = decode(parts.slice(2).join(':'));\n\
  } else if (len >= 3 && 'local' == parts[1]) {\n\
    // local\n\
    obj.type = 'local';\n\
    obj.artist = decode(parts[2]);\n\
    obj.album = decode(parts[3]);\n\
    obj.track = decode(parts[4]);\n\
    obj.seconds = +parts[5];\n\
  } else if (len >= 5) {\n\
    // playlist\n\
    obj.user = decode(parts[2]);\n\
    obj.type = parts[3];\n\
    obj.id = parts[4];\n\
  } else if (len >= 4 && 'starred' == parts[3]) {\n\
    // starred\n\
    obj.type = 'playlist';\n\
    obj.starred = true;\n\
    obj.user = decode(parts[2]);\n\
  } else if (len >= 3) {\n\
    // track, artist, album\n\
    obj.type = parts[1];\n\
    obj.id = parts[2];\n\
  }\n\
}\n\
\n\
/**\n\
 * URL-decode, also replaces `+` (plus) chars with ` ` (space).\n\
 *\n\
 * @param {String} str\n\
 * @api private\n\
 */\n\
\n\
function decode (str) {\n\
  return unescape(str).replace(/\\+/g, ' ');\n\
}\n\
//@ sourceURL=spotify-uri/parse.js"
));
require.register("spotify-uri/formatURI.js", Function("exports, require, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var parse = require('./parse');\n\
\n\
/**\n\
 * Module exports.\n\
 */\n\
\n\
module.exports = formatURI;\n\
\n\
/**\n\
 * Format a \"parsed Spotify object\" back into a Spotify URI string.\n\
 *\n\
 * @param {Object} parsed\n\
 * @return {String}\n\
 * @api public\n\
 */\n\
\n\
function formatURI (parsed) {\n\
  if ('string' == typeof parsed) parsed = parse(parsed);\n\
  if (parsed.starred) {\n\
    // user's \"starred\" playlist\n\
    return 'spotify:user:' + encode(parsed.user) + ':starred';\n\
  } else if ('playlist' == parsed.type) {\n\
    // user \"playlist\"\n\
    return 'spotify:user:' + encode(parsed.user) + ':playlist:' + parsed.id;\n\
  } else if ('local' == parsed.type) {\n\
    // \"local\" file\n\
    return 'spotify:local:' + encode(parsed.artist) +\n\
                        ':' + encode(parsed.album) +\n\
                        ':' + encode(parsed.track) +\n\
                        ':' + parsed.seconds;\n\
  } else if ('search' == parsed.type) {\n\
    // \"search\" query\n\
    return 'spotify:search:' + encode(parsed.query);\n\
  } else {\n\
    // artist, album, track\n\
    return 'spotify:' + parsed.type + ':' + parsed.id;\n\
  }\n\
}\n\
\n\
/**\n\
 * URL-encode, also turn ` ` (space) chars into `+` (plus).\n\
 *\n\
 * @param {String} str\n\
 * @api private\n\
 */\n\
\n\
function encode (str) {\n\
  return escape(str.replace(/ /g, '+'));\n\
}\n\
//@ sourceURL=spotify-uri/formatURI.js"
));
require.register("spotify-uri/formatOpenURL.js", Function("exports, require, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var parse = require('./parse');\n\
\n\
/**\n\
 * Module exports.\n\
 */\n\
\n\
module.exports = formatOpenURL;\n\
\n\
/**\n\
 * Format a \"parsed Spotify object\" back into a Spotify\n\
 * \"open.spotify.com\" URL string.\n\
 *\n\
 * @param {Object} parsed\n\
 * @return {String}\n\
 * @api public\n\
 */\n\
\n\
function formatOpenURL (parsed, base) {\n\
  if ('string' == typeof parsed) parsed = parse(parsed);\n\
  if ('string' != typeof base) base = 'http://open.spotify.com';\n\
  if (parsed.starred) {\n\
    // user's \"starred\" playlist\n\
    return base + '/user/' + encode(parsed.user) + '/starred';\n\
  } else if ('playlist' == parsed.type) {\n\
    // user \"playlist\"\n\
    return base + '/user/' + encode(parsed.user) + '/playlist/' + parsed.id;\n\
  } else if ('local' == parsed.type) {\n\
    // \"local\" file\n\
    return base + '/local/' + encode(parsed.artist) +\n\
                        '/' + encode(parsed.album) +\n\
                        '/' + encode(parsed.track) +\n\
                        '/' + parsed.seconds;\n\
  } else if ('search' == parsed.type) {\n\
    // \"search\" query\n\
    return base + '/search/' + encode(parsed.query);\n\
  } else {\n\
    // artist, album, track\n\
    return base + '/' + parsed.type + '/' + parsed.id;\n\
  }\n\
}\n\
\n\
/**\n\
 * URL-encode, also turn ` ` (space) chars into `+` (plus).\n\
 *\n\
 * @param {String} str\n\
 * @api private\n\
 */\n\
\n\
function encode (str) {\n\
  return escape(str.replace(/ /g, '+'));\n\
}\n\
//@ sourceURL=spotify-uri/formatOpenURL.js"
));
require.register("spotify-uri/formatPlayURL.js", Function("exports, require, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var formatOpenURL = require('./formatOpenURL');\n\
\n\
/**\n\
 * Module exports.\n\
 */\n\
\n\
module.exports = formatPlayURL;\n\
\n\
/**\n\
 * Format a \"parsed Spotify object\" back into a Spotify\n\
 * \"play.spotify.com\" URL string.\n\
 *\n\
 * @param {Object} parsed\n\
 * @return {String}\n\
 * @api public\n\
 */\n\
\n\
function formatPlayURL (parsed) {\n\
  return formatOpenURL(parsed, 'https://play.spotify.com');\n\
}\n\
//@ sourceURL=spotify-uri/formatPlayURL.js"
));
require.register("spotify-uri/formatEmbedURL.js", Function("exports, require, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var formatURI = require('./formatURI');\n\
\n\
/**\n\
 * Module exports.\n\
 */\n\
\n\
module.exports = formatEmbedURI;\n\
\n\
/**\n\
 * Format a \"parsed Spotify object\" back into a Spotify \"embed.spotify.com\" URL\n\
 * string.\n\
 *\n\
 * @param {Object} parsed\n\
 * @return {String}\n\
 * @api public\n\
 */\n\
\n\
function formatEmbedURI (parsed) {\n\
  return 'https://embed.spotify.com/?uri=' + formatURI(parsed);\n\
}\n\
//@ sourceURL=spotify-uri/formatEmbedURL.js"
));



require.alias("component-url/index.js", "spotify-uri/deps/url/index.js");
require.alias("component-url/index.js", "url/index.js");

require.alias("component-querystring/index.js", "spotify-uri/deps/querystring/index.js");
require.alias("component-querystring/index.js", "querystring/index.js");
require.alias("component-trim/index.js", "component-querystring/deps/trim/index.js");

require.alias("component-assert/index.js", "spotify-uri/deps/assert/index.js");
require.alias("component-assert/index.js", "assert/index.js");
require.alias("component-stack/index.js", "component-assert/deps/stack/index.js");
