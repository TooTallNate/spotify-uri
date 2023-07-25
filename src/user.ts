import SpotifyUri from './spotify-uri'

export default class User extends SpotifyUri {
  get user() {
    return this.id;
  }
  public static is (v: any): v is User {
    return typeof v === 'object' && v.type === 'user'
  }
}