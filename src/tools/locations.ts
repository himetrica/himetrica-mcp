import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { HimetricaClient } from "../client.js";

export function registerLocationsTools(server: McpServer, client: HimetricaClient) {
  server.tool(
    "get_top_locations",
    "Get geographic breakdown of visitors by country or city",
    {
      groupBy: z.enum(["country", "city"]).optional().describe("Group by country or city. Default: country"),
      limit: z.string().optional().describe("Max results. Default: 10"),
      country: z.string().optional().describe("Filter by country (for city breakdown)"),
      startDate: z.string().optional().describe("Start date (ISO 8601). Defaults to 7 days ago."),
      endDate: z.string().optional().describe("End date (ISO 8601). Defaults to now."),
    },
    async (params) => {
      const data = await client.getLocations({ ...params, limit: params.limit || "10" });
      return { content: [{ type: "text" as const, text: JSON.stringify(data) }] };
    },
  );
}
