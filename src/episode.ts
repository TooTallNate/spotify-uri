import { encode } from './util'
import SpotifyUri from './spotify-uri'

export default class Episode extends SpotifyUri {
  public type = 'episode'
  public id: string

  constructor (uri: string, id: string) {
    super(uri)
    this.id = id
  }

  public static is (v: any): v is Episode {
    return Boolean(typeof v === 'object' && v.type === 'episode')
  }

  public toURI (): string {
    return `spotify:${this.type}:${encode(this.id)}`
  }

  public toURL (): string {
    return `/${this.type}/${encode(this.id)}`
  }
}
