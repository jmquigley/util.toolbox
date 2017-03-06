## Functions

<dl>
<dt><a href="#nil">nil()</a></dt>
<dd><p>A function that does nothing.  Use it as an empty callback initializer.</p>
</dd>
<dt><a href="#sanitize">sanitize(buffer, verbose, log)</a></dt>
<dd><p>Takes a data buffer of output bytes, converts it to a string and then splits
it on newlines for output.  By default it is just saved into a sanitized
array.  If verbose is set to true, then the buffer it output to the console.</p>
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
array.  If verbose is set to true, then the buffer it output to the console.

**Kind**: global function  
**Retuns**: <code>string[]</code> an array of string that represent the lines given with
the input buffer.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>string</code> |  | the output bytes to convert and print to log. |
| verbose | <code>boolean</code> | <code>false</code> | if true, then the sanitized output is sent to the console. |
| log | <code>console.log</code> |  | the output logger to write the output when verbose. |

