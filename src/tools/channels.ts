import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { HimetricaClient } from "../client.js";

export function registerChannelsTools(server: McpServer, client: HimetricaClient) {
  server.tool(
    "get_channel_roi",
    "Get channel ROI: visitors, conversions, revenue, ad spend, CAC, LTV per channel",
    {
      groupBy: z.enum(["utmSource", "utmMedium", "utmCampaign"]).optional().describe("How to group channels. Default: utmSource"),
      startDate: z.string().optional().describe("Start date (ISO 8601). Defaults to 7 days ago."),
      endDate: z.string().optional().describe("End date (ISO 8601). Defaults to now."),
    },
    async (params) => {
      const data = await client.getChannelROI(params);
      return { content: [{ type: "text" as const, text: JSON.stringify(data) }] };
    },
  );
}
