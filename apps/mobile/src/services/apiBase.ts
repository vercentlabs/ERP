export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export function tenantHeaders(tenantId: string, token?: string) {
  return {
    "content-type": "application/json",
    "x-tenant-id": tenantId,
    ...(token ? { authorization: `Bearer ${token}` } : {}),
  };
}
