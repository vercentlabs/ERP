import type { TenantId } from "@vercent/shared-types";

export type TenantConnection = {
  tenantId: TenantId;
  databaseUrl: string;
  schema: string;
};

export function resolveTenantConnection(tenantId: TenantId, databaseUrl: string): TenantConnection {
  return {
    tenantId,
    databaseUrl,
    schema: `tenant_${tenantId.replace(/[^a-zA-Z0-9]/g, "_")}`,
  };
}
