import url from 'url';
import qs from 'querystring';
import Local from './local';
import Search from './search';
import Playlist from './playlist';
import Artist from './artist';
import Album from './album';
import Track from './track';
import User from './user';
import SpotifyUri from './spotify-uri-base';
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

	if ('embed.spotify.com' === hostname) {
		const parsedQs = qs.parse(query || '');
		if (typeof parsedQs.uri !== 'string') {
			throw new Error('fo');
		}
		return parse(parsedQs.uri);
	}

	if ('spotify:' === protocol) {
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
	if ('embed' == parts[1]) {
		parts = parts.slice(1, len);
	}
	if ('search' == parts[1]) {
		return new Search(uri, decode(parts.slice(2).join(':')));
	} else if (len >= 3 && 'local' == parts[1]) {
		return new Local(
			uri,
			decode(parts[2]),
			decode(parts[3]),
			decode(parts[4]),
			+parts[5]
		);
	} else if (len == 3 && 'playlist' == parts[1]) {
		return new Playlist(uri, decode(parts[2]));
	} else if (len == 3 && 'user' == parts[1]) {
		return new User(uri, decode(parts[2]));
	} else if (len >= 5) {
		return new Playlist(uri, decode(parts[4]), decode(parts[2]));
	} else if (len >= 4 && 'starred' == parts[3]) {
		return new Playlist(uri, 'starred', decode(parts[2]));
	} else if (parts[1] === 'artist') {
		return new Artist(uri, parts[2]);
	} else if (parts[1] === 'album') {
		return new Album(uri, parts[2]);
	} else if (parts[1] === 'track') {
		return new Track(uri, parts[2]);
	}
	throw new TypeError(`Could not determine type for: ${uri}`);
}
