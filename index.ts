import * as ps from 'child_process';
import {rstrip} from 'util.rstrip';

export const encoding: string = 'utf-8';
export const success: string = 'success';
export const failure: string = 'failure';
export const nl: string = '\n';

export const isWin = /^win/.test(process.platform);
export const isDarwin = /^darwin/.test(process.platform);
export const isMac = /^darwin/.test(process.platform);
export const isLinux = /^linux/.test(process.platform);

/**
 * A function that does nothing.  Use it as an empty callback initializer.
 */
export let nil: Function = () => {
};

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
	let lines = buffer.split(/\r?\n|\r/);
	lines.map(rstrip);

	if (verbose) {
		lines.forEach((line: string) => {
			log(line);
		});
	}

	return lines;
}

/**
 * Performs an asynchronous command line call to run a given user command.
 *
 * @param cmd {string} the command to execute on the command line
 * @param cb {Function} the callback function to execute when the command
 * finishes.
 * @param verbose {boolean} a flag that determines if output will be written
 * to the given logger.  True by default.
 * @param log {console.log} the logger object to use with the output from
 * the command.
 */
export function call(cmd: string | Buffer | string[], cb: Function = nil, verbose = true, log = console.log) {
	if (cmd == null) {
		return cb(new Error('No command given to execute in call'), 127);
	}

	if (cmd instanceof Buffer) {
		cmd = cmd.toString();
	} else if (cmd instanceof Array) {
		cmd = cmd.join(' ');
	}

	if (verbose) {
		log(`$ ${cmd}`);
	}
	let out = ps.exec(cmd);

	out.stdout.on('data', (data: string | Buffer) => {
		sanitize(data, verbose);
		return out;
	});

	out.stderr.on('data', (data: string | Buffer) => {
		sanitize(data, verbose, console.error);
	});

	out.on('close', (code: number) => {
		if (code !== 0) {
			return cb(new Error(`Error executing command: ${cmd} (${code})`), code);
		}

		return cb(null, code);
	});
}
