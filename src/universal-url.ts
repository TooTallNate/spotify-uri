let URLClass: typeof URL;

if (typeof window !== "undefined" && typeof window.URL !== "undefined") {
  // for browser environment
  URLClass = window.URL;
} else if (typeof global !== "undefined" && typeof global.URL !== "undefined") {
  // for react native environment
  URLClass = global.URL;
} else if (typeof require !== "undefined") {
  // for Node.js environment
  const { URL } = require("url");
  URLClass = URL;
} else {
  throw new Error("Unsupported environment");
}

export { URLClass as URL };
