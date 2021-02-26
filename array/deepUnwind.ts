import { omit } from '../object/omit';

interface Options {
  verifyInfiniteRecursion?: boolean;
}

type DeepUnwind = <P extends string, T extends Record<string, any> & { [key in P]: T[] }>(
  array: T[],
  byProp: P,
  options?: Options,
) => Omit<T, P>[];

const defaultOptions: Options = {
  verifyInfiniteRecursion: true,
}

/**
 * Deeply unwinds array like
 * [{ name: 'A', children: [{ name: 'A.1', children: [{ name: 'A.1.1', children: [] }] }] }]
 * to
 * [{ name: 'A' }, { name: 'A.1' }, { name: 'A.1.1' }].
 * 
 * By default function verifies infinite structure, to prevent maximum call stack exceeded.
 */
export const deepUnwind: DeepUnwind = (originalArray, originalByProp, originalOptions: Options = {}) => {
  const options = Object.assign(defaultOptions, originalOptions);

  // Infinite object verification
  if (options.verifyInfiniteRecursion) {
    try {
      const _ = JSON.stringify(originalArray);
    } catch (e) {
      throw new Error(`Cannot unwind circular structure (verified by JSON.stringify). Original error: ${e.message}`);
    }
  }

  const process: DeepUnwind = (array, byProp) => {
    const result = [];

    array.forEach(entry => {
      result.push(omit(entry, byProp), ...process(entry[byProp] ?? [], byProp));
    });

    return result;
  }

  return process(originalArray, originalByProp);
}
