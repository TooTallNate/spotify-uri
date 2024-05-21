let URLClass: typeof URL

if (typeof window !== 'undefined' && typeof window.URL !== 'undefined') {
  URLClass = window.URL
} else if (typeof require !== 'undefined') {
  const { URL } = require('url')
  URLClass = URL
} else {
  throw new Error('Unsupported environment');
}

export { URLClass as URL }