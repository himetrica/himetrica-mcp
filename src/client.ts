const DEFAULT_API_URL = "https://app.himetrica.com";

/**
 * HTTP client for the Himetrica Public API (/api/v1/).
 * Only requires a secret key — discovers the project ID automatically via /me.
 */
export class HimetricaClient {
  private baseUrl: string;
  private secretKey: string;
  private projectId: string | null = null;

  constructor(config: { secretKey: string; apiUrl?: string }) {
    this.baseUrl = (config.apiUrl || DEFAULT_API_URL).replace(/\/$/, "");
    this.secretKey = config.secretKey;
  }

  /** Call /me once to discover the project ID for this secret key. */
  async init(): Promise<{ projectId: string; name: string; timezone?: string }> {
    const response = await fetch(`${this.baseUrl}/api/v1/me`, {
      method: "GET",
      headers: { "X-API-Key": this.secretKey, "Accept": "application/json" },
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(`Failed to authenticate: ${(body as any).error || response.statusText}`);
    }

    const json = await response.json() as { data: { projectId: string; name: string; timezone?: string } };
    this.projectId = json.data.projectId;
    return json.data;
  }

  private async request<T>(path: string, params?: Record<string, string | undefined>): Promise<T> {
    if (!this.projectId) {
      await this.init();
    }

    const url = new URL(`${this.baseUrl}/api/v1/projects/${this.projectId}${path}`);

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          url.searchParams.set(key, value);
        }
      }
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { "X-API-Key": this.secretKey, "Accept": "application/json" },
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(`Himetrica API error (${response.status}): ${(body as any).error || response.statusText}`);
    }

    const json = await response.json() as { data: T };
    return json.data;
  }

  async getAnalytics(params?: { startDate?: string; endDate?: string; timezone?: string }) {
    return this.request("/analytics", params);
  }

  async getTimeseries(params?: { startDate?: string; endDate?: string; granularity?: string; timezone?: string }) {
    return this.request("/analytics/timeseries", params);
  }

  async getRealtime() {
    return this.request("/analytics/realtime");
  }

  async getTopPages(params?: { startDate?: string; endDate?: string; timezone?: string }) {
    return this.request("/pages", params);
  }

  async getPageInsights(params?: { startDate?: string; endDate?: string; timezone?: string }) {
    return this.request("/pages/insights", params);
  }

  async getTrafficSources(params?: { groupBy?: string; limit?: string; page?: string; startDate?: string; endDate?: string }) {
    return this.request("/sources", params);
  }

  async getLocations(params?: { groupBy?: string; limit?: string; page?: string; country?: string; startDate?: string; endDate?: string }) {
    return this.request("/locations", params);
  }

  async getEvents(params?: { startDate?: string; endDate?: string; timezone?: string }) {
    return this.request("/events", params);
  }

  async getEventNames() {
    return this.request<string[]>("/events/names");
  }

  async getEventsTimeseries(params?: { startDate?: string; endDate?: string; granularity?: string; eventName?: string; timezone?: string }) {
    return this.request("/events/timeseries", params);
  }

  async getRevenue() {
    return this.request("/revenue");
  }

  async getRevenueTimeseries(params?: { days?: string }) {
    return this.request("/revenue/timeseries", params);
  }

  async getTopCustomers(params?: { limit?: string; identifiedOnly?: string }) {
    return this.request("/revenue/top-customers", params);
  }

  async getChannelROI(params?: { startDate?: string; endDate?: string; groupBy?: string }) {
    return this.request("/channels", params);
  }

  async getChannelSummary(params?: { startDate?: string; endDate?: string }) {
    return this.request("/channels/summary", params);
  }
}
