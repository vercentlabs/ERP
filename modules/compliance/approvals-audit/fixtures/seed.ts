import sample from "./sample.json";
import { approvalsAuditService } from "../service";

export async function seedApprovalsAudit() {
  return approvalsAuditService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
