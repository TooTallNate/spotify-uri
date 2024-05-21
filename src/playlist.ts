import SpotifyUri from './spotify-uri'
import { SpotifyTypes } from './types-enum'
import { encode } from './util'
export default class Playlist extends SpotifyUri {
  public user?: string

  constructor (uri: string, id: string, user?: string) {
    super(uri, id, SpotifyTypes.Playlist)
    if (typeof user === 'string') {
      this.user = user
    }
  }

  public static is (v: any): v is Playlist {
    return typeof v === 'object' && v.type === 'playlist'
  }

  public toURI (): string {
    if (this.user !== undefined) {
      if (this.id === 'starred') {
        return `spotify:user:${encode(this.user)}:${encode(this.id)}`
      }
      return `spotify:user:${encode(this.user)}:playlist:${encode(this.id)}`
    }
    return `spotify:playlist:${encode(this.id)}`
  }

  public toURL (): string {
    if (this.user !== undefined) {
      if (this.id === 'starred') {
        return `/user/${encode(this.user)}/${encode(this.id)}`
      }
      return `/user/${encode(this.user)}/playlist/${encode(this.id)}`
    }
    return `/playlist/${encode(this.id)}`
  }
}
