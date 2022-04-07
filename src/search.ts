import { encode } from './util'
import SpotifyUri from './spotify-uri'

export default class Search extends SpotifyUri {
  public type = 'search'
  public query: string

  constructor (uri: string, query: string) {
    super(uri)
    this.query = query
  }

  public static is (v: any): v is Search {
    return Boolean(typeof v === 'object' && v.type === 'search')
  }

  public toURI (): string {
    return `spotify:search:${encode(this.query)}`
  }

  public toURL (): string {
    return `/search/${encode(this.query)}`
  }
}
