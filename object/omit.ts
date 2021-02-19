/**
 * Implementation of lodash omit without perf problems
 * @see https://www.measurethat.net/Benchmarks/Show/4768/1/lodash-omit-vs-destructured-undefined
 * @see https://github.com/FormidableLabs/victory/issues/956
 */
export const omit = <T extends object, K extends keyof T>(object: T, ...paths: K[]): Omit<T, K> => {
  return paths.reduce((result, path) => {
    const { [path]: undefined, ...rest } = result;
    return rest;
  }, object as any);
}