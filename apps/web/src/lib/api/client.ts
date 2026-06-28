export type ApiClientOptions = {
  baseUrl: string;
  tenantId: string;
  accessToken?: string;
};

export function createApiClient(options: ApiClientOptions) {
  const headers = {
    "content-type": "application/json",
    "x-tenant-id": options.tenantId,
    ...(options.accessToken ? { authorization: `Bearer ${options.accessToken}` } : {}),
  };

  return {
    async get<T>(path: string): Promise<T> {
      const response = await fetch(new URL(path, options.baseUrl), { headers });
      if (!response.ok) throw new Error(await response.text());
      return response.json() as Promise<T>;
    },
    async post<T>(path: string, body: unknown): Promise<T> {
      const response = await fetch(new URL(path, options.baseUrl), {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error(await response.text());
      return response.json() as Promise<T>;
    },
  };
}
