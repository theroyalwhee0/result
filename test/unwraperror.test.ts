import { UnwrapError } from '../src/index.js';

test('UnwrapError should be a class', () => {
  expect(UnwrapError).toBeInstanceOf(Function);
  expect(UnwrapError.length).toBe(1);
});

test('UnwrapError create an error', () => {
  const error = new UnwrapError();
  expect(error).toBeInstanceOf(Error);
  expect(error.value).toBe(undefined);
  expect(typeof error.value).toBe("undefined");
});

test('UnwrapError create an error and wrap a number', () => {
  const error = new UnwrapError(1);
  expect(error).toBeInstanceOf(Error);
  expect(error.value).toBe(1);
  expect(typeof error.value).toBe("number");
});

test('UnwrapError create an error and wrap a string', () => {
  const error = new UnwrapError("Television");
  expect(error).toBeInstanceOf(Error);
  expect(error.value).toBe("Television");
  expect(typeof error.value).toBe("string");
});
