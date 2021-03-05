'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Implementation of lodash omit without perf problems, but without path support.
 *
 * @see https://www.measurethat.net/Benchmarks/Show/4768/1/lodash-omit-vs-destructured-undefined
 * @see https://github.com/FormidableLabs/victory/issues/956
 */
const omit = (object, ...paths) => {
    return paths.reduce((result, path) => {
        const { [path]: undefined$1, ...rest } = result;
        return rest;
    }, object);
};

const defaultOptions = {
    verifyInfiniteRecursion: true,
};
/**
 * Deeply unwinds array like
 * [{ name: 'A', children: [{ name: 'A.1', children: [{ name: 'A.1.1', children: [] }] }] }]
 * to
 * [{ name: 'A' }, { name: 'A.1' }, { name: 'A.1.1' }].
 *
 * By default function verifies infinite structure, to prevent maximum call stack exceeded.
 */
const deepUnwind = (originalArray, originalByProp, originalOptions = {}) => {
    const options = Object.assign(defaultOptions, originalOptions);
    if (options.verifyInfiniteRecursion) {
        try {
            const _ = JSON.stringify(originalArray);
        }
        catch (e) {
            throw new Error(`Cannot unwind circular structure (verified by JSON.stringify). Original error: ${e.message}`);
        }
    }
    const process = (array, byProp) => {
        // types are handled by function typing, so it doesn't matter here
        const result = [];
        array.forEach(entry => {
            var _a;
            result.push(omit(entry, byProp), ...process((_a = entry[byProp]) !== null && _a !== void 0 ? _a : [], byProp));
        });
        return result;
    };
    return process(originalArray, originalByProp);
};

exports.deepUnwind = deepUnwind;
exports.omit = omit;
