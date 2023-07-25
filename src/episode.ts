import SpotifyUri from './spotify-uri'

export default class Episode extends SpotifyUri {
  public static is (v: any): v is Episode {
    return typeof v === 'object' && v.type === 'episode'
  }
}
