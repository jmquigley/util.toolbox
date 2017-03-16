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

export interface ICallOpts {
	log?: any;
	shell?: string;
	shellArgs?: string[];
	verbose?: boolean;
}

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
export function call(cmd: string | Buffer | string[], opts: ICallOpts = null, cb: Function = nil) {
	if (typeof opts === 'function') {
		cb = opts;
		opts = null;
	}

	if (cmd == null) {
		return cb(new Error('No command given to execute in call'), 127);
	}

	if (cmd instanceof Buffer) {
		cmd = cmd.toString();
	} else if (cmd instanceof Array) {
		cmd = cmd.join(' ');
	}

	opts = Object.assign({
		log: console.log,
		verbose: true,
		shell: (isWin) ? 'powershell' : '/bin/bash',
		shellArgs: (isWin) ? ['', cmd] : ['-l', '-c', cmd]
	}, opts);

	if (opts.verbose) {
		opts.log(`$ ${opts.shell} ${opts.shellArgs.join(' ')}`);
	}

	let out = ps.execFile(opts.shell, opts.shellArgs);

	out.stdout.on('data', (data: string | Buffer) => {
		sanitize(data, opts.verbose);
		return out;
	});

	out.stderr.on('data', (data: string | Buffer) => {
		sanitize(data, opts.verbose, console.error);
	});

	out.on('close', (code: number) => {
		if (code !== 0) {
			return cb(new Error(`Error executing command: ${cmd} (${code})`), code);
		}

		return cb(null, code);
	});
}
