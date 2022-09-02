export default abstract class SpotifyUri {
  public uri: string
  public abstract toURL (): string
  public abstract toURI (): string

  constructor (uri: string) {
    this.uri = uri
  }

  public static is (v: any): v is SpotifyUri {
    return Boolean(typeof v === 'object' && typeof v.uri === 'string')
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
