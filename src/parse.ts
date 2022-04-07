import url from 'url';
import qs from 'querystring';
import Local from './local';
import Search from './search';
import Playlist from './playlist';
import Artist from './artist';
import Album from './album';
import Track from './track';
import Episode from './episode';
import Show from './show';
import User from './user';
import SpotifyUri from './spotify-uri';
import { decode } from './util';
import { ParsedSpotifyUri } from '.';

/**
 * Parses a "Spotify URI".
 *
 * @param {String} uri
 * @return {Object} parsed Spotify uri object
 * @api public
 */
export default function parse(input: string | SpotifyUri): ParsedSpotifyUri {
	const uri = SpotifyUri.is(input) ? input.uri : input;
	const { protocol, hostname, pathname = '/', query = '' } = url.parse(uri);

	if (hostname === 'embed.spotify.com') {
		const parsedQs = qs.parse(query || '');
		if (typeof parsedQs.uri !== 'string') {
			throw new Error('fo');
		}
		return parse(parsedQs.uri);
	}

	if (protocol === 'spotify:') {
		const parts = uri.split(':');
		return parseParts(uri, parts);
	}

	if (pathname === null) {
		throw new TypeError('No pathname');
	}

	// `http:` or `https:`
	const parts = pathname.split('/');
	return parseParts(uri, parts);
}

function parseParts(uri: string, parts: string[]): ParsedSpotifyUri {
	const len = parts.length;
	if (parts[1] === 'embed') {
		parts = parts.slice(1);
	}
	if (parts[1] === 'search') {
		return new Search(uri, decode(parts.slice(2).join(':')));
	}
	if (len >= 3 && parts[1] === 'local') {
		return new Local(
			uri,
			decode(parts[2]),
			decode(parts[3]),
			decode(parts[4]),
			+parts[5]
		);
	}
	if (len === 3 && parts[1] === 'playlist') {
		return new Playlist(uri, decode(parts[2]));
	}
	if (len === 3 && parts[1] === 'user') {
		return new User(uri, decode(parts[2]));
	}
	if (len >= 5) {
		return new Playlist(uri, decode(parts[4]), decode(parts[2]));
	}
	if (len >= 4 && parts[3] === 'starred') {
		return new Playlist(uri, 'starred', decode(parts[2]));
	}
	if (parts[1] === 'artist') {
		return new Artist(uri, parts[2]);
	}
	if (parts[1] === 'album') {
		return new Album(uri, parts[2]);
	}
	if (parts[1] === 'track') {
		return new Track(uri, parts[2]);
	}
	if (parts[1] === 'episode') {
		return new Episode(uri, parts[2]);
	}
	if (parts[1] === 'show') {
		return new Show(uri, parts[2]);
	}
	if (parts[1] === 'playlist') {
		return new Playlist(uri, parts[2]);
	}
	throw new TypeError(`Could not determine type for: ${uri}`);
}
