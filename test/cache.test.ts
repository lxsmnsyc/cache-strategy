import fc from 'fast-check';
import CacheMap from '../src/cache-map';
import { CachedData } from '../src/types';
import { CacheStore, Strategy } from '../src';

describe('CacheStore', () => {
  describe('FETCHER_ONLY', () => {
    it('should return the correct value', () => (
      fc.assert(
        fc.asyncProperty(fc.string(), fc.string(), async (key, value) => {
          const cache = new CacheStore(key, () => Promise.resolve(value), {
            strategy: Strategy.FETCHER_ONLY,
          });

          return (await cache.get()) === value;
        }),
        { verbose: true },
      )
    ));

    it('should not save in the storage', () => (
      fc.assert(
        fc.property(fc.string(), fc.string(), (key, value) => {
          const storage = new CacheMap<CachedData<string>>();

          const cache = new CacheStore(key, () => Promise.resolve(value), {
            strategy: Strategy.FETCHER_ONLY,
            storage,
          });

          cache.get();

          return !storage.has(key);
        }),
        { verbose: true },
      )
    ));

    it('should ignore the storage', () => (
      fc.assert(
        fc.asyncProperty(fc.string(), fc.string(), fc.string(), async (key, value1, value2) => {
          const cache = new CacheStore(key, () => Promise.resolve(value1), {
            strategy: Strategy.FETCHER_ONLY,
          });

          cache.set(value2);

          return (await cache.get()) === value1;
        }),
        { verbose: true },
      )
    ));
  });

  describe('CACHE_ONLY', () => {
    it('should not return the fetcher value', () => (
      fc.assert(
        fc.asyncProperty(fc.string(), fc.string(), async (key, value) => {
          const cache = new CacheStore(key, () => Promise.resolve(value), {
            strategy: Strategy.CACHE_ONLY,
          });

          return (await cache.get()) !== value;
        }),
        { verbose: true },
      )
    ));

    it('should save in the storage', () => (
      fc.assert(
        fc.asyncProperty(fc.string(), fc.string(), fc.string(), async (key, value1, value2) => {
          const cache = new CacheStore(key, () => Promise.resolve(value1), {
            strategy: Strategy.CACHE_ONLY,
          });

          cache.set(value2);

          return await cache.get() === value2;
        }),
        { verbose: true },
      )
    ));
  });
});
