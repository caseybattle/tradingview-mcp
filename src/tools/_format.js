/**
 * Shared MCP response formatting helper.
 * All tool files use this instead of manually constructing MCP responses.
 */
export function jsonResult(obj, isError = false) {
  return {
    content: [{ type: 'text', text: JSON.stringify(obj, null, 2) }],
    ...(isError && { isError: true }),
  };
}

/**
 * Wraps a tool handler so it converts its resolved value/thrown error into the
 * standard jsonResult shape, instead of every handler hand-rolling the same
 * try/catch.
 */
export function wrapTool(fn) {
  return async (...args) => {
    try {
      return jsonResult(await fn(...args));
    } catch (err) {
      return jsonResult({ success: false, error: err.message }, true);
    }
  };
}
