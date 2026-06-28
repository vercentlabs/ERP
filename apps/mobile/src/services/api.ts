import { API_BASE_URL, tenantHeaders } from "./apiBase";

export async function getMobileDashboard(tenantId: string) {
  const response = await fetch(`${API_BASE_URL}/api/command-center`, {
    headers: tenantHeaders(tenantId),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}
