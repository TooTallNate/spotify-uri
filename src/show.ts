import { encode } from './util'
import SpotifyUri from './spotify-uri'

export default class Show extends SpotifyUri {
  public type = 'show'
  public id: string

  constructor (uri: string, id: string) {
    super(uri)
    this.id = id
  }

  public static is (v: any): v is Show {
    return Boolean(typeof v === 'object' && v.type === 'show')
  }

  public toURI (): string {
    return `spotify:${this.type}:${encode(this.id)}`
  }

  public toURL (): string {
    return `/${this.type}/${encode(this.id)}`
  }
}
