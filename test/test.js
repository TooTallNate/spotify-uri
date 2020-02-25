const assert = require('assert');
const parse = require('../');
const formatURI = parse.formatURI;
const formatOpenURL = parse.formatOpenURL;
const formatPlayURL = parse.formatPlayURL;
const formatEmbedURL = parse.formatEmbedURL;

describe('parse()', function() {
	describe('"open.spotify.com" URLs', function() {
		it('should parse "track" URLs', function() {
			let url = 'http://open.spotify.com/track/10M2REwwztVxgr0szw7UwD';
			let obj = parse(url);
			assert.equal('track', obj.type);
			assert.equal('10M2REwwztVxgr0szw7UwD', obj.id);
		});
		it('should parse user "playlist" URLs', function() {
			let url =
				'http://open.spotify.com/user/tootallnate/playlist/0Lt5S4hGarhtZmtz7BNTeX';
			let obj = parse(url);
			assert.equal('playlist', obj.type);
			assert.equal('tootallnate', obj.user);
			assert.equal('0Lt5S4hGarhtZmtz7BNTeX', obj.id);
		});
		it('should parse public "playlist" URLs', function() {
			let url =
				'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M';
			let obj = parse(url);
			assert('playlist' == obj.type);
			assert('37i9dQZF1DXcBWIGoYBM5M' == obj.id);
		});
		it('should parse "local" URLs', function() {
			let url =
				'http://open.spotify.com/local/Yasunori+Mitsuda/Chrono+Trigger+OST/A+Shot+of+Crisis/161';
			let obj = parse(url);
			assert('local' == obj.type);
			assert('Yasunori Mitsuda' == obj.artist);
			assert('Chrono Trigger OST' == obj.album);
			assert('A Shot of Crisis' == obj.track);
			assert(161 == obj.seconds);
		});
		it('should parse "search" URLs', function() {
			let url = 'http://open.spotify.com/search/artist%3ah%c3%a4xor';
			let obj = parse(url);
			assert('search' == obj.type);
			assert('artist:häxor' == obj.query);
		});
		it('should parse "encoded special characters" in URLs', function() {
			let url = 'http://open.spotify.com/user/hitradio%c3%b63';
			let obj = parse(url);
			assert.equal('user', obj.type);
			assert.equal('hitradioö3', obj.user);
		});
		it('should parse "special characters" in URLs', function() {
			let url = 'http://open.spotify.com/user/hitradioö3';
			let obj = parse(url);
			assert.equal('user', obj.type);
			assert.equal('hitradioö3', obj.user);
		});
		it('should parse "user" URLs', function() {
			let url = 'http://open.spotify.com/user/tootallnate';
			let obj = parse(url);
			assert.equal('user', obj.type);
			assert.equal('tootallnate', obj.user);
		});
	});

	describe('"play.spotify.com" URLs', function() {
		it('should parse "track" URLs', function() {
			let url = 'https://play.spotify.com/track/5W3cjX2J3tjhG8zb6u0qHn';
			let obj = parse(url);
			assert('track' == obj.type);
			assert('5W3cjX2J3tjhG8zb6u0qHn' == obj.id);
		});
	});

	describe('"embed.spotify.com" URLs', function() {
		it('should parse "track" URLs', function() {
			let url =
				'https://embed.spotify.com/?uri=spotify:track:5oscsdDQ0NpjsTgpG4bI8S';
			let obj = parse(url);
			assert('track' == obj.type);
			assert('5oscsdDQ0NpjsTgpG4bI8S' == obj.id);
		});
	});

	describe('"open.spotify.com/embed" URLs (e.g. twitter embed)', function() {
		it('should parse "track" URLs', function() {
			let url =
				'https://open.spotify.com/embed/track/5oscsdDQ0NpjsTgpG4bI8S';
			let obj = parse(url);
			assert('track' == obj.type);
			assert('5oscsdDQ0NpjsTgpG4bI8S' == obj.id);
		});
	});

	describe('Spotify URIs', function() {
		it('should parse "ablum" URIs', function() {
			let uri = 'spotify:album:4m2880jivSbbyEGAKfITCa';
			let obj = parse(uri);
			assert('album' == obj.type);
			assert('4m2880jivSbbyEGAKfITCa' == obj.id);
		});
		it('should parse "artist" URIs', function() {
			let uri = 'spotify:artist:4tZwfgrHOc3mvqYlEYSvVi';
			let obj = parse(uri);
			assert('artist' == obj.type);
			assert('4tZwfgrHOc3mvqYlEYSvVi' == obj.id);
		});
		it('should parse "track" URIs', function() {
			let uri = 'spotify:track:5CMjjywI0eZMixPeqNd75R';
			let obj = parse(uri);
			assert('track' == obj.type);
			assert('5CMjjywI0eZMixPeqNd75R' == obj.id);
		});
		it('should parse user "playlist" URIs', function() {
			let uri =
				'spotify:user:daftpunkofficial:playlist:6jP6EcvAwqNksccDkIe6hX';
			let obj = parse(uri);
			assert('playlist' == obj.type);
			assert('daftpunkofficial' == obj.user);
			assert('6jP6EcvAwqNksccDkIe6hX' == obj.id);
		});
		it('should parse public "playlist" URIs', function() {
			let uri = 'spotify:playlist:37i9dQZF1DX4JAvHpjipBk';
			let obj = parse(uri);
			assert('playlist' == obj.type);
			assert('37i9dQZF1DX4JAvHpjipBk' == obj.id);
		});
		it('should parse "local" track URIs', function() {
			let uri =
				'spotify:local:Yasunori+Mitsuda:Chrono+Trigger+OST:A+Shot+of+Crisis:161';
			let obj = parse(uri);
			assert('local' == obj.type);
			assert('Yasunori Mitsuda' == obj.artist);
			assert('Chrono Trigger OST' == obj.album);
			assert('A Shot of Crisis' == obj.track);
			assert(161 === obj.seconds);
		});
		it('should parse "local" track URIs 2', function() {
			let uri = 'spotify:local:::a:6';
			let obj = parse(uri);
			assert('local' == obj.type);
			assert('' === obj.artist);
			assert('' === obj.album);
			assert('a' === obj.track);
			assert(6 === obj.seconds);
		});
		it('should parse "starred" playlist URIs', function() {
			let uri = 'spotify:user:tootallnate:starred';
			let obj = parse(uri);
			assert.equal('playlist', obj.type);
			assert.equal('tootallnate', obj.user);
			assert.equal('starred', obj.id);
		});
		it('should parse "search" URIs', function() {
			let uri = 'spotify:search:artist:h%C3%A4xor';
			let obj = parse(uri);
			assert('search' == obj.type);
			assert('artist:häxor' == obj.query);
		});
		it('should parse "encoded special characters" in URIs', function() {
			let url = 'spotify:user:hitradio%c3%b63';
			let obj = parse(url);
			assert('user', obj.type);
			assert('hitradioö3', obj.user);
		});
		it('should parse "special characters" in URIs', function() {
			let url = 'spotify:user:hitradioö63';
			let obj = parse(url);
			assert('user', obj.type);
			assert('hitradioö3', obj.user);
		});
		it('should parse combined "search"', function() {
			let uri = 'spotify:search:genre:hip-hop+year:1980-1989';
			let obj = parse(uri);
			assert('search' == obj.type);
			assert('genre:hip-hop year:1980-1989' == obj.query);
		});
	});
});

describe('formatURI()', function() {
	it('should format "artist" open URLs', function() {
		let url = 'http://open.spotify.com/artist/1gR0gsQYfi6joyO1dlp76N';
		let obj = parse(url);
		let expected = 'spotify:artist:1gR0gsQYfi6joyO1dlp76N';
		let actual = formatURI(obj);
		assert.equal(actual, expected);
	});
	it('should format "search" query URIs', function() {
		let url = 'spotify:search:artist%3aDaft+Punk';
		let obj = parse(url);
		let expected = 'spotify:search:artist%3ADaft+Punk';
		let actual = formatURI(obj);
		assert.equal(actual, expected);
	});
	it('should format "starred" playlist open URLs', function() {
		let url = 'http://open.spotify.com/user/syknyk/starred';
		let obj = parse(url);
		let expected = 'spotify:user:syknyk:starred';
		let actual = formatURI(obj);
		assert.equal(actual, expected);
	});
	it('should parse user "playlist" URIs', function() {
		let url = 'spotify:user:syknyk:playlist:0Idyatn0m08Y48tiOovNd9';
		let obj = parse(url);
		let expected = 'spotify:user:syknyk:playlist:0Idyatn0m08Y48tiOovNd9';
		let actual = formatURI(obj);
		assert.equal(actual, expected);
	});
	it('should parse public "playlist" URIs', function() {
		let url = 'spotify:playlist:37i9dQZF1DWUa8ZRTfalHk';
		let obj = parse(url);
		let expected = 'spotify:playlist:37i9dQZF1DWUa8ZRTfalHk';
		let actual = formatURI(obj);
		assert.equal(actual, expected);
	});
	it('should parse "local" file URIs', function() {
		let url =
			'spotify:local:Flite%2c+Medium+Minus:YouTube:Find+What+You+Love:399';
		let obj = parse(url);
		let expected =
			'spotify:local:Flite%2C+Medium+Minus:YouTube:Find+What+You+Love:399';
		let actual = formatURI(obj);
		assert.equal(actual, expected);
	});
});

describe('formatOpenURL()', function() {
	it('should format "artist" URIs', function() {
		let uri = 'spotify:artist:1gR0gsQYfi6joyO1dlp76N';
		let obj = parse(uri);
		let expected = 'http://open.spotify.com/artist/1gR0gsQYfi6joyO1dlp76N';
		let actual = formatOpenURL(obj);
		assert.equal(actual, expected);
	});
	it('should format "album" URIs', function() {
		let uri = 'spotify:album:7CjakTZxwIF8oixONe6Bpb';
		let obj = parse(uri);
		let expected = 'http://open.spotify.com/album/7CjakTZxwIF8oixONe6Bpb';
		let actual = formatOpenURL(obj);
		assert.equal(actual, expected);
	});
	it('should format "track" URIs', function() {
		let uri = 'spotify:track:4XfokvilxHAOQXfnWD9p0Q';
		let obj = parse(uri);
		let expected = 'http://open.spotify.com/track/4XfokvilxHAOQXfnWD9p0Q';
		let actual = formatOpenURL(obj);
		assert.equal(actual, expected);
	});
	it('should format user "playlist" URIs', function() {
		let uri =
			'spotify:user:daftpunkofficial:playlist:6jP6EcvAwqNksccDkIe6hX';
		let obj = parse(uri);
		let expected =
			'http://open.spotify.com/user/daftpunkofficial/playlist/6jP6EcvAwqNksccDkIe6hX';
		let actual = formatOpenURL(obj);
		assert.equal(actual, expected);
	});
	it('should format public "playlist" URIs', function() {
		let uri = 'spotify:playlist:37i9dQZF1DXaPCIWxzZwR1';
		let obj = parse(uri);
		let expected =
			'http://open.spotify.com/playlist/37i9dQZF1DXaPCIWxzZwR1';
		let actual = formatOpenURL(obj);
		assert.equal(actual, expected);
	});
	it('should format "starred" playlist URIs', function() {
		let uri = 'spotify:user:tootallnate:starred';
		let obj = parse(uri);
		let expected = 'http://open.spotify.com/user/tootallnate/starred';
		let actual = formatOpenURL(obj);
		assert.equal(actual, expected);
	});
	it('should format "local" URIs', function() {
		let uri =
			'spotify:local:Yasunori+Mitsuda:Chrono+Trigger+OST+Disc+2:Ayla%27s+Theme:84';
		let obj = parse(uri);
		let expected =
			'http://open.spotify.com/local/Yasunori+Mitsuda/Chrono+Trigger+OST+Disc+2/Ayla%27s+Theme/84';
		let actual = formatOpenURL(obj);
		assert.equal(actual, expected);
	});
	it('should format "local" URIs 2', function() {
		let uri = 'spotify:local:::a:6';
		let obj = parse(uri);
		let expected = 'http://open.spotify.com/local///a/6';
		let actual = formatOpenURL(obj);
		assert.equal(actual, expected);
	});
	it('should format "search" URIs', function() {
		let uri = 'spotify:search:artist%3aDaft+Punk';
		let obj = parse(uri);
		let expected = 'http://open.spotify.com/search/artist%3ADaft+Punk';
		let actual = formatOpenURL(obj);
		assert.equal(actual, expected);
	});
});

describe('formatPlayURL()', function() {
	it('should format "track" URIs', function() {
		let uri = 'spotify:track:4XfokvilxHAOQXfnWD9p0Q';
		let obj = parse(uri);
		let expected = 'https://play.spotify.com/track/4XfokvilxHAOQXfnWD9p0Q';
		let actual = formatPlayURL(obj);
		assert.equal(actual, expected);
	});
});

describe('formatEmbedURL()', function() {
	it('should format "track" URIs', function() {
		let uri = 'spotify:track:4XfokvilxHAOQXfnWD9p0Q';
		let obj = parse(uri);
		let expected =
			'https://embed.spotify.com/?uri=spotify:track:4XfokvilxHAOQXfnWD9p0Q';
		let actual = formatEmbedURL(obj);
		assert.equal(actual, expected);
	});
});
