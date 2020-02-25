import { encode } from './util';
import SpotifyUriBase from './spotify-uri-base';

export default class Album extends SpotifyUriBase {
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
