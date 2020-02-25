import { encode } from './util';
import SpotifyUriBase from './spotify-uri-base';

export default class Search extends SpotifyUriBase {
	public type = 'search';
	public query: string;

	constructor(uri: string, query: string) {
		super(uri);
		this.query = query;
	}

	public static is(v: any): v is Search {
		return Boolean(v && v.type === 'search');
	}

	public toURI(): string {
		return `spotify:search:${encode(this.query)}`;
	}

	public toURL(): string {
		return '/search/' + encode(this.query);
	}
}
