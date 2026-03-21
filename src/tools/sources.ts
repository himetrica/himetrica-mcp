import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { HimetricaClient } from "../client.js";

export function registerSourcesTools(server: McpServer, client: HimetricaClient) {
  server.tool(
    "get_traffic_sources",
    "Get traffic source breakdown by referrer, UTM source, medium, or campaign",
    {
      groupBy: z.enum(["referrer", "utmSource", "utmMedium", "utmCampaign"]).optional().describe("How to group sources. Default: referrer"),
      limit: z.string().optional().describe("Max results per page. Default: 25"),
      startDate: z.string().optional().describe("Start date (ISO 8601). Defaults to 7 days ago."),
      endDate: z.string().optional().describe("End date (ISO 8601). Defaults to now."),
    },
    async (params) => {
      const data = await client.getTrafficSources(params);
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    },
  );
}
