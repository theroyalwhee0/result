import { capture } from '../src/index.js';

test('capture should be a function', () => {
  expect(capture).toBeInstanceOf(Function);
  expect(capture.length).toBe(1);
});

test('capture should wrap a resolved promise', async () => {
  const promise = Promise.resolve(1000);
  const captured = capture(promise);
  expect(captured).toBeInstanceOf(Promise);
  const result = await captured;
  expect(result.isOk()).toBe(true);
  if(result.isOk()) {
    expect(result.value).toBe(1000);
  }
});

test('capture should wrap a rejected promise', async () => {
  const error = new Error('Ham and Cheese');
  const promise = Promise.reject(error);
  const captured = capture(promise);
  expect(captured).toBeInstanceOf(Promise);
  const result = await captured;
  expect(result.isErr()).toBe(true);
  if(result.isErr()) {
    expect(result.error).toBe(error);
  }
});
