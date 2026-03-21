import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { HimetricaClient } from "../client.js";

export function registerEventsTools(server: McpServer, client: HimetricaClient) {
  server.tool(
    "get_events",
    "Get custom event analytics: total events, unique names, and top events by count",
    {
      startDate: z.string().optional().describe("Start date (ISO 8601). Defaults to 7 days ago."),
      endDate: z.string().optional().describe("End date (ISO 8601). Defaults to now."),
      timezone: z.string().optional().describe("IANA timezone. Defaults to project timezone."),
    },
    async (params) => {
      const data = await client.getEvents(params);
      return { content: [{ type: "text" as const, text: JSON.stringify(data) }] };
    },
  );
}
