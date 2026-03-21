# @himetrica/mcp-server

MCP server for [Himetrica](https://himetrica.com) — query your analytics from Claude, Cursor, or any AI assistant that supports the [Model Context Protocol](https://modelcontextprotocol.io).

## Setup

You need:
- A Himetrica **secret key** (`hm_sk_...`) from Project Settings
- A **Starter plan** or above

### Remote (recommended)

No install needed — connects directly to Himetrica's servers.

#### Claude Code

```bash
claude mcp add himetrica https://app.himetrica.com/api/v1/mcp \
  --transport http --header "X-API-Key: hm_sk_..."
```

#### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "himetrica": {
      "url": "https://app.himetrica.com/api/v1/mcp",
      "headers": {
        "X-API-Key": "hm_sk_..."
      }
    }
  }
}
```

#### Cursor

Add to `.cursor/mcp.json` in your project:

```json
{
  "mcpServers": {
    "himetrica": {
      "url": "https://app.himetrica.com/api/v1/mcp",
      "headers": {
        "X-API-Key": "hm_sk_..."
      }
    }
  }
}
```

### Local (via npx)

Alternatively, run the MCP server locally. Requires **Node.js 18+**.

```bash
claude mcp add himetrica -e HIMETRICA_SECRET_KEY=hm_sk_... -- npx @himetrica/mcp-server
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

## How It Works

The remote MCP server runs on Himetrica's infrastructure. When your AI assistant needs analytics data, it sends a request to `https://app.himetrica.com/api/v1/mcp` and gets results back. No data is stored — it queries your analytics in real time.

The local version (`npx @himetrica/mcp-server`) runs on your machine and calls the [Himetrica Read API](https://himetrica.com/docs/read-api) over HTTP.

## License

MIT
