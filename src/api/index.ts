import axios, { AxiosAdapter, AxiosPromise } from 'axios';
import { cacheAdapterEnhancer, Cache, ICacheLike } from 'axios-extensions';

const cache = new Cache();

export const api = axios.create({
  adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter, {
    defaultCache: cache as ICacheLike<AxiosPromise>,
  }),
});

export const loadCache = (
  cacheEntries: readonly Cache.LRUEntry<unknown, unknown>[],
) => {
  cache.load(cacheEntries);
};

export const dumpCache: () => readonly Cache.LRUEntry<
  unknown,
  unknown
>[] = () => cache.dump();
