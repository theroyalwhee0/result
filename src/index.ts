/**
 * @module @theroyalwhee0/result
 * @file A Rust-like Result type for TypeScript.
 * @version v0.0.3
 * @author Adam Mill <hismajesty@theroyalwhee.com>
 * @copyright Copyright 2021 Adam Mill
 * @license Apache-2.0
 */

/**
 * UnwrapError, thrown if an error result is unwrapped and the
 * resulting error is not an Error type.
 */
export class UnwrapError<T> extends Error {
  constructor(public readonly value?: T) {
    super('Result is not Ok.');
  }
}

/**
 * @type Result type.
 */
export type Result<T,E=Error> = Ok<T, E> | Err<T, E>;

/**
 * @type Async Result type.
 */
export type AsyncResult<T, E=Error> = Promise<Result<T, E>>;

/**
 * @type Function with generic tuple arguments.
 */
export type ArgsFunction<T,A  extends unknown[]> = (...args:A)=>T;

/**
 * Ok Result.
 */
export class Ok<T, E> {
  public constructor(public readonly value: T) {
  }

  /**
   * Is Result Ok?
   * @returns {boolean} True if ok, false if error.
   */
  public isOk(): this is Ok<T, E> {
    return true;
  }

  /**
   * Is Result an Error?
   * @returns {boolean} True if error, false if ok.
   */
  public isErr(): this is Err<T, E> {
    return false;
  }

  /**
   * Unwrap the result, throwing if in error state.
   * @returns {T} The unwrapped result.
   */
  public unwrap():T {
    return this.value;
  }

  /**
   * Unwrap the result or return alternate value if in error state.
   * @returns {T} The unwrapped result or alternate value.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public unwrapOr(_alternate:T):T {
    return this.value;
  }
}

/**
 * Error result.
 */
export class Err<T, E> {
  public constructor(public readonly error: E) {
  }

  /**
   * Is Result Ok?
   * @returns {boolean} True if ok, false if error.
   */
   public isOk(): this is Ok<T, E> {
    return false;
  }

  /**
   * Is Result an Error?
   * @returns {boolean} True if error, false if ok.
   */
   public isErr(): this is Err<T, E> {
    return true
  }

  /**
   * Unwrap the result, throwing if in error state.
   * @returns {T} The unwrapped result.
   */
  public unwrap():T {
    if(this.error instanceof Error) {
      throw this.error;
    } else {
      throw new UnwrapError<E>(this.error);
    }
  }

  /**
   * Unwrap the result or return alternate value if in error state.
   * @returns {T} The unwrapped result or alternate value.
   */
   public unwrapOr(alternate:T):T {
    return alternate;
  }
}

/**
 * Construct a new Ok result value.
 * For void function results use: ok(undefined)
 * @param {T} value The value to use as the result.
 * @returns {Ok<T,E>} An ok result.
 */
export function ok<T, E>(value: T): Ok<T, E> {
  return new Ok(value);
}

/**
 * Construct a new Err result value.
 * @param {E|Err<E,U>} error A value or error result to use as the error.
 * @returns {Err<T,E>} An error result.
 */
export function err<T, E, U>(error: E | Err<U, E>): Err<T, E> {
  const result =
    error instanceof Err
    ? error.error
    : error;
  return new Err(result);
}

/**
 * Capture the results of a promise as a AsyncResult.
 * @param {Promise<T>} promise The promise to wrap.
 * @returns {AsyncResult<T,E>} The promise value or error as an AsyncResult.
 */
export async function capture<T,E=Error>(promise:Promise<T>):AsyncResult<T,E>{
  try {
    const results = await promise;
    return ok(results);
  } catch(error) {
    return err(error);
  }
}

/**
 * Capture the results of a function as a Result.
 * @param {Function} fn The function to wrap.
 * @param {...any} args Arguments to pass to the function.
 * @returns {Result<T,E>} The value or error as an Result.
 */
export function captureFn<T,E=Error,A extends unknown[]=unknown[]>(fn:ArgsFunction<T,A>, ...args:A):Result<T,E>{
  try {
    const results = fn(...args);
    return ok(results);
  } catch(error) {
    return err(error);
  }
}
