import { encode } from './util';
import SpotifyUri from './spotify-uri';

export default class Album extends SpotifyUri {
	public type = 'album';
	public id: string;

	constructor(uri: string, id: string) {
		super(uri);
		this.id = id;
	}

	public static is(v: any): v is Album {
		return Boolean(v && v.type === 'album');
	}

	public toURI(): string {
		return `spotify:${this.type}:${encode(this.id)}`;
	}

	public toURL(): string {
		return `/${this.type}/${encode(this.id)}`;
	}
}
