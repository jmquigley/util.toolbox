'use strict';

import test from 'ava';
import * as path from 'path';
import * as uuid from 'uuid';
import {
	call,
	callSync,
	failure,
	getDirectories,
	getUUID,
	isDarwin,
	isLinux,
	isWin,
	nil,
	sanitize,
	success
} from '../index';

test('Testing nil', t => {
	nil();
	t.pass();
});

test('Executing output function test on string', t => {
	const data: string = 'test1\r\ntest2\r\ntest3\n';
	const out = sanitize(data, true);

	t.truthy(out instanceof Array);
	t.is(out.length, 3);
	t.is(out[0], 'test1');
	t.is(out[1], 'test2');
	t.is(out[2], 'test3');
});

test('Executing output function test on buffer', t => {
	const data: Buffer = new Buffer('test1\r\ntest2\r\ntest3\n');
	const out = sanitize(data);

	t.truthy(out instanceof Array);
	t.is(out.length, 3);
	t.is(out[0], 'test1');
	t.is(out[1], 'test2');
	t.is(out[2], 'test3');
});

test('Executing output function test on string with multiple newlines', t => {
	const data: string = 'test1\r\n\ntest2\n\n\n\r\ntest3\n\n\n';
	const out = sanitize(data);

	t.truthy(out instanceof Array);
	t.is(out.length, 9);
	t.is(out[0], 'test1');
	t.is(out[2], 'test2');
	t.is(out[6], 'test3');
});

test('Test sanitize with bad input', t => {
	const out = sanitize(null);

	t.truthy(out instanceof Array);
	t.is(out.length, 0);
});

test.cb('Test of the call async function', t => {
	let cmd = '';
	if (isWin) {
		cmd = 'Get-ChildItem Env:';
	} else if (isDarwin || isLinux) {
		cmd = 'env';
	}

	call(cmd, (err: Error, code: number) => {
		if (err) {
			t.fail(err.message);
		}

		t.is(code, 0);
		t.end();
	});
});

test.cb('Test of the call async function with bad command', t => {
	call(uuid.v4(), (err: Error, code: number) => {
		if (err) {
			t.pass(`${err.message} (${code})`);
			t.not(code, 0);
			return;
		}

		t.fail('This should not pass');
	});

	t.end();
});

test.cb('Test of the call async function with long output', t => {
	let cmd = '';
	if (isWin) {
		cmd = 'dir';
	} else if (isDarwin || isLinux) {
		cmd = 'ls -axpl';
	}

	call(cmd, (err: Error, code: number) => {
		if (err) {
			t.fail(err.message);
		}

		t.is(code, 0);
		t.end();
	});
});

test.cb('Test of the call async function with Buffer', t => {
	let cmd: Buffer = null;
	if (isWin) {
		cmd = new Buffer('dir');
	} else if (isDarwin || isLinux) {
		cmd = new Buffer('ls -axpl');
	}

	call(cmd, (err: Error, code: number) => {
		if (err) {
			t.fail(err.message);
		}

		t.is(code, 0);
		t.end();
	});
});

test.cb('Test of the call async function with Array of command parts', t => {
	let cmd: string[] = [];
	if (isWin) {
		cmd = ['dir', '-Directory'];
	} else if (isDarwin || isLinux) {
		cmd = ['ls', '-axpl'];
	}

	call(cmd, (err: Error, code: number) => {
		if (err) {
			t.fail(err.message);
		}

		t.is(code, 0);
		t.end();
	});
});

test.cb('Test of the call async function with null command', t => {
	call(null, (err: Error, code: number) => {
		if (err) {
			t.is(code, 127);
			t.is(err.message, 'No command given to execute in call');
			return t.end();
		}

		t.fail(`${code}`);
		return t.end();
	});
});

test('Test of synchronous call function', t => {
	let cmd = '';
	if (isWin) {
		cmd = 'echo "powershell call"';
	} else if (isDarwin || isLinux) {
		cmd = 'sleep 2';
	}

	const rc = callSync(cmd);
	t.is(rc, success);
});

test('Test of synchronous call function with a bad command', t => {
	const rc = callSync(uuid.v4());
	t.is(rc, failure);
});

test('Test retrieval of directories', t => {
	const fixtureDir = path.join(process.cwd(), 'test', 'fixtures');
	const dirs = getDirectories(fixtureDir);

	t.truthy(dirs);
	t.true(dirs instanceof Array);
	t.is(dirs.length, 3);
	t.deepEqual(dirs, ['dir1', 'dir2', 'dir3']);
});

test('Test UUID retrieval function', t => {

	// Test with dashes
	let uuid = getUUID();
	t.truthy(uuid);
	t.true(typeof uuid === 'string');
	t.is(uuid.length, 36);
	t.regex(uuid, /.{8}-.{4}-.{4}-.{4}-.{12}/);

	// Test without dashes
	uuid = getUUID(true);
	t.truthy(uuid);
	t.true(typeof uuid === 'string');
	t.is(uuid.length, 32);
	t.regex(uuid, /.{32}/);
});
