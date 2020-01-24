/**
 * @license
 * MIT License
 *
 * Copyright (c) 2020 Alexis Munsayac
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * @author Alexis Munsayac <alexis.munsayac@gmail.com>
 * @copyright Alexis Munsayac 2020
 */

export type Key = string;
export type Age = number;

export type DataFetcher<R> = (key: Key) => Promise<R>;

export interface CachedData<R> {
  data: R;
  timestamp: number;
}

export interface DataStorage<R> {
  get: (key: Key) => R | undefined;
  set: (key: Key, value: R) => void;
  has: (key: Key) => boolean;
}

export type CacheStrategy<R> = (
  key: Key,
  fetcher: DataFetcher<R>,
  storage: DataStorage<CachedData<R>>,
  age: Age,
) => Promise<R>;

export interface Config<R> {
  readonly strategy: CacheStrategy<R>;
  readonly storage: DataStorage<CachedData<R>>;
  readonly age: Age;
}
