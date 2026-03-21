import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { HimetricaClient } from "../client.js";

const dateParams = {
  startDate: z.string().optional().describe("Start date (ISO 8601, e.g. 2024-01-01). Defaults to 7 days ago."),
  endDate: z.string().optional().describe("End date (ISO 8601). Defaults to now."),
  timezone: z.string().optional().describe("IANA timezone (e.g. America/New_York). Defaults to project timezone."),
};

export function registerAnalyticsTools(server: McpServer, client: HimetricaClient) {
  server.tool(
    "get_analytics",
    "Get analytics overview: visitors, pageviews, sessions, bounce rate, avg duration, with period comparison",
    { ...dateParams },
    async (params) => {
      const data = await client.getAnalytics(params);
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    },
  );

  server.tool(
    "get_timeseries",
    "Get time series data points for visitors/pageviews over time",
    {
      ...dateParams,
      granularity: z.enum(["hour", "day", "week", "month"]).optional().describe("Time bucket size. Default: day"),
    },
    async (params) => {
      const data = await client.getTimeseries(params);
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    },
  );

  server.tool(
    "get_realtime",
    "Get active visitors on the site right now",
    {},
    async () => {
      const data = await client.getRealtime();
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    },
  );
}
