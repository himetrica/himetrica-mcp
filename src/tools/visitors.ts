import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { HimetricaClient } from "../client.js";

export function registerVisitorsTools(server: McpServer, client: HimetricaClient) {
  server.tool(
    "search_visitors",
    "Search and list visitors with filtering by name, email, country, device, or source",
    {
      search: z.string().optional().describe("Search by name, email, or visitor ID"),
      country: z.string().optional().describe("Filter by country code (e.g. US, BR)"),
      device: z.string().optional().describe("Filter by device type (desktop, mobile, tablet)"),
      source: z.string().optional().describe("Filter by traffic source/referrer"),
      identifiedOnly: z.string().optional().describe("Set to 'true' to only return visitors with a name or email"),
      sortBy: z.enum(["firstSeenAt", "lastSeenAt", "name", "totalRevenueUsd"]).optional().describe("Sort field. Default: lastSeenAt"),
      sortOrder: z.enum(["ASC", "DESC"]).optional().describe("Sort order. Default: DESC"),
      limit: z.string().optional().describe("Max results (1-100). Default: 20"),
      startDate: z.string().optional().describe("Start date (ISO 8601). Defaults to 7 days ago."),
      endDate: z.string().optional().describe("End date (ISO 8601). Defaults to now."),
    },
    async (params) => {
      const data = await client.getVisitors({
        search: params.search,
        country: params.country,
        device: params.device,
        source: params.source,
        identifiedOnly: params.identifiedOnly,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
        limit: params.limit || "20",
        startDate: params.startDate,
        endDate: params.endDate,
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "get_visitor",
    "Get detailed information about a specific visitor by their ID",
    {
      visitorId: z.string().describe("The visitor's UUID"),
    },
    async (params) => {
      const data = await client.getVisitor(params.visitorId);
      return { content: [{ type: "text" as const, text: JSON.stringify(data) }] };
    },
  );
}
