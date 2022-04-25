/**
 * URL-decode, also replaces `+` (plus) chars with ` ` (space).
 *
 * @param {String} str
 * @api private
 */
export function decode (str: string): string {
  return decodeURIComponent(str).replace(/\+/g, ' ')
}

/**
 * URL-encode, also turn ` ` (space) chars into `+` (plus).
 *
 * @param {String} str
 * @api private
 */
export function encode (str: string): string {
  return escape(str.replace(/ /g, '+'))
}

export const URL = global?.URL || window?.URL || require('url').URL;
