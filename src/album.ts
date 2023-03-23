import SpotifyUri from './spotify-uri'

export default class Album extends SpotifyUri {
  public static is (v: any): v is Album {
    return typeof v === 'object' && v.type === 'album'
  }
}
