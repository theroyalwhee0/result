import { ok } from '../src/index.js';

test('ok should be a function', () => {
  expect(ok).toBeInstanceOf(Function);
  expect(ok.length).toBe(1);
});

test.each([
  // Various primatives.
  0, 9999, "", "Radio", null, undefined,
  // Objects.
  {}, new Date(),
  // Symbols.
  Symbol('Computer'),
  // Error.
  new Error('But still OK?'),
])("ok should generate an Ok result with %p", (item) => {
  const result = ok(item);
  expect(result).toBeInstanceOf(Object);
  expect(result.isErr()).toBe(false);
  expect(result.isOk()).toBe(true);
  expect(result.unwrap()).toBe(item);
  expect(result.unwrapOr(1)).toBe(item);
  expect(result.value).toBe(item);
  // expect(result.error).toBe(undefined); // This should not compile.
});
