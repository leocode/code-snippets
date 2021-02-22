import { omit } from './omit';

describe('omit', () => {
  it('should omit fields from object', () => {
    expect(omit({ a: 'a', b: 'b', c: 'c' }, 'a', 'b')).toEqual({ c: 'c' });
  });

  it('should work without any parameter to skip', () => {
    expect(omit({ a: 'a', b: 'b', c: 'c' })).toEqual({ a: 'a', b: 'b', c: 'c' });
  });

  it('should work with unknown field keys', () => {
    expect(omit({ a: 'a', b: 'b', c: 'c' }, 'nonExistingKey' as any)).toEqual({ a: 'a', b: 'b', c: 'c' });
  });
})