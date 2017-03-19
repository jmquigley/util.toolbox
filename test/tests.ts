'use strict';

import * as assert from 'assert';
import * as uuid from 'uuid';
import {call, callSync, failure, isDarwin, isLinux, isWin, nil, sanitize} from '../index';

it('Testing nil', () => {
	nil();
});

it('Executing output function test on string', () => {
	let data: string = 'test1\r\ntest2\r\ntest3\n';
	let out = sanitize(data, true);

	assert(out instanceof Array);
	assert(out.length === 3);
	assert.equal(out[0], 'test1');
	assert.equal(out[1], 'test2');
	assert.equal(out[2], 'test3');
});

it('Executing output function test on buffer', () => {
	let data: Buffer = new Buffer('test1\r\ntest2\r\ntest3\n');
	let out = sanitize(data);

	assert(out instanceof Array);
	assert(out.length === 3);
	assert.equal(out[0], 'test1');
	assert.equal(out[1], 'test2');
	assert.equal(out[2], 'test3');
});

it('Executing output function test on string with multiple newlines', () => {
	let data: string = 'test1\r\n\ntest2\n\n\n\r\ntest3\n\n\n';
	let out = sanitize(data);

	assert(out instanceof Array);
	assert(out.length === 9);
	assert.equal(out[0], 'test1');
	assert.equal(out[2], 'test2');
	assert.equal(out[6], 'test3');
});

it('Test sanitize with bad input', () => {
	let out = sanitize(null);

	assert(out instanceof Array);
	assert(out.length === 0);
});

it('Test of the call async function', (done) => {
	let cmd = '';
	if (isWin) {
		cmd = 'Get-ChildItem Env:';
	} else if (isDarwin || isLinux) {
		cmd = 'env';
	}

	call(cmd, (err: Error, code: number) => {
		if (err) {
			assert(false, err.message);
		}

		assert(code === 0);
		done();
	});
});

it('Test of the call async function with bad command', (done) => {
	call(uuid.v4(), (err: Error, code: number) => {
		if (err) {
			assert(true, `${err.message} (${code})`);
			assert(code !== 0);
			done();
		}

		assert(false, 'This should not pass');
		done();
	});
});

it('Test of the call async function with long output', (done) => {
	let cmd = '';
	if (isWin) {
		cmd = 'dir';
	} else if (isDarwin || isLinux) {
		cmd = 'ls -axpl';
	}

	call(cmd, (err: Error, code: number) => {
		if (err) {
			assert(false, err.message);
		}

		assert(code === 0);
		done();
	});
});

it('Test of the call async function with Buffer', (done) => {
	let cmd: Buffer = null;
	if (isWin) {
		cmd = new Buffer('dir');
	} else if (isDarwin || isLinux) {
		cmd = new Buffer('ls -axpl');
	}

	call(cmd, (err: Error, code: number) => {
		if (err) {
			assert(false, err.message);
		}

		assert(code === 0);
		done();
	});
});

it('Test of the call async function with Array of command parts', (done) => {
	let cmd: string[] = [];
	if (isWin) {
		cmd = ['dir', '-Directory'];
	} else if (isDarwin || isLinux) {
		cmd = ['ls', '-axpl'];
	}

	call(cmd, (err: Error, code: number) => {
		if (err) {
			assert(false, err.message);
		}

		assert(code === 0);
		done();
	});
});

it('Test of the call async function with null command', (done) => {
	call(null, (err: Error, code: number) => {
		if (err) {
			assert(code === 127);
			assert.equal(err.message, 'No command given to execute in call');
			done();
		}

		assert(false, `${code}`);
		done();
	});
});

it('Test of synchronous call function', (done) => {
	let cmd = '';
	if (isWin) {
		cmd = 'echo "powershell call"';
	} else if (isDarwin || isLinux) {
		cmd = 'sleep 2';
	}

	callSync(cmd, (err: Error, code: number) => {
		if (err) {
			assert(false, err.message);
			return done(failure);
		}

		assert(code === 0);
		return done();
	});

	assert(false, `Shouldn't get here`);
	return done(failure);
});

it('Test of synchronous call function with a bad command', (done) => {
	callSync(uuid.v4(), (err: Error, code: number) => {
		if (err) {
			assert(code === 127);
			assert(err.message.startsWith('Command failed: '));
			return done();
		}

		assert(false, `${code}`);
		return done(failure);
	});
});
