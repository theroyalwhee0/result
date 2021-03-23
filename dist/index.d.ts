/**
 * @module @theroyalwhee0/result
 * @file A Rust-like Result type for TypeScript.
 * @version v0.0.1
 * @author Adam Mill <hismajesty@theroyalwhee.com>
 * @copyright Copyright 2021 Adam Mill
 * @license Apache-2.0
 */
/**
 * UnwrapError, thrown if an error result is unwrapped and the
 * resulting error is not an Error type.
 */
export declare class UnwrapError<T> extends Error {
    readonly value?: T;
    constructor(value?: T);
}
/**
 * @type Result type.
 */
export declare type Result<T, E = Error> = Ok<T, E> | Err<T, E>;
/**
 * @type Async Result type.
 */
export declare type AsyncResult<T, E = Error> = Promise<Result<T, E>>;
/**
 * @type Function with generic tuple arguments.
 */
export declare type ArgsFunction<T, A extends unknown[]> = (...args: A) => T;
/**
 * Ok Result.
 */
export declare class Ok<T, E> {
    readonly value: T;
    constructor(value: T);
    /**
     * Is Result Ok?
     * @returns {boolean} True if ok, false if error.
     */
    isOk(): this is Ok<T, E>;
    /**
     * Is Result an Error?
     * @returns {boolean} True if error, false if ok.
     */
    isErr(): this is Err<T, E>;
    /**
     * Unwrap the result, throwing if in error state.
     * @returns {T} The unwrapped result.
     */
    unwrap(): T;
    /**
     * Unwrap the result or return alternate value if in error state.
     * @returns {T} The unwrapped result or alternate value.
     */
    unwrapOr(_alternate: T): T;
}
/**
 * Error result.
 */
export declare class Err<T, E> {
    readonly error: E;
    constructor(error: E);
    /**
     * Is Result Ok?
     * @returns {boolean} True if ok, false if error.
     */
    isOk(): this is Ok<T, E>;
    /**
     * Is Result an Error?
     * @returns {boolean} True if error, false if ok.
     */
    isErr(): this is Err<T, E>;
    /**
     * Unwrap the result, throwing if in error state.
     * @returns {T} The unwrapped result.
     */
    unwrap(): T;
    /**
     * Unwrap the result or return alternate value if in error state.
     * @returns {T} The unwrapped result or alternate value.
     */
    unwrapOr(alternate: T): T;
}
/**
 * Construct a new Ok result value.
 * For void function results use: ok(undefined)
 * @param {T} value The value to use as the result.
 * @returns {Ok<T,E>} An ok result.
 */
export declare function ok<T, E>(value: T): Ok<T, E>;
/**
 * Construct a new Err result value.
 * @param {E|Err<E,U>} error A value or error result to use as the error.
 * @returns {Err<T,E>} An error result.
 */
export declare function err<T, E, U>(error: E | Err<U, E>): Err<T, E>;
/**
 * Capture the results of a promise as a AsyncResult.
 * @param {Promise<T>} promise The promise to wrap.
 * @returns {AsyncResult<T,E>} The promise value or error as an AsyncResult.
 */
export declare function capture<T, E = Error>(promise: Promise<T>): AsyncResult<T, E>;
/**
 * Capture the results of a function as a Result.
 * @param {Function} fn The function to wrap.
 * @param {...any} args Arguments to pass to the function.
 * @returns {Result<T,E>} The value or error as an Result.
 */
export declare function captureFn<T, E = Error, A extends unknown[] = unknown[]>(fn: ArgsFunction<T, A>, ...args: A): Result<T, E>;
