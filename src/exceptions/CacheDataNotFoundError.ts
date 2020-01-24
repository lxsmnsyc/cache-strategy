import { Key } from '../types';

export default class CacheDataNotFoundError extends Error {
  constructor(key: Key) {
    super(`No data found for ${key}`);
  }
}
