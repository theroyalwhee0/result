"use strict";
/**
 * @module @theroyalwhee0/result
 * @file A Rust-like Result type for TypeScript.
 * @version v0.0.1
 * @author Adam Mill <hismajesty@theroyalwhee.com>
 * @copyright Copyright 2021 Adam Mill
 * @license Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureFn = exports.capture = exports.err = exports.ok = exports.Err = exports.Ok = exports.UnwrapError = void 0;
/**
 * UnwrapError, thrown if an error result is unwrapped and the
 * resulting error is not an Error type.
 */
class UnwrapError extends Error {
    constructor(value) {
        super('Result is not Ok.');
        this.value = value;
    }
}
exports.UnwrapError = UnwrapError;
/**
 * Ok Result.
 */
class Ok {
    constructor(value) {
        this.value = value;
    }
    /**
     * Is Result Ok?
     * @returns {boolean} True if ok, false if error.
     */
    isOk() {
        return true;
    }
    /**
     * Is Result an Error?
     * @returns {boolean} True if error, false if ok.
     */
    isErr() {
        return false;
    }
    /**
     * Unwrap the result, throwing if in error state.
     * @returns {T} The unwrapped result.
     */
    unwrap() {
        return this.value;
    }
    /**
     * Unwrap the result or return alternate value if in error state.
     * @returns {T} The unwrapped result or alternate value.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    unwrapOr(_alternate) {
        return this.value;
    }
}
exports.Ok = Ok;
/**
 * Error result.
 */
class Err {
    constructor(error) {
        this.error = error;
    }
    /**
     * Is Result Ok?
     * @returns {boolean} True if ok, false if error.
     */
    isOk() {
        return false;
    }
    /**
     * Is Result an Error?
     * @returns {boolean} True if error, false if ok.
     */
    isErr() {
        return true;
    }
    /**
     * Unwrap the result, throwing if in error state.
     * @returns {T} The unwrapped result.
     */
    unwrap() {
        if (this.error instanceof Error) {
            throw this.error;
        }
        else {
            throw new UnwrapError(this.error);
        }
    }
    /**
     * Unwrap the result or return alternate value if in error state.
     * @returns {T} The unwrapped result or alternate value.
     */
    unwrapOr(alternate) {
        return alternate;
    }
}
exports.Err = Err;
/**
 * Construct a new Ok result value.
 * For void function results use: ok(undefined)
 * @param {T} value The value to use as the result.
 * @returns {Ok<T,E>} An ok result.
 */
function ok(value) {
    return new Ok(value);
}
exports.ok = ok;
/**
 * Construct a new Err result value.
 * @param {E|Err<E,U>} error A value or error result to use as the error.
 * @returns {Err<T,E>} An error result.
 */
function err(error) {
    return new Err(error instanceof Err ? error.error : error);
}
exports.err = err;
/**
 * Capture the results of a promise as a AsyncResult.
 * @param {Promise<T>} promise The promise to wrap.
 * @returns {AsyncResult<T,E>} The promise value or error as an AsyncResult.
 */
async function capture(promise) {
    try {
        const results = await promise;
        return ok(results);
    }
    catch (error) {
        return err(error);
    }
}
exports.capture = capture;
/**
 * Capture the results of a function as a Result.
 * @param {Function} fn The function to wrap.
 * @param {...any} args Arguments to pass to the function.
 * @returns {Result<T,E>} The value or error as an Result.
 */
function captureFn(fn, ...args) {
    try {
        const results = fn(...args);
        return ok(results);
    }
    catch (error) {
        return err(error);
    }
}
exports.captureFn = captureFn;
//# sourceMappingURL=index.js.map