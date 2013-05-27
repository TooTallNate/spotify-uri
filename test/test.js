
/**
 * Module dependencies.
 */

var assert = require('assert');
var parse;

try {
  // component
  parse = require('spotify-uri');
} catch (e) {
  // node.js
  parse = require('../');
}

describe('HTTP URLs', function () {
  describe('open.spotify.com', function () {
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
  });
  describe('play.spotify.com', function () {
    it('should parse "track" URLs', function () {
      var url = 'https://play.spotify.com/track/5W3cjX2J3tjhG8zb6u0qHn';
      var obj = parse(url);
      assert('track' == obj.type);
      assert('5W3cjX2J3tjhG8zb6u0qHn' == obj.id);
    });
  });
  describe('embed.spotify.com', function () {
    it('should parse "track" URLs', function () {
      var url = 'https://embed.spotify.com/?uri=spotify:track:5oscsdDQ0NpjsTgpG4bI8S';
      var obj = parse(url);
      assert('track' == obj.type);
      assert('5oscsdDQ0NpjsTgpG4bI8S' == obj.id);
    });
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
    assert(161 == obj.seconds);
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
    assert('artist:hÃ¤xor' == obj.query);
  });
  it('should parse combined "search"', function () {
    var uri = 'spotify:search:genre:hip-hop+year:1980-1989';
    var obj = parse(uri);
    assert('search' == obj.type);
    assert('genre:hip-hop year:1980-1989' == obj.query);
  });
});
