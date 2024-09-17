type Fetcher<T> = (view: string) => Promise<T>;

export function defineFetcher<T>(fetcher: Fetcher<T>): Fetcher<T> {
	return fetcher;
}
