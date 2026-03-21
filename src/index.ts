import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { HimetricaClient } from "./client.js";
import { createServer } from "./server.js";

const secretKey = process.env.HIMETRICA_SECRET_KEY;

if (!secretKey) {
  console.error("Missing HIMETRICA_SECRET_KEY environment variable");
  process.exit(1);
}

const client = new HimetricaClient({
  secretKey,
  apiUrl: process.env.HIMETRICA_API_URL, // optional override, defaults to https://api.himetrica.com
});

// Validate the key on startup
const project = await client.init();
console.error(`Connected to project: ${project.name} (${project.projectId})`);

const server = createServer(client);
const transport = new StdioServerTransport();
await server.connect(transport);
