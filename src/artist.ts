import SpotifyUri from './spotify-uri'

export default class Artist extends SpotifyUri {
  public static is (v: any): v is Artist {
    return typeof v === 'object' && v.type === 'artist'
  }
}