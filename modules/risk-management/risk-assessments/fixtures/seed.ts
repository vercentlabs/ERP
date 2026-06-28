import sample from "./sample.json";
import { riskAssessmentsService } from "../service";

export async function seedRiskAssessments() {
  return riskAssessmentsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
