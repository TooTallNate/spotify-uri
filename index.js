
/**
 * Module dependencies.
 */

var parse = require('./parse');
var formatURI = require('./formatURI');
var formatOpenURL = require('./formatOpenURL');
var formatPlayURL = require('./formatPlayURL');
var formatEmbedURL = require('./formatEmbedURL');

/**
 * Module exports.
 */

exports = module.exports = parse;

exports.parse = parse;
exports.formatURI = formatURI;
exports.formatOpenURL = formatOpenURL;
exports.formatPlayURL = formatPlayURL;
exports.formatEmbedURL = formatEmbedURL;
