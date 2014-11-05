
/**
 * Module dependencies.
 */

var assert = require('assert');
var parse = require('../');

var formatURI = parse.formatURI;
var formatOpenURL = parse.formatOpenURL;
var formatPlayURL = parse.formatPlayURL;
var formatEmbedURL = parse.formatEmbedURL;

describe('parse()', function () {
  describe('"open.spotify.com" URLs', function () {
    it('should parse "track" URLs', function () {
      var url = 'http://open.spotify.com/track/10M2REwwztVxgr0szw7UwD';
      var obj = parse(url);
      assert('track' == obj.type);
      assert('10M2REwwztVxgr0szw7UwD' == obj.id);
    });
    it('should parse "playlist" URLs', function () {
      var url = 'http://open.spotify.com/user/tootallnate/playlist/0Lt5S4hGarhtZmtz7BNTeX';
      var obj = parse(url);
      assert('playlist' == obj.type);
      assert('tootallnate' == obj.user);
      assert('0Lt5S4hGarhtZmtz7BNTeX' == obj.id);
    });
    it('should parse "local" URLs', function () {
      var url = 'http://open.spotify.com/local/Yasunori+Mitsuda/Chrono+Trigger+OST/A+Shot+of+Crisis/161';
      var obj = parse(url);
      assert('local' == obj.type);
      assert('Yasunori Mitsuda' == obj.artist);
      assert('Chrono Trigger OST' == obj.album);
      assert('A Shot of Crisis' == obj.track);
      assert(161 == obj.seconds);
    });
    it('should parse "search" URLs', function () {
      var url = 'http://open.spotify.com/search/artist%3ah%c3%a4xor';
      var obj = parse(url);
      assert('search' == obj.type);
      assert('artist:häxor' == obj.query);
    });
    it('should parse "encoded special characters" in URLs', function () {
      var url = 'http://open.spotify.com/user/hitradio%c3%b63';
      var obj = parse(url);
      assert('user', obj.type);
      assert('hitradioö3', obj.user);
    });
    it('should parse "special characters" in URLs', function () {
      var url = 'http://open.spotify.com/user/hitradioö63';
      var obj = parse(url);
      assert('user', obj.type);
      assert('hitradioö3', obj.user);
    });
    it('should parse "user" URLs', function () {
      var url = 'http://open.spotify.com/user/tootallnate';
      var obj = parse(url);
      assert('user' == obj.type);
      assert('tootallnate' == obj.id);
    });
  });

  describe('"play.spotify.com" URLs', function () {
    it('should parse "track" URLs', function () {
      var url = 'https://play.spotify.com/track/5W3cjX2J3tjhG8zb6u0qHn';
      var obj = parse(url);
      assert('track' == obj.type);
      assert('5W3cjX2J3tjhG8zb6u0qHn' == obj.id);
    });
  });

  describe('"embed.spotify.com" URLs', function () {
    it('should parse "track" URLs', function () {
      var url = 'https://embed.spotify.com/?uri=spotify:track:5oscsdDQ0NpjsTgpG4bI8S';
      var obj = parse(url);
      assert('track' == obj.type);
      assert('5oscsdDQ0NpjsTgpG4bI8S' == obj.id);
    });
  });

  describe('Spotify URIs', function () {
    it('should parse "ablum" URIs', function () {
      var uri = 'spotify:album:4m2880jivSbbyEGAKfITCa';
      var obj = parse(uri);
      assert('album' == obj.type);
      assert('4m2880jivSbbyEGAKfITCa' == obj.id);
    });
    it('should parse "artist" URIs', function () {
      var uri = 'spotify:artist:4tZwfgrHOc3mvqYlEYSvVi';
      var obj = parse(uri);
      assert('artist' == obj.type);
      assert('4tZwfgrHOc3mvqYlEYSvVi' == obj.id);
    });
    it('should parse "track" URIs', function () {
      var uri = 'spotify:track:5CMjjywI0eZMixPeqNd75R';
      var obj = parse(uri);
      assert('track' == obj.type);
      assert('5CMjjywI0eZMixPeqNd75R' == obj.id);
    });
    it('should parse "playlist" URIs', function () {
      var uri = 'spotify:user:daftpunkofficial:playlist:6jP6EcvAwqNksccDkIe6hX';
      var obj = parse(uri);
      assert('playlist' == obj.type);
      assert('daftpunkofficial' == obj.user);
      assert('6jP6EcvAwqNksccDkIe6hX' == obj.id);
    });
    it('should parse "local" track URIs', function () {
      var uri = 'spotify:local:Yasunori+Mitsuda:Chrono+Trigger+OST:A+Shot+of+Crisis:161';
      var obj = parse(uri);
      assert('local' == obj.type);
      assert('Yasunori Mitsuda' == obj.artist);
      assert('Chrono Trigger OST' == obj.album);
      assert('A Shot of Crisis' == obj.track);
      assert(161 === obj.seconds);
    });
    it('should parse "local" track URIs 2', function () {
      var uri = 'spotify:local:::a:6';
      var obj = parse(uri);
      assert('local' == obj.type);
      assert('' === obj.artist);
      assert('' === obj.album);
      assert('a' === obj.track);
      assert(6 === obj.seconds);
    });
    it('should parse "starred" playlist URIs', function () {
      var uri = 'spotify:user:tootallnate:starred';
      var obj = parse(uri);
      assert('playlist' == obj.type);
      assert('tootallnate' == obj.user);
      assert(true == obj.starred);
    });
    it('should parse "search" URIs', function () {
      var uri = 'spotify:search:artist:h%C3%A4xor';
      var obj = parse(uri);
      assert('search' == obj.type);
      assert('artist:häxor' == obj.query);
    });
    it('should parse "encoded special characters" in URIs', function () {
      var url = 'spotify:user:hitradio%c3%b63';
      var obj = parse(url);
      assert('user', obj.type);
      assert('hitradioö3', obj.user);
    });
    it('should parse "special characters" in URIs', function () {
      var url = 'spotify:user:hitradioö63';
      var obj = parse(url);
      assert('user', obj.type);
      assert('hitradioö3', obj.user);
    });
    it('should parse combined "search"', function () {
      var uri = 'spotify:search:genre:hip-hop+year:1980-1989';
      var obj = parse(uri);
      assert('search' == obj.type);
      assert('genre:hip-hop year:1980-1989' == obj.query);
    });
  });
});


describe('formatURI()', function () {
  it('should format "artist" open URLs', function () {
    var url = 'http://open.spotify.com/artist/1gR0gsQYfi6joyO1dlp76N';
    var obj = parse(url);
    var expected = 'spotify:artist:1gR0gsQYfi6joyO1dlp76N';
    var actual = formatURI(obj);
    assert(actual == expected);
  });
  it('should format "search" query URIs', function () {
    var url = 'spotify:search:artist%3aDaft+Punk';
    var obj = parse(url);
    var expected = 'spotify:search:artist%3ADaft+Punk';
    var actual = formatURI(obj);
    assert(actual == expected);
  });
  it('should format "starred" playlist open URLs', function () {
    var url = 'http://open.spotify.com/user/syknyk/starred';
    var obj = parse(url);
    var expected = 'spotify:user:syknyk:starred';
    var actual = formatURI(obj);
    assert(actual == expected);
  });
  it('should parse "playlist" URIs', function () {
    var url = 'spotify:user:syknyk:playlist:0Idyatn0m08Y48tiOovNd9';
    var obj = parse(url);
    var expected = 'spotify:user:syknyk:playlist:0Idyatn0m08Y48tiOovNd9';
    var actual = formatURI(obj);
    assert(actual == expected);
  });
  it('should parse "local" file URIs', function () {
    var url = 'spotify:local:Flite%2c+Medium+Minus:YouTube:Find+What+You+Love:399';
    var obj = parse(url);
    var expected = 'spotify:local:Flite%2C+Medium+Minus:YouTube:Find+What+You+Love:399';
    var actual = formatURI(obj);
    assert(actual == expected);
  });
});


describe('formatOpenURL()', function () {
  it('should format "artist" URIs', function () {
    var uri = 'spotify:artist:1gR0gsQYfi6joyO1dlp76N';
    var obj = parse(uri);
    var expected = 'http://open.spotify.com/artist/1gR0gsQYfi6joyO1dlp76N';
    var actual = formatOpenURL(obj);
    assert(actual == expected);
  });
  it('should format "album" URIs', function () {
    var uri = 'spotify:album:7CjakTZxwIF8oixONe6Bpb';
    var obj = parse(uri);
    var expected = 'http://open.spotify.com/album/7CjakTZxwIF8oixONe6Bpb';
    var actual = formatOpenURL(obj);
    assert(actual == expected);
  });
  it('should format "track" URIs', function () {
    var uri = 'spotify:track:4XfokvilxHAOQXfnWD9p0Q';
    var obj = parse(uri);
    var expected = 'http://open.spotify.com/track/4XfokvilxHAOQXfnWD9p0Q';
    var actual = formatOpenURL(obj);
    assert(actual == expected);
  });
  it('should format "playlist" URIs', function () {
    var uri = 'spotify:user:daftpunkofficial:playlist:6jP6EcvAwqNksccDkIe6hX';
    var obj = parse(uri);
    var expected = 'http://open.spotify.com/user/daftpunkofficial/playlist/6jP6EcvAwqNksccDkIe6hX';
    var actual = formatOpenURL(obj);
    assert(actual == expected);
  });
  it('should format "starred" playlist URIs', function () {
    var uri = 'spotify:user:tootallnate:starred';
    var obj = parse(uri);
    var expected = 'http://open.spotify.com/user/tootallnate/starred';
    var actual = formatOpenURL(obj);
    assert(actual == expected);
  });
  it('should format "local" URIs', function () {
    var uri = 'spotify:local:Yasunori+Mitsuda:Chrono+Trigger+OST+Disc+2:Ayla%27s+Theme:84';
    var obj = parse(uri);
    var expected = 'http://open.spotify.com/local/Yasunori+Mitsuda/Chrono+Trigger+OST+Disc+2/Ayla%27s+Theme/84';
    var actual = formatOpenURL(obj);
    assert(actual == expected);
  });
  it('should format "local" URIs 2', function () {
    var uri = 'spotify:local:::a:6';
    var obj = parse(uri);
    var expected = 'http://open.spotify.com/local///a/6';
    var actual = formatOpenURL(obj);
    assert(actual == expected);
  });
  it('should format "search" URIs', function () {
    var uri = 'spotify:search:artist%3aDaft+Punk';
    var obj = parse(uri);
    var expected = 'http://open.spotify.com/search/artist%3ADaft+Punk';
    var actual = formatOpenURL(obj);
    assert(actual == expected);
  });
});


describe('formatPlayURL()', function () {
  it('should format "track" URIs', function () {
    var uri = 'spotify:track:4XfokvilxHAOQXfnWD9p0Q';
    var obj = parse(uri);
    var expected = 'https://play.spotify.com/track/4XfokvilxHAOQXfnWD9p0Q';
    var actual = formatPlayURL(obj);
    assert(actual == expected);
  });
});


describe('formatEmbedURL()', function () {
  it('should format "track" URIs', function () {
    var uri = 'spotify:track:4XfokvilxHAOQXfnWD9p0Q';
    var obj = parse(uri);
    var expected = 'https://embed.spotify.com/?uri=spotify:track:4XfokvilxHAOQXfnWD9p0Q';
    var actual = formatEmbedURL(obj);
    assert(actual == expected);
  });
});
