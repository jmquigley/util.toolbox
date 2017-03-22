'use strict';

import test from 'ava';
import * as uuid from 'uuid';
import {call, callSync, isDarwin, isLinux, isWin, nil, sanitize} from '../index';

test('Testing nil', t => {
	nil();
	t.pass();
});

test('Executing output function test on string', t => {
	let data: string = 'test1\r\ntest2\r\ntest3\n';
	let out = sanitize(data, true);

	t.truthy(out instanceof Array);
	t.is(out.length, 3);
	t.is(out[0], 'test1');
	t.is(out[1], 'test2');
	t.is(out[2], 'test3');
});

test('Executing output function test on buffer', t => {
	let data: Buffer = new Buffer('test1\r\ntest2\r\ntest3\n');
	let out = sanitize(data);

	t.truthy(out instanceof Array);
	t.is(out.length, 3);
	t.is(out[0], 'test1');
	t.is(out[1], 'test2');
	t.is(out[2], 'test3');
});

test('Executing output function test on string with multiple newlines', t => {
	let data: string = 'test1\r\n\ntest2\n\n\n\r\ntest3\n\n\n';
	let out = sanitize(data);

	t.truthy(out instanceof Array);
	t.is(out.length, 9);
	t.is(out[0], 'test1');
	t.is(out[2], 'test2');
	t.is(out[6], 'test3');
});

test('Test sanitize with bad input', t => {
	let out = sanitize(null);

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

test.cb('Test of synchronous call function', t => {
	let cmd = '';
	if (isWin) {
		cmd = 'echo "powershell call"';
	} else if (isDarwin || isLinux) {
		cmd = 'sleep 2';
	}

	callSync(cmd, (err: Error, code: number) => {
		if (err) {
			return t.fail(err.message);
		}

		t.is(code, 0);
	});

	t.end();
});

test.cb('Test of synchronous call function with a bad command', t => {
	callSync(uuid.v4(), (err: Error, code: number) => {
		if (err) {
			t.is(code, 127);
			t.truthy(err.message.startsWith('Command failed: '));
			return;
		}

		t.fail(`${code}`);
	});

	t.end();
});
