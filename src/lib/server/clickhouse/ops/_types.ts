type Fetcher<T> = (view: string, prefix: string) => Promise<T>;

export function defineFetcher<T>(fetcher: Fetcher<T>): Fetcher<T> {
	return fetcher;
}
