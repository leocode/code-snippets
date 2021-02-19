import { omit } from './omit';

describe('omit', () => {
  it('should omit fields from object', () => {
    expect(omit({ a: 'a', b: 'b', c: 'c' }, 'a', 'b')).toEqual({ c: 'c' });
    expect(omit({ a: 'a', b: 'b', c: 'c' })).toEqual({ a: 'a', b: 'b', c: 'c' });
  });
})