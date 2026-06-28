import sample from "./sample.json";
import { auditLogsService } from "../service";

export async function seedAuditLogs() {
  return auditLogsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
