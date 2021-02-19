import { deepUnwind } from './deepUnwind';

describe('deepUnwind', () => {
  it('should properly unwind nested array', () => {
    const array = [{ name: 'A', children: [{ name: 'A.1', children: [{ name: 'A.1.1', children: [] }] } ]}];
    const expected = [{ name: 'A' }, { name: 'A.1' }, { name: 'A.1.1' }];
    const result = deepUnwind(array, 'children');

    expect(result).toEqual(expected);
  });
});
