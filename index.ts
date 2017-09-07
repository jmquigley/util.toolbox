'use strict';

import * as ps from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';
import {rstrip} from 'util.rstrip';

const uuid = require('uuid');

export const encoding: string = 'utf-8';
export const success: number = 0;
export const failure: number = 127;
export const nl: string = '\n';

export const isDarwin = /^darwin/.test(process.platform);
export const isLinux = /^linux/.test(process.platform);
export const isMac = /^darwin/.test(process.platform);
export const isWin = /^win/.test(process.platform);

// Uses a regex that will catch 99.99% of email addresses in use today.  It is not perfect
// http://www.regular-expressions.info/email.html
export const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const regexURL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

export const regexUUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

export interface ICallOpts {
	async?: boolean;
	log?: any;
	shell?: string;
	shellArgs?: string[];
	verbose?: boolean;
}

/**
 * A function that does nothing.  Use it as an empty callback initializer.
 */
export type INilCallback = (err?: Error, val?: any) => void;

export let nil: INilCallback = (err?: Error, val?: any): void => {
	err = null;
	val = null;
};

/**
 * A function that can be used to initialize an event callback.  This function
 * does nothing so a callback will do
 */
export type INilEventCallback = () => void;

export let nilEvent: INilEventCallback = (): void => {
};

/**
 * Performs an asynchronous command line call to run a given user command.
 * This method uses the node `execFile` call so that the method can control
 * the calling shell and parameters used to invoke it.  It will use BASH by
 * default for Linux/Mac, and when the environment is windows it will attempt
 * to use powershell.  The shell can be overriden with the opts argument.
 *
 * When using default BASH options it will invoke as a login shell.
 *
 * @param cmd {string} the command to execute on the command line
 * @param [opts] {ICallOpts} optional arguments to the call
 *
 *     - `async: boolean`: if true, then the async version is called, otherwise
 *     the call will be synchronous.
 *     - `log: any`: the output logger that will be used with this call.  It
 *     uses a default of the console.log method.
 *     - `verbose: {boolean}`: if true, then output is printed
 *     - `shell: {string}`: the shell that will be invoked with this call.  It
 *     depends on the environment.
 *     - `shellArgs: {string[]}`: the parameters after shell, but before the
 *     given command.
 *
 * @param [cb] {Function} the callback function to execute when the command
 * finishes.
 */
export function call(cmd: string | Buffer | string[], opts: any = null, cb = nil) {
	if (typeof opts === 'function') {
		cb = opts;
		opts = null;
	}

	if (cmd == null) {
		return cb(new Error('No command given to execute in call'), failure);
	}

	if (cmd instanceof Buffer) {
		cmd = cmd.toString();
	} else if (cmd instanceof Array) {
		cmd = cmd.join(' ');
	}

	opts = Object.assign({
		async: true,
		log: console.log,
		verbose: true,
		shell: (isWin) ? 'powershell' : '/bin/bash',
		shellArgs: (isWin) ? ['', cmd] : ['-l', '-c', cmd]
	}, opts);

	if (opts.verbose) {
		opts.log(`$ ${opts.shell} ${opts.shellArgs.join(' ')}`);
	}

	if (opts.async) {
		const out = ps.execFile(opts.shell, opts.shellArgs);

		out.stdout.on('data', (data: string | Buffer) => {
			sanitize(data, opts.verbose);
			return out;
		});

		out.stderr.on('data', (data: string | Buffer) => {
			sanitize(data, opts.verbose, console.error);
		});

		out.on('close', (code: number) => {
			if (code !== success) {
				return cb(new Error(`Error executing command: ${cmd} (${code})`), code);
			}

			return cb(null, code);
		});
	} else {
		try {
			const data = ps.execFileSync(opts.shell, opts.shellArgs);
			sanitize(data, opts.verbose);
			return cb(null, success);
		} catch (err) {
			return cb(err, failure);
		}
	}
}

/**
 * Performs an synchronous command line call to run a given user command.
 * This is a wrapper for the call function to wait for the command to
 * finish.  When the call is finished a callback is executed.
 *
 * @param cmd {string} the command to execute on the command line
 * @param [opts] {ICallOpts} optional arguments to the call
 * @param [cb] {Function} the callback function to execute when the command
 * finishes.
 * @returns {number} returns 0 if the command was successful, otherwise 127.
 */
export function callSync(cmd: string | Buffer | string[], opts: any = null): number {
	let rc: number = success;

	opts = Object.assign({
		async: false,
		log: console.log
	}, opts);

	call(cmd, opts, (err, code) => {
		if (err) {
			opts.log(err.message);
		}
		rc = code;
	});

	return rc;
}

/**
 * Retrieves a list of directories from the given input path.
 * @param src {string} the source directory to search for sub directories
 * @returns {Array} a list of directories.
 */
export function getDirectories(src: string): string[] {
	return fs.readdirSync(src)
		.filter((file: string) => fs.statSync(path.join(src, file)).isDirectory());
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
		return uuid.v4().replace(/-/g, '');
	}

	return uuid.v4();
}

/**
 * Takes a Set of strings and converts it to a string that is joined by a
 * delimiter.
 * @param obj {Set<string>} the set of strings that will be joined together
 * @return {string} a new string
 */
export function join(obj: Set<string>, delimiter: string = ''): string {
	return Array.from(obj).join(delimiter);
}

/**
 * Searches for the first location (index) within a given string using a regex
 * @param text {string} the string to search within
 * @param re {RegExp} the regex object to search with
 * @param i {number} a starting index value
 * @return {number} the index value location where the regex match was found
 * If it is not found, then -1 is returned.
 */
export function regexIndexOf(text: string, re: RegExp, start: number = 0) {
	const idx: number = text.slice(start).search(re);
	return idx < 0 ? -1 : idx + start;
}

/**
 * Takes a data buffer of output bytes, converts it to a string and then splits
 * it on newlines for output.  By default it is just saved into a sanitized
 * array.  If verbose is set to true, then the buffer it output to the console
 * line by line.
 * @param buffer {string} the output bytes to convert and print to log.
 * @param verbose {boolean} if true, then the sanitized output is sent to
 * the console.
 * @param log {console.log} the output logger to write the output when verbose.
 * @retuns {string[]} an array of string that represent the lines given with
 * the input buffer.
 */
export function sanitize(buffer: string | Buffer, verbose: boolean = false, log = console.log) {
	if (buffer == null && typeof buffer !== 'string' && !(buffer instanceof Buffer)) {
		return [];
	}

	if (buffer instanceof Buffer) {
		buffer = buffer.toString();
	}

	buffer = rstrip(buffer);
	const lines = buffer.split(/\r?\n|\r/);
	lines.map(rstrip);

	if (verbose) {
		lines.forEach((line: string) => {
			log(line);
		});
	}

	return lines;
}
