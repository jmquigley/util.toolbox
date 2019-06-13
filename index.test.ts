"use strict";

console.log = jest.fn();

const debug = require("debug")("util.toolbox:test");

import {regexUUID} from "util.constants";
import {
	closestNumber,
	failure,
	getDirectories,
	getRandomInt,
	getRandomIntInclusive,
	getUUID,
	isBrowser,
	isNode,
	nil,
	nilEvent,
	objFindKeyByValue,
	objHasValue,
	roundUp,
	sanitize,
	success
} from "./index";

test("Testing nil", () => {
	nil();
	nilEvent();
});

test("Executing output function test on string", () => {
	const data: string = "test1\r\ntest2\r\ntest3\n";
	const out = sanitize(data, true, debug);

	debug(out);

	expect(out instanceof Array).toBeTruthy();
	expect(out.length).toBe(3);
	expect(out[0]).toBe("test1");
	expect(out[1]).toBe("test2");
	expect(out[2]).toBe("test3");
});

test("Executing output function test on buffer", () => {
	const data: Buffer = new Buffer.from("test1\r\ntest2\r\ntest3\n");
	const out = sanitize(data, true, debug);

	debug(out);

	expect(out instanceof Array).toBeTruthy();
	expect(out.length).toBe(3);
	expect(out[0]).toBe("test1");
	expect(out[1]).toBe("test2");
	expect(out[2]).toBe("test3");
});

test("Executing output function test on string with multiple newlines", () => {
	const data: string = "test1\r\n\ntest2\n\n\n\r\ntest3\n\n\n";
	const out = sanitize(data, true, debug);

	debug(out);

	expect(out instanceof Array).toBeTruthy();
	expect(out.length).toBe(9);
	expect(out[0]).toBe("test1");
	expect(out[2]).toBe("test2");
	expect(out[6]).toBe("test3");
});

test("Test sanitize with bad input", () => {
	const out = sanitize(null, true, debug);

	expect(out instanceof Array).toBeTruthy();
	expect(out.length).toBe(0);
});

test("Test sanitize with an empty buffer", () => {
	const data: Buffer = new Buffer.from("");
	const out = sanitize(data, true, debug);

	expect(out instanceof Array).toBeTruthy();
	expect(out.length).toBe(0);
});

test("Test UUID retrieval function", () => {
	// Test with dashes
	let testUUID = getUUID();
	expect(testUUID).toBeTruthy();
	expect(typeof testUUID === "string").toBeTruthy();
	expect(testUUID.length).toBe(36);
	expect(testUUID).toMatch(regexUUID);

	// Test without dashes
	testUUID = getUUID(true);
	expect(testUUID).toBeTruthy();
	expect(typeof testUUID === "string").toBeTruthy();
	expect(testUUID.length).toBe(32);
	expect(testUUID).toMatch(/.{32}/);
});

test("Test generating random integers", () => {
	const n: number = 1000;

	for (let i = 0; i < n; i++) {
		const val = getRandomInt(1, 6);
		expect(val >= 1 && val < 6).toBe(true);
	}
});

test("Test generating random integers with inclusive max", () => {
	const n: number = 1000;

	for (let i = 0; i < n; i++) {
		const val = getRandomIntInclusive(1, 6);
		expect(val >= 1 && val <= 6).toBe(true);
	}
});

test("Test basic numbers", () => {
	const numbers = [10, 20, 30];
	expect(closestNumber(numbers, 12)).toBe(10);
});

test("Test floating point numbers", () => {
	const numbers = [10.1, 10.5, 10.4, 8.2, 9.23, 10];
	expect(closestNumber(numbers, 10.2)).toBe(10.1);
});

test("Test negative numbers", () => {
	const numbers = [2, 0, -1.5, -0.75, -5, 3, -1.2, -2.1];
	expect(closestNumber(numbers, -1)).toBe(-1.2);
});

test("Test if running under a node environemnt", () => {
	expect(isNode()).toBe(true);
});

test("Test if running under a browser environment", () => {
	expect(isBrowser()).toBe(true);
});

test("Test rounding of numbers", () => {
	const n: number = 10.234567;

	expect(roundUp(n)).toBe(11);
	expect(roundUp(n, 0)).toBe(11);
	expect(roundUp(n, 2)).toBe(10.24);
	expect(roundUp(n, 3)).toBe(10.235);
});

test("Test searching an object for a value (not key)", () => {
	const obj = {
		a: "x",
		b: "y",
		c: null,
		d: undefined
	};

	expect(obj).toBeDefined();
	expect(objHasValue(obj, "x")).toBe(true); // key: a, true
	expect(objHasValue(obj, "y")).toBe(true); // key: b, true
	expect(objHasValue(obj, "z")).toBe(false); // not found, false
	expect(objHasValue(null, null)).toBe(false); // undefined, false
	expect(objHasValue(obj, null)).toBe(true); // key: c, true
	expect(objHasValue(obj, undefined)).toBe(true); // key: d, true
});

test("Test searching for a value in an object for its associated first key found", () => {
	const obj = {
		a: "x",
		b: "y",
		c: null,
		d: undefined
	};

	expect(obj).toBeDefined();
	expect(objFindKeyByValue(obj, "x")).toBe("a");
	expect(objFindKeyByValue(obj, "y")).toBe("b");
	expect(objFindKeyByValue(null, null)).toBe(null);
	expect(objFindKeyByValue(obj, null)).toBe("c");
	expect(objFindKeyByValue(obj, undefined)).toBe("d");
	expect(objFindKeyByValue(obj, "z")).toBe(null);
});
