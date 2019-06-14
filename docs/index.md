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
<dt><a href="#isBrowser">isBrowser()</a> ⇒</dt>
<dd><p>Checks the environment to see if it is running under a browser environment</p>
</dd>
<dt><a href="#isNode">isNode()</a> ⇒</dt>
<dd><p>Checks the environment to see if it is running under nodejs.  Note that
this can be unreliable if &quot;process&quot; is globally defined in the
environment by some other application (i.e. monkeypatching)</p>
</dd>
<dt><a href="#objFindKeyByValue">objFindKeyByValue(obj, val)</a> ⇒</dt>
<dd><p>Searchs an objects value list to find its associated key.  It will return
the key of the first value found.</p>
</dd>
<dt><a href="#objHasValue">objHasValue(obj, val)</a> ⇒</dt>
<dd><p>Searches an objects value list to see if it exists within the object.
If a key contains that value, then it returns true, otherwise false.</p>
</dd>
<dt><a href="#roundUp">roundUp(n, precision)</a> ⇒</dt>
<dd><p>Rounds a number to its nearest precision</p>
</dd>
<dt><a href="#sanitize">sanitize(buffer, verbose, log, encoding)</a></dt>
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

- nodash <code>boolean</code> - if true, the dashes are removed, otherwise just a
v4 uuid is created.

<a name="isBrowser"></a>

## isBrowser() ⇒
Checks the environment to see if it is running under a browser environment

**Kind**: global function  
**Returns**: true if the environment is the browser, otherwise false.  
<a name="isNode"></a>

## isNode() ⇒
Checks the environment to see if it is running under nodejs.  Note that
this can be unreliable if "process" is globally defined in the
environment by some other application (i.e. monkeypatching)

**Kind**: global function  
**Returns**: true if the environment is running under node, otherwise false  
<a name="objFindKeyByValue"></a>

## objFindKeyByValue(obj, val) ⇒
Searchs an objects value list to find its associated key.  It will return
the key of the first value found.

**Kind**: global function  
**Returns**: the key/value pair, otherwise null  
**Params**

- obj <code>any</code> - the object to search for a value
- val <code>any</code> - the data to search for within the object

<a name="objHasValue"></a>

## objHasValue(obj, val) ⇒
Searches an objects value list to see if it exists within the object.
If a key contains that value, then it returns true, otherwise false.

**Kind**: global function  
**Returns**: true if the value is found otherwise false  
**Params**

- obj <code>any</code> - the object to search for a value
- val <code>any</code> - the data to search for within the object

<a name="roundUp"></a>

## roundUp(n, precision) ⇒
Rounds a number to its nearest precision

**Kind**: global function  
**Returns**: the newly rounded number  
**Params**

- n <code>number</code> - the number to round
- precision <code>number</code> - the number of decimal places to preserve

<a name="sanitize"></a>

## sanitize(buffer, verbose, log, encoding)
Takes a data buffer of output bytes, converts it to a string and then splits
it on newlines for output.  By default it is just saved into a sanitized
array.  If verbose is set to true, then the buffer it output to the console
line by line.

**Kind**: global function  
**Retuns**: <code>string[]</code> an array of string that represent the lines given with
the input buffer.  
**Params**

- buffer <code>string</code> | <code>Buffer</code> - the output bytes to convert and print to log.
- verbose <code>boolean</code> <code> = false</code> - if true, then the sanitized output is sent to
the console.
- log <code>console.log</code> - the output logger to write the output when verbose.
- encoding <code>string</code> <code> = &quot;\&quot;utf8\&quot;&quot;</code> - the encoding type for a buffer input type
when it is coverted to a string.

