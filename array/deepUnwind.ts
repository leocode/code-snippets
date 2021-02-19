import { omit } from '../object/omit';

/**
 * Deeply unwinds array like
 * [{ name: 'A', children: [{ name: 'A.1', children: [{ name: 'A.1.1', children: [] }] }] }]
 * to
 * [{ name: 'A' }, { name: 'A.1' }, { name: 'A.1.1' }]
 */
export const deepUnwind = <P extends string, T extends Record<string, any> & { [key in P]: T[] }>(array: T[], byProp: P): Omit<T, P>[] => {
  const result: Omit<T, P>[] = [];

  array.forEach(entry => {
    result.push(omit(entry, byProp), ...deepUnwind(entry[byProp] ?? [], byProp));
  });

  return result;
}
