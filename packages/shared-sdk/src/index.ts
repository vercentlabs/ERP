export type ApiClientOptions = {
  baseUrl: string;
  tenantId: string;
  accessToken?: string;
};

export class VercentSdk {
  constructor(private readonly options: ApiClientOptions) {}

  async health() {
    const response = await fetch(new URL("/health", this.options.baseUrl), {
      headers: this.headers(),
    });
    return response.json() as Promise<{ status: string }>;
  }

  private headers() {
    return {
      "x-tenant-id": this.options.tenantId,
      ...(this.options.accessToken ? { authorization: `Bearer ${this.options.accessToken}` } : {}),
    };
  }
}
