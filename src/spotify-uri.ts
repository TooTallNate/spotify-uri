import { SpotifyTypes } from './types-enum'
import { encode } from './util'

export default abstract class SpotifyUri {
  public type: SpotifyTypes
  public id: string
  public uri: string

  constructor (uri: string, id: string, type: SpotifyTypes) {
    this.uri = uri
    this.id = id
    this.type = type
  }

  public static is (v: any): v is SpotifyUri {
    return typeof v === 'object' && typeof v.uri === 'string'
  }

  public toURI (): string {
    return `spotify:${this.type}:${encode(this.id)}`
  }

  public toURL (): string {
    return `/${this.type}/${encode(this.id)}`
  }

  public toEmbedURL (): string {
    return `https://embed.spotify.com/?uri=${this.toURI()}`
  }

  public toOpenURL (): string {
    return `https://open.spotify.com${this.toURL()}`
  }

  public toPlayURL (): string {
    return `https://play.spotify.com${this.toURL()}`
  }
}
