import { err } from '../src/index.js';

test('err should be a function', () => {
  expect(err).toBeInstanceOf(Function);
  expect(err.length).toBe(1);
});

test("err should generate an Err result with an Error", () => {
  const error = new Error('Boom!');
  const result = err(error);
  expect(result).toBeInstanceOf(Object);
  expect(result.isErr()).toBe(true);
  expect(result.isOk()).toBe(false);
  expect(() => {
    result.unwrap()
  }).toThrow(error);
  expect(result.unwrapOr(1)).toBe(1);
  expect(result.error).toBe(error);
  // expect(result.value).toBe(undefined); // This should not compile.
});

test("err should generate an Err from an Err result", () => {
  const error = new Error('Boom!');
  const previousResult = err(error);
  const result = err(previousResult);
  expect(result).toBeInstanceOf(Object);
  expect(result.isErr()).toBe(true);
  expect(result.isOk()).toBe(false);
  expect(() => {
    result.unwrap()
  }).toThrow(error);
  expect(result.unwrapOr(800)).toBe(800);
  expect(result.error).toBe(error);
});

test.each([
  0, "", null, undefined, {}, Symbol('symbol'),
])("err should generate an Err result with %p", (item) => {
  const result = err(item);
  expect(result).toBeInstanceOf(Object);
  expect(result.isErr()).toBe(true);
  expect(result.isOk()).toBe(false);
  expect(() => {
    result.unwrap()
  }).toThrow(/Result is not Ok/i);
  expect(result.unwrapOr(1)).toBe(1);
  expect(result.error).toBe(item);
});
