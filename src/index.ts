import _parse from './parse';
import _Search from './search';
import _Local from './local';
import _Playlist from './playlist';
import _Artist from './artist';
import _Album from './album';
import _Track from './track';
import _User from './user';
import _SpotifyUri from './spotify-uri-base';

function parseSpotifyUri(uri: string | _SpotifyUri) {
	return _parse(uri);
}

namespace parseSpotifyUri {
	export type SpotifyUri = _SpotifyUri;
	export const SpotifyUri = _SpotifyUri;

	export type Local = _Local;
	export const Local = _Local;

	export type Search = _Search;
	export const Search = _Search;

	export type Playlist = _Playlist;
	export const Playlist = _Playlist;

	export type Artist = _Artist;
	export const Artist = _Artist;

	export type Album = _Album;
	export const Album = _Album;

	export type Track = _Track;
	export const Track = _Track;

	export type User = _User;
	export const User = _User;

	export type ParsedSpotifyUri =
		| Search
		| Local
		| Playlist
		| Track
		| Artist
		| Album
		| User;

	export const parse = _parse;

	export function formatURI(input: string | SpotifyUri): string {
		const uri: SpotifyUri =
			typeof input === 'string' ? parse(input) : input;
		return uri.toURI();
	}

	export function formatEmbedURL(input: string | SpotifyUri): string {
		const uri: SpotifyUri =
			typeof input === 'string' ? parse(input) : input;
		return uri.toEmbedURL();
	}

	export function formatOpenURL(input: string | SpotifyUri): string {
		const uri: SpotifyUri =
			typeof input === 'string' ? parse(input) : input;
		return uri.toOpenURL();
	}

	export function formatPlayURL(input: string | SpotifyUri): string {
		const uri: SpotifyUri =
			typeof input === 'string' ? parse(input) : input;
		return uri.toPlayURL();
	}
}

export = parseSpotifyUri;
