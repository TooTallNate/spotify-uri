import { encode } from './util';
import SpotifyUriBase from './spotify-uri-base';

export default class Track extends SpotifyUriBase {
	public type = 'track';
	public id: string;

	constructor(uri: string, id: string) {
		super(uri);
		this.id = id;
	}

	public static is(v: any): v is Track {
		return Boolean(v && v.type === 'track');
	}

	public toURI(): string {
		return `spotify:${this.type}:${encode(this.id)}`;
	}

	public toURL(): string {
		return `/${this.type}/${encode(this.id)}`;
	}
}
