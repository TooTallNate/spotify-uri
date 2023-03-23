import SpotifyUri from './spotify-uri'

export default class Track extends SpotifyUri {
  public static is (v: any): v is Track {
    return typeof v === 'object' && v.type === 'track'
  }
}