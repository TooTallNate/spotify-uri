import Local from './local'
import Search from './search'
import Playlist from './playlist'
import Artist from './artist'
import Album from './album'
import Track from './track'
import Episode from './episode'
import Show from './show'
import User from './user'
import SpotifyUri from './spotify-uri'
import { decode } from './util'
import { ParsedSpotifyUri } from '.'
import { SpotifyTypes } from './types-enum'
/**
 * Parses a "Spotify URI".
 *
 * @param {String} input
 * @return {Object} parsed Spotify uri object
 * @api public
 */
export default function parse (input: string | SpotifyUri): ParsedSpotifyUri {
  const uri = SpotifyUri.is(input) ? input.uri : input
  const { protocol, hostname, pathname = '/', searchParams } = new URL(uri)

  if (hostname === 'embed.spotify.com') {
    const parsedQs = Object.fromEntries(searchParams)
    if (typeof parsedQs.uri !== 'string') {
      throw new Error(
        'Parsed query string was not valid: ' + searchParams.toString()
      )
    }
    return parse(parsedQs.uri)
  }

  if (protocol === 'spotify:') {
    const parts = uri.split(':')
    return parseParts(uri, parts)
  }

  if (pathname === null) {
    throw new TypeError('No pathname')
  }

  // `http:` or `https:`
  const parts = pathname.split('/')
  return parseParts(uri, parts)
}

function parseParts (uri: string, parts: string[]): ParsedSpotifyUri {
  parts = parts.filter(p => !p.startsWith('intl'))

  let spotifyType = parts[1]
  if (spotifyType === SpotifyTypes.Embed) {
    parts = parts.slice(1)
    spotifyType = parts[1]
  }
  const len = parts.length
  if (spotifyType === SpotifyTypes.Search) {
    return new Search(uri, decode(parts.slice(2).join(':')), spotifyType)
  }
  if (len >= 3 && spotifyType === SpotifyTypes.Local) {
    return new Local(
      uri,
      decode(parts[2]),
      decode(parts[3]),
      decode(parts[4]),
      +parts[5]
    )
  }
  if (len >= 4 || spotifyType === SpotifyTypes.Playlist) {
    if (len >= 5) {
      return new Playlist(uri, decode(parts[4]), decode(parts[2]))
    }
    if (parts[3] === 'starred') {
      return new Playlist(uri, 'starred', decode(parts[2]))
    }
    return new Playlist(uri, decode(parts[2]))
  }
  if (len === 3 && spotifyType === SpotifyTypes.User) {
    return new User(uri, decode(parts[2]), spotifyType)
  }
  if (spotifyType === SpotifyTypes.Artist) {
    return new Artist(uri, parts[2], spotifyType)
  }
  if (spotifyType === SpotifyTypes.Album) {
    return new Album(uri, parts[2], spotifyType)
  }
  if (spotifyType === SpotifyTypes.Track) {
    return new Track(uri, parts[2], spotifyType)
  }
  if (spotifyType === SpotifyTypes.Episode) {
    return new Episode(uri, parts[2], spotifyType)
  }
  if (spotifyType === SpotifyTypes.Show) {
    return new Show(uri, parts[2], spotifyType)
  }
  throw new TypeError(`Could not determine type for: ${uri}`)
}
