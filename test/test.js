/* global describe, it */

const assert = require('assert')

const {
  parse,
  formatURI,
  formatOpenURL,
  formatPlayURL,
  formatEmbedURL
} = require('../dist')

describe('parse()', function () {
  describe('"open.spotify.com" URLs', function () {
    it('should parse "track" URLs', function () {
      const url = 'http://open.spotify.com/track/10M2REwwztVxgr0szw7UwD'
      const obj = parse(url)
      assert.equal('track', obj.type)
      assert.equal('10M2REwwztVxgr0szw7UwD', obj.id)
    })
    it('should parse "episode" URLs', function () {
      const url = 'http://open.spotify.com/episode/64TORH3xleuD1wcnFsrH1E'
      const obj = parse(url)
      assert.equal('episode', obj.type)
      assert.equal('64TORH3xleuD1wcnFsrH1E', obj.id)
    })
    it('should parse "show" URLs', function () {
      const url = 'https://open.spotify.com/show/6uxKcBftLv1aOWoNL7UzTl'
      const obj = parse(url)
      assert.equal('show', obj.type)
      assert.equal('6uxKcBftLv1aOWoNL7UzTl', obj.id)
    })
    it('should parse user "playlist" URLs', function () {
      const url =
        'http://open.spotify.com/user/tootallnate/playlist/0Lt5S4hGarhtZmtz7BNTeX'
      const obj = parse(url)
      assert.equal('playlist', obj.type)
      assert.equal('tootallnate', obj.user)
      assert.equal('0Lt5S4hGarhtZmtz7BNTeX', obj.id)
    })
    it('should parse public "playlist" URLs', function () {
      const url = 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M'
      const obj = parse(url)
      assert.equal('playlist', obj.type)
      assert.equal('37i9dQZF1DXcBWIGoYBM5M', obj.id)
    })
    it('should parse "local" URLs', function () {
      const url =
        'http://open.spotify.com/local/Yasunori+Mitsuda/Chrono+Trigger+OST/A+Shot+of+Crisis/161'
      const obj = parse(url)
      assert.equal('local', obj.type)
      assert.equal('Yasunori Mitsuda', obj.artist)
      assert.equal('Chrono Trigger OST', obj.album)
      assert.equal('A Shot of Crisis', obj.track)
      assert.equal(161, obj.seconds)
    })
    it('should parse "search" URLs', function () {
      const url = 'http://open.spotify.com/search/artist%3ah%c3%a4xor'
      const obj = parse(url)
      assert.equal('search', obj.type)
      assert.equal('artist:häxor', obj.query)
    })
    it('should parse "encoded special characters" in URLs', function () {
      const url = 'http://open.spotify.com/user/hitradio%c3%b63'
      const obj = parse(url)
      assert.equal('user', obj.type)
      assert.equal('hitradioö3', obj.user)
    })
    it('should parse "special characters" in URLs', function () {
      const url = 'http://open.spotify.com/user/hitradioö3'
      const obj = parse(url)
      assert.equal('user', obj.type)
      assert.equal('hitradioö3', obj.user)
    })
    it('should parse "user" URLs', function () {
      const url = 'http://open.spotify.com/user/tootallnate'
      const obj = parse(url)
      assert.equal('user', obj.type)
      assert.equal('tootallnate', obj.user)
    })
  })

  describe('"play.spotify.com" URLs', function () {
    it('should parse "track" URLs', function () {
      const url = 'https://play.spotify.com/track/5W3cjX2J3tjhG8zb6u0qHn'
      const obj = parse(url)
      assert.equal('track', obj.type)
      assert.equal('5W3cjX2J3tjhG8zb6u0qHn', obj.id)
    })
  })

  describe('"embed.spotify.com" URLs', function () {
    it('should parse "track" URLs', function () {
      const url =
        'https://embed.spotify.com/?uri=spotify:track:5oscsdDQ0NpjsTgpG4bI8S'
      const obj = parse(url)
      assert.equal('track', obj.type)
      assert.equal('5oscsdDQ0NpjsTgpG4bI8S', obj.id)
    })
    it('should parse "playlist" URLs', function () {
      const url =
        'https://embed.spotify.com/?uri=spotify:playlist:7arbVhvtYYaLYJefoRBSvU'
      const obj = parse(url)
      assert.equal('playlist', obj.type)
      assert.equal('7arbVhvtYYaLYJefoRBSvU', obj.id)
    })
  })

  describe('"open.spotify.com/embed" URLs (e.g. twitter embed)', function () {
    it('should parse "track" URLs', function () {
      const url = 'https://open.spotify.com/embed/track/5oscsdDQ0NpjsTgpG4bI8S'
      const obj = parse(url)
      assert.equal('track', obj.type)
      assert.equal('5oscsdDQ0NpjsTgpG4bI8S', obj.id)
    })
    it('should parse "playlist" URLs', function () {
      const url =
        'https://open.spotify.com/embed/playlist/7arbVhvtYYaLYJefoRBSvU'
      const obj = parse(url)
      assert.equal('playlist', obj.type)
      assert.equal('7arbVhvtYYaLYJefoRBSvU', obj.id)
    })
  })

  describe('Spotify URIs', function () {
    it('should parse "ablum" URIs', function () {
      const uri = 'spotify:album:4m2880jivSbbyEGAKfITCa'
      const obj = parse(uri)
      assert.equal('album', obj.type)
      assert.equal('4m2880jivSbbyEGAKfITCa', obj.id)
    })
    it('should parse "artist" URIs', function () {
      const uri = 'spotify:artist:4tZwfgrHOc3mvqYlEYSvVi'
      const obj = parse(uri)
      assert.equal('artist', obj.type)
      assert.equal('4tZwfgrHOc3mvqYlEYSvVi', obj.id)
    })
    it('should parse "track" URIs', function () {
      const uri = 'spotify:track:5CMjjywI0eZMixPeqNd75R'
      const obj = parse(uri)
      assert.equal('track', obj.type)
      assert.equal('5CMjjywI0eZMixPeqNd75R', obj.id)
    })
    it('should parse "episode" URIs', function () {
      const uri = 'spotify:episode:64TORH3xleuD1wcnFsrH1E'
      const obj = parse(uri)
      assert.equal('episode', obj.type)
      assert.equal('64TORH3xleuD1wcnFsrH1E', obj.id)
    })
    it('should parse "show" URIs', function () {
      const uri = 'spotify:show:6uxKcBftLv1aOWoNL7UzTl'
      const obj = parse(uri)
      assert.equal('show', obj.type)
      assert.equal('6uxKcBftLv1aOWoNL7UzTl', obj.id)
    })
    it('should parse user "playlist" URIs', function () {
      const uri =
        'spotify:user:daftpunkofficial:playlist:6jP6EcvAwqNksccDkIe6hX'
      const obj = parse(uri)
      assert.equal('playlist', obj.type)
      assert.equal('daftpunkofficial', obj.user)
      assert.equal('6jP6EcvAwqNksccDkIe6hX', obj.id)
    })
    it('should parse public "playlist" URIs', function () {
      const uri = 'spotify:playlist:37i9dQZF1DX4JAvHpjipBk'
      const obj = parse(uri)
      assert.equal('playlist', obj.type)
      assert.equal('37i9dQZF1DX4JAvHpjipBk', obj.id)
    })
    it('should parse "local" track URIs', function () {
      const uri =
        'spotify:local:Yasunori+Mitsuda:Chrono+Trigger+OST:A+Shot+of+Crisis:161'
      const obj = parse(uri)
      assert.equal('local', obj.type)
      assert.equal('Yasunori Mitsuda', obj.artist)
      assert.equal('Chrono Trigger OST', obj.album)
      assert.equal('A Shot of Crisis', obj.track)
      assert.equal(161, obj.seconds)
    })
    it('should parse "local" track URIs 2', function () {
      const uri = 'spotify:local:::a:6'
      const obj = parse(uri)
      assert.equal('local', obj.type)
      assert.equal('', obj.artist)
      assert.equal('', obj.album)
      assert.equal('a', obj.track)
      assert.equal(6, obj.seconds)
    })
    it('should parse "starred" playlist URIs', function () {
      const uri = 'spotify:user:tootallnate:starred'
      const obj = parse(uri)
      assert.equal('playlist', obj.type)
      assert.equal('tootallnate', obj.user)
      assert.equal('starred', obj.id)
    })
    it('should parse "search" URIs', function () {
      const uri = 'spotify:search:artist:h%C3%A4xor'
      const obj = parse(uri)
      assert.equal('search', obj.type)
      assert.equal('artist:häxor', obj.query)
    })
    it('should parse "encoded special characters" in URIs', function () {
      const url = 'spotify:user:hitradio%c3%b63'
      const obj = parse(url)
      assert.equal('user', obj.type)
      assert.equal('hitradioö3', obj.user)
    })
    it('should parse "special characters" in URIs', function () {
      const url = 'spotify:user:hitradioö3'
      const obj = parse(url)
      assert.equal('user', obj.type)
      assert.equal('hitradioö3', obj.user)
    })
    it('should parse combined "search"', function () {
      const uri = 'spotify:search:genre:hip-hop+year:1980-1989'
      const obj = parse(uri)
      assert.equal('search', obj.type)
      assert.equal('genre:hip-hop year:1980-1989', obj.query)
    })
  })
})

describe('formatURI()', function () {
  it('should format "artist" open URLs', function () {
    const url = 'http://open.spotify.com/artist/1gR0gsQYfi6joyO1dlp76N'
    const obj = parse(url)
    const expected = 'spotify:artist:1gR0gsQYfi6joyO1dlp76N'
    const actual = formatURI(obj)
    assert.equal(actual, expected)
  })
  it('should format "search" query URIs', function () {
    const url = 'spotify:search:artist%3aDaft+Punk'
    const obj = parse(url)
    const expected = 'spotify:search:artist%3ADaft+Punk'
    const actual = formatURI(obj)
    assert.equal(actual, expected)
  })
  it('should format "starred" playlist open URLs', function () {
    const url = 'http://open.spotify.com/user/syknyk/starred'
    const obj = parse(url)
    const expected = 'spotify:user:syknyk:starred'
    const actual = formatURI(obj)
    assert.equal(actual, expected)
  })
  it('should parse user "playlist" URIs', function () {
    const url = 'spotify:user:syknyk:playlist:0Idyatn0m08Y48tiOovNd9'
    const obj = parse(url)
    const expected = 'spotify:user:syknyk:playlist:0Idyatn0m08Y48tiOovNd9'
    const actual = formatURI(obj)
    assert.equal(actual, expected)
  })
  it('should parse public "playlist" URIs', function () {
    const url = 'spotify:playlist:37i9dQZF1DWUa8ZRTfalHk'
    const obj = parse(url)
    const expected = 'spotify:playlist:37i9dQZF1DWUa8ZRTfalHk'
    const actual = formatURI(obj)
    assert.equal(actual, expected)
  })
  it('should parse "local" file URIs', function () {
    const url =
      'spotify:local:Flite%2c+Medium+Minus:YouTube:Find+What+You+Love:399'
    const obj = parse(url)
    const expected =
      'spotify:local:Flite%2C+Medium+Minus:YouTube:Find+What+You+Love:399'
    const actual = formatURI(obj)
    assert.equal(actual, expected)
  })
})

describe('formatOpenURL()', function () {
  it('should format "artist" URIs', function () {
    const uri = 'spotify:artist:1gR0gsQYfi6joyO1dlp76N'
    const obj = parse(uri)
    const expected = 'http://open.spotify.com/artist/1gR0gsQYfi6joyO1dlp76N'
    const actual = formatOpenURL(obj)
    assert.equal(actual, expected)
  })
  it('should format "album" URIs', function () {
    const uri = 'spotify:album:7CjakTZxwIF8oixONe6Bpb'
    const obj = parse(uri)
    const expected = 'http://open.spotify.com/album/7CjakTZxwIF8oixONe6Bpb'
    const actual = formatOpenURL(obj)
    assert.equal(actual, expected)
  })
  it('should format "track" URIs', function () {
    const uri = 'spotify:track:4XfokvilxHAOQXfnWD9p0Q'
    const obj = parse(uri)
    const expected = 'http://open.spotify.com/track/4XfokvilxHAOQXfnWD9p0Q'
    const actual = formatOpenURL(obj)
    assert.equal(actual, expected)
  })
  it('should format "episode" URIs', function () {
    const uri = 'spotify:episode:64TORH3xleuD1wcnFsrH1E'
    const obj = parse(uri)
    const expected = 'http://open.spotify.com/episode/64TORH3xleuD1wcnFsrH1E'
    const actual = formatOpenURL(obj)
    assert.equal(actual, expected)
  })
  it('should format "show" URIs', function () {
    const uri = 'spotify:show:6uxKcBftLv1aOWoNL7UzTl'
    const obj = parse(uri)
    const expected = 'http://open.spotify.com/show/6uxKcBftLv1aOWoNL7UzTl'
    const actual = formatOpenURL(obj)
    assert.equal(actual, expected)
  })
  it('should format user "playlist" URIs', function () {
    const uri = 'spotify:user:daftpunkofficial:playlist:6jP6EcvAwqNksccDkIe6hX'
    const obj = parse(uri)
    const expected =
      'http://open.spotify.com/user/daftpunkofficial/playlist/6jP6EcvAwqNksccDkIe6hX'
    const actual = formatOpenURL(obj)
    assert.equal(actual, expected)
  })
  it('should format public "playlist" URIs', function () {
    const uri = 'spotify:playlist:37i9dQZF1DXaPCIWxzZwR1'
    const obj = parse(uri)
    const expected = 'http://open.spotify.com/playlist/37i9dQZF1DXaPCIWxzZwR1'
    const actual = formatOpenURL(obj)
    assert.equal(actual, expected)
  })
  it('should format "starred" playlist URIs', function () {
    const uri = 'spotify:user:tootallnate:starred'
    const obj = parse(uri)
    const expected = 'http://open.spotify.com/user/tootallnate/starred'
    const actual = formatOpenURL(obj)
    assert.equal(actual, expected)
  })
  it('should format "local" URIs', function () {
    const uri =
      'spotify:local:Yasunori+Mitsuda:Chrono+Trigger+OST+Disc+2:Ayla%27s+Theme:84'
    const obj = parse(uri)
    const expected =
      'http://open.spotify.com/local/Yasunori+Mitsuda/Chrono+Trigger+OST+Disc+2/Ayla%27s+Theme/84'
    const actual = formatOpenURL(obj)
    assert.equal(actual, expected)
  })
  it('should format "local" URIs 2', function () {
    const uri = 'spotify:local:::a:6'
    const obj = parse(uri)
    const expected = 'http://open.spotify.com/local///a/6'
    const actual = formatOpenURL(obj)
    assert.equal(actual, expected)
  })
  it('should format "search" URIs', function () {
    const uri = 'spotify:search:artist%3aDaft+Punk'
    const obj = parse(uri)
    const expected = 'http://open.spotify.com/search/artist%3ADaft+Punk'
    const actual = formatOpenURL(obj)
    assert.equal(actual, expected)
  })
})

describe('formatPlayURL()', function () {
  it('should format "track" URIs', function () {
    const uri = 'spotify:track:4XfokvilxHAOQXfnWD9p0Q'
    const obj = parse(uri)
    const expected = 'https://play.spotify.com/track/4XfokvilxHAOQXfnWD9p0Q'
    const actual = formatPlayURL(obj)
    assert.equal(actual, expected)
  })
})

describe('formatEmbedURL()', function () {
  it('should format "track" URIs', function () {
    const uri = 'spotify:track:4XfokvilxHAOQXfnWD9p0Q'
    const obj = parse(uri)
    const expected =
      'https://embed.spotify.com/?uri=spotify:track:4XfokvilxHAOQXfnWD9p0Q'
    const actual = formatEmbedURL(obj)
    assert.equal(actual, expected)
  })
})
