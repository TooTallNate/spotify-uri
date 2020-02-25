import { encode } from './util';
import SpotifyUriBase from './spotify-uri-base';

export default class User extends SpotifyUriBase {
	public type = 'user';
	public user: string;

	constructor(uri: string, user: string) {
		super(uri);
		this.user = user;
	}

	public static is(v: any): v is User {
		return Boolean(v && v.type === 'user');
	}

	public toURI(): string {
		return `spotify:${this.type}:${encode(this.user)}`;
	}

	public toURL(): string {
		return `/${this.type}/${encode(this.user)}`;
	}
}
