import { encode } from './util';
import SpotifyUri from './spotify-uri-base';

export default class Playlist extends SpotifyUri {
	public type = 'playlist';
	public id: string;
	public user?: string;

	constructor(uri: string, id: string, user?: string) {
		super(uri);
		this.id = id;
		if (typeof user === 'string') {
			this.user = user;
		}
	}

	public static is(v: any): v is Playlist {
		return Boolean(v && v.type === 'playlist');
	}

	public toURI(): string {
		if (this.user) {
			if (this.id === 'starred') {
				return `spotify:user:${encode(this.user)}:${encode(this.id)}`;
			}
			return `spotify:user:${encode(this.user)}:playlist:${encode(
				this.id
			)}`;
		}
		return `spotify:playlist:${encode(this.id)}`;
	}

	public toURL(): string {
		if (this.user) {
			if (this.id === 'starred') {
				return `/user/${encode(this.user)}/${encode(this.id)}`;
			}
			return `/user/${encode(this.user)}/playlist/${encode(this.id)}`;
		}
		return '/playlist/' + encode(this.id);
	}
}
