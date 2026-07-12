import { z } from 'zod';
import { wrapTool } from './_format.js';
import * as core from '../core/tab.js';

export function registerTabTools(server) {
  server.tool('tab_list', 'List all open TradingView chart tabs', {}, wrapTool(() => core.list()));

  server.tool('tab_new', 'Open a new chart tab. Optionally pick what to load in it: layout "new" creates a named blank layout, or pass a saved layout name to open it.', {
    layout: z.string().optional().describe('"new" for a blank new layout, or a saved layout name (substring match). Omit to leave the tab on the layout picker.'),
    name: z.string().optional().describe('Name for the new layout (used with layout: "new"; default "New layout")'),
  }, wrapTool(({ layout, name }) => core.newTab({ layout, name })));

  server.tool('layout_new', 'Create a new named blank chart layout (opens in a new tab)', {
    name: z.string().optional().describe('Layout name (default "New layout")'),
  }, wrapTool(({ name }) => core.newTab({ layout: 'new', name })));

  server.tool('tab_close', 'Close the current chart tab', {}, wrapTool(() => core.closeTab()));

  server.tool('tab_switch', 'Switch to a chart tab by index', {
    index: z.coerce.number().describe('Tab index (0-based, from tab_list)'),
  }, wrapTool(({ index }) => core.switchTab({ index })));
}
