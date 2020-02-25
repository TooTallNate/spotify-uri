import { encode } from './util';
import SpotifyUri from './spotify-uri-base';

export default class Artist extends SpotifyUri {
	public type = 'artist';
	public id: string;

	constructor(uri: string, id: string) {
		super(uri);
		this.id = id;
	}

	public static is(v: any): v is Artist {
		return Boolean(v && v.type === 'artist');
	}

	public toURI(): string {
		return `spotify:${this.type}:${encode(this.id)}`;
	}

	public toURL(): string {
		return `/${this.type}/${encode(this.id)}`;
	}
}
