spotify-uri
===========
### Parse the various Spotify URI formats into Objects

Spotify URIs get passed around in a variety of flavors. This module parses them
into a JavaScript object so you can work with the further.

Installation
------------

Install for node.js using `npm`:

``` bash
$ npm install spotify-uri
```

Install for component(1) using `component`:

``` bash
$ component install TooTallNate/spotify-uri
```


Example
-------


``` javascript
var parse = require('spotify-uri');
var parsed;

parsed = parse('spotify:track:3GU4cxkfdc3lIp9pFEMMmw');
console.log(parsed);
// { uri: 'spotify:track:3GU4cxkfdc3lIp9pFEMMmw',
//   type: 'track',
//   id: '3GU4cxkfdc3lIp9pFEMMmw' }

parsed = parse('http://open.spotify.com/track/1pKYYY0dkg23sQQXi0Q5zN');
console.log(parsed);
// { uri: 'http://open.spotify.com/track/1pKYYY0dkg23sQQXi0Q5zN',
//   type: 'track',
//   id: '1pKYYY0dkg23sQQXi0Q5zN' }
```

See the `test` directory for some more examples of Spotify URIs.
