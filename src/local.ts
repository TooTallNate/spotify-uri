import SpotifyUri from "./spotify-uri";
import { SpotifyTypes } from "./types-enum";
import { encode } from "./util";
export default class Local extends SpotifyUri {
  public artist: string;
  public album: string;
  public track: string;
  public seconds: number;

  constructor(
    uri: string,
    artist: string,
    album: string,
    track: string,
    seconds: number
  ) {
    super(uri, "", SpotifyTypes.Local);
    this.artist = artist;
    this.album = album;
    this.track = track;
    this.seconds = seconds;
  }

  public static is(v: any): v is Local {
    return typeof v === "object" && v.type === "local";
  }

  public toURI(): string {
    return `spotify:${this.type}:${encode(this.artist)}:${encode(
      this.album
    )}:${encode(this.track)}:${this.seconds}`;
  }

  public toURL(): string {
    return `/${this.type}/${encode(this.artist)}/${encode(this.album)}/${encode(
      this.track
    )}/${this.seconds}`;
  }
}
