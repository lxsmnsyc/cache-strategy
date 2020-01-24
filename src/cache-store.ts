import {
  Config, CachedData, Key, DataFetcher,
} from './types';
import CacheMap from './cache-map';
import FETCHER_ONLY from './strategies/FETCHER_ONLY';

export const DEFAULT_AGE = 60000;

export default class CacheStore<R> {
  private key: Key;

  private fetcher: DataFetcher<R>;

  private config: Config<R>;

  constructor(key: Key, fetcher: DataFetcher<R>, config?: Partial<Config<R>>) {
    this.key = key;
    this.fetcher = fetcher;
    this.config = {
      strategy: config?.strategy ?? FETCHER_ONLY,
      storage: config?.storage ?? new CacheMap<CachedData<R>>(),
      age: config?.age ?? DEFAULT_AGE,
    };
  }

  get(): Promise<R | undefined> {
    return this.config.strategy(
      this.key,
      this.fetcher,
      this.config.storage,
      this.config.age,
    );
  }

  set(value: R): void {
    this.config.storage.set(this.key, {
      data: value,
      timestamp: new Date().getTime(),
    });
  }

  has(): boolean {
    return this.config.storage.has(this.key);
  }

  remove(): void {
    this.config.storage.remove(this.key);
  }
}
