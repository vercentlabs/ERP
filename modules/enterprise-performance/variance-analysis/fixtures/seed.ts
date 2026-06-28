import sample from "./sample.json";
import { varianceAnalysisService } from "../service";

export async function seedVarianceAnalysis() {
  return varianceAnalysisService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
