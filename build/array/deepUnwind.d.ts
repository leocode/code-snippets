interface Options {
    verifyInfiniteRecursion?: boolean;
}
declare type DeepUnwind = <P extends string, T extends Record<string, any> & {
    [key in P]: T[];
}>(array: T[], byProp: P, options?: Options) => Omit<T, P>[];
/**
 * Deeply unwinds array like
 * [{ name: 'A', children: [{ name: 'A.1', children: [{ name: 'A.1.1', children: [] }] }] }]
 * to
 * [{ name: 'A' }, { name: 'A.1' }, { name: 'A.1.1' }].
 *
 * By default function verifies infinite structure, to prevent maximum call stack exceeded.
 */
export declare const deepUnwind: DeepUnwind;
export {};
