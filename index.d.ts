// Type definitions for spotify-uri
// Project: spotify-uri
// Definitions by: KozalakliKozalak <https://github.com/kozalaklikozalak>

/**
 * Parses Spotify url
 * @param {string} url to parse
 * @returns {ParsedData}
 */

export default parse
export function parse(uri: string | object): ParsedData

export interface ParsedData {
    type: string
    query?: string
    artist?: string
    album?: string
    track?: string
    seconds?: number
    user?: string
    id?: string
    starred?: boolean
}

/**
 * Returns data as uri format
 * @param parsed Parsed data for getting uri
 */
export function formatURI(parsed: ParsedData): string

/**
 * Returns data as open.spotify.com url
 * @param parsed parsed data 
 */
export function formatOpenURL(parsed: ParsedData, base: any): string

/**
 * Retruns data as play.spotify.com url
 * @param parsed parsed data
 */
export function formatPlayURL(parsed: ParsedData): string

/**
 * Retruns data as spotify embed url 
 * @param parsed 
 */
export function formatEmbedURI(parsed: ParsedData)
