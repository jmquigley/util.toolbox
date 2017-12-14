## Functions

<dl>
<dt><a href="#call">call(cmd, [opts], [cb])</a></dt>
<dd><p>Performs an asynchronous command line call to run a given user command.
This method uses the node <code>execFile</code> call so that the method can control
the calling shell and parameters used to invoke it.  It will use BASH by
default for Linux/Mac, and when the environment is windows it will attempt
to use powershell.  The shell can be overriden with the opts argument.</p>
<p>When using default BASH options it will invoke as a login shell.</p>
</dd>
<dt><a href="#callSync">callSync(cmd, [opts], [cb])</a> ⇒ <code>number</code></dt>
<dd><p>Performs an synchronous command line call to run a given user command.
This is a wrapper for the call function to wait for the command to
finish.  When the call is finished a callback is executed.</p>
</dd>
<dt><a href="#closestNumber">closestNumber(arr, num)</a> ⇒ <code>number</code></dt>
<dd><p>Takes an array of numbers and finds the closest value to the given
input number.</p>
<p>Inspired by <a href="https://github.com/andreruffert/closest-number">https://github.com/andreruffert/closest-number</a></p>
</dd>
<dt><a href="#getDirectories">getDirectories(src)</a> ⇒ <code>Array</code></dt>
<dd><p>Retrieves a list of directories from the given input path.</p>
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

<a name="call"></a>

## call(cmd, [opts], [cb])
Performs an asynchronous command line call to run a given user command.
This method uses the node `execFile` call so that the method can control
the calling shell and parameters used to invoke it.  It will use BASH by
default for Linux/Mac, and when the environment is windows it will attempt
to use powershell.  The shell can be overriden with the opts argument.

When using default BASH options it will invoke as a login shell.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cmd | <code>string</code> |  | the command to execute on the command line |
| [opts] | <code>ICallOpts</code> | <code></code> | optional arguments to the call     - `async: boolean`: if true, then the async version is called, otherwise     the call will be synchronous.     - `log: any`: the output logger that will be used with this call.  It     uses a default of the console.log method.     - `verbose: {boolean}`: if true, then output is printed     - `shell: {string}`: the shell that will be invoked with this call.  It     depends on the environment.     - `shellArgs: {string[]}`: the parameters after shell, but before the     given command. |
| [cb] | <code>function</code> |  | the callback function to execute when the command finishes. |

<a name="callSync"></a>

## callSync(cmd, [opts], [cb]) ⇒ <code>number</code>
Performs an synchronous command line call to run a given user command.
This is a wrapper for the call function to wait for the command to
finish.  When the call is finished a callback is executed.

**Kind**: global function  
**Returns**: <code>number</code> - returns 0 if the command was successful, otherwise 127.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cmd | <code>string</code> |  | the command to execute on the command line |
| [opts] | <code>ICallOpts</code> | <code></code> | optional arguments to the call |
| [cb] | <code>function</code> |  | the callback function to execute when the command finishes. |

<a name="closestNumber"></a>

## closestNumber(arr, num) ⇒ <code>number</code>
Takes an array of numbers and finds the closest value to the given
input number.

Inspired by https://github.com/andreruffert/closest-number

**Kind**: global function  
**Returns**: <code>number</code> - the number from arr that is closest to num  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;number&gt;</code> | array of numbers to search |
| num | <code>number</code> | the number value used as a reference to find |

<a name="getDirectories"></a>

## getDirectories(src) ⇒ <code>Array</code>
Retrieves a list of directories from the given input path.

**Kind**: global function  
**Returns**: <code>Array</code> - a list of directories.  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>string</code> | the source directory to search for sub directories |

<a name="getRandomInt"></a>

## getRandomInt(min, max) ⇒ <code>number</code>
Generates a random integer between the two specified values.  The value is
no lower than min and not equal to max (not inclusive).  Do not use this
for cryptography.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

**Kind**: global function  
**Returns**: <code>number</code> - a pseudo random number  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>number</code> | the smallest integer to use, inclusive |
| max | <code>number</code> | the largest integer to use, non inclusive |

<a name="getRandomIntInclusive"></a>

## getRandomIntInclusive(min, max) ⇒ <code>number</code>
Generates a random integer between the two specified values.  The value is
no lower than min and less than or equal to max (inclusive).  Do not use this
for cryptography.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

**Kind**: global function  
**Returns**: <code>number</code> - a pseudo random number  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>number</code> | the smallest integer to use, inclusive |
| max | <code>number</code> | the largest integer to use, inclusive |

<a name="getUUID"></a>

## getUUID(nodash) ⇒ <code>string</code>
Retrieves a version 4 uuid.  It can be with or without the dash characters.

**Kind**: global function  
**Returns**: <code>string</code> - a v4 uuid  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| nodash | <code>boolean</code> | <code>false</code> | if true, the dashes are removed, otherwise just a v4 uuid is created. |

<a name="sanitize"></a>

## sanitize(buffer, verbose, log)
Takes a data buffer of output bytes, converts it to a string and then splits
it on newlines for output.  By default it is just saved into a sanitized
array.  If verbose is set to true, then the buffer it output to the console
line by line.

**Kind**: global function  
**Retuns**: <code>string[]</code> an array of string that represent the lines given with
the input buffer.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>string</code> |  | the output bytes to convert and print to log. |
| verbose | <code>boolean</code> | <code>false</code> | if true, then the sanitized output is sent to the console. |
| log | <code>console.log</code> |  | the output logger to write the output when verbose. |

