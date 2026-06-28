import sample from "./sample.json";
import { inspectionPlansService } from "../service";

export async function seedInspectionPlans() {
  return inspectionPlansService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
