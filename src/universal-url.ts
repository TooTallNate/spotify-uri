let URLClass: typeof URL;

declare var window: any;

if (typeof window !== "undefined" && typeof window.URL !== "undefined") {
  // for browser environment
  URLClass = URL;
} else if (typeof global !== "undefined" && typeof global.URL !== "undefined") {
  // for react native environment
  URLClass = URL;
} else if (typeof require !== "undefined") {
  // for Node.js environment
  const { URL } = require("url");
  URLClass = URL;
} else {
  throw new Error("Unsupported environment");
}

export { URLClass as URL };
