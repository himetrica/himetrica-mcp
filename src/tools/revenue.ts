import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { HimetricaClient } from "../client.js";

export function registerRevenueTools(server: McpServer, client: HimetricaClient) {
  server.tool(
    "get_revenue",
    "Get revenue overview: MRR, total revenue, active subscriptions, churn rate, trials",
    {},
    async () => {
      const data = await client.getRevenue();
      return { content: [{ type: "text" as const, text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "get_revenue_timeseries",
    "Get revenue over time: daily breakdown of revenue, new revenue, and recurring revenue",
    {
      days: z.string().optional().describe("Number of days to look back. Default: 30"),
    },
    async (params) => {
      const data = await client.getRevenueTimeseries(params);
      return { content: [{ type: "text" as const, text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "get_top_customers",
    "Get top customers ranked by total revenue",
    {
      limit: z.string().optional().describe("Max customers to return. Default: 10"),
      identifiedOnly: z.enum(["true", "false"]).optional().describe("Only show identified customers. Default: false"),
    },
    async (params) => {
      const data = await client.getTopCustomers(params);
      return { content: [{ type: "text" as const, text: JSON.stringify(data) }] };
    },
  );
}
