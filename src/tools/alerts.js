import { z } from 'zod';
import { wrapTool } from './_format.js';
import * as core from '../core/alerts.js';

export function registerAlertTools(server) {
  server.tool('alert_create', 'Create a price alert on the current chart symbol via TradingView\'s alert API', {
    condition: z.string().describe('Alert condition: "crossing", "greater_than", or "less_than"'),
    price: z.coerce.number().describe('Price level for the alert'),
    message: z.string().optional().describe('Alert message'),
  }, wrapTool(({ condition, price, message }) => core.create({ condition, price, message })));

  server.tool('alert_list', 'List active alerts', {}, wrapTool(() => core.list()));

  server.tool('alert_delete', 'Delete a specific alert by id, or all active alerts', {
    alert_id: z.coerce.number().optional().describe('Alert id to delete (from alert_list)'),
    delete_all: z.coerce.boolean().optional().describe('Delete all active alerts'),
  }, wrapTool(({ alert_id, delete_all }) => core.deleteAlerts({ alert_id, delete_all })));
}
