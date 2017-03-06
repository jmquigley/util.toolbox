'use strict';

import * as assert from 'assert';
import {Fixture} from 'util.fixture';
import {debug} from './helpers';
import * as fs from 'fs-extra';
import * as toolbox from '../index';

describe('Executing test suite', () => {

	after(() => {
		debug('final cleanup: test_artifacts');
		let directories = Fixture.cleanup();
		directories.forEach((directory: string) => {
			assert(!fs.existsSync(directory));
		});
	});

	it('Testing nil', () => {
		toolbox.nil();
	});

	it('Executing output function test on string', () => {
		let data: string = 'test1\r\ntest2\r\ntest3\n';
		let out = toolbox.sanitize(data, true);

		assert(out instanceof Array);
		assert(out.length === 3);
		assert.equal(out[0], 'test1');
		assert.equal(out[1], 'test2');
		assert.equal(out[2], 'test3');
	});

	it('Executing output function test on buffer', () => {
		let data: Buffer = new Buffer('test1\r\ntest2\r\ntest3\n');
		let out = toolbox.sanitize(data);

		assert(out instanceof Array);
		assert(out.length === 3);
		assert.equal(out[0], 'test1');
		assert.equal(out[1], 'test2');
		assert.equal(out[2], 'test3');
	});

	it('Executing output function test on string with multiple newlines', () => {
		let data: string = 'test1\r\n\ntest2\n\n\n\r\ntest3\n\n\n';
		let out = toolbox.sanitize(data);

		assert(out instanceof Array);
		assert(out.length === 9);
		assert.equal(out[0], 'test1');
		assert.equal(out[2], 'test2');
		assert.equal(out[6], 'test3');
	});
});
