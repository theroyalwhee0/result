import { captureFn } from '../src/index.js';

test('captureFn should be a function', () => {
  expect(captureFn).toBeInstanceOf(Function);
  expect(captureFn.length).toBe(1);
});

test('captureFn should wrap a function result', async () => {
  const fn = () => 84349;
  const result = captureFn(fn);
  expect(result.isOk()).toBe(true);
  if(result.isOk()) {
    expect(result.value).toBe(84349);
  } else {
    fail('isOk should be true.');
  }
});

test('captureFn should wrap a function exception', async () => {
  const error = new Error('Splat');
  const fn = () => { throw error; };
  const result = captureFn(fn);
  expect(result.isErr()).toBe(true);
  if(result.isErr()) {
    expect(result.error).toBe(error);
  } else {
    fail('isErr should be true.');
  }
});

test('captureFn should wrap with arguments', async () => {
  const fn = (a:number, b:number, c:number) => a+b+c;
  const result = captureFn(fn, 1, 2, 3);
  // captureFn(fn, 1, 2, "this should be a number"); // This should fail to compile.
  expect(result.isOk()).toBe(true);
  if(result.isOk()) {
    expect(result.value).toBe(6);
  } else {
    fail('isOk should be true.');
  }
});

test('capture should default error type', async () => {
  const fn = () => { throw new Error('Splat'); };
  const result = captureFn(fn);
  expect(result.isErr()).toBe(true);
  if(result.isErr()) {
    // This failed to compile before the E was defaulted to Error.
    const typecheck:Error = result.error;
    expect(typecheck).toBeInstanceOf(Error);
  } else {
    fail('isErr should be true.');
  }
});
