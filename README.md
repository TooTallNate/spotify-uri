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
var spotifyUri = require('spotify-uri');
var parsed, uri;

// parse Spotify URIs or HTTP URLs into JavaScipt metadata Objects:

parsed = spotifyUri.parse('spotify:track:3GU4cxkfdc3lIp9pFEMMmw');
console.log(parsed);
// { uri: 'spotify:track:3GU4cxkfdc3lIp9pFEMMmw',
//   type: 'track',
//   id: '3GU4cxkfdc3lIp9pFEMMmw' }

parsed = spotifyUri.parse('http://open.spotify.com/track/1pKYYY0dkg23sQQXi0Q5zN');
console.log(parsed);
// { uri: 'http://open.spotify.com/track/1pKYYY0dkg23sQQXi0Q5zN',
//   type: 'track',
//   id: '1pKYYY0dkg23sQQXi0Q5zN' }


// you can also format the parsed objects back into a URI or HTTP URL:

uri = spotifyUri.formatURI(parsed);
console.log(uri);
// 'spotify:track:1pKYYY0dkg23sQQXi0Q5zN'

uri = spotifyUri.formatOpenURL(parsed);
console.log(uri);
// 'http://open.spotify.com/track/1pKYYY0dkg23sQQXi0Q5zN'

uri = spotifyUri.formatPlayURL(parsed);
console.log(uri);
// 'https://play.spotify.com/track/1pKYYY0dkg23sQQXi0Q5zN'

uri = spotifyUri.formatEmbedURL(parsed);
console.log(uri);
// 'https://embed.spotify.com/?uri=spotify:track:1pKYYY0dkg23sQQXi0Q5zN'
```

See the [test cases][tests] for some more examples of Spotify URIs.

## License

  MIT

[tests]: http://tootallnate.github.io/spotify-uri/
