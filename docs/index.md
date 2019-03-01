## Functions

<dl>
<dt><a href="#closestNumber">closestNumber(arr, num)</a> ⇒ <code>number</code></dt>
<dd><p>Takes an array of numbers and finds the closest value to the given
input number.</p>
<p>Inspired by <a href="https://github.com/andreruffert/closest-number">https://github.com/andreruffert/closest-number</a></p>
</dd>
<dt><a href="#getRandomInt">getRandomInt(min, max)</a> ⇒ <code>number</code></dt>
<dd><p>Generates a random integer between the two specified values.  The value is
no lower than min and not equal to max (not inclusive).  Do not use this
for cryptography.</p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random</a></p>
</dd>
<dt><a href="#getRandomIntInclusive">getRandomIntInclusive(min, max)</a> ⇒ <code>number</code></dt>
<dd><p>Generates a random integer between the two specified values.  The value is
no lower than min and less than or equal to max (inclusive).  Do not use this
for cryptography.</p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random</a></p>
</dd>
<dt><a href="#getUUID">getUUID(nodash)</a> ⇒ <code>string</code></dt>
<dd><p>Retrieves a version 4 uuid.  It can be with or without the dash characters.</p>
</dd>
<dt><a href="#sanitize">sanitize(buffer, verbose, log)</a></dt>
<dd><p>Takes a data buffer of output bytes, converts it to a string and then splits
it on newlines for output.  By default it is just saved into a sanitized
array.  If verbose is set to true, then the buffer it output to the console
line by line.</p>
</dd>
</dl>

<a name="closestNumber"></a>

## closestNumber(arr, num) ⇒ <code>number</code>
Takes an array of numbers and finds the closest value to the given
input number.

Inspired by https://github.com/andreruffert/closest-number

**Kind**: global function  
**Returns**: <code>number</code> - the number from arr that is closest to num  
**Params**

- arr <code>Array.&lt;number&gt;</code> - array of numbers to search
- num <code>number</code> - the number value used as a reference to find

<a name="getRandomInt"></a>

## getRandomInt(min, max) ⇒ <code>number</code>
Generates a random integer between the two specified values.  The value is
no lower than min and not equal to max (not inclusive).  Do not use this
for cryptography.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

**Kind**: global function  
**Returns**: <code>number</code> - a pseudo random number  
**Params**

- min <code>number</code> - the smallest integer to use, inclusive
- max <code>number</code> - the largest integer to use, non inclusive

<a name="getRandomIntInclusive"></a>

## getRandomIntInclusive(min, max) ⇒ <code>number</code>
Generates a random integer between the two specified values.  The value is
no lower than min and less than or equal to max (inclusive).  Do not use this
for cryptography.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

**Kind**: global function  
**Returns**: <code>number</code> - a pseudo random number  
**Params**

- min <code>number</code> - the smallest integer to use, inclusive
- max <code>number</code> - the largest integer to use, inclusive

<a name="getUUID"></a>

## getUUID(nodash) ⇒ <code>string</code>
Retrieves a version 4 uuid.  It can be with or without the dash characters.

**Kind**: global function  
**Returns**: <code>string</code> - a v4 uuid  
**Params**

- nodash <code>boolean</code> <code> = false</code> - if true, the dashes are removed, otherwise just a
v4 uuid is created.

<a name="sanitize"></a>

## sanitize(buffer, verbose, log)
Takes a data buffer of output bytes, converts it to a string and then splits
it on newlines for output.  By default it is just saved into a sanitized
array.  If verbose is set to true, then the buffer it output to the console
line by line.

**Kind**: global function  
**Retuns**: <code>string[]</code> an array of string that represent the lines given with
the input buffer.  
**Params**

- buffer <code>string</code> - the output bytes to convert and print to log.
- verbose <code>boolean</code> <code> = false</code> - if true, then the sanitized output is sent to
the console.
- log <code>console.log</code> - the output logger to write the output when verbose.

