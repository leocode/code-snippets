import { omit } from '../object/omit';

type DeepUnwind = <P extends string, T extends Record<string, any> & { [key in P]: T[] }>(array: T[], byProp: P) => Omit<T, P>[];

/**
 * Deeply unwinds array like
 * [{ name: 'A', children: [{ name: 'A.1', children: [{ name: 'A.1.1', children: [] }] }] }]
 * to
 * [{ name: 'A' }, { name: 'A.1' }, { name: 'A.1.1' }]
 */
export const deepUnwind: DeepUnwind = (originalArray, originalByProp) => {
  // Infinite object verification
  try {
    const _ = JSON.stringify(originalArray);
  } catch (e) {
    throw new Error(`Cannot unwind circular structure (verified by JSON.stringify). Original error: ${e.message}`);
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
