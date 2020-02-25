export default abstract class SpotifyUriBase {
	public uri: string;
	public abstract toURL(): string;
	public abstract toURI(): string;

	constructor(uri: string) {
		this.uri = uri;
	}

	public static is(v: any): v is SpotifyUriBase {
		return Boolean(v && typeof v.uri === 'string');
	}

	public toEmbedURL(): string {
		return `https://embed.spotify.com/?uri=${this.toURI()}`;
	}

	public toOpenURL(): string {
		return `http://open.spotify.com${this.toURL()}`;
	}

	public toPlayURL(): string {
		return `https://play.spotify.com${this.toURL()}`;
	}
}
