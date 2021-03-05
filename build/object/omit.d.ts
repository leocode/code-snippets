/**
 * Implementation of lodash omit without perf problems, but without path support.
 *
 * @see https://www.measurethat.net/Benchmarks/Show/4768/1/lodash-omit-vs-destructured-undefined
 * @see https://github.com/FormidableLabs/victory/issues/956
 */
export declare const omit: <T extends object, K extends keyof T>(object: T, ...paths: K[]) => Pick<T, Exclude<keyof T, K>>;
