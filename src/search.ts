import SpotifyUri from './spotify-uri'

export default class Search extends SpotifyUri {
  get query() {
    return this.id;
  }
  public static is (v: any): v is Search {
    return typeof v === 'object' && v.type === 'search'
  }
}
