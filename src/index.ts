import parse from './parse'

import Search from './search'
import Local from './local'
import Playlist from './playlist'
import Artist from './artist'
import Album from './album'
import Track from './track'
import User from './user'
import Episode from './episode'
import SpotifyUri from './spotify-uri'

export type ParsedSpotifyUri =
  | Search
  | Episode
  | Local
  | Playlist
  | Track
  | Artist
  | Album
  | User

export { parse }

export function formatURI (input: string | SpotifyUri): string {
  const uri: SpotifyUri = typeof input === 'string' ? parse(input) : input
  return uri.toURI()
}

export function formatEmbedURL (input: string | SpotifyUri): string {
  const uri: SpotifyUri = typeof input === 'string' ? parse(input) : input
  return uri.toEmbedURL()
}

export function formatOpenURL (input: string | SpotifyUri): string {
  const uri: SpotifyUri = typeof input === 'string' ? parse(input) : input
  return uri.toOpenURL()
}

export function formatPlayURL (input: string | SpotifyUri): string {
  const uri: SpotifyUri = typeof input === 'string' ? parse(input) : input
  return uri.toPlayURL()
}
