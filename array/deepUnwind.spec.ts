import { deepUnwind } from './deepUnwind';

describe('deepUnwind', () => {
  it('should properly unwind nested array', () => {
    const array = [{ name: 'A', children: [{ name: 'A.1', children: [{ name: 'A.1.1', children: [] }] } ]}];
    const expected = [{ name: 'A' }, { name: 'A.1' }, { name: 'A.1.1' }];
    const result = deepUnwind(array, 'children');

    expect(result).toEqual(expected);
  });

  it('should work without any nested items', () => {
    const array = [{ name: 'A', children: [] }];
    const expected = [{ name: 'A' }];
    const result = deepUnwind(array, 'children');

    expect(result).toEqual(expected);
  });

  it('should work without required prop at all', () => {
    const array = [{ name: 'A' }];
    const expected = [{ name: 'A' }];
    const result = deepUnwind(array as any, 'children');

    expect(result).toEqual(expected);
  });

  it('should crash with domain error on infinite structure', () => {
    const array = [{ name: 'A', children: [] }];
    array[0].children = array;
  
    expect(() => deepUnwind(array as any, 'children')).toThrow(/Cannot unwind circular structure/);
  });

  it('should crash with node error, after disabling infinite verification', () => {
    const array = [{ name: 'A', children: [] }];
    array[0].children = array;
  
    expect(() => deepUnwind(array as any, 'children', { verifyInfiniteRecursion: false })).toThrow(/Maximum call stack size exceeded/);
  });
});
