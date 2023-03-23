import SpotifyUri from './spotify-uri'

export default class Show extends SpotifyUri {
  public static is (v: any): v is Show {
    return typeof v === 'object' && v.type === 'show'
  }
}
