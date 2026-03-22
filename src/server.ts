import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { HimetricaClient } from "./client.js";
import { registerAnalyticsTools } from "./tools/analytics.js";
import { registerPagesTools } from "./tools/pages.js";
import { registerSourcesTools } from "./tools/sources.js";
import { registerLocationsTools } from "./tools/locations.js";
import { registerEventsTools } from "./tools/events.js";
import { registerRevenueTools } from "./tools/revenue.js";
import { registerChannelsTools } from "./tools/channels.js";
import { registerVisitorsTools } from "./tools/visitors.js";

export function createServer(client: HimetricaClient): McpServer {
  const server = new McpServer({
    name: "himetrica",
    version: "0.2.0",
  });

  registerAnalyticsTools(server, client);
  registerPagesTools(server, client);
  registerSourcesTools(server, client);
  registerLocationsTools(server, client);
  registerEventsTools(server, client);
  registerRevenueTools(server, client);
  registerChannelsTools(server, client);
  registerVisitorsTools(server, client);

  return server;
}
