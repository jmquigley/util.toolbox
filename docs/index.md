## Functions

<dl>
<dt><a href="#nil">nil()</a></dt>
<dd><p>A function that does nothing.  Use it as an empty callback initializer.</p>
</dd>
<dt><a href="#sanitize">sanitize(buffer, verbose, log)</a></dt>
<dd><p>Takes a data buffer of output bytes, converts it to a string and then splits
it on newlines for output.  By default it is just saved into a sanitized
array.  If verbose is set to true, then the buffer it output to the console
line by line.</p>
</dd>
<dt><a href="#call">call(cmd, cb, verbose, log)</a></dt>
<dd><p>Performs an asynchronous command line call to run a given user command.</p>
</dd>
</dl>

<a name="nil"></a>

## nil()
A function that does nothing.  Use it as an empty callback initializer.

**Kind**: global function  
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

<a name="call"></a>

## call(cmd, cb, verbose, log)
Performs an asynchronous command line call to run a given user command.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cmd | <code>string</code> |  | the command to execute on the command line |
| cb | <code>function</code> |  | the callback function to execute when the command finishes. |
| verbose | <code>boolean</code> | <code>true</code> | a flag that determines if output will be written to the given logger.  True by default. |
| log | <code>console.log</code> |  | the logger object to use with the output from the command. |

