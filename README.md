# @himetrica/mcp-server

MCP server for [Himetrica](https://himetrica.com) — query your analytics from Claude, Cursor, or any AI assistant that supports the [Model Context Protocol](https://modelcontextprotocol.io).

## Setup

You need:
- **Node.js 18+**
- A Himetrica **secret key** (`hm_sk_...`) from Project Settings
- A **Starter plan** or above

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "himetrica": {
      "command": "npx",
      "args": ["@himetrica/mcp-server"],
      "env": {
        "HIMETRICA_SECRET_KEY": "hm_sk_..."
      }
    }
  }
}
```

### Claude Code

```bash
claude mcp add himetrica -e HIMETRICA_SECRET_KEY=hm_sk_... -- npx @himetrica/mcp-server
```

### Cursor

Add to `.cursor/mcp.json` in your project:

```json
{
  "mcpServers": {
    "himetrica": {
      "command": "npx",
      "args": ["@himetrica/mcp-server"],
      "env": {
        "HIMETRICA_SECRET_KEY": "hm_sk_..."
      }
    }
  }
}
```

## Available Tools

| Tool | Description |
|------|-------------|
| `get_analytics` | Overview stats: visitors, pageviews, bounce rate, with period comparison |
| `get_timeseries` | Time series trends for charting |
| `get_realtime` | Active visitors right now |
| `get_top_pages` | Pages ranked by views |
| `get_traffic_sources` | Traffic source breakdown (referrer, UTM) |
| `get_top_locations` | Geographic breakdown by country or city |
| `get_events` | Custom event metrics |
| `get_revenue` | Revenue overview: MRR, churn, subscriptions |
| `get_revenue_timeseries` | Revenue over time |
| `get_top_customers` | Top customers by revenue |
| `get_channel_roi` | Channel ROI: revenue, ad spend, CAC, LTV |

All tools accept optional `startDate` and `endDate` parameters (ISO 8601). Your AI assistant sets these automatically based on your question.

## Example Questions

- "How many visitors did I get this week?"
- "What's my MRR?"
- "Which pages are most popular?"
- "Where are my visitors coming from?"
- "Which marketing channel has the best ROI?"
- "Is anyone on my site right now?"
- "Who are my top customers?"
- "How is revenue trending over the last 90 days?"

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `HIMETRICA_SECRET_KEY` | Yes | Your project secret key (`hm_sk_...`) |
| `HIMETRICA_API_URL` | No | API URL override (defaults to `https://api.himetrica.com`) |

## How It Works

The MCP server runs locally on your machine. When your AI assistant needs analytics data, it calls the server via stdin/stdout. The server queries the [Himetrica Read API](https://himetrica.com/docs/read-api) and returns the results. No data is stored — it's a passthrough.

## License

MIT
