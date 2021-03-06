"use strict";

import {encoding as defaultEncoding} from "util.constants";
import {rstrip} from "util.rstrip";

const uuid = require("uuid");

/**
 * A function that does nothing.  Use it as an empty callback initializer.
 */
export type NilCallback = (err?: Error, val?: any) => void;

export let nil: NilCallback = (err?: Error, val?: any): void => {
	err = err;
	val = val;
};

/**
 * A function that can be used to initialize an event callback.  This function
 * does nothing so a callback will do
 */
export type INilEventCallback = () => void;

export let nilEvent: INilEventCallback = (): void => {};

/**
 * Takes an array of numbers and finds the closest value to the given
 * input number.
 *
 * Inspired by https://github.com/andreruffert/closest-number
 *
 * @param arr {number[]} array of numbers to search
 * @param num {number} the number value used as a reference to find
 * @returns {number} the number from arr that is closest to num
 */
export function closestNumber(arr: number[], num: number) {
	return arr.reduce((prev, curr) =>
		Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev
	);
}

/**
 * Generates a random integer between the two specified values.  The value is
 * no lower than min and not equal to max (not inclusive).  Do not use this
 * for cryptography.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 *
 * @param min {number} the smallest integer to use, inclusive
 * @param max {number} the largest integer to use, non inclusive
 * @returns {number} a pseudo random number
 */
export function getRandomInt(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Generates a random integer between the two specified values.  The value is
 * no lower than min and less than or equal to max (inclusive).  Do not use this
 * for cryptography.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 *
 * @param min {number} the smallest integer to use, inclusive
 * @param max {number} the largest integer to use, inclusive
 * @returns {number} a pseudo random number
 */
export function getRandomIntInclusive(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Retrieves a version 4 uuid.  It can be with or without the dash characters.
 * @param nodash {boolean} if true, the dashes are removed, otherwise just a
 * v4 uuid is created.
 * @returns {string} a v4 uuid
 */
export function getUUID(nodash = false): string {
	if (nodash) {
		return uuid.v4().replace(/-/g, "");
	}

	return uuid();
}

/**
 * Checks the environment to see if it is running under a browser environment
 * @return true if the environment is the browser, otherwise false.
 */
export function isBrowser() {
	return (
		typeof window !== "undefined" && typeof window.document !== "undefined"
	);
}

/**
 * Checks the environment to see if it is running under nodejs.  Note that
 * this can be unreliable if "process" is globally defined in the
 * environment by some other application (i.e. monkeypatching)
 * @return true if the environment is running under node, otherwise false
 */
export function isNode() {
	return (
		typeof process !== "undefined" &&
		process.versions != null &&
		process.versions.node != null
	);
}

/**
 * Searchs an objects value list to find its associated key.  It will return
 * the key of the first value found.
 * @param obj {any} - the object to search for a value
 * @param val {any} - the data to search for within the object
 * @return the key/value pair, otherwise null
 */
export function objFindKeyByValue(obj: any, val: any): any {
	if (obj) {
		const ret = Object.entries(obj).find((it) => it[1] === val);
		if (ret) {
			return ret[0];
		}
	}

	return null;
}

/**
 * Searches an objects value list to see if it exists within the object.
 * If a key contains that value, then it returns true, otherwise false.
 * @param obj {any} - the object to search for a value
 * @param val {any} - the data to search for within the object
 * @return true if the value is found otherwise false
 */
export function objHasValue(obj: any, val: any): any {
	if (obj) {
		return (
			typeof Object.entries(obj).find((it) => it[1] === val) !==
			"undefined"
		);
	}

	return false;
}

/**
 * Rounds a number to its nearest precision
 * @param n {number} - the number to round
 * @param precision {number} - the number of decimal places to preserve
 * @return the newly rounded number
 */
export function roundUp(n: number, precision: number = 0) {
	precision = Math.pow(10, precision);
	return Math.ceil(n * precision) / precision;
}

/**
 * Takes a data buffer of output bytes, converts it to a string and then splits
 * it on newlines for output.  By default it is just saved into a sanitized
 * array.  If verbose is set to true, then the buffer it output to the console
 * line by line.
 * @param buffer {string | Buffer} - the output bytes to convert and print to log.
 * @param verbose=false {boolean} if true, then the sanitized output is sent to
 * the console.
 * @param log {console.log} the output logger to write the output when verbose.
 * @param encoding="utf8" {string} - the encoding type for a buffer input type
 * when it is coverted to a string.
 * @retuns {string[]} an array of string that represent the lines given with
 * the input buffer.
 */
export function sanitize(
	buffer: string | Buffer,
	verbose: boolean = false,
	log = console.log,
	encoding = defaultEncoding
) {
	let lines: string[] = [];

	if (buffer && buffer instanceof Buffer) {
		buffer = buffer.toString(encoding).trim();
	}

	if (typeof buffer !== "string" || !buffer) {
		return [];
	}

	buffer = rstrip(buffer);
	lines = buffer.split(/\r\n|\r|\n/).map(rstrip);

	if (verbose) {
		lines.forEach((line: string) => {
			log(line);
		});
	}

	return lines;
}
