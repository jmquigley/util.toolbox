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
<dt><a href="#call">call(cmd, [opts], [cb])</a></dt>
<dd><p>Performs an asynchronous command line call to run a given user command.
This method uses the node <code>execFile</code> call so that the method can control
the calling shell and parameters used to invoke it.  It will use BASH by
default for Linux/Mac, and when the environment is windows it will attempt
to use powershell.  The shell can be overriden with the opts argument.</p>
<p>When using default BASH options it will invoke as a login shell.</p>
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
| [opts] | <code>ICallOpts</code> | <code></code> | optional arguments to the call     - `log: any`: the output logger that will be used with this call.  It     uses a default of the console.log method.     - `verbose: {boolean}`: if true, then output is printed     - `shell: {string}`: the shell that will be invoked with this call.  It     depends on the environment.     - `shellArgs: {string[]}`: the parameters after shell, but before the     given command. |
| [cb] | <code>function</code> |  | the callback function to execute when the command finishes. |

